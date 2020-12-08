import React from 'react'

import config from '../../../data/config'
import ContactUs from '../../components/contact-us/contact-us'
import Intro from '../../components/intro/intro'
import OurPartners from '../../components/our-partners/our-partners'
import OurSolutions from '../../components/our-solutions/our-solutions'
import Promos from '../../components/promos/promos'
import TheCompany from '../../components/the-company/the-company'

function Home() {
  return !config.home ? null : (
    <>
      {config.home.components.map((c, i) => (
        <div key={i}>
          <div id={c.type} />
          {c.type === 'intro' ? (
            <Intro {...c.props} />
          ) : c.type === 'promos' ? (
            <Promos {...c.props} />
          ) : c.type === 'solutions' ? (
            <OurSolutions {...c.props} />
          ) : c.type === 'partners' ? (
            <OurPartners {...c.props} />
          ) : c.type === 'company' ? (
            <TheCompany {...c.props} />
          ) : c.type === 'contact' ? (
            <ContactUs {...c.props} />
          ) : null}
        </div>
      ))}
    </>
  )
}

export default Home
