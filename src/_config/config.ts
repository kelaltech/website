import configSrc from './config-src'

import { IHomeConfig } from '../layout-default/pages/home/i-home-config'
import { ReactNode } from 'react'

type IConfigFromEnv = {
  brand: {
    name: string
    shortName: string
    description: string
    keywords: string[]
    copyright: string
    varName: string
  }
}
export type IConfigSrc = {
  brand: {
    logo: {
      svgSrc: string
    }
    wordMark: {
      component: string | ReactNode
    }
    motto: string
  }

  home: IHomeConfig
}
export type IConfig = IConfigFromEnv & IConfigSrc

const configFromEnv: IConfigFromEnv = {
  brand: {
    name: process.env.REACT_APP_NAME || '',
    shortName: process.env.REACT_APP_SHORT_NAME || '',
    description: process.env.REACT_APP_DESCRIPTION || '',
    keywords: (process.env.REACT_APP_KEYWORDS || '')
      .split(',')
      .map(keyword => keyword.trim()),
    copyright: process.env.REACT_APP_COPYRIGHT || '',
    varName: process.env.REACT_APP_VAR_NAME || ''
  }
}
const config: IConfig = Object.assign({
  ...configFromEnv,
  ...configSrc,
  brand: { ...configFromEnv.brand, ...configSrc.brand }
})
export default config
