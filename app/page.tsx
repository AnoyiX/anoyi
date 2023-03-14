import Link from 'next/link'
import FullContainer from '../components/server/Containers'
import { readFileSync } from 'fs'
import path from "path"
import { Logos } from '../components/Icons'
import Dock from '@/components/client/Dock'

export default function Page() {

    const apps = JSON.parse(readFileSync(path.join(process.cwd(), 'data/json/apps.json'), 'utf-8'))
    const home = JSON.parse(readFileSync(path.join(process.cwd(), 'data/json/home.json'), 'utf-8'))

    return (
        <div className='w-full flex flex-col flex-1 gap-4 md:gap-6 p-4 md:p-8'>

            <div className='flex flex-col md:flex-row flex-1 gap-4 md:gap-6'>

                <div className='flex flex-col gap-4 md:gap-6'>
                    <div className='bg-white w-full md:w-72 rounded-lg shadow flex flex-col gap-4 items-center justify-center'>
                        <div className='flex flex-col items-center justify-center gap-2 pt-6 pb-2'>
                            <img className="w-28 h-28 rounded-full" src={home.user.avatar} alt="" />
                            <div className="text-xl font-medium">{home.user.nickname}</div>
                            <div className='text-gray-500'>
                                <span className='text-sm'>{home.user.bio}</span>
                            </div>
                        </div>
                        <div className='flex flex-row gap-3 items-center justify-center text-lg border-t border-gray-200 py-3 w-full'>
                            {
                                home.user.brands.map((item: {url: string, icon: keyof typeof Logos}) => (
                                    <Link href={item.url} target="_blank" key={item.icon}>
                                        {
                                            Logos[item.icon]({ className: 'text-xl text-gray-500/75 hover:text-gray-700' })
                                        }
                                    </Link>
                                ))
                            }
                        </div>
                    </div>

                    <div className='bg-white w-full md:w-72 rounded-lg shadow flex flex-row space-x-6 items-center justify-center py-4'>
                        {
                            [home.languages, home.skills, home.softwares].map((item, index) => (
                                <Dock name={item.name} key={index} data={item.children}></Dock>
                            ))
                        }
                    </div>

                    <div className='md:flex hidden flex-col items-center space-y-2 text-gray-500 text-xs'>
                        <div className='flex flex-row space-x-1'>
                            <Link href='/doc/about'>
                                <span className="hover:text-blue-600 cursor-pointer">关于作者</span>
                            </Link>
                            <span>·</span>
                            <Link href='/doc/jobs'>
                                <span className="hover:text-blue-600 cursor-pointer">工作内推</span>
                            </Link>
                            <span>·</span>
                            <Link href='/doc/links'>
                                <span className="hover:text-blue-600 cursor-pointer">友情链接</span>
                            </Link>
                            <span>·</span>
                            <Link href='/doc/terms'>
                                <span className="hover:text-blue-600 cursor-pointer">用户协议</span>
                            </Link>
                        </div>
                        <div className='text-center text-gray-400'>
                            <a href="https://github.com/AnoyiX" target="_blank">Anoyi</a> © 2023 All Rights Reserved
                        </div>
                    </div>
                </div>

                <FullContainer>
                    <div className='flex flex-1 flex-row flex-wrap p-8 gap-10'>
                        {
                            apps.map((item: {
                                name: string
                                url: string
                                icon: string
                            }, index: number) => (
                                <div className='flex flex-col items-center gap-3' key={index}>
                                    <Link href={item.url} target={(item.url.startsWith('http://') || item.url.startsWith('https://')) ? '_blank' : '_self'} className='cursor-pointer'>
                                        <img src={item.icon} alt="" className='w-16 h-16 shadow-md rounded-2xl' />
                                    </Link>
                                    <span className='text-gray-800 text-sm'>{item.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </FullContainer>
            </div>
        </div>
    )

}