import React from 'react'
import { Block, Container, Content, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './promos.scss'
import { PromosProps } from './promos-props'
import LiteParallax from '../../../shared/components/lite-parallax/lite-parallax'

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
                    <Content className="promos-promo bg-blackish fg-whitish center">
                      <Block first>
                        <FontAwesomeIcon
                          icon={p.icon}
                          size="4x"
                          className="margin-top-very-big margin-bottom-big fg-accent"
                        />
                      </Block>
                      <Block last>
                        <h3 className="light">{p.label}</h3>
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
