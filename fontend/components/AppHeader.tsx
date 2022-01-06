import { useRouter } from 'next/router'
import { Return, Search } from '../components/Icons'

interface IAppHeader {

}

export default function AppHeader({ ...props }: IAppHeader & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {

    const router = useRouter()

    return (
        <div className='bg-white rounded-lg shadow flex flex-row items-center justify-between space-x-2 px-4 py-2'>
            <div>
                <div className='py-2' onClick={router.back}>
                    <Return className='h-5 w-5 text-gray-400' />
                </div>
            </div>
            <div className="relative w-64">
                <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="bg-gray-100 focus:ring-blue-500 focus:border-blue-500 w-full rounded-md sm:text-sm p-2 pl-10"
                    placeholder="Search"
                />
                <Search className='h-5 w-5 text-gray-400 absolute top-2 left-2' />
            </div>
            <div></div>
        </div>
    )

}