import moment from "moment"
import 'moment/locale/zh-cn'
import { useState } from "react"
import AppHeader from "../../components/AppHeader"
import FullContainer from "../../components/Containers"
import { InlineApps } from "../../constants/app"
import InfiniteScroll from "react-infinite-scroll-component";
import { Doing, Location } from '../../components/Icons'
import Head from "next/head"
import usePhotos from "../../hooks/usePhotos"


const Blog = () => {

  const limit = 24
  const [skip, setSkip] = useState(0)
  const { photos, hasMore } = usePhotos(skip, limit)

  const fetchMore = () => {
    setSkip(pre => pre + limit)
  }

  return (
    <div className='w-full p-8 flex flex-col space-y-6'>

      <Head>
        <title>{InlineApps[2].name}</title>
      </Head>

      <AppHeader path={[InlineApps[2],]} />

      <FullContainer>
        <InfiniteScroll
          className="grid grid-cols-1 p-8 gap-8 lg:grid-cols-3"
          dataLength={photos.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<div className="my-8 mx-auto lg:col-span-2"><Doing className='h-20 w-20' /></div>}
        >
          {
            photos.map((item, index) => (
              <div className="rounded-lg w-full shadow-lg" key={index}>
                <img src={item.thumbnail} alt="" className="rounded-t-lg w-full" />
                <div className="p-4 flex flex-row text-sm text-gray-700 justify-between">
                  <a className="flex flex-fow gap-1 items-center" href={item.address} target="_blank">
                    <Location className="h-4 w-4" />
                    <span className="" >{item.name}</span>
                  </a>
                  <span className="text-gray-400">{moment(item.create_time).fromNow()}</span>
                </div>
              </div>
            ))
          }
        </InfiniteScroll>
      </FullContainer>
    </div>
  )
}

export default Blog