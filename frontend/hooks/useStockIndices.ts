import { useCallback, useEffect, useState } from "react"
import http from "../utils/http"

export interface IStockIndex {
    symbol: string
    name: string
    percentage: string
    current: string
    chg: string
}

export default function useStockIndices(category: string) {

    const [indices, setIndices] = useState<IStockIndex[]>([])

    const fetchStockIndices = useCallback(async () => {
        const data = await http.get(`/api/stock/index/${category}`)
        setIndices(data)
    }, [])

    useEffect(() => {
        fetchStockIndices()
    }, [])

    return {
        indices
    }

}