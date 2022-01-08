import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import useRepos from '../../hooks/useRepos'
import Head from 'next/head'
import Link from 'next/link'

const BlogPage = () => {

  const { repos } = useRepos()

  return (
    <div className='w-full p-10 flex flex-col space-y-6'>

      <Head>
        <meta name="referrer" content="no-referrer" />
      </Head>

      <AppHeader app={InlineApps[0]} />

      <div className='bg-white flex flex-1 rounded-lg shadow p-8'>
        <div className='flex-none w-full h-full'>
          <div className=" flex flex-wrap gap-y-8 gap-x-2">
            {
              repos.map(repo => (
                <div className='flex flex-col w-32 items-center'>
                  <Link href={'' + repo.id} >
                    <div className='w-20 h-20'>
                      <img src={'https://cdn.anoyi.com/icon/folder.svg'} alt="" className="w-full h-full" />
                    </div>
                  </Link>
                  <span className="text-sm text-gray-700 my-1">{repo.name}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage