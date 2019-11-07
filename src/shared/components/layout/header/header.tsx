import React, { CSSProperties, ReactNode, useState } from 'react'
import { Block, Button, FlexSpacer, Image, MenuDrop, MenuItem } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './header.scss'
import config from '../../../../_config/config'
import { INavigationItem } from './interfaces'

export interface IHeaderProps {
  centerNode?: ReactNode | null
  className?: string
  centerImage?: ReactNode | null
  leftTitle?: ReactNode | null
  navigation?: INavigationItem[]
  overrideLeftNode?: ReactNode | null
  overrideRightNode?: ReactNode | null
  style?: CSSProperties
}

export default function Header({
  centerNode,
  className,
  centerImage,
  leftTitle,
  navigation,
  overrideLeftNode,
  overrideRightNode,
  style
}: IHeaderProps) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <header className={`header ${className || ''}`} style={style}>
      <div className="header-shade-area">
        <Block className="header-block flex">
          {overrideLeftNode === null
            ? undefined
            : overrideLeftNode || (
                <div className={'margin-right-normal'} data-aos="fade-right">
                  {leftTitle === null
                    ? undefined
                    : leftTitle || (
                        <a
                          href="#top"
                          className="gerami-anchor header-wordmark middle relative"
                          title={config.brand.name}
                          style={{ flex: 1 }}
                        >
                          {config.brand.wordMark.component}
                        </a>
                      )}
                </div>
              )}

          {centerNode === null
            ? undefined
            : centerNode || (
                <>
                  <FlexSpacer />
                  {centerImage || (
                    <div className="inline-block" data-aos="fade-down">
                      <Image
                        href="#top"
                        src={config.brand.logo.svgSrc}
                        className="header-logo middle header-nav-max-view"
                        title={config.brand.name}
                      />
                    </div>
                  )}
                  <FlexSpacer />
                </>
              )}

          {overrideRightNode === null ? undefined : overrideRightNode}

          {overrideRightNode !== undefined ||
          !navigation ||
          !navigation.length ? (
            undefined
          ) : (
            <div className="header-nav-min-view middle" data-aos="fade-left">
              <Button
                className="header-nav-btn middle margin-left-normal"
                onClick={() => setIsNavOpen(!isNavOpen)}
                title="Menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </Button>
            </div>
          )}
        </Block>
      </div>

      {overrideRightNode !== undefined || !navigation || !navigation.length ? (
        undefined
      ) : (
        <div className="header-nav-drop-vault header-nav-min-view">
          <MenuDrop
            className="header-nav-drop"
            open={isNavOpen}
            onClose={() => setIsNavOpen(false)}
            align="right"
          >
            <Block className="font-S">
              <a
                className="gerami-anchor"
                href="#top"
                title={config.brand.name}
                style={{ textDecoration: 'none' }}
                onClick={() => setIsNavOpen(false)}
              >
                <span className="bold">{config.brand.shortName}</span>
              </a>
            </Block>
            {navigation &&
              navigation.map((navRoute, i) => (
                <MenuItem
                  key={i}
                  href={navRoute.href}
                  onClick={() => setIsNavOpen(false)}
                  className="header-nav-drop-items"
                  title={navRoute.name}
                >
                  {navRoute.icon && <FontAwesomeIcon icon={navRoute.icon} />}
                  <span className="padding-horizontal-normal" />
                  {navRoute.shortName || navRoute.name}
                </MenuItem>
              ))}
          </MenuDrop>
        </div>
      )}
    </header>
  )
}
