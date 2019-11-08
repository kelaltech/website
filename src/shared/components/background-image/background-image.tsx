import * as React from 'react'
import imgSrc, { IImgSrcInput } from '../../../lib/img-src'
import { PropsWithChildren } from 'react'

export type BackgroundImageProps = {
  selector: string
  src: IImgSrcInput
}

function BackgroundImage({
  children,
  selector,
  src
}: PropsWithChildren<BackgroundImageProps>) {
  const source = imgSrc(src)

  return source === undefined ? (
    <>{children}</>
  ) : (
    <>
      {children}

      <style>{`
        ${selector} {
          background-image: ${
            source.placeholder ? 'url(' + source.placeholder + ')' : 'none'
          };
        }
        .webp ${selector} {
          background-image: ${source.webP ? 'url(' + source.webP + ')' : ''};
        }
        .no-webp ${selector} {
          background-image: ${source.src};
        }
      `}</style>
    </>
  )
}

export default BackgroundImage
