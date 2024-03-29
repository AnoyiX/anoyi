import './globals.css';
import { Toaster } from "react-hot-toast";

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
    <html lang='zh'>
      <body className="bg-gray-100 min-h-screen w-full">
        <div className='min-h-screen mx-auto flex lg:container'>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}
