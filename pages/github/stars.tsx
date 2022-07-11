import AppHeader from "../../components/AppHeader"
import FullContainer from "../../components/Containers"
import InfiniteScroll from "react-infinite-scroll-component"
import { Loading } from '../../components/Icons'
import Head from "next/head"
import useSWRInfinite from 'swr/infinite'
import http from "../../utils/http"
import { TRepo } from "../../types/github/repo"
import { readFileSync } from "fs"
import path from "path"

const limit = 24
const genAPI = (page: number) => `https://api.github.com/users/AnoyiX/starred?page=${page + 1}&per_page=${limit}`

const Page = ({ fallbackData, colors }) => {

  const getKey = (pageIndex: number, previousPageData: TRepo[]) => {
    if (previousPageData && !previousPageData.length) return null
    return genAPI(pageIndex)
  }
  const { data, size, setSize } = useSWRInfinite<TRepo[]>(getKey, http.getAll, { fallbackData, revalidateFirstPage: false })

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>Github 精选项目</title>
      </Head>

      <AppHeader path={[{ name: 'Github 精选项目' },]} />

      <FullContainer>
        <InfiniteScroll
          className="w-full grid grid-cols-1 p-4 md:p-8 gap-4 md:gap-8 md:grid-cols-2"
          dataLength={[].concat.apply([], data.map(resp => resp)).length}
          next={() => setSize(size + 1)}
          hasMore={!data.length || data.slice(-1)[0].length >= limit}
          loader={<div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>}
        >
          {
            data.map(resp => resp.map(item => (
              <div key={item.id} className="flex border w-full rounded-lg p-4 gap-4">
                <div className="flex-0 text-center">
                  <a href={item.owner.html_url} target="_blank">
                    <img src={item.owner.avatar_url} alt="" className="h-16 w-16 rounded-md shadow shadow-gray-300" />
                  </a>
                </div>
                <div className="flex-1">
                  <a className="text-xl cursor-pointer select-none font-semibold hover:text-blue-600" href={item.html_url}>{item.full_name}</a>
                  <p className="text-sm text-gray-500 my-2 font-sans">{item.description}</p>
                  <div className="text-gray-600 flex flex-row gap-3 text-xs cursor-default flex-wrap mt-4">
                    {
                      item.language && (
                        <div className="cursor-default">
                          <i className="fa-solid fa-circle mr-1" style={Object.keys(colors).includes(item.language) ? { color: colors[item.language].color } : {}}></i>
                          {item.language}
                        </div>
                      )
                    }
                    <div className="">
                      <i className="fa-regular fa-star mr-1"></i>
                      {item.stargazers_count.toLocaleString()}
                    </div>
                    <div className="">
                      <i className="fa-solid fa-code-fork mr-1"></i>
                      {item.forks.toLocaleString()}
                    </div>
                    <div className="">
                      <i className="fa-regular fa-circle-dot mr-1"></i>
                      {item.open_issues.toLocaleString()}
                    </div>
                    {
                      item.license && (
                        <div className="">
                          <i className="fa-solid fa-scale-balanced mr-1"></i>
                          {item.license.spdx_id}
                        </div>
                      )
                    }
                  </div>
                  {
                    item.topics.length > 0 && <div className="border-t my-4"></div>
                  }
                  <div className="text-gray-600 flex flex-row gap-2 text-xs cursor-default flex-wrap">
                    {
                      item.topics.map(topic => (
                        <a className="cursor-pointer py-1 px-2 bg-gray-100 text-gray-800 rounded-full hover:bg-blue-600 hover:text-white">
                          {topic}
                        </a>
                      ))
                    }
                  </div>
                </div>
              </div>
            )))
          }
        </InfiniteScroll>
      </FullContainer>
    </div>
  )
}

export async function getStaticProps() {
  const colors = readFileSync(path.join(process.cwd(), 'data/json/github-colors.json'), 'utf-8')
  const data = await http.getAll(genAPI(0))
  return {
    props: {
      fallbackData: [data],
      colors: JSON.parse(colors),
    },
    revalidate: 60,
  }
}

export default Page