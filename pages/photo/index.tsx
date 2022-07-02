import { useEffect, useState } from "react"
import AppHeader from "../../components/AppHeader"
import FullContainer from "../../components/Containers"
import { InlineApps } from "../../constants/app"
import InfiniteScroll from "react-infinite-scroll-component";
import { Doing } from '../../components/Icons'
import Head from "next/head"
import usePhotos from "../../hooks/usePhotos"
import PhotoCard from "../../components/photo/PhotoCard"
import PhotoModal from "../../components/photo/PhotoModal";

const Page = () => {

  const limit = 24
  const [skip, setSkip] = useState(0)
  const [ photoIndex, setPhotoIndex] = useState(0)
  const { photos, hasMore } = usePhotos(skip, limit)
  const [showPhotos, setShowPhotos] = useState(false)

  const fetchMore = () => {
    setSkip(pre => pre + limit)
  }

  const showPhoto = (index: number) => {
    setPhotoIndex(index)
    setShowPhotos(true)
  }

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>{InlineApps[2].name}</title>
      </Head>

      <AppHeader path={[InlineApps[2],]} />

      <FullContainer>
        <InfiniteScroll
          className="w-full grid grid-cols-1 p-4 md:p-8 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4"
          dataLength={photos.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<div className="my-8 mx-auto col-span-full"><Doing className='h-20 w-20' /></div>}
        >
          {
            photos.map((item, index) => <PhotoCard key={index} photo={item} onPlay={() => showPhoto(index)} />)
          }
        </InfiniteScroll>
      </FullContainer>
      <PhotoModal isOpen={showPhotos} photos={photos} photoIndex={photoIndex} onClose={() => setShowPhotos(false)} />
    </div>
  )
}

export default Page