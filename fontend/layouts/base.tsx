export default function BaseLayout({ children }) {
    return (
        <div className="bg-gray-100 w-screen min-h-screen flex justify-center">
            <div className="max-w-screen-2xl flex flex-1">
                {children}
            </div>
        </div>
    )
}