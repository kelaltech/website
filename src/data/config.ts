import { ReactNode } from 'react'

import { IHomeConfig } from '../layout-default/pages/home/i-home-config'
import configSrc from './config-src'
import data from './data.json'

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
    name: data.NAME || '',
    shortName: data.SHORT_NAME || '',
    description: data.DESCRIPTION || '',
    keywords: (data.KEYWORDS || '').split(',').map(keyword => keyword.trim()),
    copyright: data.COPYRIGHT || '',
    varName: data.VAR_NAME || ''
  }
}
const config: IConfig = Object.assign({
  ...configFromEnv,
  ...configSrc,
  brand: { ...configFromEnv.brand, ...configSrc.brand }
})
export default config
