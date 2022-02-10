import useStockIndices from '../../hooks/useStockIndices'

interface StockIndexGroupProps {
    category: string
}

export default function StockIndicesGroup({ category }: StockIndexGroupProps) {

    const { indices } = useStockIndices(category)

    const getBackgroundColor = (percentage: string) => {
        const num = parseFloat(percentage)
        if (num > 0) return 'bg-red-400'
        if (num == 0) return 'bg-gray-500'
        return 'bg-green-500'
    }

    const format = (str: string) => {
        const num = parseFloat(str)
        if (num > 0) return `+${num}`
        return str
    }

    return (
        <div className="grid grid-cols-3 gap-8 text-white">
            {
                indices.map((item, index) => (
                    <div key={index} className={`rounded-lg w-full flex flex-col shadow-lg gap-1 py-6 justify-center items-center ${getBackgroundColor(item.percentage)}`}>
                        <span className='text'>{item.name}</span>
                        <span className='text-3xl font-semibold'>{item.current}</span>
                        <div className='flex flex-row gap-2 text-sm'>
                            <span>{format(item.chg)}</span>
                            <span>{format(item.percentage)}%</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )

}
