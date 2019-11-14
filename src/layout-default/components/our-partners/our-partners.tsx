import React, { useMemo } from 'react'
import { Block, Content, Yoga } from 'gerami'
import { OurPartnersProps } from './our-partners-props'
import useImgSrcMulti from '../../../shared/hooks/use-img-src-multi/use-img-src-multi'

import './our-partners.scss'

function OurPartners({ ourPartners }: OurPartnersProps) {
  const _companyLogo = useMemo(() => ourPartners.map(c => c.logo), [
    ourPartners
  ])
  const companyLogo = useImgSrcMulti(_companyLogo)

  return (
    <Content size="3XL" transparent data-aos="fade-up">
      <Block first>
        <h1>Our Partners</h1>
      </Block>

      <Block last>
        <Yoga maxCol={3}>
          {ourPartners.map((p, i) => (
            <div className={'partners-logo-box'} key={i}>
              <img
                src={companyLogo[i]}
                alt={typeof p.name === 'string' ? p.name : 'company logo'}
              />
              <p>{p.name}</p>
            </div>
          ))}
        </Yoga>
      </Block>
    </Content>
  )
}

export default OurPartners
