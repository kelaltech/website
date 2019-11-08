import * as React from 'react'
import imgSrc, { IImgSrcInput } from '../../../lib/img-src'

export type BackgroundImageProps = {
  selector: string
  src?: IImgSrcInput
}

function BackgroundImage({ selector, src }: BackgroundImageProps) {
  const source = imgSrc(src)

  return source === undefined ? null : (
    <style jsx>{`
      ${selector} {
        background-image: ${source.placeholder
          ? 'url(' + source.placeholder + ')'
          : 'none'};
      }
      .webp ${selector} {
        background-image: ${source.webP ? 'url(' + source.webP + ')' : ''};
      }
      .no-webp ${selector} {
        background-image: ${source.src};
      }
    `}</style>
  )
}

export default BackgroundImage
