import CDN from '@/utils/cdn'
import DevIcon, { DevIconProps } from './DevIcon'
import http from '@/utils/http'

export default async function Page() {

    const iconNames: string[] = await http.getAll('https://dev-icons.deta.dev/api/icons')

    const icons = iconNames.filter(item => item.toLowerCase()).map(item => ({
        name: item,
        url: CDN.icon(item)
    }))

    return (
        <div className='p-6 w-fit'>
            <div className="flex flex-row flex-wrap gap-2">
                {
                    icons.map((item: DevIconProps) => <DevIcon key={item.name} icon={item} />)
                }
            </div>
        </div>
    )

}