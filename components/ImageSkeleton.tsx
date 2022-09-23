import { useEffect, useState } from "react"

type ImageSkeletonProps = {
    className?: string
    src: string
}

export default function ImageSkeleton({ className, src }: ImageSkeletonProps) {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const image = new Image()
        image.onload = () => setLoading(false)
        image.onerror = () => setLoading(false)
        image.src = src
    }, [])

    if (loading) return <div className={`${className} animate-pulse bg-gray-200`}></div>

    return <img className={className} src={src} alt="" />
}