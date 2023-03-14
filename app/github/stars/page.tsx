import AppNav from "../../../components/server/AppNav"
import FullContainer from "../../../components/server/Containers"
import { readFileSync } from "fs"
import path from "path"
import Repos from "./Repos"

export const metadata = {
    title: '开源项目',
}

export default function Page() {

    const colors = JSON.parse(readFileSync(path.join(process.cwd(), 'data/json/github-colors.json'), 'utf-8'))

    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

            <AppNav paths={[{ name: '开源项目' }]} />

            <FullContainer>
                <Repos colors={colors} />
            </FullContainer>

        </div>
    )

}
