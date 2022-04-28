import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import useBlogArticle from "../../hooks/useBlogArticle"
import { useRouter } from 'next/router'
import highlight from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import { useEffect, useState } from "react"

const Blog = () => {

  const router = useRouter()
  const { slug } = router.query
  const { article } = useBlogArticle(slug as string)
  const [renderedContent, setRenderedContent] = useState('')

  const renderArticleContent = (content: string) => {
    const articleDom = new DOMParser().parseFromString(content, "text/xml")
    const root = articleDom.children[0]
    let result = ''
    for (let i = 0; i < root.children.length; i++) {
      const child = root.children[i]
      if ('image-package' === child.className) {
        let images = child.getElementsByTagName('img');
        if (images.length > 0) {
          let image = images[0];
          result += `<img class="rounded mx-auto" src="${image.getAttribute('data-original-src')}" alt="" />`
        }
      } else {
        result += child.outerHTML
      }
    }
    return result
  }

  useEffect(() => {
    article.content.length > 0 && setRenderedContent(renderArticleContent(article.content))
  }, [article])

  useEffect(() => {
    if (renderedContent.length > 0) {
      document.querySelectorAll("pre code").forEach((block: any) => {
        try {
          highlight.highlightBlock(block)
        } catch (e) {
          console.log(e)
        }
      });
    }
  }, [renderedContent])

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>{InlineApps[0].name}</title>
      </Head>

      <AppHeader path={[InlineApps[0],]} />

      <FullContainer>
        <div className="max-w-screen-lg mx-auto">
          <article className="max-w-full prose text-base p-4 md:p-8 " dangerouslySetInnerHTML={{ __html: renderedContent }} />
        </div>
      </FullContainer>
    </div>
  )
}

export default Blog