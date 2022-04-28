import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import useBlogArticle from "../../hooks/useBlogArticle"
import { useRouter } from 'next/router'

const Blog = () => {

  const router = useRouter()
  const { slug } = router.query
  const { article } = useBlogArticle(slug as string)

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>{InlineApps[0].name}</title>
      </Head>

      <AppHeader path={[InlineApps[0],]} />

      <FullContainer>
        <div className="max-w-screen-md mx-auto">
          <article className="max-w-full prose text-base p-4 md:p-8 " dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </FullContainer>
    </div>
  )
}

export default Blog