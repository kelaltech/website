import { NextSeoProps } from 'next-seo/lib'

export default {
  title: 'Empower Creators! – Official Website | kelal tech plc',
  description:
    'We Empower Creators. Through Digital Platforms. | We are an Ethiopian-based IT company working on software and hardware solutions for creative businesses.',
  additionalMetaTags: [
    { name: 'author', content: 'kelal tech plc' },
    { name: 'copyright', content: '2020 © kelal tech plc' },
    {
      name: 'keywords',
      content:
        'kelal tech plc,kelal tech.,kelal,kelaltech,empower creators,digital platforms,ethiopia,addis ababa,information technology,software,official company website'
    },
    { name: 'robots', content: 'index,follow' },
    { name: 'theme-color', content: '#00b478' }
  ],

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kelaltech.com/',
    site_name: 'kelal tech plc | Official Website',
    images: [{ url: 'https://www.kelaltech.com/promo.jpg' }]
  },

  twitter: {
    handle: '@kelaltech',
    site: '@kelaltech',
    cardType: 'summary_large_image'
  }
} as NextSeoProps
