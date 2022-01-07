import { RadioGroup } from '@headlessui/react'
import { useState } from 'react'
import AppHeader from "../../components/AppHeader"
import { Search } from '../../components/Icons'
import { InlineApps } from '../../constants/app'
import useArticles from '../../hooks/useArticles'
import useNotebooks from '../../hooks/useNotebooks'
import Head from 'next/head'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const BlogPage = () => {

  const All = { id: 0, name: '全部' }
  const [notebook, setNotebook] = useState(All.id)
  const { notebooks } = useNotebooks()
  const { articles, setPage, setNotebookId } = useArticles()

  const repoOptionClassName = ({ checked }) => classNames('border rounded-md p-3 flex items-center justify-center text-sm font-medium sm:flex-1 cursor-pointer focus:outline-none',
    checked ? 'bg-blue-600 border-transparent text-white hover:bg-blue-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50')

  return (
    <div className='w-full p-10 flex flex-col space-y-6'>

      <Head>
        <meta name="referrer" content="no-referrer" />
      </Head>

      <AppHeader app={InlineApps[0]} />

      <div className='flex flex-row flex-1 space-x-6'>

        <div className='flex flex-col space-y-6'>

          <div className='bg-white w-72 rounded-lg shadow flex flex-col flex-1 space-y-4 p-4'>

            <div className="relative w-64">
              <input
                type="text"
                className="bg-gray-100 focus:ring-blue-500 focus:border-blue-500 w-full rounded-md sm:text-sm p-2 pl-10"
                placeholder="搜索"
              />
              <Search className='h-5 w-5 text-gray-400 absolute top-2 left-2' />
            </div>

            <RadioGroup value={notebook} onChange={setNotebook} className="mt-2">
              <div className='mb-3'>
                <RadioGroup.Option key={All.id} value={All.id} className={repoOptionClassName}>
                  <RadioGroup.Label as="p">{All.name}</RadioGroup.Label>
                </RadioGroup.Option>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {notebooks.map((notebook) => (
                  <RadioGroup.Option key={notebook.id} value={notebook.id} className={repoOptionClassName}>
                    <RadioGroup.Label as="p">{notebook.name}</RadioGroup.Label>
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

          </div>

        </div>

        <div className='bg-white flex flex-1 flex-col rounded-lg shadow p-8 divide-y'>
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {articles.map((post) => (
                <div key={post.title} className="flex flex-col rounded-lg border border-gray-200 overflow-hidden">
                  <div className="flex-shrink-0">
                    <img className="h-48 w-full object-cover" src={post.list_image_url} alt="" />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <a href={post.slug} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                        <p className="mt-3 text-base text-gray-500">{post.public_abbr}</p>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default BlogPage