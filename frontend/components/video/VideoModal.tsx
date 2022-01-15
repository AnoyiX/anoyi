import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef } from 'react'
import http from '../../utils/http'

interface IVideo {
    isOpen: boolean
    vid: string
    onClose: () => void
}

export default function VideoModal({ isOpen, vid, onClose }: IVideo) {

    const videoRef = useRef<HTMLVideoElement>()

    useEffect(() => {
        if (isOpen && vid.length > 0) {
            http.get(`/api/video/play?vid=${vid}`).then(data => {
                console.log(data);
                let videoPlayer = videoRef.current;
                if (videoPlayer) {
                    videoPlayer.setAttribute("src", data);
                    videoPlayer.loop = true;
                    videoPlayer.load();
                    videoPlayer.play();
                }
            })
        }
        return () => {
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
                <div className="h-full w-full mx-auto text-center px-32 pt-20 pb-32">
                    <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-60" />
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className='w-full h-full transition-all transform'>
                            <div className='w-full h-full flex items-center justify-center'>
                                <video ref={videoRef} controls className='w-full max-w-4xl rounded-lg'></video>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
