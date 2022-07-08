import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import { TPhoto } from '../../types/photo'

interface PhotoModalProps {
    isOpen: boolean
    photo?: TPhoto
    onClose: () => void
}

export default function PhotoModal({ isOpen, photo, onClose }: PhotoModalProps) {

    useEffect(() => {

    }, [isOpen])

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 w-screen h-screen"
                onClose={onClose}
            >
                <div className="h-full">
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
                        <div className='flex flex-col h-full transition-all transform'>
                            <div className='flex-none h-10 bg-black bg-opacity-90 px-4'>
                                <div className='flex flex-row h-full justify-end items-center'>
                                    <i className="fa-solid fa-xmark text-xl text-gray-400 cursor-pointer" onClick={onClose}></i>
                                </div>
                            </div>
                            <div className='flex h-full items-center justify-center'>
                                {
                                    !!photo && <img src={photo.file} alt="" className='max-h-full object-contain' />
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
