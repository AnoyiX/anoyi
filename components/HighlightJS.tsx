import Head from "next/head";
import Script from "next/script";

export default function HighlightJS() {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark-reasonable.min.css" />
            </Head>

            <Script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.1/build/highlight.min.js" strategy="beforeInteractive" />
            <Script>
                {`hljs.highlightAll();`}
            </Script>
        </>
    )
}