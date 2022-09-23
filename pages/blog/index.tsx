import AppHeader from "../../components/AppHeader"
import Head from 'next/head'
import FullContainer from "../../components/Containers"

const Page = () => {

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>Anoyi's Blog</title>
      </Head>

      <AppHeader path={[{ name: 'Blog' }]} />

      <FullContainer>
        <div className="w-full h-full">
          <iframe src="https://anoyi.notion.site/Anoyi-s-Blog-bd186759ade54832bfdbef73e0c8b1a0" className='w-full h-full rounded-lg' />
        </div>
      </FullContainer>
    </div>
  )

}

export default Page