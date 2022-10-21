import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import Router from "next/router"
import { GoogleAnalytics } from "nextjs-google-analytics"
import { Toaster } from 'react-hot-toast'

function App({ Component, pageProps }: AppProps) {

  const [showProcess, setShowProcess] = useState(false)
  const [progress, setProgress] = useState(0)

  Router.events.on("routeChangeStart", (url) => {
    if (url.split('?')[0] !== window.location.pathname) {
      setShowProcess(true)
      setProgress(10)
      setTimeout(() => {
        setProgress(pre => pre < 95 ? pre + Math.floor(Math.max(1, Math.random() * 20)) : pre)
      }, 200)
    }
  })
  Router.events.on("routeChangeComplete", (url) => {
    setProgress(100)
    setTimeout(() => setShowProcess(false), 100)
  })
  Router.events.on("routeChangeError", (url) => {
    setProgress(100)
    setTimeout(() => setShowProcess(false), 100)
  })


  return (
    <div className="bg-gray-100 min-h-screen w-full ">
      {
        showProcess && <div className='h-[2px] w-1/2 bg-blue-500 rounded-r-full fixed left-0 top-0 shadow-lg shadow-blue-500/75 transition-[width] duration-200 z-50' style={{ width: `${progress}%` }}></div>
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