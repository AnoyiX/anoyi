import { useCallback, useEffect, useState } from "react"
import http from "../utils/http"

export interface IArticle {
    id: number
    likes_count: number
    list_image_url: string
    public_abbr: string
    public_comments_count: number
    slug: string
    title: string
    total_fp_amount: number
    total_rewards_count: number
    views_count: number
}

export default function useArticles(_notebookId = '', _page = 1) {

    const userId = '7b7ec6f2db21'
    const [articles, setArticles] = useState<IArticle[]>([])
    const [notebookId, setNotebookId] = useState(_notebookId)
    const [page, setPage] = useState(_page)

    const getArticles = useCallback(async () => {
        let data = []
        if (!!notebookId) {
            data = await http.get(`/api/blog/notebook/articles?id_=${notebookId}&page=${page}`)
        } else {
            data = await http.get(`/api/blog/articles?id_=${userId}&page=${page}`)
        }
        setArticles(data.map(item => item.object.data))
    }, [])

    useEffect(() => {
        getArticles()
    }, [notebookId, page])

    return {
        articles,
        setNotebookId,
        setPage
    }

}