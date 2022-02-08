import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"

const CNCF = () => {

  return (
    <div className='w-full p-8 flex flex-col space-y-6'>

      <Head>
        <title>{InlineApps[4].name}</title>
      </Head>

      <AppHeader path={[InlineApps[4],]} />

      <FullContainer>
        <div className="w-full h-full">
          <iframe src="https://landscape.cncf.io/?fullscreen=yes" className='w-full h-full rounded-lg' />
        </div>
      </FullContainer>
    </div>
  )
}

export default CNCF