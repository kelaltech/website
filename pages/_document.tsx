import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo-512.png" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              const isOperaMini = !!navigator.userAgent.match(/Opera Mini/i)
              if (isOperaMini) document.querySelector('html').classList.add('no-aos')
              `
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
