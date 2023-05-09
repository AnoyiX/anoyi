import { readFileSync } from "fs"
import path from "path"
import Repos from "./Repos"

export default function Page() {

    const colors = JSON.parse(readFileSync(path.join(process.cwd(), 'data/json/github-colors.json'), 'utf-8'))

    return (
        <Repos colors={colors} />
    )

}
