import React from 'react'

import config from '../../../_config/config'
import Intro from '../../components/intro/intro'
import Promos from '../../components/promos/promos'
import OurSolutions from '../../components/our-solutions/our-solutions'
import TheCompany from '../../components/the-company/the-company'
import ContactUs from '../../components/contact-us/contact-us'
import Head from 'next/head'

function Home() {
  return !config.home ? null : (
    <>
      <Head>
        <title>{config.brand.motto}</title>
      </Head>

      {config.home.components.map((c, i) => (
        <div key={i}>
          <div id={c.type} />
          {c.type === 'intro' ? (
            <Intro {...c.props} />
          ) : c.type === 'promos' ? (
            <Promos {...c.props} />
          ) : c.type === 'solutions' ? (
            <OurSolutions {...c.props} />
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
