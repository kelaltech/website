import { ReactNode } from 'react'
import { IImgSrcInput } from '../../../lib/img-src'

export type OurPartnersProps = {
  ourPartners: PartnersProps[]
}
export type PartnersProps = {
  name: string | ReactNode
  logo: IImgSrcInput
  description?: string | ReactNode
}
