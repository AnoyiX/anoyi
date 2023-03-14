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
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

            <AppNav paths={[{ name: '股市' }]} />

            <Indices />

            <div className="w-full flex flex-1 gap-4 md:gap-6">
                <FullContainer>
                    <Lives />
                </FullContainer>
                <div className="w-96 flex flex-0 flex-col gap-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="mb-2">
                            板块涨幅榜
                            <i className="fa-solid fa-arrow-trend-up text-red-500 ml-2"></i>
                        </div>
                        <Plates is_acs={true} limit={9} />
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="mb-2">
                            板块跌幅榜
                            <i className="fa-solid fa-arrow-trend-down text-green-500 ml-2"></i>
                        </div>
                        <Plates is_acs={false} limit={9} />
                    </div>
                </div>
            </div>
        </div>
    )

}
