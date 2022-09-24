import Head from 'next/head'
import AppHeader from "../components/AppHeader"
import FullContainer from "../components/Containers"
import ImageSkeleton from "../components/ImageSkeleton"
import http from "../utils/http"

export interface DevIcon {
  name: string
  light: string
  dark: string
}

const Page = ({ data }) => {

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

      <Head>
        <title>Dev Icons</title>
      </Head>

      <AppHeader path={[{ name: 'Dev Icons' }]} />

      <FullContainer>

        <div className="flex flex-row flex-wrap p-8 gap-2 mx-auto">
          {
            data.map((item: DevIcon) => (
              <div
                key={item.name}
                className="py-4 w-[7.5rem] cursor-pointer text-center space-y-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-900"
                onClick={() => navigator.clipboard.writeText(item.name)}
              >
                <ImageSkeleton src={`https://cdn.jsdelivr.net/gh/AnoyiX/dev-icons@main/icons/${item.dark}`} className='w-16 h-16 mx-auto rounded-md' />
                <p className="text-sm">{item.name}</p>
              </div>
            ))
          }
        </div>
      </FullContainer>
    </div>
  )

}

export async function getStaticProps() {

  const data = await http.getAll('https://icons.anoyi.com/api/icons')

  return {
    props: {
      data,
    },
  }

}

export default Page
