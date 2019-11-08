import { useEffect, useRef, useState } from 'react'

import imgSrc, { IImgSrcInput, white1x1 } from '../../../lib/img-src'

function useImgSrc(input?: IImgSrcInput): string {
  const src = imgSrc(input)

  const [ret, setRet] = useState(src && src.placeholder)

  const timeoutRef = useRef<any>()
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (src === undefined) return

      const webP = document.querySelector('html').classList.contains('webp')

      if (webP && src.webP !== undefined) setRet(src.webP)
      else setRet(src.src)
    }, 0)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [input])

  return ret !== undefined ? ret : white1x1
}

export default useImgSrc
