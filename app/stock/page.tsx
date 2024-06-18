import AppNav from "../../components/server/AppNav"
import FullContainer from "../../components/server/Containers"
import Indices from "./Indices"
import Lives from "./Lives"
import Plates from "./Plates"

export const metadata = {
    title: '股市',
}

export default function Page() {

    return (
        <div className='flex-1-col p-4 md:p-8 gap-4 md:gap-6'>

            <AppNav paths={[{ name: '股市' }]} />

            <Indices />

            <div className="flex flex-row gap-4 md:gap-6">
                <div className="flex-1-col box-card">
                    <Lives />
                </div>
                <div className="w-96 flex flex-0 flex-col gap-4">
                    <div className="box-card p-4">
                        <div className="mb-2">
                            行业板块
                            <i className="fa-solid fa-arrow-trend-up text-red-500 ml-2"></i>
                        </div>
                        <Plates />
                    </div>
                </div>
            </div>
        </div>
    )

}
