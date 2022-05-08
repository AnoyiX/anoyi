import moment from "moment"
import 'moment/locale/zh-cn'
import Link from "next/link"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import useStockLives, { ILive } from '../../hooks/useStockLives'
import useStockRealData from "../../hooks/useStockRealData"
import { Doing } from "../Icons"

function StockTag({ code, name }: { code: string, name: string }) {

    const fields = ["px_change", "px_change_rate", "price_precision"]
    const { realData } = useStockRealData([code], fields)
    const [state, setState] = useState({
        icon: '',
        rate: '0.00',
        style: 'text-gray-600 border-gray-600'
    })

    useEffect(() => {
        if (Object.keys(realData.snapshot).length > 0) {
            const stock = realData.snapshot[code]
            const stockObj = Object.fromEntries(realData.fields.map((_, i) => [realData.fields[i], stock[i]]))
            console.log(stockObj)
            setState(pre => ({ ...pre, rate: (stockObj['px_change_rate'] as number).toFixed(2) }))
            if (stockObj['px_change'] as number > 0) {
                setState({
                    icon: '▲',
                    rate: '+' + (stockObj['px_change_rate'] as number).toFixed(2),
                    style: 'text-red-600 border-red-600'
                })
            } else if (stockObj['px_change'] as number < 0) {
                setState({
                    icon: '▼',
                    rate: (stockObj['px_change_rate'] as number).toFixed(2),
                    style: 'text-green-600 border-green-600'
                })
            } else {
                setState({
                    icon: '',
                    rate: '0.00',
                    style: 'text-gray-600 border-gray-600'
                })
            }
        }
    }, [realData])

    return (
        <Link href={`/finance/${code}`}>
            <span className={`cursor-pointer flex flex-row rounded-sm border py-1 px-2 text-sm ${state.style}`}>
                {state.icon} {name}({code}) {state.rate}%
            </span>
        </Link>
    )

}


export default function StockLives() {

    const { lives, livesMap, fetchMore } = useStockLives()

    const contentStyle = (score: number) => score > 1 ? "text-red-600" : ''

    const renderLive = (live: ILive, index: number) => (
        <div key={index} className={`w-full flex flex-row py-4 border-b ${contentStyle(live.score)}`}>
            <div className="w-16 py-[2px]">{moment(live.display_time * 1000).format('HH:mm')}</div>
            <div className='flex flex-col gap-2 w-full border-l border-dashed pl-5 py-[2px]'>
                {
                    live.title.length > 0 && <div className="font-medium">【{live.title}】</div>
                }
                <article className="" dangerouslySetInnerHTML={{ __html: live.content }} />

                {
                    live.symbols.length > 0 && (
                        <div className="flex flex-row gap-2">
                            {
                                live.symbols.map((symbol, index) => <StockTag key={index} code={symbol.key} name={symbol.name} />)
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )

    return (

        <InfiniteScroll
            className="flex flex-col w-full px-8 py-4 text-sm gap-6"
            dataLength={lives.length}
            next={fetchMore}
            hasMore={true}
            loader={<div className="my-8 mx-auto col-span-full"><Doing className='h-20 w-20' /></div>}
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
                                livesMap[date].map((liveIndex, index) => renderLive(lives[liveIndex], index))
                            }
                        </div>
                    )
                })
            }
        </InfiniteScroll>
    )
}
