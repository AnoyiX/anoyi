export type StockPlatesProps = {
    limit: number
    is_acs: boolean
}

export type TPlate = {
    CHGRT: number
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
    id: number
    title: string
    title_path: string
    summary: string
    summary_path: string
    image: string
    pc_image: string
    subscribe_type: number
    is_subscribed: boolean
    is_premium: boolean
    impact: number
    need_explained: boolean
    whether_hide_impact_face: boolean
    subj_ids: number[]
    stocks: TStockInfo[]
    watermarks: string
    has_summary: boolean
    created_at: number
    manual_updated_at: number
    content_refused: boolean
    flash_message_type: string
    super_vip_right_type: number
    all_stocks: TStockInfo[]
    sub_title: string
    route: string
}

export interface TStockInfo {
    name: string;
    symbol: string;
    market: string;
}

export type TSymbol = {
    key: string
    name: string
}

export type TLivesMap = {
    [date: string]: number[]
}