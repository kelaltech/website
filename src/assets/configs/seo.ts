import { NextSeoProps } from 'next-seo/lib'

export default {
  title: 'Empower Makers! – Official Website | Kelal Tech PLC',
  description:
    'We Empower Makers Using Digital Platforms | Kelal Tech PLC is an Ethiopia-based IT agency working on software solutions for creative businesses.',
  additionalMetaTags: [
    { name: 'author', content: 'Kelal Tech' },
    {
      name: 'copyright',
      content: `${new Date().getFullYear()} © Kelal Tech PLC`
    },
    {
      name: 'keywords',
      content:
        'Kelal Tech PLC, Kelal Tech, Kelal, kelaltech, Empower Makers, Digital Platforms, Ethiopia, Addis Ababa, Information Technology, Software, Official Company Website, Website Design In Ethiopia, Website Development in Ethiopia'
    },
    { name: 'robots', content: 'index,follow' },
    { name: 'theme-color', content: '#00b478' }
  ],

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kelaltech.com/',
    site_name: 'Kelal Tech PLC | Official Website',
    images: [{ url: 'https://www.kelaltech.com/promo.png' }]
  },

  twitter: {
    handle: '@kelaltech',
    site: '@kelaltech',
    cardType: 'summary_large_image'
  }
} as NextSeoProps
