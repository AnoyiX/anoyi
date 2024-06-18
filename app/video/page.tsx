import AppNav from "@/components/server/AppNav"
import Videos from "./Videos"

export const metadata = {
    title: '短视频',
}

export default function Page() {

    return (
        <div className='flex flex-1 flex-col p-4 md:p-8 gap-4 md:gap-6'>
            <AppNav paths={[{ name: '短视频' }]} />
            <div className='flex flex-1 flex-col box-card'>
                <Videos />
            </div>
        </div>
    )

}
