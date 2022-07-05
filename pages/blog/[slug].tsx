import AppHeader from "../../components/AppHeader"
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import useBlogArticle from "../../hooks/useBlogArticle"
import { useRouter } from 'next/router'
import highlight from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import { useEffect } from "react"

const Page = () => {

  const router = useRouter()
  const { slug } = router.query
  const { article, fetchArticle } = useBlogArticle(slug as string)

  useEffect(() => {
    router.isReady && fetchArticle()
  }, [router.isReady])


  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block: any) => {
      try {
        highlight.highlightBlock(block)
      } catch (e) {
        console.log(e)
      }
    })
  }, [article])

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>{article.title}</title>
      </Head>

      <AppHeader path={[{name: '博客', url: '/blog'}, { name: '内容' }]} />

      <FullContainer>
        <div className="max-w-screen-lg mx-auto py-8">
          {
            article.title.length > 0 && (
              <>
                <div className="text-center text-3xl font-semibold mb-4">{article.title}</div>
                <article className="max-w-full prose text-base p-4 md:p-8" dangerouslySetInnerHTML={{ __html: article.content }} />
              </>
            )
          }
        </div>
      </FullContainer>
    </div>
  )
}

export default Page