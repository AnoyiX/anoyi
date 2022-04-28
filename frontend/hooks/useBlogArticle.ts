import { useEffect, useState } from "react"
import http from "../utils/http"

export interface IBlogArticle {
    id: string
    content: string
    title: string
    time: string
}

export default function useBlogArticle(slug: string) {

    const [article, setArticle] = useState<IBlogArticle>({
        id: slug,
        content: '',
        title: '',
        time: ''
    })

    useEffect(() => {
        http.get(`/api/blog/article/${slug}`)
            .then(setArticle)
    }, [])

    return {
        article
    }

}