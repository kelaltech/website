export type IImgSrc = {
  src: string
  webP?: string
  placeholder?: string
}

export type IImgSrcInput = string | IImgSrc

function imgSrc(src: IImgSrcInput = 'none'): IImgSrc | undefined {
  return typeof src === 'undefined'
    ? undefined
    : typeof src === 'string'
    ? { src, webP: src, placeholder: src }
    : {
        src: src.src,
        webP: src.webP !== undefined ? src.webP : src.src,
        placeholder: src.placeholder !== undefined ? src.placeholder : src.src
      }
}

export default imgSrc
