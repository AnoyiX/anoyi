import useStockIndices from '../../hooks/useStockIndices'


export default function StockIndices() {

    const code = [
        '000001.SS',
        '399001.SZ',
        '399006.SZ',
        '000300.SS',
        '000905.SS',
        '000688.SS',
    ]

    const fields = [
        'symbol',
        'prod_code',
        'prod_name',
        'prod_en_name',
        'preclose_px',
        'price_precision',
        'open_px',
        'high_px',
        'update_time',
        'last_px',
        'px_change',
        'px_change_rate',
        'trade_status'
    ]

    const { indices } = useStockIndices(code, fields)

    const getBackgroundColor = (num: number) => {
        if (num > 0) return 'from-red-400 to-red-600'
        if (num == 0) return 'from-gray-400 to-gray-600'
        return 'from-green-400 to-green-600'
    }

    const format = (num: number) => {
        if (num > 0) return `+${num.toFixed(2)}`
        return num.toFixed(2)
    }

    return (
        <div className="grid grid-cols-6 gap-4 w-full text-white">
            {
                code.map((item, index) => {
                    if (Object.keys(indices.snapshot).length > 0) {
                        const stock = indices.snapshot[item]
                        return (
                            <div key={index} className={`cursor-pointer rounded-lg w-full flex flex-col shadow-lg gap-1 py-4 justify-center items-center bg-gradient-to-b ${getBackgroundColor(stock[11] as number)}`}>
                                <span className='text'>{stock[2]}</span>
                                <span className='text-3xl font-semibold'>{(stock[9] as number).toFixed(2)}</span>
                                <div className='flex flex-row gap-2 text-sm'>
                                    <span>{format(stock[10] as number)}</span>
                                    <span>{format(stock[11] as number)}%</span>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
    )

}
