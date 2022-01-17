import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class GlobalDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="referrer" content="no-referrer" />
                    <link rel="shortcut icon" href="https://cdn.anoyi.com/anoyi-favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default GlobalDocument