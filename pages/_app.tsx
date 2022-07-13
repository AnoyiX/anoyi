import '../styles/globals.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-200 min-h-screen w-full ">
      <div className='min-h-screen container mx-auto flex'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default App