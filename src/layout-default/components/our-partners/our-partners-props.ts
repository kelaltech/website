import { ReactNode } from 'react'

import { IImgSrcInput } from '../../../lib/img-src'

export type OurPartnersProps = {
  maxPerCol?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  partners: {
    name: string
    logo: IImgSrcInput
    description?: string | ReactNode
  }[]
}
