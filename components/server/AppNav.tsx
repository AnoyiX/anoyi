import { Link } from 'next-view-transitions'
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
        <div className='box-card flex flex-row items-center justify-between space-x-2 p-4'>
            <div className='flex flex-row items-center space-x-1'>
                <Link href='/'>
                    <img src='https://cdn.jsdelivr.net/gh/AnoyiX/cdn@main/icon/home.svg' alt="" className='w-6 h-6 cursor-pointer' />
                </Link>
                {
                    paths.map((item, index) => (
                        <Fragment key={index}>
                            <ChevronRightIcon className="fa-solid fa-angle-right" />
                            {
                                !!item.url ?
                                    <Link href={item.url} className="text-sm  cursor-pointer">{item.name}</Link> :
                                    <span className='text-sm '>{item.name}</span>
                            }
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )

}