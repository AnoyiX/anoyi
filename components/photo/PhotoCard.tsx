import moment from "moment"
import 'moment/locale/zh-cn'
import { TPhoto } from "../../types/photo"
import { Location } from '../Icons'

interface PhotoCardProps {
    photo: TPhoto
    onPlay: () => void
}

export default function PhotoCard({ photo, onPlay }: PhotoCardProps) {

    return (
        <div className="rounded-lg w-full shadow hover:shadow-xl">
            <div className="overflow-hidden rounded-t-lg">
                <img src={photo.thumbnail} alt="" className="w-full h-32 md:h-48 object-cover cursor-pointer" onClick={onPlay} />
            </div>
            <div className="p-4 flex flex-row text-sm text-gray-700 justify-between items-center">
                <a className="flex flex-fow gap-1 items-center" href={photo.address} target="_blank">
                    <Location className="h-4 w-4" />
                    <span className="" >{photo.name}</span>
                </a>
                <span className="text-gray-400">{moment(photo.create_time).fromNow()}</span>
            </div>
        </div>
    )
}
