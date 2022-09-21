import { useEffect, useState } from "react"

export type ImageSkeletonProps = {
    src: string
    className?: string
}

export default function ImageSkeleton({ src, className }: ImageSkeletonProps) {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const image = new Image()
        image.onload = () => setLoading(false)
        image.onerror = () => setLoading(false)
        image.src = src
    }, [])

    if (loading) return <div className={`${className} animate-pulse bg-slate-200`} />
    return <img className={className} src={src} alt="" />

}