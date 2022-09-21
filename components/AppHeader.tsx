import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

interface IPath {
    name: string
    url?: string
}

interface IAppHeader {
    path: IPath[]
}

export default function AppHeader({ path }: IAppHeader) {

    const router = useRouter()

    return (
        <div className='bg-white rounded-lg shadow flex flex-row items-center justify-between space-x-2 p-4'>
            <div className='flex flex-row items-center space-x-2'>
                <Link href={'/'}>
                    <img src={'https://cdn.jsdelivr.net/gh/AnoyiX/cdn@main/icon/home.svg'} alt="" className='w-6 h-6 cursor-pointer' />
                </Link>
                {
                    path.map((item, index) => (
                        <Fragment key={index}>
                            <i className="fa-solid fa-angle-right text-gray-400"></i>
                            <div onClick={() => !!item.url && router.push(item.url)} className={`flex flex-row items-center space-x-2 ${!!item.url && 'cursor-pointer'}`}>
                                <span className='text-sm text-gray-900'>{item.name}</span>
                            </div>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )

}