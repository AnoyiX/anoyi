import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Head from 'next/head'
config.autoAddCss = false

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="referrer" content="no-referrer" />
        <link rel="shortcut icon" href="https://cdn.anoyi.com/anoyi-favicon.ico" />
      </Head>

      <div className="bg-gray-200 min-h-screen w-full ">
        <div className='max-w-screen-2xl min-h-screen mx-auto flex'>
          <Component {...pageProps} />
        </div>
      </div>
    </>

  )
}

export default App