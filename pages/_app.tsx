import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Head from 'next/head'
import { GoogleAnalytics } from "nextjs-google-analytics"
config.autoAddCss = false

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="referrer" content="no-referrer" />
        <link rel="shortcut icon" href="https://cdn.jsdelivr.net/gh/AnoyiX/cdn@main/anoyi-favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.1.1/css/all.min.css" />
      </Head>

      <div className="bg-gray-200 min-h-screen w-full ">
        <div className='min-h-screen container mx-auto flex'>
          <Component {...pageProps} />
        </div>
      </div>
      {
        !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && <GoogleAnalytics strategy="lazyOnload" />
      }
    </>

  )
}

export default App