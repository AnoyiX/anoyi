import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface IDock {
    name: string;
}

export default function Dock({ name }: IDock) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className='flex flex-col space-y-2 items-center' onClick={openModal}>
                <div className='bg-gray-100 w-16 h-16 rounded-md'></div>
                <span className='text-gray-400 text-xs'>{name}</span>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="h-full w-full text-center px-32 py-20">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-200" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className='flex flex-col w-full h-full transition-all transform'>
                                <p className='text-gray-500 text-lg'>{name}</p>
                                <div className="bg-white flex flex-1 p-6 my-4 shadow-xl rounded-2xl">
                                    
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
