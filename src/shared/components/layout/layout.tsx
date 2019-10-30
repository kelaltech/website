import React, { PropsWithChildren } from 'react'

import './layout.scss'

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <main>{children}</main>

      <footer className="layout-footer">2019 &copy; kelal tech plc</footer>
    </>
  )
}

export default Layout
