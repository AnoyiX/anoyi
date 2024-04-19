"use client"

import useSWR from "swr"
import { TPlate } from "./type"
import http from "../../utils/http"
import Skeleton from "@/components/server/Skeleton"

export default function Plates() {

    const { data = { data: [] } } = useSWR(["https://proxy.anoyi.com", {
        url: "https://fundcomapi.tiantianfunds.com/mm/FundTheme/fundThemeClassificationList",
        method: "POST",
        data: {
            "FIELDS": "FCODE,SHORTNAME,OL2TOP,CORR_1Y,RELATETYPE",
            "FUNDINFO": "true",
            "LOADALL": "true",
            "TYPECODE": "001002",
            "sort": "desc",
            "sortColumn": "CHGRT",
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }], http.postAll, { refreshInterval: 10000 })

    const getColor = (num: number) => {
        if (num > 0) return "bg-red-600 hover:bg-red-500 bg-opacity-75"
        if (num == 0) return "bg-gray-600 hover:bg-gray-500 bg-opacity-75"
        return "bg-green-600 hover:bg-green-500 bg-opacity-75"
    }

    const format = (num: number) => {
        if (num > 0) return `+${num.toFixed(2)}`
        return num.toFixed(2)
    }

    return (
        <div className="grid grid-cols-3 gap-1 w-full text-white">
            {
                data.data.length === 0 ? [...Array.from(Array(9).keys())].map(i => <Skeleton key={i} className="w-full rounded-sm h-20" />) : data.data.map((item: TPlate) => (
                    <div key={item.INDEXCODE} className={`rounded-sm cursor-pointer w-full flex flex-col gap-1 py-4 justify-center items-center ${getColor(item.CHGRT)}`}>
                        <span className="text-xs">{item.INDEXNAME}</span>
                        <span className="">{format(item.CHGRT)}%</span>
                    </div>
                ))
            }
        </div>
    )

}
