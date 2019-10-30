import React from 'react'
import App from 'next/app'
import { DefaultSeo } from 'next-seo/lib'

import '../src/assets/styles/_app.scss'
import SEO from '../src/assets/configs/seo'
import Layout from '../src/shared/components/layout/layout'
import { initGA, logPageView } from '../src/assets/scripts/google-analytics'

// AMP support
export const config = { amp: 'hybrid' }

class MyApp extends App {
  componentDidMount() {
    if (!(window as any).GA_INITIALIZED) {
      initGA()
      ;(window as any).GA_INITIALIZED = true
    }
    logPageView()
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <DefaultSeo {...SEO} />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}

export default MyApp
