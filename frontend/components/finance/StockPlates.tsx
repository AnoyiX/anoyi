import useStockPlates, { IPlate } from '../../hooks/useStockPlates'


interface StockPlatesProps {
    limit: number
    is_acs: boolean
}

export default function StockPlates({ limit, is_acs }: StockPlatesProps) {

    const fields = [
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

    const { plates } = useStockPlates(limit, is_acs, fields)

    const getColor = (num: number) => {
        if (num > 0) return 'red'
        if (num == 0) return 'gray'
        return 'green'
    }

    const format = (num: number) => {
        if (num > 0) return `+${num.toFixed(2)}`
        return num.toFixed(2)
    }

    const sort = (a: IPlate, b: IPlate) => is_acs ? b.core_avg_pcp - a.core_avg_pcp : a.core_avg_pcp - b.core_avg_pcp

    return (
        <div className="grid grid-cols-3 gap-1 w-full text-white">
            {
                Object.values(plates).sort(sort).map((item, index) => (
                    <div key={index} className={`rounded-sm cursor-pointer w-full flex flex-col shadow-lg gap-1 py-4 justify-center items-center bg-${getColor(item.core_avg_pcp)}-500 hover:bg-${getColor(item.core_avg_pcp)}-400`}>
                        <span className='text-xs'>{item.plate_name}</span>
                        <span className=''>{format(item.core_avg_pcp * 100)}%</span>
                    </div>
                ))
            }
        </div>
    )

}
