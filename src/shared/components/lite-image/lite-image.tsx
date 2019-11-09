import React, { PropsWithChildren } from 'react'
import { Image } from 'gerami'
import { IImageProps } from 'gerami/src/components/Image/Image'

import { IImgSrcInput } from '../../../lib/img-src'
import useImgSrc from '../../hooks/use-img-src/use-img-src'

export type LiteParallaxProps = Omit<IImageProps, 'src'> & {
  src?: IImgSrcInput
  native?: boolean
  alt?: string
}

function LiteImage({ src, native, ...restAsImageProps }: LiteParallaxProps) {
  const source = useImgSrc(src)

  return source === undefined ? null : native ? (
    <img src={source} {...(restAsImageProps as any)} />
  ) : (
    <Image src={source} {...(restAsImageProps as any)} />
  )
}

export default LiteImage