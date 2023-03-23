'use client'

import FullContainer from "@/components/server/Containers"
import { useCallback, useEffect, useRef, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Loading, SearchIcon } from '../../components/Icons'
import http from "../../utils/http"
import FundsFilter from "./FundsFilter"
import { TFund } from "./typs"
import { debounce } from "lodash"

type Query = {
    page: number,
    keyword: string,
    filter: any,
}

export const TYPE = {
    T0: '债券型',
    T1: '货币型',
    T2: '混合型',
    T3: '股票型',
    T4: '指数型',
    T5: 'FOF',
    T6: 'QDII',
}
export const RISKLEVEL = {
    R1: '低风险',
    R2: '中低风险',
    R3: '中风险',
    R4: '中高风险',
    R5: '高风险',
}
export const SH = {
    S0: '持有天数≥7天',
    S1: '持有天数≥30天',
}

export default function Funds() {

    const limit = 20
    const keys = [...Object.keys(TYPE), ...Object.keys(RISKLEVEL), ...Object.keys(SH)]
    const values = Array.from({ length: keys.length }, _ => false)
    const genBody = (query: Query) => {
        let body: any = {
            database: 'cloud',
            collection: 'funds',
            filter: query.filter,
            skip: query.page * limit,
            limit,
            sort: {
                SYL_1N_NUMBER: -1
            },
        }
        if (query.keyword.length > 0) {
            body.filter.SHORTNAME = {
                '$regex': query.keyword
            }
        }
        return body
    }
    const [filters, setFilters] = useState<{ [key: string]: boolean }>(Object.fromEntries(keys.map((key, index) => [key, values[index]])))
    const [query, setQuery] = useState({
        page: 0,
        keyword: '',
        filter: {}
    })
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const initialRender = useRef(true)
    const [data, setData] = useState<TFund[]>([])

    const onSearch = useCallback(debounce((keyword: string) => setQuery(pre => ({ ...pre, page: 0, keyword })), 1000), [])
    const onFilter = useCallback(debounce((filter: any) => setQuery(pre => ({ ...pre, page: 0, filter })), 1000), [])

    useEffect(() => {
        if (query.page === 0) setData([])
        setLoading(true)
        http.post([`/api/mongo/find`, genBody(query)]).then(resp => {
            setHasMore(resp.has_more)
            if (query.page > 0) {
                setData([...data, ...(resp.data)])
            } else {
                setData([...resp.data])
            }
            setLoading(false)
        })
    }, [query])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return () => {}
        }
        let filter: any = {}
        const typeKeys = Object.keys(TYPE).filter(key => filters[key])
        if (typeKeys.length > 0) {
            filter.FTYPE = { '$regex': typeKeys.map(key => TYPE[key as keyof typeof TYPE]).join('|') }
        }
        const riskLevelKeys = Object.keys(RISKLEVEL).filter(key => filters[key])
        if (riskLevelKeys.length > 0) {
            filter.RISKLEVEL = { '$in': riskLevelKeys.map(key => key.replace('R', '')) }
        }
        const shKeys = Object.keys(SH).filter(key => filters[key])
        if (shKeys.length > 0) {
            filter.sh = {
                '$elemMatch': {
                    feeRate: '0.00%',
                    rateSection: {
                        $in: shKeys.map(key => SH[key as keyof typeof SH])
                    }
                }
            }
        }
        onFilter(filter)
    }, [filters])

    const onToggleFilterItem = (id: string) => {
        setFilters(pre => {
            let state = { ...pre }
            state[id] = !pre[id]
            return state
        })
    }

    const typeClass = (value: string) => {
        if (value.startsWith('债券型')) return 'bg-cyan-100 text-cyan-600'
        if (value.startsWith('混合型')) return 'bg-amber-100 text-amber-600'
        if (value.startsWith('货币型')) return 'bg-teal-100 text-teal-600'
        if (value.startsWith('股票型')) return 'bg-fuchsia-100 text-fuchsia-600'
        if (value.startsWith('指数型')) return 'bg-violet-100 text-violet-600'
        if (value.startsWith('FOF')) return 'bg-indigo-100 text-indigo-600'
        if (value.startsWith('QDII')) return 'bg-rose-100 text-rose-600'
        return ''
    }

    const renderRate = (value: number) => {
        if (value > 0) return <span className="text-red-500">{`+${value.toFixed(2)}%`}</span>
        if (value < 0) return <span className="text-green-500">{`${value.toFixed(2)}%`}</span>
        return '0.00%'
    }

    const renderRiskLevel = (value: string) => {
        if (value === '5') return <span className="rounded px-1 py-0.5 bg-red-100 text-red-600">高风险</span>
        if (value === '4') return <span className="rounded px-1 py-0.5 bg-red-50 text-red-500">中高风险</span>
        if (value === '3') return <span className="rounded px-1 py-0.5 bg-orange-50 text-orange-500">中风险</span>
        if (value === '2') return <span className="rounded px-1 py-0.5 bg-green-50 text-green-500">中低风险</span>
        if (value === '1') return <span className="rounded px-1 py-0.5 bg-green-100 text-green-600">低风险</span>
        return <></>
    }

    return (
        <>
            <div className="flex-row-center gap-4 text-sm">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                        type="search"
                        className="w-full p-3 pl-10 text-gray-900 bg-white shadow rounded-lg focus:outline-none"
                        placeholder="基金名称"
                        onChange={e => onSearch(e.target.value)}
                    />
                </div>
                <FundsFilter filters={filters} onToggleFilterItem={onToggleFilterItem} />
            </div>
            <FullContainer>
                <InfiniteScroll
                    className="relative overflow-x-auto mb-8"
                    dataLength={data.length}
                    next={() => setQuery(pre => ({ ...pre, page: pre.page + 1 }))}
                    hasMore={hasMore}
                    loader={<></>}
                >
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-gray-100 uppercase bg-gray-700 ">
                            <tr>
                                <th scope="col" className="p-3 rounded-tl-lg">
                                    基金
                                </th>
                                <th scope="col" className="p-3 w-28 text-right">
                                    最新净值
                                </th>
                                <th scope="col" className="p-3 w-28 text-right">
                                    日涨跌幅
                                </th>
                                <th scope="col" className="p-3 w-28 text-right">
                                    近一年
                                </th>
                                <th scope="col" className="p-3 w-28 text-right">
                                    申购费率
                                </th>
                                <th scope="col" className="p-3 w-64 text-right rounded-tr-lg">
                                    赎回费率
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(fund => (
                                    <tr className="bg-white border-b" key={fund.code}>
                                        <td className="p-3 text-gray-900">
                                            <div className="h-full flex flex-col gap-1 justify-center">
                                                <a href={`https://fund.eastmoney.com/${fund.code}.html`} className="hover:text-blue-600 w-fit" target="_blank">
                                                    {fund.code} - {fund.SHORTNAME}
                                                </a>
                                                <div className="flex-row-center gap-2 text-xs">
                                                    <span className={`rounded px-1 py-0.5 ${typeClass(fund.FTYPE)}`}>{fund.FTYPE}</span>
                                                    {renderRiskLevel(fund.RISKLEVEL)}
                                                    {
                                                        fund.CYCLE !== '--' && <span className={`rounded px-1 py-0.5 bg-gray-600 text-white`}>锁定{fund.CYCLE}</span>
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 text-right">
                                            {fund.DWJZ}
                                        </td>
                                        <td className="p-3 text-right">
                                            {renderRate(parseFloat(fund.RZDF))}
                                        </td>
                                        <td className="p-3 text-right">
                                            {renderRate(fund.SYL_1N_NUMBER)}
                                        </td>
                                        <td className="p-3 text-right">
                                            {fund.RATE}
                                        </td>
                                        <td className="p-3 text-right">
                                            {
                                                fund.sh.length === 1 ? '--' : (
                                                    <div className="flex flex-col">
                                                        {
                                                            fund.sh.slice(1).map((rule, index) => (
                                                                <span key={index}>{rule.rateSection}: {rule.feeRate}</span>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        loading && <div className="my-8 w-full"><Loading className='h-20 w-20 mx-auto' /></div>
                    }
                </InfiniteScroll>
            </FullContainer>
        </>
    )
}