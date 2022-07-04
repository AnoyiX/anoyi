import { useEffect, useState } from "react"
import http from "../utils/http"

export interface IPhoto {
    thumbnail: string
    file: string
    create_time: number
    name: string
    address: string
}

export default function usePhotos(skip: number, limit: number) {

    const [photos, setPhotos] = useState<IPhoto[]>([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        if (hasMore) {
            http.post(`/api/mongo/find`, {
                database: 'cloud',
                collection: 'photos',
                filter: {},
                projection: {_id: 0},
                skip,
                limit,
                sort: {
                    create_time: -1
                },
            }).then(data => {
                setPhotos(pre => [...pre, ...data.data])
                setHasMore(data.has_more)
            })
        }
    }, [skip])

    return {
        photos,
        hasMore
    }

}