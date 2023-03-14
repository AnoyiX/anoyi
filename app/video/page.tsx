import AppNav from "../../components/server/AppNav"
import FullContainer from "../../components/server/Containers"
import Videos from "./Videos"

export const metadata = {
    title: '短视频',
}

export default function Page() {

    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

            <AppNav paths={[{ name: '短视频' }]} />

            <FullContainer>
                <Videos />
            </FullContainer>

        </div>
    )

}
