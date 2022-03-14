import { useEffect, useState } from "react"
import http from "../utils/http"

export interface IDoc {
    book_id: number
    comments_count: number
    content_updated_at: string
    cover: null | string
    created_at: string
    custom_description: string
    first_published_at: string
    format: string
    id: number
    last_editor: {
        avatar_url: string
        description: string
        followers_count: number
        following_count: number
        id: number
        login: string
        name: string
        _serializer: string
    }
    last_editor_id: number
    likes_count: number
    public: number
    published_at: string
    read_status: number
    slug: string
    title: string
    updated_at: string
    user_id: number
    view_status: number
    word_count: number
    _serializer: string
}

export default function useDocs(slug: string, skip: number, limit: number) {

    const [docs, setDocs] = useState<IDoc[]>([])

    useEffect(() => {
        slug && http.get(`/api/blog/repo/${slug}/docs?skip=${skip}&limit=${limit}`)
            .then(data => setDocs(data.data))
    }, [slug])

    useEffect(() => {
        if (skip > 0) {
            http.get(`/api/blog/repo/${slug}/docs?skip=${skip}&limit=${limit}`)
                .then(data => setDocs(old => [...old, ...data.data]))
        }
    }, [skip])

    return {
        docs,
    }

}