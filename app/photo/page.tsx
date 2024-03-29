import AppNav from "@/components/server/AppNav"
import Photos from "./Photos"
import FullContainer from "@/components/server/Containers"

export const metadata = {
    title: '相册',
}

export default function Page() {

    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>
            <AppNav paths={[{ name: '相册' }]} />
            <FullContainer>
                <Photos />
            </FullContainer>
        </div>
    )

}
