import { ReactNode } from 'react'
import { geramiSizeTypes } from 'gerami'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { IImgSrc } from '../../../lib/img-src'
import { IYogaProps } from 'gerami/src/components/Yoga/Yoga'

export type OurSolutionsProps = {
  description?: string | ReactNode

  primarySolution?: ISolution
  otherSolutionsMaxPerCol?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  otherSolutions?: ISolution[]

  solutionTypesMaxPerCol?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  solutionTypes?: ISolutionType[]
}

export type ISolution = {
  className?: string
  bg?: IImgSrc
  overlayProps?: IYogaProps
  logo?: IImgSrc
  logoSize?: geramiSizeTypes
  title: string | ReactNode
  description: string | ReactNode
  actions?: ReactNode[]
}

export type ISolutionType = {
  icon: IconProp
  name: string | ReactNode
}
