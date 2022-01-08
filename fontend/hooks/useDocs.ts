import { useCallback, useEffect, useState } from "react"
import http from "../utils/http"

export interface IDoc {
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

export default function useDocs(_repoId: string, _skip = 0) {

    const limit = 18
    const [docs, setDocs] = useState<IDoc[]>([])
    const [repoId, setRepoId] = useState(_repoId)
    const [skip, setSkip] = useState(_skip)

    const getDocs = useCallback(async () => {
        let data = await http.get(`/api/blog/repo/${repoId}/docs?skip=${skip}&limit=${limit}`)
        setDocs(data)
    }, [])

    useEffect(() => {
        getDocs()
    }, [repoId, skip])

    return {
        docs,
        setRepoId,
        setSkip
    }

}