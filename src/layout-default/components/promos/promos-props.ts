import { ReactNode } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { IImgSrc } from '../../../lib/img-src'

export type PromosProps = {
  bg: IImgSrc | null
  maxPromoPerColumn?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  promos: {
    icon: IconProp
    label: string | ReactNode
  }[]
}
