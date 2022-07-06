import AppHeader from "../../components/AppHeader"
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import { Doing } from "../../components/Icons"
import InfiniteScroll from "react-infinite-scroll-component"
import BlogCard from "../../components/blog/BlogCard"
import Notebooks from "../../components/blog/Notebooks"
import { TBlog } from "../../types/blog"
import useSWRInfinite from 'swr/infinite'
import http from "../../utils/http"

const Page = () => {

  const count = 10
  const getKey = (pageIndex: number, previousPageData: { data: TBlog[] }) => {
    if (previousPageData && !previousPageData.data.length) return null
    return `/api/posts?page=${pageIndex + 1}&count=${count}`
  }
  const { data = [], size, setSize } = useSWRInfinite<{ data: TBlog[] }>(getKey, http.get, { revalidateFirstPage: false })

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>博客</title>
      </Head>

      <AppHeader path={[{ name: '博客' }]} />

      <div className="w-full flex flex-1 gap-4 md:gap-6">
        <FullContainer>
          <InfiniteScroll
            className="w-full flex flex-col px-4 divide-y"
            dataLength={[].concat.apply([], data.map(item => item.data)).length}
            next={() => setSize(size + 1)}
            hasMore={!data.length || data.slice(-1)[0].data.length >= count}
            loader={<div className="my-8 mx-auto col-span-full"><Doing className='h-20 w-20' /></div>}
          >
            {
              data.map(resp => resp.data.map(blog => <BlogCard key={blog.id} blog={blog} />))
            }
          </InfiniteScroll>
        </FullContainer>

        <div className="w-72">
          <div className="w-full bg-white h-fit flex-none rounded-lg shadow">
            <div className="text-gray-900 font-normal border-b p-4">文章分类</div>
            <Notebooks />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Page