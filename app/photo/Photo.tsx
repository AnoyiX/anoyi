'use client'

import moment from "moment"
import 'moment/locale/zh-cn'
import ImageSkeleton from "../../components/client/ImageSkeleton"
import { Location } from "../../components/Icons"
import { TPhoto } from "./type"

export type PhotoProps = {
    photo: TPhoto
    onPlay: () => void
}

export default function Photo({ photo, onPlay }: PhotoProps) {
    return (
        <div className="box w-full">
            <div className="overflow-hidden rounded-t-lg" onClick={onPlay} >
                <ImageSkeleton src={photo.thumbnail} className="w-full aspect-[5/3] object-cover cursor-pointer" />
            </div>
            <div className="p-4 flex flex-row text-sm justify-between items-center">
                <a className="flex flex-fow gap-1 items-center" href={photo.address} target="_blank" rel='noreferrer'>
                    <Location className="h-4 w-4" />
                    <span className="" >{photo.name}</span>
                </a>
                <span className="text-sm text-gray-500">{moment(photo.create_time).fromNow()}</span>
            </div>
        </div>
    )
}
