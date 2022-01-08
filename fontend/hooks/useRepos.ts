import { useCallback, useEffect, useState } from "react"
import http from "../utils/http"

export interface IRepo {
    id: number
    name: string
}

export default function useRepos() {

    const [repos, setRepos] = useState<IRepo[]>([])

    const getRepos = useCallback(async () => {
        const data = await http.get(`/api/blog/repos`)
        setRepos(data.data)
    }, [])

    useEffect(() => {
        getRepos()
    }, [])

    return {
        repos,
    }

}