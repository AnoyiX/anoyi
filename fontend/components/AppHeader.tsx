import { useRouter } from 'next/router'
import { Return, Search } from '../components/Icons'

interface IApp {
    name: string
    icon: string
}

interface IAppHeader {
    app: IApp
}

export default function AppHeader({ app, ...props }: IAppHeader & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {

    const router = useRouter()

    return (
        <div className='bg-white rounded-lg shadow flex flex-row items-center justify-between space-x-2 px-4 py-2'>
            <div>
                <div className='py-2' onClick={router.back}>
                    <Return className='h-5 w-5 text-gray-400' />
                </div>
            </div>
            <div className='flex flex-row items-center space-x-1'>
                <img src={app.icon} alt="" className='w-6 h-6' />
                <span className='text-sm text-gray-900'>{app.name}</span>
            </div>
            <div></div>
        </div>
    )

}