import React, { PropsWithChildren } from 'react'
import { Parallax } from 'react-parallax'

import { IImgSrcInput } from '../../../lib/img-src'
import useImgSrc from '../../hooks/use-img-src/use-img-src'

type ReactParallaxProps = any

export type LiteParallaxProps = Omit<ReactParallaxProps, 'bgImage'> & {
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
    <Parallax bgImage={source} alt="" {...(restAsParallaxProps as any)}>
      {children}
    </Parallax>
  )
}

export default LiteParallax
