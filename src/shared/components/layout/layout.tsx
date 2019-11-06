import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import { MinHeightProperty } from 'csstype'
import { Page, Warning } from 'gerami'

import Header, { IHeaderProps } from './header/header'
import Footer from './footer/footer'

type ILayoutProps = PropsWithChildren<{
  error?: any
  nonContentHeight?: MinHeightProperty<string | number>
  headerOptions?: IHeaderProps
  overrideHeader?: ReactNode
  overrideFooter?: ReactNode
  preHeader?: ReactNode
}>

function Layout({
  children,
  nonContentHeight: nch,
  error,
  headerOptions,
  overrideHeader,
  overrideFooter,
  preHeader
}: ILayoutProps) {
  const contentMinHeight = nch
    ? `calc(100vh - ${nch}${typeof nch === 'number' ? 'px' : ''})`
    : `100vh`

  return error ? (
    <Page>
      <Warning problem={error} size={'XXL'} />
    </Page>
  ) : (
    <>
      {preHeader}
      {overrideHeader || <Header {...headerOptions} />}

      <div style={{ minHeight: contentMinHeight }}>{children}</div>

      {overrideFooter || <Footer />}
    </>
  )
}

export default Layout
