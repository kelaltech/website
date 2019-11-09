import { useEffect, useRef, useState } from 'react'

import imgSrc, { IImgSrcInput, placeholder1x1 } from '../../../lib/img-src'

function useImgSrc(
  input?: IImgSrcInput,
  timeout: number | null = null
): string {
  const src = imgSrc(input)

  const [ret, setRet] = useState(src && src.placeholder)

  const applyImgSrc = () => {
    if (src === undefined) return

    const webP = document.querySelector('html').classList.contains('webp')

    if (webP && src.webP !== undefined) setRet(src.webP)
    else setRet(src.src)
  }

  const timeoutRef = useRef<any>()
  useEffect(() => {
    if (timeout !== null) timeoutRef.current = setTimeout(applyImgSrc, timeout)
    else applyImgSrc()

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [input])

  return ret !== undefined ? ret : placeholder1x1
}

export default useImgSrc
