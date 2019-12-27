import React from 'react'
import { Yoga } from 'gerami'

import './our-partners.scss'
import { OurPartnersProps } from './our-partners-props'
import LiteImage from '../../../shared/components/lite-image/lite-image'

function OurPartners({ maxPerCol = 4, partners }: OurPartnersProps) {
  return (
    <div className="our-partners-container margin-top-very-big">
      <Yoga size="3XL" maxCol={maxPerCol} data-aos="fade-up">
        {partners.map((partner, i) => (
          <div className="our-partners-logo-box" key={i}>
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
    </div>
  )
}

export default OurPartners
