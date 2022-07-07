import { useState } from "react"
import AppHeader from "../../components/AppHeader"
import FullContainer from "../../components/Containers"
import InfiniteScroll from "react-infinite-scroll-component"
import { Doing } from '../../components/Icons'
import VideoModal from "../../components/video/VideoModal"
import Head from "next/head"
import VideoCard from "../../components/video/VideoCard"
import useSWRInfinite from 'swr/infinite'
import http from "../../utils/http"
import { TVideo } from "../../types/video"
import { findFromMongo } from "../api/mongo/find"
import { PageData } from "../../types"

const limit = 20
const projection = {
  _id: 0,
  aweme_id: 1,
  desc: 1,
  author: {
    nickname: 1,
    avatar_thumb: 1,
    custom_verify: 1
  },
  video: {
    cover: 1,
    play_addr: {
      uri: 1
    }
  },
  create_time: 1,
  poi_info: {
    poi_name: 1,
    poi_latitude: 1,
    poi_longitude: 1
  }
}
const genBody = (page: number) => (
  {
    database: 'cloud',
    collection: 'videos',
    filter: {},
    skip: page * limit,
    limit,
    projection,
    sort: {
      create_time: -1
    },
  }
)

const Page = ({ fallbackData }) => {

  const limit = 20
  const getKey = (pageIndex: number, previousPageData: PageData<TVideo>) => {
    if (previousPageData && !previousPageData.data.length) return null
    return [`/api/mongo/find`, genBody(pageIndex)]
  }
  const { data = [], size, setSize } = useSWRInfinite<PageData<TVideo>>(getKey, http.post, { fallbackData, revalidateFirstPage: false })

  const [showVideo, setShowVideo] = useState(false)
  const [vid, setVid] = useState('')

  const playVideo = (vid: string) => {
    setVid(vid)
    setShowVideo(true)
  }

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6' >

      <Head>
        <title>短视频</title>
      </Head>

      <AppHeader path={[{ name: '短视频' },]} />

      <FullContainer>
        <InfiniteScroll
          className="w-full grid grid-cols-1 p-4 md:p-8 gap-4 md:gap-8 lg:grid-cols-2"
          dataLength={[].concat.apply([], data.map(item => item.data)).length}
          next={() => setSize(size + 1)}
          hasMore={!data.length || data.slice(-1)[0].data.length >= limit}
          loader={<div className="my-8 mx-auto col-span-full"><Doing className='h-20 w-20' /></div>}
        >
          {
            data.map(item => item.data.map(video => <VideoCard key={video.aweme_id} video={video} onPlay={playVideo} />))
          }
        </InfiniteScroll>
      </FullContainer>

      <VideoModal isOpen={showVideo} vid={vid} onClose={() => setShowVideo(false)} />
    </div >
  )

}

export async function getStaticProps() {
  const data = await findFromMongo(genBody(0))
  return {
    props: {
      fallbackData: [{ data, has_more: data.length >= limit }],
    },
    revalidate: 60,
  }
}

export default Page