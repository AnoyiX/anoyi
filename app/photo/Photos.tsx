'use client'

import ImageSkeleton from "@/components/client/ImageSkeleton"
import { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import useSWRInfinite from 'swr/infinite'
import { Loading, Location } from '../../components/Icons'
import http from "../../utils/http"
import { PageData } from "../../utils/types"
import PhotosModal from "./PhotosModal"
import { TPhoto } from "./type"

export function Photos() {

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
        <>
            <PhotosModal isOpen={showPhotos} photo={photo} onClose={() => setShowPhotos(false)} />
            <InfiniteScroll
                className="w-full grid grid-cols-2 p-4 gap-4 lg:p-8 lg:gap-8 lg:grid-cols-3"
                dataLength={new Array<TPhoto>().concat.apply([], data.map(item => item.data)).length}
                next={() => setSize(size + 1)}
                hasMore={!data.length || data.slice(-1)[0].data.length >= limit}
                loader={<div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>}
            >
                {
                    data.map(resp => resp.data.map(photo => (
                        <div className="box w-full relative rounded-lg text-xs" onClick={() => showPhoto(photo)} >
                            <ImageSkeleton src={photo.thumbnail} className="w-full aspect-[5/3] object-cover cursor-pointer rounded-lg" />
                            <a
                                className="absolute left-3 top-3 flex flex-fow gap-1 items-center bg-black/50 text-white px-2.5 py-1.5 rounded-full"
                                target="_blank"
                                rel='noreferrer'
                                href={photo.address}
                                onClick={e => e.stopPropagation()}
                            >
                                <Location className="h-4 w-4" />
                                <span className="">{photo.name}</span>
                            </a>
                        </div>
                    )))
                }
            </InfiniteScroll>
        </>
    )
}