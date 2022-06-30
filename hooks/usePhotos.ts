import { useEffect, useState } from "react"
import http from "../utils/http"

export interface IPhoto {
    thumbnail: string
    file: string
    create_time: number
    name: string
    address: string
}

const query = {}
const projection = {_id: 0}
const sort = {
    create_time: -1
}

export default function usePhotos(skip: number, limit: number) {

    const [photos, setPhotos] = useState<IPhoto[]>([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        if (hasMore) {
            http.post(`/api/mongo/docs`, {
                db: 'cloud',
                collection: 'photos',
                query:  query,
                projection: projection,
                skip,
                limit,
                sort: sort
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