export interface IOutsideLink {
    name: string
    url: string
    icon?: string

}

export default function OutsideLink({ name, url, icon, ...props }: IOutsideLink & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {

    return (
        <div className='flex flex-col space-y-2'>
            <a href={url} className='w-20 h-20 border border-gray-200 rounded-2xl p-2 bg-gray-200 bg-opacity-25' target='_blank'>
                <img src={icon} alt="" className="w-full h-full"/>
            </a>
            <span className="text-sm text-gray-700">{name}</span>
        </div>
    )

}