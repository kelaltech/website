import { ReactNode } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { IImgSrc } from '../../../lib/img-src'

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
  solutionTypes?: ISolutionType[]
  solutionTypesMaxPerCol?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}
export type ISolutionType = {
  icon: IconProp
  name: string | ReactNode
}
