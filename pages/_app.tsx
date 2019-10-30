import React from 'react'
import App from 'next/app'
import { DefaultSeo } from 'next-seo/lib'
import * as Aos from 'aos'

import '../src/assets/styles/index.scss'
import '../src/_config/config' // for the style override
import modernizr from '../src/assets/scripts/modernizr'
import { initGA, logPageView } from '../src/assets/scripts/google-analytics'
import SEO from '../src/assets/configs/seo'

// AMP support
export const config = { amp: 'hybrid' }

class MyApp extends App {
  componentDidMount() {
    // animate on scroll
    Aos.init({
      anchorPlacement: 'top-bottom',
      duration: 500,
      easing: 'ease-out',
      once: true,
      offset: 0
    })

    // modernizr
    modernizr()

    // google analytics
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
        <div id="top" />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
