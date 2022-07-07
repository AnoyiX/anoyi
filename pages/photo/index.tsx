import { useState } from "react"
import AppHeader from "../../components/AppHeader"
import FullContainer from "../../components/Containers"
import InfiniteScroll from "react-infinite-scroll-component"
import { Doing } from '../../components/Icons'
import Head from "next/head"
import PhotoCard from "../../components/photo/PhotoCard"
import PhotoModal from "../../components/photo/PhotoModal"
import useSWRInfinite from 'swr/infinite'
import { TPhoto } from "../../types/photo"
import http from "../../utils/http"
import { findFromMongo } from "../api/mongo/find"
import { PageData } from "../../types"

const limit = 24
const genBody = (page: number) => ({
  database: 'cloud',
  collection: 'photos',
  filter: {},
  skip: page * limit,
  limit,
  sort: {
    create_time: -1
  },
})

const Page = ({ fallbackData }) => {

  const getKey = (pageIndex: number, previousPageData: PageData<TPhoto>) => {
    if (previousPageData && !previousPageData.data.length) return null
    return [`/api/mongo/find`, genBody(pageIndex)]
  }
  const { data, size, setSize } = useSWRInfinite<PageData<TPhoto>>(getKey, http.post, { fallbackData, revalidateFirstPage: false })

  const [photo, setPhoto] = useState<TPhoto | undefined>()
  const [showPhotos, setShowPhotos] = useState(false)

  const showPhoto = (photo: TPhoto) => {
    setPhoto(photo)
    setShowPhotos(true)
  }

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>相册</title>
      </Head>

      <AppHeader path={[{ name: '相册' },]} />

      <FullContainer>
        <InfiniteScroll
          className="w-full grid grid-cols-1 p-4 md:p-8 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4"
          dataLength={[].concat.apply([], data.map(item => item.data)).length}
          next={() => setSize(size + 1)}
          hasMore={!data.length || data.slice(-1)[0].data.length >= limit}
          loader={<div className="my-8 mx-auto col-span-full"><Doing className='h-20 w-20' /></div>}
        >
          {
            data.map(resp => resp.data.map(photo => <PhotoCard key={photo._id} photo={photo} onPlay={() => showPhoto(photo)} />))
          }
        </InfiniteScroll>
      </FullContainer>
      <PhotoModal isOpen={showPhotos} photo={photo} onClose={() => setShowPhotos(false)} />
    </div>
  )
}

export async function getStaticProps() {
  const data = await findFromMongo(genBody(0))
  return {
    props: {
      fallbackData: [{data, has_more: data.length >= limit}],
    },
    revalidate: 60,
  }
}

export default Page