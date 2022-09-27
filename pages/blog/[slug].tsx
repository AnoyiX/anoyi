import AppHeader from "../../components/AppHeader"
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import { parse } from 'node-html-parser'
import { TBlogArticle } from "../../types/blog"
import UA from "../../utils/ua"
import HighlightJS from "../../components/HighlightJS"

const Page = ({ article }: { article: TBlogArticle }) => {

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>{article.title}</title>
      </Head>

      <AppHeader path={[{ name: '博客', url: '/blog' }, { name: article.title }]} />

      <FullContainer>
        <div className="max-w-screen-lg mx-auto py-8">
          {
            article.title.length > 0 && (
              <>
                <div className="text-center text-3xl font-semibold">{article.title}</div>
                <article className="max-w-full prose text-base p-4 md:p-8" dangerouslySetInnerHTML={{ __html: article.content }} />
              </>
            )
          }
        </div>
      </FullContainer>

      <HighlightJS />

    </div>
  )
}

export async function getServerSideProps({ req, res }) {

  // get article and parse
  const slug = req.url.split('/').slice(-1)[0]
  const resp = await fetch(`https://www.jianshu.com/p/${slug}`, { headers: UA.iphone })
  const text = await resp.text()
  const document = parse(text)
  const elements = document.querySelector('div.note-content').childNodes.map(element => {
    if (element.nodeType === 1) {
      // @ts-ignore
      if (element.rawAttrs === 'class="image-package"') {
        // @ts-ignore
        const imgSrc = element.getElementsByTagName('img')[0].getAttribute('data-original-src')
        return `<img src="${imgSrc}" class="rounded-lg mx-auto min-h-[100px] bg-gray-100" alt="" />`
      }
      return element.toString()
    }
    return ''
  })
  const article = {
    id: slug,
    title: document.querySelector('h1.title').childNodes[0].text,
    time: document.querySelector('div.meta > span').childNodes.slice(-1)[0].text,
    author_name: document.querySelector('div.nickname > p.oneline').childNodes[0].text,
    content: elements.filter(item => item !== '').join(''),
  }

  // cache content
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=300, stale-while-revalidate=600'
  )

  return {
    props: {
      article
    },
    revalidate: 60,
  }

}

export default Page