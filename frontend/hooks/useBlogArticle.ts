import { useEffect, useState } from "react"
import http from "../utils/http"

export interface IBlogArticle {
    id: string
    content: string
    title: string
    time: string
    author_name: string
}

export default function useBlogArticle(slug: string) {

    const [article, setArticle] = useState<IBlogArticle>({
        id: slug,
        content: '',
        title: '',
        time: '',
        author_name: ''
    })

    const fetchArticle = () => http.get(`/api/blog/article/${slug}`).then(setArticle)

    useEffect(() => {
        slug != undefined && fetchArticle()
    }, [])

    return {
        article,
        fetchArticle
    }

}