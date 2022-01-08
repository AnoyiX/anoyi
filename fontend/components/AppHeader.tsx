import Link from 'next/link'
import { Right } from '../components/Icons'

interface IPath {
    name: string
    icon?: string
    url?: string
}

interface IAppHeader {
    path: IPath[]
}

export default function AppHeader({ path }: IAppHeader) {

    const HOME = {
        name: '首页',
        icon: 'https://cdn.anoyi.com/icon/home.svg',
        url: '/'
    }

    const fullPath = [HOME, ...path]

    const renderPath = (pathItem: IPath) => (
        <div className={`flex flex-row items-center space-x-1 ${!!pathItem.url && 'cursor-pointer'}`}>
            {
                pathItem.icon && <img src={pathItem.icon} alt="" className='w-6 h-6' />
            }
            <span className='text-sm text-gray-900'>{pathItem.name}</span>
        </div>
    )

    return (
        <div className='bg-white rounded-lg shadow flex flex-row items-center justify-between space-x-2 p-4'>
            <div className='flex flex-row items-center space-x-2'>

                {
                    fullPath.map((item, index) => (
                        <>
                            {
                                item.url ? (
                                    <Link href={item.url}>
                                        {renderPath(item)}
                                    </Link>
                                ) : renderPath(item)
                            }
                            {
                                index < fullPath.length - 1 && <Right className='h-4 w-4 text-gray-400' />
                            }
                        </>
                    ))
                }

            </div>
            <div></div>
        </div>
    )

}