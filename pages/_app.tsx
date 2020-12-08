import { DefaultSeo } from 'next-seo/lib'
import App from 'next/app'
import React from 'react'

// fontawesome config for SSR
import * as faSvgCore from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import SEO from '../src/assets/configs/seo'
import { initGA, logPageView } from '../src/assets/scripts/google-analytics'
import '../src/assets/styles/index.scss'
import '../src/data/config' // for the style override

faSvgCore.config.autoAddCss = false

// AMP support
export const config = { amp: 'hybrid' }

class MyApp extends App {
  componentDidMount() {
    // NOTE: DISABLED AOS FOR A BETTER PERFORMANCE & SEO
    // // animate on scroll
    // Aos.init({
    //   anchorPlacement: 'top-bottom',
    //   duration: 500,
    //   easing: 'ease-out',
    //   once: true,
    //   offset: 0
    // })
    // // fix for semi-triggered aos
    // window.addEventListener('load', () => Aos.refresh())

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
