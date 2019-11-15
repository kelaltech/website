import React from 'react'
import { Block, Content, Yoga } from 'gerami'
import { OurPartnersProps } from './our-partners-props'

import './our-partners.scss'
import LiteImage from '../../../shared/components/lite-image/lite-image'

function OurPartners({ ourPartners }: OurPartnersProps) {
  return (
    <div className={'our-partners-container margin-top-very-big'}>
      <Content size="3XL" transparent data-aos="fade-up">
        <Block first last>
          <Yoga maxCol={3}>
            {ourPartners.map((p, i) => (
              <div className={'partners-logo-box'} key={i}>
                <LiteImage
                  src={p.logo}
                  alt={typeof p.name === 'string' ? p.name : 'company logo'}
                  native
                  height={50}
                />
                {/*<p>{p.name}</p>*/}
              </div>
            ))}
          </Yoga>
        </Block>
      </Content>
    </div>
  )
}

export default OurPartners
