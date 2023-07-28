export type StockPlatesProps = {
    limit: number
    is_acs: boolean
}

export type TPlate = {
    D: number
    INDEXCODE: string
    INDEXNAME: string
}

export type TRealData = {
    code: number
    data: {
        fields: string[]
        snapshot: {
            [key: string]: Array<string | number>
        }
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