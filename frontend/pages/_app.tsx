import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-200 min-h-screen w-full ">
      <div className='max-w-screen-2xl min-h-screen mx-auto flex'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default App