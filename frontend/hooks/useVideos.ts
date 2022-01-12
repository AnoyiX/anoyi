import { useEffect, useState } from "react"
import http from "../utils/http"

export interface IVideo {
    aweme_id: string
    desc: string
    author: {
        nickname: string
        avatar_168x168: {
            url_list: string[]
        }
        custom_verify: string
    }
    poi_info: {
        poi_name: string
        poi_latitude: string
        poi_longitude: string
    }
    video: {
        cover: {
            url_list: string[]
        }
        play_addr: {
            uri: string
        }
    }
    create_time: number
}

const query = {}
const projection = {
    _id: 0,
    aweme_id: 1,
    desc: 1,
    'author.nickname': 1,
    'video.cover': 1,
    'video.play_addr.uri': 1,
    'author.avatar_168x168': 1,
    'author.custom_verify': 1,
    create_time: 1,
    'poi_info.poi_name': 1,
    'poi_info.poi_latitude': 1,
    'poi_info.poi_longitude': 1,
}
const sort = {
    create_time: -1
}

export default function useVideos(skip: number, limit: number) {

    const [videos, setVideos] = useState<IVideo[]>([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        if (hasMore) {
            http.post(`/api/mongo/docs`, {
                db: 'anoyi',
                collection: 'videos',
                query:  query,
                projection: projection,
                skip,
                limit,
                sort: sort
            }).then(data => {
                setVideos(old => [...old, ...data.data])
                setHasMore(data.has_more)
            })
        }
    }, [skip])

    return {
        videos,
        hasMore
    }

}