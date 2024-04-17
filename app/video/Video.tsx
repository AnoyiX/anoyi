'use client'

import moment from "moment"
import 'moment/locale/zh-cn'
import { Location } from '../../components/Icons'
import ImageSkeleton from "../../components/client/ImageSkeleton"
import { TVideo } from "./type"
import { Link } from "next-view-transitions"

type VideoProps = {
    video: TVideo
    onPlay: (vid: string) => void
}

export default function Video({ video, onPlay }: VideoProps) {

    return (
        <div className="box video-card">
            <div onClick={() => onPlay(video.video.play_addr.uri)} className='h-full aspect-[7/10]'>
                <ImageSkeleton src={video.video.cover.url_list[0]} className="video-cover" />
            </div>
            <div className="flex flex-col p-4 justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <Link href={`https://www.douyin.com/user/${video.author.sec_uid}`} target="_blank" rel='noreferrer'>
                            <ImageSkeleton src={video.author.avatar_thumb.url_list[0]} className="w-12 h-12 rounded-full" />
                        </Link>
                        <div className="flex flex-col justify-center gap-1">
                            <Link href={`https://www.douyin.com/user/${video.author.sec_uid}`} className="font-semibold" target="_blank" rel='noreferrer'>{video.author.nickname}</Link>
                            <span className="text-xs bg-blue-50 px-1.5 py-1 rounded text-blue-500 w-fit">{video.author.custom_verify || '抖音创作者'}</span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-700">
                        {video.desc}
                    </div>
                </div>

                <div className="flex flex-row gap-4 text-xs items-center pt-2">
                    {
                        video.poi_info && (
                            <a href={`https://gaode.com/search?query=${video.poi_info.poi_name}&geoobj=${video.poi_info.poi_longitude}%7C${video.poi_info.poi_latitude}`}
                                className="bg-blue-500 rounded bg-opacity-10 border border-blue-500 px-2 py-1 text-blue-600 flex flex-row gap-1 items-center"
                                target="_blank"
                                rel='noreferrer'
                            >
                                <Location className="h-4 w-4" />
                                <span>{video.poi_info.poi_name}</span>
                            </a>
                        )
                    }
                    <span className="text-gray-600">{moment(video.create_time * 1000).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}
