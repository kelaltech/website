import { ReactNode } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { IImgSrcInput } from '../../../lib/img-src'

export type ContactUsProps = {
  bg?: IImgSrcInput
  description?: string | ReactNode

  phones?: string[]
  emails?: string[]
  addresses?: { name: string; url: string }[]
  socials?: { icon: IconProp; url: string }[]

  messageSubmitApiPath?: string
}
