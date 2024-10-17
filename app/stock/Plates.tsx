"use client"

import useSWR from "swr"
import { TPlate } from "./type"
import http from "../../utils/http"
import Skeleton from "@/components/server/Skeleton"
import NumberFlow from '@number-flow/react'


export default function Plates() {

    const { data = { data: { rank_list: [] } } } = useSWR(
        'https://proxy.finance.qq.com/cgi/cgi-bin/rank/pt/getRank?board_type=hy&sort_type=priceRatio&direct=down&offset=0&count=40',
        http.getAll,
        {
            refreshInterval: 10000
        }
    )

    const getColor = (num: number) => {
        if (num > 0) return "bg-red-600 hover:bg-red-500 bg-opacity-75"
        if (num == 0) return "bg-gray-600 hover:bg-gray-500 bg-opacity-75"
        return "bg-green-600 hover:bg-green-500 bg-opacity-75"
    }

    return (
        <div className="grid grid-cols-3 gap-1 w-full text-white">
            {
                data.data.rank_list.length === 0 ? [...Array.from(Array(9).keys())].map(i => <Skeleton key={i} className="w-full rounded-sm h-20" />) : data.data.rank_list.map((item: TPlate) => (
                    <div key={item.code} className={`rounded-sm cursor-pointer w-full flex flex-col gap-1 py-4 justify-center items-center ${getColor(parseFloat(item.zdf))}`}>
                        <span className="text-xs">{item.name}</span>
                        <NumberFlow trend value={parseFloat(item.zdf) / 100} format={{ style: 'percent', maximumFractionDigits: 2, signDisplay: 'always' }} />
                    </div>
                ))
            }
        </div>
    )

}
