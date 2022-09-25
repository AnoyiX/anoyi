import { Switch } from '@headlessui/react'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import AppHeader from "../components/AppHeader"
import FullContainer from "../components/Containers"
import ImageSkeleton from "../components/ImageSkeleton"
import http from "../utils/http"

export interface DevIcon {
  name: string
  light: string
  dark: string
}

export type DevIconMode = 'dark' | 'light'

const Page = ({ data }: { data: DevIcon[] }) => {

  const [search, setSearch] = useState('')
  const [enabled, setEnabled] = useState(false)


  const icons: DevIcon[] = useMemo(() => {
    return [...data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))]
  }, [search])

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

      <Head>
        <title>Dev Icons</title>
      </Head>

      <AppHeader path={[{ name: 'Dev Icons' }]} />

      <FullContainer>

        <div className='p-8'>

          <div className='flex flex-row items-center justify-between mb-4'>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`bg-gray-200 relative inline-flex p-2 items-center rounded-md text-sm`}
            >
              <span className={`z-10 w-10 text-center ${enabled ? 'text-gray-500' : 'text-white'}`}>深色</span>
              <span className={`z-10 w-10 text-center ml-2 ${enabled ? 'text-white' : 'text-gray-500'}`}>浅色</span>
              <span
                className={`${enabled ? 'translate-x-11' : '-translate-x-1'} absolute w-12 h-6 transform rounded-md bg-gray-600 transition`}
              ></span>
            </Switch>
            <div className="relative min-w-[30%] max-w-[36rem] ml-2 w-fit">
              <i className='flex absolute text-gray-500 inset-y-0 left-0 items-center pl-3 pointer-events-none fa-solid fa-magnifying-glass'></i>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                placeholder="Search"
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row flex-wrap gap-2 mx-auto">
            {
              icons.map((item) => (
                <div
                  key={item.name}
                  className="py-4 w-[7.5rem] cursor-pointer text-center space-y-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-900"
                  onClick={() => navigator.clipboard.writeText(item.name)}
                >
                  <ImageSkeleton src={`https://cdn.jsdelivr.net/gh/AnoyiX/dev-icons@main/icons/${item[enabled ? 'light' : 'dark']}`} className='w-16 h-16 mx-auto rounded-md' />
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

  const data = await http.getAll('https://icons.anoyi.com/api/icons')

  return {
    props: {
      data,
    },
  }

}

export default Page
