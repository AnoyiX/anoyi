import CDN from '../../utils/cdn'
import http from '../../utils/http'
import AppNav from '../../components/server/AppNav'
import FullContainer from '../../components/server/Containers'
import DevIcon, { DevIconProps } from './DevIcon'

export default async function Page() {

    const iconNames = await http.getAll('https://dev-icons.deta.dev/api/icons')

    const icons = iconNames.filter(item => item.toLowerCase()).map(item => ({
        name: item,
        url: CDN.icon(item)
    }))

    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>

            <AppNav paths={[{ name: 'Dev Icons' }]} />

            <FullContainer>

                <div className='p-6 w-fit'>

                    <div className="flex flex-row flex-wrap gap-2">
                        {
                            icons.map((item: DevIconProps) => <DevIcon key={item.name} icon={item} />)
                        }
                    </div>
                </div>

            </FullContainer>

        </div>
    )

}
