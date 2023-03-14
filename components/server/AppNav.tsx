import Link from 'next/link'
import { Fragment } from 'react'
import { ChevronRightIcon } from '../Icons'

type TAppNav = {
    paths: {
        name: string
        url?: string
    }[]
}

export default function AppNav({ paths }: TAppNav) {

    return (
        <div className='bg-white rounded-lg shadow flex flex-row items-center justify-between space-x-2 p-4'>
            <div className='flex flex-row items-center space-x-1'>
                <Link href='/'>
                    <img src='https://cdn.jsdelivr.net/gh/AnoyiX/cdn@main/icon/home.svg' alt="" className='w-6 h-6 cursor-pointer' />
                </Link>
                {
                    paths.map((item, index) => (
                        <Fragment key={index}>
                            <ChevronRightIcon className="fa-solid fa-angle-right text-gray-400" />
                            {
                                !!item.url ? 
                                <Link href={item.url} className="text-sm text-gray-900 cursor-pointer">{item.name}</Link> : 
                                <span className='text-sm text-gray-900'>{item.name}</span>
                            }
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )

}