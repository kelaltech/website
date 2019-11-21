import React from 'react'
import { Content, Yoga } from 'gerami'

import './our-partners.scss'
import { OurPartnersProps } from './our-partners-props'
import LiteImage from '../../../shared/components/lite-image/lite-image'

function OurPartners({ partners }: OurPartnersProps) {
  return (
    <div className={'our-partners-container margin-top-very-big'}>
      <Content size="3XL" transparent data-aos="fade-up">
        <Yoga maxCol={3}>
          {partners.map((partner, i) => (
            <div className={'our-partners-logo-box'} key={i}>
              <LiteImage
                src={partner.logo}
                alt={partner.name}
                title={partner.name}
                native
                height={50}
              />
            </div>
          ))}
        </Yoga>
      </Content>
    </div>
  )
}

export default OurPartners
