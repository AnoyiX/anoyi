import moment from "moment"
import 'moment/locale/zh-cn'
import { IPhoto } from "../../hooks/usePhotos";
import { Location } from '../Icons'

interface PhotoCardProps {
    photo: IPhoto
    onPlay: () => void
}

export default function PhotoCard({ photo, onPlay }: PhotoCardProps) {

    return (
        <div className="rounded-lg w-full shadow-lg">
            <div className="overflow-hidden rounded-t-lg">
                <img src={photo.thumbnail} alt="" className="w-full h-40 md:h-64 object-cover cursor-pointer transition ease-in-out hover:scale-110" onClick={onPlay} />
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
