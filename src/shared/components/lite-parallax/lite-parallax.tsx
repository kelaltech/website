import React, { PropsWithChildren } from 'react'
import ProgressiveImage, {
  ProgressiveImageProps
} from 'react-progressive-image'
import { Parallax, Background } from 'react-parallax'

import imgSrc, { IImgSrcInput } from '../../../lib/img-src'

type ReactParallaxProps = any

export type LiteParallaxProps = {
  progressiveImageProps?: ProgressiveImageProps
  src?: IImgSrcInput
} & ReactParallaxProps

function LiteParallax({
  children,
  progressiveImageProps,
  src,
  ...restAsParallaxProps
}: PropsWithChildren<LiteParallaxProps>) {
  const source = imgSrc(src)

  const parallax = (s: string) => (
    <Parallax {...restAsParallaxProps}>
      {children}

      <Background>
        <picture>
          {src.webP !== undefined && (
            <source srcSet={src.webP} type="image/webp" />
          )}
          <img src={s} alt={restAsParallaxProps.bgImageAlt || ''} />
        </picture>
      </Background>
    </Parallax>
  )

  return source === undefined ? (
    <>{children}</>
  ) : source.placeholder === undefined ? (
    parallax(source.src)
  ) : (
    <ProgressiveImage
      placeholder={source.placeholder}
      src={source.src}
      {...progressiveImageProps}
    >
      {s => parallax(s)}
    </ProgressiveImage>
  )
}

export default LiteParallax
