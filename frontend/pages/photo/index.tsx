import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import { Doing } from "../../components/Icons"

const Blog = () => {

  return (
    <div className='w-full p-8 flex flex-col space-y-6'>

      <Head>
        <title>{InlineApps[2].name}</title>
      </Head>

      <AppHeader path={[InlineApps[2],]} />

      <FullContainer>
        <div className="h-full flex flex-col items-center justify-center gap-4 pb-24">
          <Doing className="w-64 h-64"></Doing>
          <span className="text-gray-500">暂无作品，上传在即，敬请期待！</span>
        </div>
      </FullContainer>
    </div>
  )
}

export default Blog