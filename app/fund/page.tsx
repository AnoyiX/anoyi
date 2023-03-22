import AppNav from "../../components/server/AppNav"
import Funds from "./Funds"

export const metadata = {
    title: '基金',
}

export default function Page() {

    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>
            <AppNav paths={[{ name: '基金' }]} />
            <Funds />
        </div>
    )

}
