import AppNav from "../../components/server/AppNav"
import { Funds } from "./Funds"

export const metadata = {
    title: '基金',
}

export default function Page() {

    return (
        <div className='flex-1-col p-4 md:p-8 gap-4 md:gap-6'>
            <AppNav paths={[{ name: '基金' }]} />
            <Funds />
        </div>
    )

}
