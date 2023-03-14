import AppHeader from "../../../components/server/AppNav"
import FullContainer from "../../../components/server/Containers"
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { readFileSync } from 'fs'
import path from "path"
import { notFound } from 'next/navigation'
import { Metadata } from "next"

const titles = {
  about: '关于作者',
  jobs: '工作内推',
  links: '友情链接',
  terms: '用户协议',
}
type DOC = keyof typeof titles

export async function generateMetadata({ params: { slug } }: { params: { slug: DOC } }): Promise<Metadata> {
  return { title: titles[slug] }
}

export default async function Page({ params: { slug } }: { params: { slug: DOC } }) {

  if (Object.keys(titles).indexOf(slug) === -1) {
    return notFound()
  }

  const title = titles[slug]

  const content = readFileSync(path.join(process.cwd(), `data/md/${slug}.md`), 'utf-8')
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content)

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

      <AppHeader paths={[{ name: title }]} />

      <FullContainer>
        <article className="max-w-full prose text-base p-4 md:p-8" dangerouslySetInnerHTML={{ __html: file.value.toString() }} />
      </FullContainer>

    </div>
  )
}

// import AppHeader from "../../app/AppNav"
// import Head from 'next/head'
// import FullContainer from "../../app/Containers"
// import { unified } from 'unified'
// import remarkParse from 'remark-parse'
// import remarkRehype from 'remark-rehype'
// import rehypeRaw from 'rehype-raw'
// import rehypeStringify from 'rehype-stringify'
// import { GetStaticPropsContext } from "next/types"
// import { readFileSync } from 'fs'
// import path from "path"
// import HighlightJS from "../../components/HighlightJS"

// const Page = ({ title, html }) => {

//   return (
//     <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

//       <Head>
//         <title>{title}</title>
//       </Head>

//       <AppHeader path={[{ name: title }]} />

//       <FullContainer>
//         <article className="max-w-full prose text-base p-4 md:p-8" dangerouslySetInnerHTML={{ __html: html }} />
//       </FullContainer>

//       <HighlightJS />

//     </div>
//   )

// }

// export async function getStaticPaths() {
//   const mds = ['about', 'jobs', 'links', 'terms']
//   return {
//     paths: mds.map(slug => ({ params: { slug } })),
//     fallback: false
//   };
// }

// export async function getStaticProps(context: GetStaticPropsContext) {

//   const { slug } = context.params

//   // pages title
//   const titles = {
//     about: '关于作者',
//     jobs: '工作内推',
//     links: '友情链接',
//     terms: '用户协议',
//   }

//   // content: markdown -> html
//   const content = readFileSync(path.join(process.cwd(), `data/md/${slug}.md`), 'utf-8')
//   const file = await unified()
//     .use(remarkParse)
//     .use(remarkRehype, { allowDangerousHtml: true })
//     .use(rehypeRaw)
//     .use(rehypeStringify)
//     .process(content)

//   return {
//     props: {
//       title: titles[slug as string] || '',
//       html: file.value.toString(),
//     },
//   }

// }

// export default Page
