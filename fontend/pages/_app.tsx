import type { AppProps } from 'next/app'
import BaseLayout from '../layouts/base'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  )
}

export default App