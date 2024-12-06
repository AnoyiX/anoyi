import AppNav from "../../components/server/AppNav"
import { ETFs } from "./ETFs"

export const metadata = {
    title: 'ETF',
}

export default function Page() {

    return (
        <div className='flex-1-col p-4 md:p-8 gap-4 md:gap-6'>
            <AppNav paths={[{ name: 'ETF' }]} />
            <ETFs />
        </div>
    )

}
