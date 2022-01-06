import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import OutsideLink, { IOutsideLink } from './OutsideLink'


interface IDock {
    name: string
    data: IOutsideLink[]
}

export default function Dock({ name, data }: IDock) {
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
                <div className='bg-gray-100 w-16 h-16 rounded-md p-2'>
                    {
                        data.map((item, index) => (
                            <div key={index} className='w-1/3 h-1/3 inline-block border border-transparent'>
                                <img src={item.icon} alt="" />
                            </div>
                        ))
                    }
                </div>
                <span className='text-gray-400 text-xs'>{name}</span>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="h-full w-full mx-auto text-center px-32 pt-20 pb-32">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-200" />
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className='w-full h-full transition-all transform'>
                                <p className='text-gray-500 text-lg mb-4'>{name}</p>
                                <div className='bg-white w-full h-full p-8 shadow-xl rounded-2xl overflow-y-scroll'>
                                    <div className=" flex flex-wrap justify-center gap-10">
                                        {
                                            data.map((item, index) => (
                                                <OutsideLink name={item.name} icon={item.icon} url={item.url} key={index}></OutsideLink>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
