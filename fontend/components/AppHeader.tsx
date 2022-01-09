import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { Right } from '../components/Icons'

interface IPath {
    name: string
    url?: string
}

interface IAppHeader {
    path: IPath[]
}

export default function AppHeader({ path }: IAppHeader) {

    const router = useRouter()

    const routeTo = (url: string) => {
        router.push(url, undefined, { shallow: true })
    }

    return (
        <div className='bg-white rounded-lg shadow flex flex-row items-center justify-between space-x-2 p-4'>
            <div className='flex flex-row items-center space-x-2'>
                <Link href={'/'}>
                    <img src={'https://cdn.anoyi.com/icon/home.svg'} alt="" className='w-6 h-6 cursor-pointer' />
                </Link>
                {
                    path.map((item, index) => (
                        <Fragment key={index}>
                            <Right className='h-4 w-4 text-gray-400' />
                            <div onClick={() => !!item.url && routeTo(item.url)} className={`flex flex-row items-center space-x-1 ${!!item.url && 'cursor-pointer'}`}>
                                <span className='text-sm text-gray-900'>{item.name}</span>
                            </div>
                        </Fragment>
                    ))
                }
            </div>
            <div></div>
        </div>
    )

}