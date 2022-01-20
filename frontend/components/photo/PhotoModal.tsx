import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { IPhoto } from '../../hooks/usePhotos'
import { Close } from '../Icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Virtual } from 'swiper'
import 'swiper/css'

interface PhotoModalProps {
    isOpen: boolean
    photos: IPhoto[]
    photoIndex: number
    onClose: () => void
}

export default function PhotoModal({ isOpen, photos, photoIndex, onClose }: PhotoModalProps) {

    useEffect(() => {

    }, [isOpen])

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={onClose}
            >
                <div className="w-full">
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className='w-full min-h-screen transition-all transform'>
                            <div className='bg-black bg-opacity-90 sticky top-0 flex px-2 h-10 justify-end items-center'>
                                <Close className='h-5 w-5 text-gray-400 cursor-pointer' onClick={onClose} />
                            </div>
                            <Swiper modules={[Virtual]} slidesPerView={1} centeredSlides={true} initialSlide={photoIndex} virtual>
                                {photos.map((photo, index) => (
                                    <SwiperSlide key={index} virtualIndex={index}>
                                        <img src={photo.file} alt="" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
