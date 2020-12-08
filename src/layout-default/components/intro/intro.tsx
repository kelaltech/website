import { Button, Image } from 'gerami'
import React from 'react'

import config from '../../../data/config'
import LiteParallax from '../../../shared/components/lite-parallax/lite-parallax'
import { IntroProps } from './intro-props'
import './intro.scss'

function Intro({ bg, displayTitle, displaySubtitle }: IntroProps) {
  return (
    <>
      <div className="header-negation" />

      <LiteParallax src={bg} strength={200}>
        <div className="intro-container">
          <Image
            className="intro-logo"
            src={config.brand.logo.svgSrc}
            size={'L'}
            data-aos="zoom-in-up"
            data-aos-easing="ease-out-back"
          />

          <div
            className="intro-wordmark"
            data-aos="zoom-in-up"
            data-aos-duration={700}
            data-aos-easing="ease-out-back"
          >
            {config.brand.wordMark.component}
          </div>

          <div data-aos="fade-right" data-aos-delay={50}>
            <h1 className="intro-display-title">{displayTitle}</h1>
          </div>
          <div data-aos="fade-left" data-aos-delay={100}>
            <h5 className="intro-display-subtitle">{displaySubtitle}</h5>
          </div>

          <div className="intro-cta-container">
            <a
              href="#solutions"
              className="inline-block"
              data-aos="fade-up"
              data-aos-delay={150}
            >
              <Button primary>Discover More</Button>
            </a>
            <a
              href="#contact"
              className="inline-block"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <Button primary>Contact Us</Button>
            </a>
          </div>
        </div>
      </LiteParallax>
    </>
  )
}

export default Intro
