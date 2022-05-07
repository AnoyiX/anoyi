import { useCallback, useEffect, useState } from "react"
import http from "../utils/http"

export interface IIndices {
    fields: string[]
    snapshot: {
        [key: string]: (number | string)[]
    }
}

export default function useStockIndices(code: string[], fields: string[]) {

    const [indices, setIndices] = useState<IIndices>({fields: [], snapshot: {}})

    const fetchIndices = useCallback(async () => {
        const data = await http.post(`/api/stock/indices`, {code, fields})
        setIndices(data)
    }, [])

    useEffect(() => {
        fetchIndices()
    }, [])

    return {
        indices
    }

}