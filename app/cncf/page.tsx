import AppNav from "../../components/server/AppNav"
import FullContainer from "../../components/server/Containers"

export const metadata = {
    title: 'Cloud Native Interactive Landscape',
}

export default function Page() {

    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

            <AppNav paths={[{ name: 'Cloud Native Landscape' }]} />

            <FullContainer>
                <iframe src="https://landscape.cncf.io/?fullscreen=yes" className='w-full h-full rounded-lg' />
            </FullContainer>

        </div>
    )

}
