import { Listbox, Transition } from '@headlessui/react'
import Head from 'next/head'
import { Fragment, useMemo, useState } from 'react'
import AppHeader from "../components/AppHeader"
import FullContainer from "../components/Containers"
import ImageSkeleton from "../components/ImageSkeleton"
import http from "../utils/http"

export interface DevIcon {
  name: string
  url: string
}

const Page = ({ data }) => {

  const [search, setSearch] = useState('')
  const [mode, setMode] = useState('深色模式')

  const icons: DevIcon[] = useMemo(() => {
    return [...data.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map(item => ({
      name: item.name,
      url: 'https://cdn.jsdelivr.net/gh/AnoyiX/dev-icons@main/icons/' + item.name + (item.themed ? mode === '深色模式' ? `.Dark` : `.Light` : '') + '.svg'
    }))]
  }, [search, mode])

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

      <Head>
        <title>Dev Icons</title>
      </Head>

      <AppHeader path={[{ name: 'Dev Icons' }]} />

      <div className='flex flex-row items-center justify-center'>

        <Listbox value={mode} onChange={setMode}>
          <div className="relative w-32">
            <Listbox.Button className="relative w-full cursor-default  rounded-lg bg-white shadow py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{mode}</span>
              <i className="fa-solid fa-sort pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400"></i>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {['深色模式', '浅色模式'].map((mode) => (
                  <Listbox.Option
                    key={mode}
                    className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`}
                    value={mode}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`} >
                          {mode}
                        </span>
                        {
                          selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <i className="fa-solid fa-check"></i>
                            </span>
                          )
                        }
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        <div className="relative ml-4 w-full">
          <i className='flex absolute text-gray-400 inset-y-0 left-0 items-center pl-3 pointer-events-none fa-solid fa-magnifying-glass'></i>
          <input
            type="text"
            className="bg-white shadow text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
            placeholder="搜索"
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <FullContainer>

        <div className='p-8'>

          <div className="flex flex-row flex-wrap gap-2 mx-auto">
            {
              icons.map((item) => (
                <div
                  key={item.name}
                  className="py-4 w-[7.5rem] cursor-pointer text-center space-y-2 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-900"
                  onClick={() => navigator.clipboard.writeText(item.name)}
                >
                  <ImageSkeleton src={item.url} className='w-16 h-16 mx-auto rounded-md' />
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
    revalidate: 60,
  }

}

export default Page
