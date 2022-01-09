import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import { Doing } from "../../components/Icons"

const Blog = () => {

  return (
    <div className='w-full p-10 flex flex-col space-y-6'>

      <Head>
        <meta name="referrer" content="no-referrer" />
      </Head>

      <AppHeader path={[InlineApps[2],]} />

      <FullContainer>
        <div className="h-full flex flex-col items-center justify-center gap-4 pb-24">
          <Doing className="w-64 h-64"></Doing>
          <span className="text-gray-500">专注 ETF，正在开发，敬请期待！</span>
        </div>
      </FullContainer>
    </div>
  )
}

export default Blog