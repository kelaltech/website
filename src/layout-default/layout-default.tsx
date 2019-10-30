import React, { PropsWithChildren } from 'react'

import Layout from '../shared/components/layout/layout'
import layoutLoginNavigation from './configs/layout-default-navigation'

type LayoutDefaultProps = {
  error?: any
}

function LayoutDefault({
  children,
  error
}: PropsWithChildren<LayoutDefaultProps>) {
  return (
    <Layout
      noShell={false}
      preHeader={null}
      headerOptions={{ navigation: layoutLoginNavigation(undefined) }}
      error={error}
    >
      {children}
    </Layout>
  )
}

export default LayoutDefault
