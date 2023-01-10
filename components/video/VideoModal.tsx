import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import http from '../../utils/http'

interface VideoModalProps {
    isOpen: boolean
    vid: string
    onClose: () => void
}

export default function VideoModal({ isOpen, vid, onClose }: VideoModalProps) {

    const videoRef = useRef<HTMLVideoElement>()
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (isOpen && vid.length > 0) {
            http.get(`/api/video/play?vid=${vid}`).then(data => {
                let videoPlayer = videoRef.current;
                if (videoPlayer) {
                    videoPlayer.setAttribute("src", data);
                    videoPlayer.loop = true;
                    videoPlayer.load();
                    videoPlayer.play();
                }
            }).catch(() => setIsError(true))
        }
        return () => {
            setIsError(false)
            let videoPlayer = videoRef.current;
            if (videoPlayer) {
                videoPlayer.pause()
                videoPlayer.currentTime = 0
            }
        }
    }, [isOpen])

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={onClose}
            >
                <div className="h-full w-full mx-auto text-center lg:px-32 lg:pt-20 lg:pb-32">
                    <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-60"/>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className='max-w-4xl mx-auto h-full transition-all transform'>
                            <div className='w-full h-full flex flex-col items-center justify-center'>
                                <div className='relative w-full'>
                                    <i className="fa-solid fa-xmark absolute -top-8 right-1 lg:top-0 lg:-right-6 text-2xl cursor-pointer text-gray-100" onClick={onClose}></i>
                                </div>
                                {
                                    isError ? (
                                        <div className='h-96 w-full flex flex-col gap-4 justify-center items-center bg-gray-800 rounded-lg shadow shadow-gray-900'>
                                            <i className="fa-solid fa-triangle-exclamation text-5xl text-gray-500"></i>
                                            <span className='text-gray-500'>视频加载失败，请观看其它视频！</span>
                                        </div>
                                    ) : <video ref={videoRef} controls className='w-full max-h-[520px] bg-black rounded-lg outline-0 shadow shadow-gray-900' /> 
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
