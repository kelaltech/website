export type IImgSrc = {
  src: string
  webP?: string
  placeholder?: string
}

export type IImgSrcInput = string | IImgSrc

const white1x1 = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA8ADwAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AA//Z`

function imgSrc(src: IImgSrcInput = 'none'): IImgSrc | undefined {
  return typeof src === 'undefined'
    ? undefined
    : typeof src === 'string'
    ? { src, webP: src, placeholder: src }
    : {
        src: src.src,
        webP: src.webP !== undefined ? src.webP : src.src,
        placeholder: src.placeholder !== undefined ? src.placeholder : white1x1
      }
}

export default imgSrc
