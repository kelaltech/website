import { ReactNode } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export type ContactUsProps = {
  description?: string | ReactNode

  phones?: string[]
  emails?: string[]
  addresses?: { name: string; url: string }[]
  socials?: { icon: IconProp; url: string }[]

  messageSubmitApiPath?: string
}
