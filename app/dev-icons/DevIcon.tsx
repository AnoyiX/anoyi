'use client';

import toast from "react-hot-toast";
import ImageSkeleton from "../../components/client/ImageSkeleton";

export type DevIconProps = {
    name: string
    url: string
}

export default function DevIcon({ icon }: { icon: DevIconProps }) {

    const copyName = (text: string) => {
        navigator.clipboard.writeText(text)
        toast(`已复制！`, { position: 'top-right', icon: <code className="px-2 py-1 text-xs bg-gray-100 text-red-500 rounded-md">{text}</code> })
    }

    return (
        <div
            className="icon-card"
            onClick={() => copyName(icon.name.toLowerCase())}
        >
            <ImageSkeleton src={icon.url} className='icon-image' />
            <p className="text-sm">{icon.name}</p>
        </div>
    )
}