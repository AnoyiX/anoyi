'use client'

import InfiniteScrollLoader from "@/components/client/InfiniteScrollLoader"
import moment from "moment"
import 'moment/locale/zh-cn'
import { Link } from 'next-view-transitions'
import { useCallback, useEffect, useState } from "react"
import useInfiniteScroll from "react-infinite-scroll-hook"
import useSWR from "swr"
import http from "../../utils/http"
import { TLive, TLivesMap, TRealData, TStockInfo } from "./type"

function StocksTag({ stocks }: { stocks: TStockInfo[] }) {

    const fields = ["prod_code", "prod_name", "px_change", "px_change_rate", "price_precision", "delisting_date"]
    const { data: realResp = { data: { fields: [], snapshot: {} } } } = useSWR<TRealData>(`https://api-ddc.wallstcn.com/market/real?prod_code=${stocks.map(item => item.symbol).join(',')}&fields=${fields.join(',')}`, http.getAll, { refreshInterval: 5000 })

    const render = (stock: Array<string | number>) => {
        const stockObj = Object.fromEntries(fields.map((_, i) => [fields[i], stock[i]]))
        let state = {
            icon: '',
            rate: '0.00',
            style: 'text-gray-600 border-gray-600'
        }
        if (stockObj['px_change'] as number > 0) {
            state = {
                icon: '▲',
                rate: '+' + (stockObj['px_change_rate'] as number).toFixed(2),
                style: 'text-red-600 border-red-600'
            }
        } else if (stockObj['px_change'] as number < 0) {
            state = {
                icon: '▼',
                rate: (stockObj['px_change_rate'] as number).toFixed(2),
                style: 'text-green-600 border-green-600'
            }
        }
        return (
            <Link href={`/stock/${stockObj['prod_code']}`} key={stockObj['prod_code']}>
                <span className={`cursor-pointer flex flex-row rounded-sm border py-1 px-2 text-sm ${state.style}`}>
                    {state.icon} {stockObj['prod_name']}({stockObj['prod_code']}) {state.rate}%
                </span>
            </Link>
        )
    }

    return (
        <div className="flex flex-row flex-wrap gap-2">
            {
                Object.values(realResp.data.snapshot).map(item => render(item))
            }
        </div>
    )

}

function Live({ live }: { live: TLive }) {

    const titleStyle = (ids: number[]) => ids.indexOf(10) > -1 ? "text-red-600" : ''
    const contentStyle = (ids: number[]) => ids.indexOf(10) > -1 ? "text-red-400" : ''

    return (
        <div key={live.id} className={`w-full flex flex-row py-4 border-b text-opacity-75`}>
            <div className="w-16 py-[2px]">{moment(live.manual_updated_at * 1000).format('HH:mm')}</div>
            <div className={`flex flex-col gap-2 w-full border-l border-dashed pl-5 py-[2px] ${titleStyle(live.subj_ids)}`}>
                {
                    live.title.length > 0 && <div className="font-medium">{live.title}</div>
                }
                <article className={`${contentStyle(live.subj_ids)}`} dangerouslySetInnerHTML={{ __html: live.summary }} />
                {
                    live.all_stocks.length > 0 && <StocksTag stocks={live.all_stocks} />
                }
            </div>
        </div>
    )
}


export default function Lives() {

    const [cursor, setCursor] = useState('')
    const [lives, setLives] = useState<TLive[]>([])
    const [livesMap, setLivesMap] = useState<TLivesMap>({})
    const [isLoading, setIsLoading] = useState(false)
    const [sentryRef] = useInfiniteScroll({
        loading: isLoading,
        hasNextPage: true,
        onLoadMore: () => {
            http.getAll(`https://baoer-api.xuangubao.cn/api/v6/message/newsflash?limit=20&subj_ids=9,10,723,35,469,821&platform=pcweb&cursor=${cursor}`).then(resp => {
                const data = resp.data
                setLives(pre => [...pre, ...(data.messages)])
                setCursor(data.next_cursor)
            })
        }
    })

    const fetchLives = useCallback(async () => {
        setIsLoading(true)
        const resp = await http.getAll(`https://baoer-api.xuangubao.cn/api/v6/message/newsflash?limit=20&subj_ids=9,10,723,35,469,821&platform=pcweb`)
        const data = resp.data
        data.next_cursor > cursor && setCursor(data.next_cursor)
        if (lives.length === 0) {
            setLives(data.messages)
        } else {
            const index = data.messages.findIndex((item: TLive) => item.id === lives[0].id)
            index > 0 && setLives(pre => [...(data.messages.subarray(0, index)), ...pre])
            index < 0 && setLives(pre => [...(data.messages), ...pre])
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchLives()
    }, [])

    useEffect(() => {
        if (lives.length > 0) {
            let tmp: TLivesMap = {}
            lives.forEach((item, index) => {
                const date = new Date(item.manual_updated_at * 1000).toLocaleDateString('zh-CN')
                if (date in tmp) {
                    tmp[date].push(index)
                } else {
                    tmp[date] = [index]
                }
            })
            setLivesMap(tmp)
        }
    }, [lives])

    return (
        <div className="flex flex-col w-full px-8 py-4 text-sm gap-6">
            {
                Object.keys(livesMap).map((date, index) => {
                    const [_, month, day] = date.split('/')
                    return (
                        <div key={index}>
                            <div className="relative mb-10">
                                <span className="absolute bg-gray-800 font-medium px-4 py-2 text-gray-100 rounded-r-full -left-8">{month}月{day}日</span>
                            </div>
                            {
                                livesMap[date].map((liveIndex) => lives[liveIndex] != undefined && <Live key={liveIndex} live={lives[liveIndex]} />)
                            }
                        </div>
                    )
                })
            }
            <InfiniteScrollLoader sentryRef={sentryRef} showLoading={true} />
        </div>
    )
}
