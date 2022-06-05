import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import useDoc from "../../hooks/useDoc"

const Doc = () => {
  const router = useRouter()
  const { slug } = router.query
  const { doc } = useDoc(slug as string)

  const [html, setHtml] = useState('')

  useEffect(() => {
    if (!!doc) {
      unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(doc.content)
        .then(file => setHtml(file.value.toString()))
    }
  }, [doc])

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

      <Head>
        <title>{InlineApps[0].name}</title>
      </Head>

      <AppHeader path={[{ name: doc.title }]} />

      <FullContainer>
        <article className="max-w-full prose text-base p-4 md:p-8" dangerouslySetInnerHTML={{ __html: html }} />
      </FullContainer>
    </div>
  )
}

export default Doc