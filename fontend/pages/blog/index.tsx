import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import { Doing } from "../../components/Icons"

const Blog = () => {

  return (
    <div className='w-full p-8 flex flex-col space-y-6'>

      <Head>
        <meta name="referrer" content="no-referrer" />
      </Head>

      <AppHeader path={[InlineApps[0],]} />

      <FullContainer>
        <div className="h-full flex flex-col items-center justify-center gap-4 pb-24">
          <Doing className="w-64 h-64"></Doing>
          <span className="text-gray-500">为了更好的用户体验，作者正在奋力开发中，可前往「<a href="https://www.jianshu.com/u/7b7ec6f2db21" className="text-blue-500" target='_blank'>简书</a>」查看所有文章。</span>
        </div>
      </FullContainer>
    </div>
  )
}

export default Blog