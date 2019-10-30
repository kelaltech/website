export type IImgSrc =
  | string
  | {
      webP: string
      other: string
    }

function imgSrc(src?: IImgSrc | null): string | undefined {
  return src === undefined || src === null
    ? undefined
    : typeof src === 'string'
    ? src
    : src.other
  // todo
  // : window && window.Modernizr && window.Modernizr.webp
  // ? src.webP
  // : src.other
}

export default imgSrc
