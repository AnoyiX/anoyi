import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import { Doing } from "../../components/Icons"
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react"
import useBlogs from "../../hooks/useBlogs"
import BlogCard from "../../components/blog/BlogCard"

const Page = () => {

  const count = 10
  const [page, setPage] = useState(1)
  const { blogs, hasMore } = useBlogs(page, count)

  const fetchMore = () => {
    setPage(pre => pre + 1)
  }

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>{InlineApps[0].name}</title>
      </Head>

      <AppHeader path={[InlineApps[0],]} />

      <FullContainer>
        <InfiniteScroll
          className="w-full flex flex-col px-4 divide-y"
          dataLength={blogs.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<div className="my-8 mx-auto col-span-full"><Doing className='h-20 w-20' /></div>}
        >
          {
            blogs.map((item, index) => <BlogCard key={index} blog={item} />)
          }
        </InfiniteScroll>
      </FullContainer>
    </div>
  )
}

export default Page