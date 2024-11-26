'use client'

import ImageSkeleton from "@/components/client/ImageSkeleton"
import InfiniteScrollLoader from "@/components/client/InfiniteScrollLoader"
import useSWRInfiniteScroll from "@/hooks/useSWRInfiniteScroll"
import { SWRInfiniteOptions } from "@/lib/constant"
import { useState } from "react"
import http from "../../utils/http"
import { PageData } from "../../utils/types"
import PhotosModal from "./PhotosModal"
import { TPhoto } from "./type"
import { RiMapPinLine } from "@remixicon/react"

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
    if (previousPageData && previousPageData.data.length < limit) return null
    return [`/api/mongo/find`, genBody(pageIndex)]
}

export function Photos() {
    const [photo, setPhoto] = useState<TPhoto | undefined>()
    const [showPhotos, setShowPhotos] = useState(false)
    const { data, showLoading, sentryRef } = useSWRInfiniteScroll<PageData<TPhoto>>(
        getKey,
        http.post,
        SWRInfiniteOptions,
        data => data.length > 0 && data[data.length - 1]?.data.length >= limit
    )

    const showPhoto = (photo: TPhoto) => {
        setPhoto(photo)
        setShowPhotos(true)
    }

    return (
        <>
            <div className="w-full grid grid-cols-2 p-4 gap-4 lg:p-8 lg:gap-8 lg:grid-cols-3">
                {
                    data.map(resp => resp.data.map((photo, index) => (
                        <div key={index} className="box w-full relative rounded-lg text-xs" onClick={() => showPhoto(photo)} >
                            <ImageSkeleton src={photo.thumbnail} className="w-full aspect-[5/3] object-cover cursor-pointer rounded-lg" />
                            <a
                                className="absolute left-3 bottom-3 flex flex-fow gap-1 items-center bg-black/50 text-white px-2.5 py-1.5 rounded-full"
                                target="_blank"
                                rel='noreferrer'
                                href={photo.address}
                                onClick={e => e.stopPropagation()}
                            >
                                <RiMapPinLine className="h-4 w-4" />
                                <span className="">{photo.name}</span>
                            </a>
                        </div>
                    )))
                }
            </div>
            <InfiniteScrollLoader sentryRef={sentryRef} showLoading={showLoading} />
            <PhotosModal isOpen={showPhotos} photo={photo} onClose={() => setShowPhotos(false)} />
        </>
    )
}