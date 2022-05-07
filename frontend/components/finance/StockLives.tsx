import moment from "moment"
import 'moment/locale/zh-cn'
import InfiniteScroll from "react-infinite-scroll-component"
import useStockLives from '../../hooks/useStockLives'
import { Doing } from "../Icons"


export default function StockLives() {

    const { lives, livesMap, fetchMore } = useStockLives()

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
                    const [year, month, day] = date.split('/')
                    return (
                        <div key={index}>
                            <div className="relative mb-10">
                                <span className="absolute bg-gray-800 font-medium px-4 py-2 text-gray-100 rounded-r-full -left-8">{month}月{day}日</span>
                            </div>
                            {
                                livesMap[date].map((liveIndex, index) => (
                                    <div key={index} className={`w-full flex flex-row py-4 border-b`}>
                                        <div className="w-16 py-[2px]">{moment(lives[liveIndex].display_time * 1000).format('HH:mm')}</div>
                                        <div className='w-full border-l border-dashed pl-5 py-[2px]'>
                                            {
                                                lives[liveIndex].title.length > 0 && <div className="font-medium mb-2">【{lives[liveIndex].title}】</div>
                                            }
                                            <article className="text-op" dangerouslySetInnerHTML={{ __html: lives[liveIndex].content }} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                })
            }
        </InfiniteScroll>
    )
}
