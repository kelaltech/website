import { Block, Container, Content, Yoga } from 'gerami'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import LiteParallax from '../../../shared/components/lite-parallax/lite-parallax'
import { PromosProps } from './promos-props'
import './promos.scss'

function Promos({ bg, maxPromoPerColumn = 3, promos }: PromosProps) {
  return (
    <LiteParallax src={bg} strength={300}>
      <div className="promos-container">
        <Content size="3XL" transparent>
          <Container>
            <Block>
              <Yoga maxCol={maxPromoPerColumn}>
                {promos.map((p, i) => (
                  <div
                    key={i}
                    className="padding-big"
                    data-aos="fade-up"
                    data-aos-delay={i * 50}
                  >
                    <Content className="promos-promo fg-blackish center">
                      <Block first>
                        <FontAwesomeIcon
                          icon={p.icon}
                          size="5x"
                          className="margin-top-big margin-bottom-normal fg-primary"
                        />
                      </Block>
                      <Block last>
                        <h4>{p.label}</h4>
                      </Block>
                    </Content>
                  </div>
                ))}
              </Yoga>
            </Block>
          </Container>
        </Content>
      </div>
    </LiteParallax>
  )
}

export default Promos
