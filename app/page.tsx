import { Cobe } from "@/components/client/Cobe"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { readFileSync } from 'fs'
import { Link } from 'next-view-transitions'
import path from "path"
import { Socials, User } from "./data"


export default function Page() {

    const apps = JSON.parse(readFileSync(path.join(process.cwd(), 'data/json/apps.json'), 'utf-8'))

    return (
        <div className='flex flex-row flex-1 gap-4 md:gap-6 p-4 md:p-8'>
            <div className='flex flex-col gap-4 md:gap-6'>
                <div className="box-card">
                    <div className='w-full md:w-72 flex flex-col gap-3 items-center justify-center py-4'>
                        <Avatar className='w-28 h-28'>
                            <AvatarImage src={User.avatar} />
                        </Avatar>
                        <div className="text-xl font-medium">{User.nickname}</div>
                        <span className='text-sm text-gray-600'>{User.bio}</span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200" />
                    <div className='flex flex-row gap-3 items-center justify-center text-lg py-3'>
                        {
                            Socials.map((item, index) => (
                                <Link href={item.url} target="_blank" key={index}>
                                    {item.icon}
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className="box-card md:w-72 md:h-72">
                    <Cobe className="w-full h-full" />
                </div>

                <div className='md:flex hidden flex-col items-center space-y-2 text-xs'>
                    <div className='flex flex-row space-x-1 text-slate-500'>
                        <Link href='/doc/about'>
                            <span className="hover:text-blue-600 cursor-pointer">关于作者</span>
                        </Link>
                        <span>·</span>
                        <Link href='/doc/links'>
                            <span className="hover:text-blue-600 cursor-pointer">友情链接</span>
                        </Link>
                        <span>·</span>
                        <Link href='/doc/open'>
                            <span className="hover:text-blue-600 cursor-pointer">开源声明</span>
                        </Link>
                        <span>·</span>
                        <Link href='/doc/terms'>
                            <span className="hover:text-blue-600 cursor-pointer">用户协议</span>
                        </Link>
                    </div>
                    <div className='text-center text-slate-400'>
                        <a href="https://github.com/AnoyiX" target="_blank">Anoyi</a> © 2024 All Rights Reserved
                    </div>
                </div>
            </div>
            <div className="flex flex-1 box-card flex-col">
                <div className='flex flex-row flex-wrap p-8 gap-10'>
                    {
                        apps.map((item: {
                            name: string
                            url: string
                            icon: string
                        }, index: number) => (
                            <div className='flex flex-col items-center gap-3' key={index}>
                                <Link href={item.url} target={(item.url.startsWith('http://') || item.url.startsWith('https://')) ? '_blank' : '_self'} className='cursor-pointer'>
                                    <img src={item.icon} alt="" className='w-16 h-16 box-card' />
                                </Link>
                                <span className='text-default-800 text-sm'>{item.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )

}