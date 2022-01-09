export default function FullContainer(props: any) {
    return (
        <div className='bg-white flex flex-1 rounded-lg shadow'>
            <div className='flex-none w-full h-full'>
                {props.children}
            </div>
        </div>
    )
}