import useSWR from 'swr'
import { TPlate, TPlates, StockPlatesProps } from '../../types/stock'
import http from '../../utils/http'

export default function StockPlates({ limit, is_acs }: StockPlatesProps) {

    const data_fields = [
        'plate_id',
        'plate_name',
        'fund_flow',
        'rise_count',
        'fall_count',
        'stay_count',
        'limit_up_count',
        'core_avg_pcp',
        'core_avg_pcp_rank',
        'core_avg_pcp_rank_change',
        'top_n_stocks',
        'is_new',
    ]

    const rank_field = "core_avg_pcp"
    const rank_type = "0"

    const { data: plates = [] } = useSWR<TPlates>([`/api/stock/plates`, { limit, is_acs, rank_field, rank_type, data_fields }], http.post, { refreshInterval: 10000 })

    const getColor = (num: number) => {
        if (num > 0) return 'bg-red-500 hover:bg-red-400'
        if (num == 0) return 'bg-gray-500 hover:bg-gray-400'
        return 'bg-green-500 hover:bg-green-400'
    }

    const format = (num: number) => {
        if (num > 0) return `+${num.toFixed(2)}`
        return num.toFixed(2)
    }

    const sort = (a: TPlate, b: TPlate) => is_acs ? b.core_avg_pcp - a.core_avg_pcp : a.core_avg_pcp - b.core_avg_pcp

    return (
        <div className="grid grid-cols-3 gap-1 w-full text-white">
            {
                Object.values(plates).sort(sort).map((item) => (
                    <div key={item.plate_id} className={`rounded-sm cursor-pointer w-full flex flex-col gap-1 py-4 justify-center items-center ${getColor(item.core_avg_pcp)}`}>
                        <span className='text-xs'>{item.plate_name}</span>
                        <span className=''>{format(item.core_avg_pcp * 100)}%</span>
                    </div>
                ))
            }
        </div>
    )

}
