import React, { PropsWithChildren } from 'react'
import { Parallax, ParallaxProps } from 'react-parallax'

import { IImgSrcInput } from '../../../lib/img-src'
import useImgSrc from '../../hooks/use-img-src/use-img-src'

export type LiteParallaxProps = Omit<ParallaxProps, 'bgImage'> & {
  src?: IImgSrcInput
}

function LiteParallax({
  children,
  src,
  ...restAsParallaxProps
}: PropsWithChildren<LiteParallaxProps>) {
  const source = useImgSrc(src)

  return source === undefined ? (
    <>{children}</>
  ) : (
    <Parallax bgImage={source} bgImageAlt="" {...restAsParallaxProps}>
      {children}
    </Parallax>
  )
}

export default LiteParallax
