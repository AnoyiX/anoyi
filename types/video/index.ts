export type TVideo = {
    aweme_id: string
    desc: string
    author: {
        nickname: string
        avatar_thumb: {
            url_list: string[]
        }
        custom_verify: string
        sec_uid: string
    }
    poi_info: {
        poi_name: string
        poi_latitude: string
        poi_longitude: string
    }
    video: {
        cover: {
            url_list: string[]
        }
        play_addr: {
            uri: string
        }
    }
    create_time: number
}