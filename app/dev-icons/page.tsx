import AppNav from '@/components/server/AppNav'
import CDN from '@/utils/cdn'
import http from '@/utils/http'
import DevIcon, { DevIconProps } from './DevIcon'

export const metadata = {
    title: 'Dev Icons',
}

export default async function Page() {

    const iconNames: string[] = await http.getAll('https://icons.anoyi.com/api/icons')

    const icons: DevIconProps[] = iconNames.filter(item => item.toLowerCase()).map(item => ({
        name: item,
        url: CDN.icon(item)
    }))

    return (
        <div className='flex-1-col p-4 md:p-8 gap-4 md:gap-6'>
            <AppNav paths={[{ name: 'Dev Icons' }]} />
            <div className='flex-1-col box-card p-6'>
                <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
                    {
                        icons.map(item => <DevIcon key={item.name} icon={item} />)
                    }
                </div>
            </div>
        </div>
    )

}
