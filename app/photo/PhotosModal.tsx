'use client'

import { XIcon } from '@/components/Icons'
import { Dialog, DialogOverlay, DialogPortal } from '@/components/ui/dialog'
import { DialogContent } from '@radix-ui/react-dialog'
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
                <DialogContent className='fixed inset-0 h-screen w-screen z-50 flex flex-col' onEscapeKeyDown={onClose}>
                    <div className='flex-none h-12 bg-black px-4'>
                        <div className='flex flex-row h-full justify-end items-center'>
                            <XIcon className="fa-solid fa-xmark w-6 h-6 text-gray-400 cursor-pointer" onClick={onClose} />
                        </div>
                    </div>
                    <div className='flex h-full items-center justify-center'>
                        {
                            !!photo && <img src={photo.file} alt="" className='max-h-full object-contain' />
                        }
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}