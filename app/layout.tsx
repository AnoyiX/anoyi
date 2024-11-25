import { ViewTransitions } from 'next-view-transitions'
import { Toaster } from "react-hot-toast"

import './globals.css'
import './apps.css'

export const metadata = {
  title: '轻量级云原生架构实验室',
  referrer: 'no-referrer',
  icons: {
    shortcut: 'https://cdn.jsdelivr.net/gh/AnoyiX/cdn@main/anoyi-favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <ViewTransitions>
      <html>
        {
          process.env.NEXT_PUBLIC_ENABLE_REACT_SCAN && (
            <head>
              <script src="https://unpkg.com/react-scan/dist/auto.global.js" async></script>
            </head>
          )
        }
        <body className="flex min-h-screen text-foreground bg-slate-100">
          <div className='flex flex-1 flex-col mx-auto lg:container'>
            {children}
          </div>
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  )
}
