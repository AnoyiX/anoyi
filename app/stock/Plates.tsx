'use client'

import useSWR from 'swr'
import { TPlate } from './type'
import http from '../../utils/http'
import Skeleton from '@/components/server/Skeleton'

export default function Plates() {

    const { data = { Data: []} } = useSWR(['https://proxy.anoyi.com', {
        "url": "https://api.fund.eastmoney.com/ztjj/GetZTJJListNew?tt=12&dt=syl&st=D",
        "headers": {
            "Referer": "https://fund.eastmoney.com/"
        }
    }], http.postAll, { refreshInterval: 10000 })

    const getColor = (num: number) => {
        if (num > 0) return 'bg-red-500 hover:bg-red-400'
        if (num == 0) return 'bg-gray-500 hover:bg-gray-400'
        return 'bg-green-500 hover:bg-green-400'
    }

    const format = (num: number) => {
        if (num > 0) return `+${num.toFixed(2)}`
        return num.toFixed(2)
    }

    return (
        <div className="grid grid-cols-3 gap-1 w-full text-white">
            {
                data.Data.length === 0 ? [...Array.from(Array(9).keys())].map(i => <Skeleton key={i} className="w-full rounded-sm h-20" />) : data.Data.map((item: TPlate) => (
                    <div key={item.INDEXCODE} className={`rounded-sm cursor-pointer w-full flex flex-col gap-1 py-4 justify-center items-center ${getColor(item.D)}`}>
                        <span className='text-xs'>{item.INDEXNAME}</span>
                        <span className=''>{format(item.D)}%</span>
                    </div>
                ))
            }
        </div>
    )

}
