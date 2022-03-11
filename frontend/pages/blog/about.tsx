import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import { useEffect, useState } from "react"

const Blog = () => {

  const markdown = `
  # Hello World
  
  test list:
  - 1111
  - 2222
  - 3333
  `

  const [html, setHtml] = useState('')

  useEffect(() => {
    unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(markdown)
      .then(file => setHtml(file.value.toString()))
  }, [])

  return (
    <div className='w-full p-8 flex flex-col space-y-6 '>

      <Head>
        <title>{InlineApps[0].name}</title>
      </Head>

      <AppHeader path={[InlineApps[0],]} />

      <FullContainer>
        <article className="prose" dangerouslySetInnerHTML={{ __html: html }}>
        </article>
      </FullContainer>
    </div>
  )
}

export default Blog