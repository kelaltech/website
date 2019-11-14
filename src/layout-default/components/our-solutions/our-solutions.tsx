import React, { ReactNode } from 'react'
import { Block, Content, Yoga } from 'gerami'

import './our-solutions.scss'
import { ISolution, OurSolutionsProps } from './our-solutions-props'
import LiteParallax from '../../../shared/components/lite-parallax/lite-parallax'
import LiteImage from '../../../shared/components/lite-image/lite-image'

const renderSolution = (solution: ISolution): ReactNode => {
  const renderedSolution = (
    <Yoga
      maxCol={solution.logo !== undefined ? 2 : 1}
      {...solution.overlayProps}
      className={`our-solutions-solution-overlay ${
        solution.bg !== undefined ? 'our-solutions-solution-overlay-active' : ''
      } ${
        solution.overlayProps && solution.overlayProps.className
          ? solution.overlayProps.className
          : ''
      }`}
    >
      {solution.logo !== undefined ? (
        <div className="our-solutions-solution-left" data-aos="zoom-in">
          <LiteImage
            src={solution.logo}
            size={solution.logoSize || '3XL'}
            className="our-solutions-solution-logo"
          />
        </div>
      ) : null}

      <div className="our-solutions-solution-right">
        <Block first={solution.logo !== undefined}>
          <h1 className="our-solutions-solution-title">{solution.title}</h1>
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
  )

  if (!solution.bg) {
    return renderedSolution
  } else {
    return (
      <div className={solution.className}>
        <LiteParallax
          src={solution.bg}
          strength={200}
          className="our-solutions-solution-parallax"
        >
          {renderedSolution}
        </LiteParallax>
      </div>
    )
  }
}

function OurSolutions({
  description,

  primarySolution,
  otherSolutionsMaxPerCol = 2,
  otherSolutions
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
    </div>
  )
}

export default OurSolutions
