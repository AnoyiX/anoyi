import { useEffect, useState } from "react"
import http from "../utils/http"

export interface IBlog {
    commentable: boolean
    first_shared_at: string
    id: number
    is_top: boolean
    likes_count: number
    list_image_url: string
    paid: boolean
    public_abbr: string
    public_comments_count: number
    slug: string
    title: string
    total_fp_amount: number
    total_rewards_count: number
    user: {
        avatar: string
        id: number
        nickname: string
        slug: string
    }
    views_count: number
}

export default function useBlogs(page: number, count: number) {

    const [blogs, setBlogs] = useState<IBlog[]>([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        if (page > 0) {
            http.get(`/api/blog/notes?page=${page}&count=${count}`)
                .then(data => {
                    setBlogs(old => [...old, ...data.data])
                    setHasMore(data.has_more)
                })
        }
    }, [page])

    return {
        blogs,
        hasMore
    }

}