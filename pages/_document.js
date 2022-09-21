import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="referrer" content="no-referrer" />
                <link rel="shortcut icon" href="https://cdn.jsdelivr.net/gh/AnoyiX/cdn@main/anoyi-favicon.ico" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.1.1/css/all.min.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}