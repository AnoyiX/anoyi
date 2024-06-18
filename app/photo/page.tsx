import AppNav from "@/components/server/AppNav"
import { Photos } from "./Photos"

export const metadata = {
    title: '相册',
}

export default function Page() {

    return (
        <div className='flex-1-col p-4 md:p-8 gap-4 md:gap-6'>
            <AppNav paths={[{ name: '相册' }]} />
            <div className='flex flex-1 flex-col box-card'>
                <Photos />
            </div>
        </div>
    )

}
