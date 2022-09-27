import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import Router from "next/router"
import { GoogleAnalytics } from "nextjs-google-analytics"
import { Toaster } from 'react-hot-toast'

function App({ Component, pageProps }: AppProps) {

  const [progress, setProgress] = useState(0)

  Router.events.on("routeChangeStart", (url) => {
    if (url !== window.location.pathname) {
      setProgress(20)
      setTimeout(() => {
        setProgress(pre => (pre >= 20 && pre < 95) ? pre + Math.floor(Math.max(1, Math.random() * 20)) : pre)
      }, 500)
    }
  })

  Router.events.on("routeChangeComplete", () => {
    setProgress(100)
    setTimeout(() => setProgress(0), 100)
  })

  Router.events.on("routeChangeError", () => {
    setProgress(100)
    setTimeout(() => setProgress(0), 100)
  })

  return (
    <div className="bg-gray-100 min-h-screen w-full ">
      {
        progress > 0 && progress < 100 && <div className='h-[2px] w-1/2 bg-blue-500 rounded-r-full fixed left-0 top-0 shadow-lg transition-[width] duration-500 z-50' style={{ width: `${progress}%` }}></div>
      }
      <div className='min-h-screen container mx-auto flex'>
        <Toaster />
        <Component {...pageProps} />
      </div>
      {
        !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && <GoogleAnalytics strategy="lazyOnload" />
      }
    </div>
  )
}

export default App