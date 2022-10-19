import Head from 'next/head'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import AppHeader from "../components/AppHeader"
import FullContainer from "../components/Containers"
import ImageSkeleton from "../components/ImageSkeleton"
import CDN from '../utils/cdn'
import http from "../utils/http"

export interface DevIcon {
  name: string
  url: string
}

const Page = ({ data }) => {

  const [search, setSearch] = useState('')

  const icons: DevIcon[] = useMemo(() => {
    return data.filter(item => item.toLowerCase().includes(search.toLowerCase())).map(item => ({
      name: item,
      url: CDN.icon(item)
    }))
  }, [search])

  const copyName = (text: string) => {
    navigator.clipboard.writeText(text)
    toast(`已复制！`, { position: 'top-right', icon: <code className="px-2 py-1 text-xs bg-gray-100 text-red-500 rounded-md">{text}</code> })
  }

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

      <Head>
        <title>Dev Icons</title>
      </Head>

      <AppHeader path={[{ name: 'Dev Icons' }]} />

      <div className='flex flex-row items-center gap-4 justify-center'>
        <div className="relative flex-1">
          <i className='flex absolute text-gray-400 inset-y-0 left-0 items-center pl-3 pointer-events-none fa-solid fa-magnifying-glass'></i>
          <input
            type="text"
            className="shadow text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
            placeholder="搜索"
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className='bg-white shadow text-gray-900 text-sm rounded-lg py-2 px-3 cursor-pointer' onClick={() => window.open('https://github.com/AnoyiX/dev-icons')}>
          帮助文档
          <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
        </div>
      </div>

      <FullContainer>

        <div className='p-6 w-fit'>

          <div className="flex flex-row flex-wrap gap-2">
            {
              icons.map((item) => (
                <div
                  key={item.name}
                  className="py-4 w-[7.5rem] cursor-pointer text-center space-y-2 rounded-lg text-gray-500 hover:shadow hover:bg-slate-50"
                  onClick={() => copyName(item.name.toLowerCase())}
                >
                  <ImageSkeleton src={item.url} className='w-16 h-16 mx-auto rounded-xl bg-slate-50' />
                  <p className="text-sm">{item.name}</p>
                </div>
              ))
            }
          </div>
        </div>

      </FullContainer>
    </div>
  )

}

export async function getStaticProps() {

  const data = await http.getAll('https://dev-icons.deta.dev/api/icons')

  return {
    props: {
      data,
    },
    revalidate: 60,
  }

}

export default Page
