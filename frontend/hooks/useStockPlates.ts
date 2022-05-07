import { useCallback, useEffect, useState } from "react"
import http from "../utils/http"

export interface IPlate {
    core_avg_pcp: number
    core_avg_pcp_rank: number
    core_avg_pcp_rank_change: number
    fall_count: number
    fund_flow: number
    is_new: boolean | null
    limit_up_count: number
    plate_id: null
    plate_name: string
    rise_count: number
    stay_count: number
    top_n_stocks: {
        items: {
            change_percent: number
            price_change: number
            stock_chi_name: string
            symbol: string
        }[]
    }
}

export interface IPlates {
    [key: string]: IPlate
}


export default function useStockPlates(limit: number, is_acs: boolean, data_fields: string[]) {

    const rank_field = "core_avg_pcp"
    const rank_type = "0"
    const [plates, setPlates] = useState<IPlates>({})

    const fetchIndices = useCallback(async () => {
        const data = await http.post(`/api/stock/plates`, { limit, is_acs, rank_field, rank_type, data_fields })
        setPlates(data)
    }, [])

    useEffect(() => {
        fetchIndices()
    }, [])

    return {
        plates
    }

}