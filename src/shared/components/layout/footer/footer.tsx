import React from 'react'
import { Block, Flex, FlexSpacer } from 'gerami'

import './footer.scss'
import config from '../../../../_config/config'

export default function Footer() {
  return (
    <Block first last className="footer font-S fg-blackish">
      <Flex>
        <div className="footer-left">
          {/* THIS IS THE LEFT SIDE OF THE FOOTER */}
        </div>

        <FlexSpacer />

        <div className="footer-center" title={`All rights reserved.`}>
          {config.brand.copyright}
        </div>

        <FlexSpacer />

        <div className="footer-right">
          {/* THIS IS THE RIGHT SIDE OF THE FOOTER */}
        </div>
      </Flex>
    </Block>
  )
}
