'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { TRealData } from './type'
import http from '../../utils/http'
import { Fragment } from 'react'

export default function Indices() {

    const code = [
        '000001.SS',
        '399001.SZ',
        '399006.SZ',
        '000688.SS',
        '399330.SZ',
        '000300.SS',
    ]

    const fields = [
        'prod_code',
        'prod_name',
        'price_precision',
        'update_time',
        'last_px',
        'px_change',
        'px_change_rate',
        'trade_status'
    ]

    const { isLoading, data: realResp } = useSWR<TRealData>(`https://api-ddc.wallstcn.com/market/real?prod_code=${code.join(',')}&fields=${fields.join(',')}`, http.getAll, { refreshInterval: 5000 })

    if (isLoading || !realResp) {
        return (
            <div className="grid grid-cols-6 gap-4 w-full">
                {
                    [...Array.from(Array(6).keys())].map(i => <div key={i} className="rounded-lg w-full shadow h-28 bg-white" />)
                }
            </div>
        )
    }

    const getTextColor = (num: number) => {
        if (num > 0) return 'text-red-600'
        if (num == 0) return 'text-gray-600'
        return 'text-green-600'
    }

    const format = (num: number) => {
        if (num > 0) return `+${num.toFixed(2)}`
        return num.toFixed(2)
    }

    return (
        <div className="grid grid-cols-6 gap-4 w-full text-white">
            {
                code.map((item) => {
                    if (Object.keys(realResp.data.snapshot).length > 0) {
                        const stock = realResp.data.snapshot[item]
                        const stockObj = Object.fromEntries(realResp.data.fields.map((_, i) => [realResp.data.fields[i], stock[i]]))
                        return (
                            <Link href={`/stock/${item}`} key={stockObj['prod_code']}>
                                <div className={`cursor-pointer rounded-lg w-full flex flex-col shadow gap-1 py-4 justify-center items-center bg-white ${getTextColor(stockObj['px_change'] as number)}`}>
                                    <span className='text-sm text-gray-900'>{stockObj['prod_name']}</span>
                                    <span className='text-3xl font-semibold'>{(stockObj['last_px'] as number).toFixed(2)}</span>
                                    <div className='flex flex-row gap-2 text-sm'>
                                        <span>{format(stockObj['px_change'] as number)}</span>
                                        <span>{format(stockObj['px_change_rate'] as number)}%</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                })
            }
        </div>
    )

}
