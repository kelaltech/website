import React, { ReactNode } from 'react'
import { Block, Content, Image, Yoga } from 'gerami'
import { Parallax } from 'react-parallax'
import ProgressiveImage from 'react-progressive-image'

import './our-solutions.scss'
import { ISolution, OurSolutionsProps } from './our-solutions-props'
import imgSrc from '../../../lib/img-src'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const renderSolution = (solution: ISolution): ReactNode => (
  <div className={solution.className}>
    <ProgressiveImage
      placeholder={imgSrc(solution.bg).placeholder}
      src={imgSrc(solution.bg).src}
    >
      {src => (
        <Parallax
          bgImage={src}
          bgAlt=""
          strength={200}
          className="our-solutions-solution-parallax"
        >
          <Yoga
            maxCol={solution.logo !== undefined ? 2 : 1}
            {...solution.overlayProps}
            className={`our-solutions-solution-overlay ${
              solution.bg !== undefined
                ? 'our-solutions-solution-overlay-active'
                : ''
            } ${
              solution.overlayProps && solution.overlayProps.className
                ? solution.overlayProps.className
                : ''
            }`}
          >
            {solution.logo !== undefined ? (
              <div className="our-solutions-solution-left" data-aos="zoom-in">
                <ProgressiveImage
                  placeholder={imgSrc(solution.logo).placeholder}
                  src={imgSrc(solution.logo).src}
                >
                  {src => (
                    <Image
                      src={src}
                      size={solution.logoSize || '3XL'}
                      className="our-solutions-solution-logo"
                    />
                  )}
                </ProgressiveImage>
              </div>
            ) : null}

            <div className="our-solutions-solution-right">
              <Block first={solution.logo !== undefined}>
                <h1 className="our-solutions-solution-title">
                  {solution.title}
                </h1>
              </Block>

              <Block last={!!solution.actions}>
                <div className="our-solutions-solution-description">
                  {solution.description}
                </div>
              </Block>

              <Block
                last={!!solution.actions}
                className="our-solutions-solution-actions"
              >
                <div style={{ margin: -4 }}>
                  {solution.actions &&
                    solution.actions.map((a, i) => (
                      <span
                        key={i}
                        className="inline-block"
                        style={{ padding: 4 }}
                        data-aos="fade-up"
                        data-aos-delay={i * 50}
                      >
                        {a}
                      </span>
                    ))}
                </div>
              </Block>
            </div>
          </Yoga>
        </Parallax>
      )}
    </ProgressiveImage>
  </div>
)

function OurSolutions({
  description,

  primarySolution,
  otherSolutionsMaxPerCol = 2,
  otherSolutions,

  solutionTypesMaxPerCol = 4,
  solutionTypes
}: OurSolutionsProps) {
  return (
    <div className="our-solutions padding-vertical-very-big">
      <Content size="3XL" transparent data-aos="fade-up">
        <Block first>
          <h1>Our Solutions</h1>
        </Block>

        {description && (
          <Block last className="fg-blackish font-S italic justify">
            {description}
          </Block>
        )}

        {(primarySolution || (otherSolutions && !!otherSolutions.length)) && (
          <Block className="our-solutions-primary-solution our-solutions-solution">
            <div data-aos="fade-up">
              {primarySolution && renderSolution(primarySolution)}
            </div>

            {otherSolutions && !!otherSolutions.length && (
              <Yoga
                maxCol={otherSolutionsMaxPerCol}
                className="our-solutions-other-solutions"
              >
                {otherSolutions.map((s, i) => (
                  <div
                    key={i}
                    className="our-solutions-solution"
                    data-aos="fade-up"
                    data-aos-delay={50 + i * 50}
                  >
                    {renderSolution(s)}
                  </div>
                ))}
              </Yoga>
            )}
          </Block>
        )}
      </Content>

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
    </div>
  )
}

export default OurSolutions
