export default function FullContainer(props: any) {
    return (
        <div className='box-card flex flex-1'>
            <div className='flex-none w-full h-full'>
                {props.children}
            </div>
        </div>
    )
}