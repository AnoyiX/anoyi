import { useCallback, useEffect, useState } from "react"
import http from "../utils/http"

export interface IRealData {
    fields: string[]
    snapshot: {
        [key: string]: (number | string)[]
    }
}

export default function useMarketRealData(code: string[], fields: string[]) {

    const [realData, setRealData] = useState<IRealData>({fields: [], snapshot: {}})

    const fetchRealData = useCallback(async () => {
        const data = await http.post(`/api/stock/market/real`, {code, fields})
        setRealData(data)
    }, [])

    useEffect(() => {
        fetchRealData()
    }, [])

    return {
        realData
    }

}