'use client'

import { Fragment, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import useSWRInfinite from 'swr/infinite'
import { Loading } from '../../components/Icons'
import { PageData } from "../../types"
import http from "../../utils/http"
import Photo from "./Photo"
import PhotoModal from "./PhotoModal"
import { TPhoto } from "./type"


export default function Photos() {

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
    const getKey = (pageIndex: number, previousPageData: PageData<TPhoto>) => {
        if (previousPageData && !previousPageData.data.length) return null
        return [`/api/mongo/find`, genBody(pageIndex)]
    }
    const { data = [], size, setSize } = useSWRInfinite<PageData<TPhoto>>(getKey, http.post)
    const [photo, setPhoto] = useState<TPhoto | undefined>()
    const [showPhotos, setShowPhotos] = useState(false)

    const showPhoto = (photo: TPhoto) => {
        setPhoto(photo)
        setShowPhotos(true)
    }

    return (
        <Fragment>
            <InfiniteScroll
                className="w-full grid grid-cols-1 p-4 md:p-8 gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4"
                dataLength={[].concat.apply([], data.map(item => item.data)).length}
                next={() => setSize(size + 1)}
                hasMore={!data.length || data.slice(-1)[0].data.length >= limit}
                loader={<div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>}
            >
                {
                    data.map(resp => resp.data.map(photo => <Photo key={photo._id} photo={photo} onPlay={() => showPhoto(photo)} />))
                }
            </InfiniteScroll>
            <PhotoModal isOpen={showPhotos} photo={photo} onClose={() => setShowPhotos(false)} />
        </Fragment>
    )
}