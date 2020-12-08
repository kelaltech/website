import { geramiSizeTypes } from 'gerami'
import { IYogaProps } from 'gerami/src/components/Yoga/Yoga'
import { ReactNode } from 'react'

import { IImgSrc } from '../../../lib/img-src'

export type OurSolutionsProps = {
  description?: string | ReactNode

  primarySolution?: ISolution
  otherSolutionsMaxPerCol?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  otherSolutions?: ISolution[]
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
