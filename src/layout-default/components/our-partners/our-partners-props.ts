import { ReactNode } from 'react'

import { IImgSrcInput } from '../../../lib/img-src'

export type OurPartnersProps = {
  partners: {
    name: string
    logo: IImgSrcInput
    description?: string | ReactNode
  }[]
}
