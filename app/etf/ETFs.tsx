'use client'

import IconSort from "@/components/client/IconSort"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Loading } from '../../components/Icons'
import http from "../../utils/http"


export function ETFs() {

    const float2Format = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    const float3Format = new Intl.NumberFormat(undefined, { maximumFractionDigits: 3, minimumFractionDigits: 3 })
    const intFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0, minimumFractionDigits: 0 })

    const [sort, setSort] = useState({ index: 8, desc: true })
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        http.getAll(`/api/etf`).then(resp => {
            setData(resp.list.filter((item: any) => !item[0].startsWith('511')).sort((a: any, b: any) => b[sort.index] - a[sort.index]))
            setLoading(false)
        })
    }, [])

    const onSort = (index: number) => {
        setSort(pre => {
            const desc = pre.index === index ? !pre.desc : true
            setData(pre => pre.sort((a, b) => (b[index] - a[index]) * (desc ? 1 : -1)))
            return { index, desc}
        })
    }

    const renderRate = (value: number) => {
        if (value > 0) return <span className="text-red-500">{`+${value.toFixed(2)}%`}</span>
        if (value < 0) return <span className="text-green-500">{`${value.toFixed(2)}%`}</span>
        return '0.00%'
    }

    const renderValue = (rate: number, value: string) => {
        if (rate > 0) return <span className="text-red-500">{value}</span>
        if (rate < 0) return <span className="text-green-500">{value}</span>
        return '0.000'
    }
    
    const renderTags = (code: string) => {
        if (code.startsWith('513')) {
            return <span className="text-xs px-1 py-0.5 rounded text-white bg-purple-500">T+0</span>
        }
        return <></>
    }

    return (
        <>
            <div className="flex-1-col box-card">
                <Table className="w-full text-sm text-left tabular-nums">
                    <TableHeader className="text-gray-100 uppercase ">
                        <TableRow>
                            <TableHead className="p-3 w-56 rounded-tl-lg">
                                代码 - 名称
                            </TableHead>
                            <TableHead className="p-3 w-24 text-right">
                                <div className="flex-row-center justify-end cursor-pointer" onClick={() => onSort(7)}>
                                    涨跌幅
                                    <IconSort value={sort.index !== 7 ? 0 : sort.desc ? 1 : -1} className="w-4 inline-block" />
                                </div>
                            </TableHead>
                            <TableHead className="p-3 w-20 text-right">
                                <div className="flex-row-center justify-end cursor-pointer" onClick={() => onSort(5)}>
                                    当前价
                                    <IconSort value={sort.index !== 5 ? 0 : sort.desc ? -1 : 1} className="w-4 inline-block" />
                                </div>
                            </TableHead>
                            <TableHead className="p-3 w-20 text-right">
                                <div className="flex-row-center justify-end cursor-pointer" onClick={() => onSort(2)}>
                                    开盘价
                                    <IconSort value={sort.index !== 2 ? 0 : sort.desc ? -1 : 1} className="w-4 inline-block" />
                                </div>
                            </TableHead>
                            <TableHead className="p-3 w-20 text-right">
                                <div className="flex-row-center justify-end cursor-pointer" onClick={() => onSort(3)}>
                                    最高价
                                    <IconSort value={sort.index !== 3 ? 0 : sort.desc ? -1 : 1} className="w-4 inline-block" />
                                </div>
                            </TableHead>
                            <TableHead className="p-3 w-20 text-right">
                                <div className="flex-row-center justify-end cursor-pointer" onClick={() => onSort(4)}>
                                    最低价
                                    <IconSort value={sort.index !== 4 ? 0 : sort.desc ? -1 : 1} className="w-4 inline-block" />
                                </div>
                            </TableHead>
                            <TableHead className="p-3 w-20 text-right">
                                <div className="flex-row-center justify-end cursor-pointer" onClick={() => onSort(6)}>
                                    前收
                                    <IconSort value={sort.index !== 6 ? 0 : sort.desc ? -1 : 1} className="w-4 inline-block" />
                                </div>
                            </TableHead>
                            <TableHead className="p-3 w-32 text-right">
                                <div className="flex-row-center justify-end cursor-pointer" onClick={() => onSort(8)}>
                                    成交量(手)
                                    <IconSort value={sort.index !== 8 ? 0 : sort.desc ? -1 : 1} className="w-4 inline-block" />
                                </div>
                            </TableHead>
                            <TableHead className="p-3 w-32 text-right rounded-tr-lg">
                                <div className="flex-row-center justify-end cursor-pointer" onClick={() => onSort(9)}>
                                    成交额(万元)
                                    <IconSort value={sort.index !== 9 ? 0 : sort.desc ? -1 : 1} className="w-4 inline-block" />
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.map(fund => (
                                <TableRow key={fund[0]} className="">
                                    <TableCell className="p-3">
                                        <a href={`https://fund.eastmoney.com/${fund[0]}.html`} className="hover:text-blue-600 w-fit mr-1" target="_blank">
                                            {fund[0]} - {fund[10]}
                                        </a>
                                        {
                                            renderTags(fund[0])
                                        }
                                    </TableCell>
                                    <TableCell className="p-3 text-right">
                                        {renderRate(fund[7])}
                                    </TableCell>
                                    <TableCell className="p-3 text-right">
                                        {renderValue(fund[7], float3Format.format(fund[5]))}
                                    </TableCell>
                                    <TableCell className="p-3 text-right">
                                        {float3Format.format(fund[2])}
                                    </TableCell>
                                    <TableCell className="p-3 text-right">
                                        {float3Format.format(fund[3])}
                                    </TableCell>
                                    <TableCell className="p-3 text-right">
                                        {float3Format.format(fund[4])}
                                    </TableCell>
                                    <TableCell className="p-3 text-right">
                                        {float3Format.format(fund[6])}
                                    </TableCell>
                                    <TableCell className="p-3 text-right">
                                        {intFormat.format(fund[8] / 100)}
                                    </TableCell>
                                    <TableCell className="p-3 text-right">
                                        {float2Format.format(fund[9] / 10000)}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                {loading && (
                    <div className="my-8 mx-auto col-span-full">
                        <Loading className='h-20 w-20' />
                    </div>
                )}
            </div>
        </>
    )
}