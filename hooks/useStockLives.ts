import { useCallback, useEffect, useState } from "react"
import http from "../utils/http"

export interface ILive {
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
    symbols: {
        key: string
        name: string
    }[]
    tags: string[]
    title: string
    type: string,
    uri: string
}

export interface ILivesMap {
    [date: string]: number[]
}

export default function useStockLives() {

    const [cursor, setCursor] = useState('')
    const [lives, setLives] = useState<ILive[]>([])
    const [livesMap, setLivesMap] = useState<ILivesMap>({})

    const fetchLives = useCallback(async () => {
        const data = await http.get(`/api/stock/lives`)
        data.next_cursor > cursor && setCursor(data.next_cursor)
        if (lives.length === 0) {
            setLives(data.items)
        } else {
            const index = data.items.findIndex((item: ILive) => item.id === lives[0].id)
            index > 0 && setLives(pre => [...(data.items.subarray(0, index)), ...pre])
            index < 0 && setLives(pre => [...(data.items), ...pre])
        }
    }, [])

    const fetchMore = () => {
        http.get(`/api/stock/lives?cursor=${cursor}`).then(data => {
            setLives(pre => [...pre, ...(data.items)])
            setCursor(data.next_cursor)
        })
    }

    useEffect(() => {
        fetchLives()
    }, [])

    useEffect(() => {
        if(lives.length > 0) {
            let tmp: ILivesMap = {}
            lives.forEach((item, index) => {
                const date = new Date(item.display_time * 1000).toLocaleDateString('zh-CN')
                if (date in tmp) {
                    tmp[date].push(index)
                } else {
                    tmp[date] = [index]
                }
            })
            setLivesMap(tmp)
        }
    }, [lives])

    return {
        lives,
        livesMap,
        fetchMore
    }

}