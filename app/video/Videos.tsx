'use client'

import { Fragment, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Loading } from '../../components/Icons'
import useSWRInfinite from 'swr/infinite'
import http from "../../utils/http"
import { PageData } from "../../utils/types"
import Video from "./Video"
import VideoModal from "./VideoModal"
import { TVideo } from "./type"

export default function Videos() {

    const limit = 20
    const projection = {
        _id: 0,
        aweme_id: 1,
        desc: 1,
        author: {
            nickname: 1,
            avatar_thumb: 1,
            custom_verify: 1,
            sec_uid: 1,
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
    const getKey = (pageIndex: number, previousPageData: PageData<TVideo>) => {
        if (previousPageData && !previousPageData.data.length) return null
        return [`/api/mongo/find`, genBody(pageIndex)]
    }
    const { data = [], size, setSize } = useSWRInfinite<PageData<TVideo>>(getKey, http.post)

    const [showVideo, setShowVideo] = useState(false)
    const [vid, setVid] = useState('')

    const playVideo = (vid: string) => {
        setVid(vid)
        setShowVideo(true)
    }

    return (
        <Fragment >
            <InfiniteScroll
                className="w-full grid grid-cols-1 p-4 md:p-8 gap-4 md:gap-8 lg:grid-cols-2"
                dataLength={new Array<TVideo>().concat.apply([], data.map(item => item.data)).length}
                next={() => setSize(size + 1)}
                hasMore={!data.length || data.slice(-1)[0].data.length >= limit}
                loader={<div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>}
            >
                {
                    data.map(item => item.data.map(video => <Video key={video.aweme_id} video={video} onPlay={playVideo} />))
                }
            </InfiniteScroll>
            <VideoModal isOpen={showVideo} vid={vid} onClose={() => setShowVideo(false)} />
        </Fragment >
    )

}
