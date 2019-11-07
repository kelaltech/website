import React from 'react'
import App from 'next/app'
import { DefaultSeo } from 'next-seo/lib'
import * as Aos from 'aos'

import '../src/assets/styles/index.scss'
import '../src/_config/config' // for the style override
import { initGA, logPageView } from '../src/assets/scripts/google-analytics'
import SEO from '../src/assets/configs/seo'

// fontawesome config for SSR
import '@fortawesome/fontawesome-svg-core/styles.css'
import * as faSvgCore from '@fortawesome/fontawesome-svg-core'
faSvgCore.config.autoAddCss = false

// AMP support
export const config = { amp: 'hybrid' }

class MyApp extends App {
  componentDidMount() {
    const isOperaMini = !!navigator.userAgent.match(/Opera Mini/i)

    // animate on scroll (except for Opera Mini)
    if (isOperaMini) {
      document.querySelector('html').classList.add('no-aos')
    } else {
      Aos.init({
        anchorPlacement: 'top-bottom',
        duration: 500,
        easing: 'ease-out',
        once: true,
        offset: 0
      })
    }

    // modernizr
    // todo: ??? modernizr()

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
