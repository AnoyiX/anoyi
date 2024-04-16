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
        <body className="min-h-screen w-full text-foreground bg-slate-100">
          <div className='min-h-screen mx-auto flex lg:container'>
            {children}
          </div>
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  )
}
