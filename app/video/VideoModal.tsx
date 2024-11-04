'use client'

import { Dialog, DialogOverlay, DialogPortal } from '@/components/ui/dialog'
import { DialogContent } from '@radix-ui/react-dialog'
import { RiCloseCircleFill } from '@remixicon/react'
import { useEffect, useRef } from 'react'

type VideoModalProps = {
    isOpen: boolean
    vid: string
    onClose: () => void
}

export default function VideoModal({ isOpen, vid, onClose }: VideoModalProps) {

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!isOpen) return
        setTimeout(() => {
            let videoPlayer = videoRef.current
            if (videoPlayer) {
                videoPlayer.setAttribute("src", `https://aweme.snssdk.com/aweme/v1/play/?video_id=${vid}&ratio=1080p&line=0`);
                videoPlayer.loop = true;
                videoPlayer.load();
                videoPlayer.play();
            }
        }, 100)
        return () => {
            let videoPlayer = videoRef.current
            if (videoPlayer) {
                videoPlayer.pause()
                videoPlayer.currentTime = 0
            }
        }
    }, [isOpen])

    return (
        <Dialog open={isOpen}>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent className='fixed inset-0 h-screen w-screen z-50 flex flex-col items-center justify-center' onEscapeKeyDown={onClose}>
                    <div className='max-w-4xl w-full aspect-video relative'>
                        <RiCloseCircleFill className="absolute -top-8 right-2 lg:top-0 lg:-right-10 h-8 w-8 cursor-pointer text-gray-100" onClick={onClose} />
                        <video ref={videoRef} controls className='w-full max-h-[520px] bg-black rounded-lg outline-0 shadow shadow-gray-900' />
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}
