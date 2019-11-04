export type IImgSrc = {
  src?: string
  webP?: string
  placeholder?: string
}

export type IImgSrcInput = string | IImgSrc

function imgSrc(src?: IImgSrcInput): IImgSrc {
  return typeof src === 'undefined'
    ? {}
    : typeof src === 'string'
    ? { src }
    : src
}

export default imgSrc
