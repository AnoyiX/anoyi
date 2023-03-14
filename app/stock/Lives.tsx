'use client'

import moment from "moment"
import 'moment/locale/zh-cn'
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import useSWR from "swr"
import { Loading } from "../../components/Icons"
import { TLive, TLivesMap, TRealData, TSymbol } from "./type"
import http from "../../utils/http"

function StocksTag({ symbols }: { symbols: TSymbol[] }) {

    const fields = ["prod_code", "prod_name", "px_change", "px_change_rate", "price_precision", "delisting_date"]
    const { data: realResp = { data: { fields: [], snapshot: {} } } } = useSWR<TRealData>(`https://api-ddc.wallstcn.com/market/real?prod_code=${symbols.map(item => item.key).join(',')}&fields=${fields.join(',')}`, http.getAll, { refreshInterval: 5000 })

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

    const contentStyle = (score: number) => score > 1 ? "text-red-600" : ''

    return (
        <div key={live.id} className={`w-full flex flex-row py-4 border-b ${contentStyle(live.score)}`}>
            <div className="w-16 py-[2px]">{moment(live.display_time * 1000).format('HH:mm')}</div>
            <div className='flex flex-col gap-2 w-full border-l border-dashed pl-5 py-[2px]'>
                {
                    live.title.length > 0 && <div className="font-medium">【{live.title}】</div>
                }
                <article className="" dangerouslySetInnerHTML={{ __html: live.content }} />
                {
                    live.symbols.length > 0 && <StocksTag symbols={live.symbols} />
                }
            </div>
        </div>
    )
}


export default function Lives() {

    const [cursor, setCursor] = useState('')
    const [lives, setLives] = useState<TLive[]>([])
    const [livesMap, setLivesMap] = useState<TLivesMap>({})

    const fetchLives = useCallback(async () => {
        const resp = await http.getAll(`https://api-one.wallstcn.com/apiv1/content/lives?channel=global-channel&client=pc&limit=20&accept=live&first_page=true`)
        const data = resp.data
        data.next_cursor > cursor && setCursor(data.next_cursor)
        if (lives.length === 0) {
            setLives(data.items)
        } else {
            const index = data.items.findIndex((item: TLive) => item.id === lives[0].id)
            index > 0 && setLives(pre => [...(data.items.subarray(0, index)), ...pre])
            index < 0 && setLives(pre => [...(data.items), ...pre])
        }
    }, [])

    const fetchMore = () => {
        http.getAll(`https://api-one.wallstcn.com/apiv1/content/lives?channel=global-channel&client=pc&limit=20&accept=live&first_page=false&cursor=${cursor}`).then(resp => {
            const data = resp.data
            setLives(pre => [...pre, ...(data.items)])
            setCursor(data.next_cursor)
        })
    }

    useEffect(() => {
        fetchLives()
    }, [])

    useEffect(() => {
        if (lives.length > 0) {
            let tmp: TLivesMap = {}
            lives.forEach((item, index) => {
                const date = new Date(item.display_time * 1000).toLocaleDateString('zh-CN')
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
        <InfiniteScroll
            className="flex flex-col w-full px-8 py-4 text-sm gap-6"
            dataLength={lives.length}
            next={fetchMore}
            hasMore={true}
            loader={<div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>}
        >
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
        </InfiniteScroll>
    )
}
