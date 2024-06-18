import AppNav from "@/components/server/AppNav"
import { Repos } from "./Repos"

export const metadata = {
    title: '开源项目',
}

export default function Page() {
    return (
        <div className='flex-1-col p-4 md:p-8 gap-4 md:gap-6'>
            <AppNav paths={[{ name: '相册' }]} />
            <div className='flex-1-col box-card'>
                <Repos />
            </div>
        </div>
    )
}