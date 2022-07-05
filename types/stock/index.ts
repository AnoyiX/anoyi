export type StockPlatesProps = {
    limit: number
    is_acs: boolean
}

export type TPlate = {
    core_avg_pcp: number
    core_avg_pcp_rank: number
    core_avg_pcp_rank_change: number
    fall_count: number
    fund_flow: number
    is_new: boolean | null
    limit_up_count: number
    plate_id: null
    plate_name: string
    rise_count: number
    stay_count: number
    top_n_stocks: {
        items: {
            change_percent: number
            price_change: number
            stock_chi_name: string
            symbol: string
        }[]
    }
}

export type TPlates = {
    [key: string]: TPlate
}

export type TRealData = {
    fields: string[]
    snapshot: {
        [key: string]: Array<string | number>
    }
}

export type TLive = {
    article: null
    author: {
        avatar: string,
        display_name: string,
        id: number,
        is_followed: boolean,
        uri: string
    }
    channels: string[]
    comment_count: number
    content: string
    content_more: string
    content_text: string
    cover_images: string[]
    display_time: number
    fund_codes: string[]
    global_channel_name: string
    has_live_reading: boolean
    id: number
    images: string[]
    is_calendar: boolean
    is_favourite: boolean
    is_priced: boolean
    is_scaling: boolean
    reference: string
    related_themes: string[]
    score: number
    symbols: TSymbol[]
    tags: string[]
    title: string
    type: string,
    uri: string
}

export type TSymbol = {
    key: string
    name: string
}

export type TLivesMap = {
    [date: string]: number[]
}