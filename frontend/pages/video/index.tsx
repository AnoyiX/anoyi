import { useState } from "react"
import AppHeader from "../../components/AppHeader"
import FullContainer from "../../components/Containers"
import { InlineApps } from "../../constants/app"
import useVideos from "../../hooks/useVideos"
import InfiniteScroll from "react-infinite-scroll-component";
import { Doing } from '../../components/Icons'
import VideoModal from "../../components/video/VideoModal"
import Head from "next/head"
import VideoCard from "../../components/video/VideoCard"

const Video = () => {
  const limit = 20
  const [skip, setSkip] = useState(0)
  const { videos, hasMore } = useVideos(skip, limit)
  const [showVideo, setShowVideo] = useState(false)
  const [vid, setVid] = useState('')

  const fetchMore = () => {
    setSkip(pre => pre + limit)
  }

  const playVideo = (vid: string) => {
    setVid(vid)
    setShowVideo(true)
  }

  return (
    <div className='w-full p-8 flex flex-col space-y-6'>

      <Head>
        <title>{InlineApps[1].name}</title>
      </Head>

      <AppHeader path={[InlineApps[1],]} />

      <FullContainer>
        <InfiniteScroll
          className="grid grid-cols-1 p-8 gap-8 lg:grid-cols-2"
          dataLength={videos.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<div className="my-8 mx-auto lg:col-span-2"><Doing className='h-20 w-20' /></div>}
        >
          {
            videos.map((item, index) => <VideoCard key={index} video={item} onPlay={playVideo} />)
          }
        </InfiniteScroll>
      </FullContainer>

      <VideoModal isOpen={showVideo} vid={vid} onClose={() => setShowVideo(false)} />
    </div>
  )

}

export default Video