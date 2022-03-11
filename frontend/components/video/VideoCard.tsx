import moment from "moment"
import 'moment/locale/zh-cn'
import { IVideo } from "../../hooks/useVideos";
import { Location } from '../../components/Icons'

interface VideoCardProps {
    video: IVideo
    onPlay: (vid: string) => void
}


export default function VideoCard({ video, onPlay }: VideoCardProps) {

    return (
        <div className="border rounded-lg lg:h-64 w-full flex flex-col lg:flex-row">
            <img src={video.video.cover.url_list[0]} alt="" className="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg cursor-pointer hover:opacity-75" onClick={() => onPlay(video.video.play_addr.uri)} />
            <div className="flex flex-col p-4 justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <img src={video.author.avatar_thumb.url_list[0]} alt="" className="w-12 h-12 rounded-full" />
                        <div className="flex flex-col justify-center gap-1">
                            <span className="text-lg font-bold text-gray-900">{video.author.nickname}</span>
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
                                className="bg-blue-500 rounded bg-opacity-10 border border-blue-500 px-2 py-1 text-blue-500 flex flex-row gap-1 items-center"
                                target="_blank"
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
