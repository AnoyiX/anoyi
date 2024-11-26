export const StockFormat = {
    rate: (value: number) => {
        const format = new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            useGrouping: false,
            signDisplay: 'always',
            style: 'percent',
        })
        return format.format(value)
    },
    trend: (value: number) => {
        const format = new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            useGrouping: false,
            signDisplay: 'always',
        })
        return format.format(value)
    },
}

export const NumberFlowFormat = {
    value: {
        useGrouping: false,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    },
    rate: {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        useGrouping: false,
        signDisplay: 'always' as const,
        style: 'percent' as const,
    }
}