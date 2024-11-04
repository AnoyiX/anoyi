'use client'

import { Dialog, DialogOverlay, DialogPortal } from '@/components/ui/dialog'
import { DialogContent } from '@radix-ui/react-dialog'
import { RiCloseFill } from '@remixicon/react'
import { TPhoto } from './type'

export type PhotoModalProps = {
    isOpen: boolean
    photo?: TPhoto
    onClose: () => void
}

export default function PhotosModal({ isOpen, photo, onClose }: PhotoModalProps) {
    return (
        <Dialog open={isOpen}>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent className='fixed inset-0 h-screen w-screen z-50 flex flex-col border-none' onEscapeKeyDown={onClose}>
                    <div className='flex flex-row justify-between items-center w-full bg-black'>
                        <div></div>
                        <div className='p-2'>
                            <RiCloseFill className="fa-solid fa-xmark w-8 h-8 p-1 text-gray-400 cursor-pointer rounded-md hover:bg-gray-700" onClick={onClose} />
                        </div>
                    </div>
                    <div className='flex-1-col items-center justify-center'>
                        {
                            !!photo && <img src={photo.file} alt="" className='flex-1-col object-contain' />
                        }
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}