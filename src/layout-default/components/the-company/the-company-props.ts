import { ReactNode } from 'react'

import { IImgSrc } from '../../../lib/img-src'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type TheCompanyProps = {
  bg?: IImgSrc
  description?: string | ReactNode
  team?: {
    name: string | ReactNode
    photoSrc: IImgSrc
    links?: {
      icon: IconProp
      url: string
    }[]
  }[]
}
