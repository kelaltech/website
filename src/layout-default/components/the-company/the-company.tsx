import React, { useMemo } from 'react'
import { AccordionSlider, Block, Content, Yoga } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import './the-company.scss'
import { TheCompanyProps } from './the-company-props'
import LiteParallax from '../../../shared/components/lite-parallax/lite-parallax'
import useImgSrcMulti from '../../../shared/hooks/use-img-src-multi/use-img-src-multi'

function TheCompany({
  bg,
  description,
  team,
  solutionTypes,
  solutionTypesMaxPerCol = 4
}: TheCompanyProps) {
  const _teamPhotos = useMemo(() => team.map(t => t.photoSrc), [team])
  const teamPhotos = useImgSrcMulti(_teamPhotos)

  return (
    <>
      <LiteParallax src={bg} strength={200}>
        <div className="padding-vertical-very-big bg-blackish fg-whitish">
          <Content size="3XL" transparent data-aos="fade-up">
            <Block first>
              <h1>The Company</h1>
            </Block>

            <Block last className="fg-whitish">
              {description}
            </Block>

            {team && !!team.length && (
              <Block className="bg-blackish" data-aos="fade-up">
                <Yoga maxCol={2}>
                  <div className="center padding-top-very-big font-L font-family-display">
                    <span>Meet the Team</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="margin-left-big margin-top-small font-S"
                    />
                  </div>

                  <div className="the-company-team-slider-container bg-accent">
                    <AccordionSlider
                      imgs={team.map((m, i) => ({
                        src: teamPhotos[i],
                        caption: (
                          <>
                            <span className="block font-L font-family-display padding-top-normal">
                              {m.name}
                            </span>
                            {m.links && !!m.links.length && (
                              <span className="block">
                                {m.links.map((l, i) => (
                                  <a
                                    key={i}
                                    href={l.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="gerami-anchor the-company-team-link"
                                    aria-label={l.url}
                                  >
                                    <FontAwesomeIcon icon={l.icon} />
                                  </a>
                                ))}
                              </span>
                            )}
                          </>
                        ) as any
                      }))}
                    />
                  </div>
                </Yoga>
              </Block>
            )}
          </Content>
        </div>
      </LiteParallax>
      {solutionTypes && !!solutionTypes.length && (
        <div className="our-solutions-solution-types">
          <Content
            size="3XL"
            transparent
            className="our-solutions-solution-types-wrapper"
          >
            <Block last>
              <Yoga maxCol={solutionTypesMaxPerCol}>
                {solutionTypes.map((st, i) => (
                  <Content
                    key={i}
                    className="our-solutions-solution-type"
                    data-aos="fade-up"
                    data-aos-delay={i * 50}
                  >
                    <Block
                      first
                      className="our-solutions-solution-type-icon-container"
                    >
                      <FontAwesomeIcon
                        icon={st.icon}
                        size="4x"
                        className="our-solutions-solution-type-icon margin-top-very-big margin-bottom-big fg-accent"
                      />
                    </Block>
                    <Block last className="our-solutions-solution-type-name">
                      {st.name}
                    </Block>
                  </Content>
                ))}
              </Yoga>
            </Block>
          </Content>
        </div>
      )}
    </>
  )
}

export default TheCompany
