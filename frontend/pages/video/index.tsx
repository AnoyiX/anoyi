import moment from "moment"
import 'moment/locale/zh-cn'
import { useState } from "react"
import AppHeader from "../../components/AppHeader"
import FullContainer from "../../components/Containers"
import { InlineApps } from "../../constants/app"
import useVideos from "../../hooks/useVideos"
import InfiniteScroll from "react-infinite-scroll-component";
import { Doing, Location } from '../../components/Icons'

const Video = () => {
  const limit = 20
  const [skip, setSkip] = useState(0)
  const { videos, hasMore } = useVideos(skip, limit)

  const fetchMore = () => {
    console.log('load more')
    setSkip(pre => pre + limit)
  }

  return (
    <div className='w-full p-8 flex flex-col space-y-6'>

      <AppHeader path={[InlineApps[1],]} />

      <FullContainer>

        <InfiniteScroll
          className="grid grid-cols-1 p-8 gap-8 lg:grid-cols-2"
          dataLength={videos.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<div className="my-8 mx-auto lg:col-span-2"><Doing className='h-20 w-20'/></div>}
        >
          {
            videos.map((item, index) => (
              <div key={index} className="border rounded-lg h-64 w-full flex flex-row">
                <img src={item.video.cover.url_list[0]} alt="" className="rounded-l-lg" />
                <div className="flex flex-col p-4 justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                      <img src={item.author.avatar_168x168.url_list[0]} alt="" className="w-12 h-12 rounded-full" />
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-lg font-bold text-gray-900">{item.author.nickname}</span>
                        <span className="text-xs text-gray-400">{item.author.custom_verify || '抖音创作者'}</span>
                      </div>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {item.desc}
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 text-xs items-center">
                    {
                      item.poi_info && (
                        <a href={`https://gaode.com/search?query=${item.poi_info.poi_name}&geoobj=${item.poi_info.poi_longitude}%7C${item.poi_info.poi_latitude}`}
                          className="bg-blue-500 rounded bg-opacity-10 border border-blue-500 px-2 py-1 text-blue-500 flex flex-row gap-1 items-center"
                          target="_blank"
                        >
                          <Location className="h-4 w-4" />
                          <span>{item.poi_info.poi_name}</span>
                        </a>
                      )
                    }
                    <span className="text-gray-500">{moment(item.create_time * 1000).fromNow()}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </InfiniteScroll>

      </FullContainer>
    </div>
  )

}

export default Video