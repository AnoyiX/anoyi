import { readFileSync } from 'fs'
import { Metadata } from "next"
import { notFound } from 'next/navigation'
import path from "path"
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import AppHeader from "../../../components/server/AppNav"

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

  // @ts-ignore
  const file = await unified().use(remarkParse).use(remarkRehype, { allowDangerousHtml: true }).use(rehypeRaw).use(rehypeStringify).process(content)

  return (
    <div className='flex flex-1 flex-col p-4 md:p-8 gap-4 md:gap-6 '>

      <AppHeader paths={[{ name: title }]} />

      <div className='flex flex-1 flex-col box-card'>
        <article className="max-w-full prose text-base p-4 md:p-8" dangerouslySetInnerHTML={{ __html: file.value.toString() }} />
      </div>

    </div>
  )
}