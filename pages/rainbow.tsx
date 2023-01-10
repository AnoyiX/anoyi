import AppHeader from "../components/AppHeader"
import Head from 'next/head'
import FullContainer from "../components/Containers"

const Page = () => {

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>Anoyi.ETH Rainbow</title>
      </Head>

      <AppHeader path={[{ name: 'Rainbow' }]} />

      <FullContainer>
        <div className="w-full h-full">
          <iframe src="https://rainbow.me/anoyi.eth" className='w-full h-full rounded-lg' />
        </div>
      </FullContainer>
    </div>
  )

}

export default Page