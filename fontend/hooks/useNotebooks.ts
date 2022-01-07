import { useCallback, useEffect, useState } from "react"
import http from "../utils/http"

export interface INotebook {
    id: number
    name: string
}

export default function useNotebooks() {

    const userId = '7b7ec6f2db21'
    const [notebooks, setNotebooks] = useState<INotebook[]>([])

    const getNotebooks = useCallback(async () => {
        let hasMore = true
        let page = 1
        let tmp = []
        while (hasMore) {
            const data = await http.get(`/api/blog/notebooks?user_id=${userId}&page=${page}`)
            tmp = [...tmp, ...(data.notebooks)]
            hasMore = data.total_pages > data.page
            page++
        }
        setNotebooks(tmp)
    }, [])

    useEffect(() => {
        getNotebooks()
    }, [getNotebooks])

    return {
        notebooks,
    }

}