import { useCallback, useEffect, useState } from "react"
import http from "../utils/http"

export interface IRepo {
    id: number
    name: string
    slug: string
}

export default function useRepos() {

    const [repos, setRepos] = useState<IRepo[]>([])

    const fetchRepos = useCallback(async () => {
        const data = await http.get(`/api/blog/repos`)
        setRepos(data.data)
    }, [])

    useEffect(() => {
        fetchRepos()
    }, [])

    return {
        repos,
    }

}