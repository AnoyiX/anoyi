import moment from "moment"
import 'moment/locale/zh-cn'
import { Location } from '../../components/Icons'
import { TVideo } from "../../types/video"
import ImageSkeleton from "../ImageSkeleton"

interface VideoCardProps {
    video: TVideo
    onPlay: (vid: string) => void
}


export default function VideoCard({ video, onPlay }: VideoCardProps) {

    return (
        <div className="border rounded-lg lg:h-64 w-full flex flex-col lg:flex-row">
            <div onClick={() => onPlay(video.video.play_addr.uri)} className='h-full aspect-[7/10]'>
                <ImageSkeleton src={video.video.cover.url_list[0]} className="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg cursor-pointer hover:opacity-75 h-full object-cover" />
            </div>
            <div className="flex flex-col p-4 justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <a href={`https://www.douyin.com/user/${video.author.sec_uid}`} target="_blank" rel='noreferrer'>
                            <ImageSkeleton src={video.author.avatar_thumb.url_list[0]} className="w-12 h-12 rounded-full" />
                        </a>
                        <div className="flex flex-col justify-center gap-1">
                            <a href={`https://www.douyin.com/user/${video.author.sec_uid}`} className="text-lg font-bold text-gray-900 hover:text-blue-600" target="_blank" rel='noreferrer'>{video.author.nickname}</a>
                            <span className="text-xs text-gray-400">{video.author.custom_verify || '抖音创作者'}</span>
                        </div>
                    </div>
                    <div className="text-gray-600 text-sm">
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
                    <span className="text-gray-500">{moment(video.create_time * 1000).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}
