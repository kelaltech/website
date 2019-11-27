import React from 'react'
import { Button } from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAt,
  faAward,
  faChartLine,
  faGlobeAfrica,
  faHandHoldingHeart,
  faHandshake,
  faMobileAlt,
  faSignal
} from '@fortawesome/free-solid-svg-icons'
import { faSmileWink } from '@fortawesome/free-regular-svg-icons'
import {
  faFacebook,
  faGitlab,
  faInstagram,
  faLinkedin,
  faNpm,
  faTelegram,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'

import { IImgSrcInput } from '../../lib/img-src'
import { IConfigSrc } from '../config'

import KelalWordMark from './components/kelal-word-mark/kelal-word-mark'
import LiteImage from '../../shared/components/lite-image/lite-image'

const logoSvg: IImgSrcInput = {
  src: require('./images/brand/logo.svg')
}
const introBg: IImgSrcInput = {
  src: require('./images/home/intro/intro-bg.jpg'),
  webP: require('./images/home/intro/intro-bg.webp')
}
const promosBg: IImgSrcInput = {
  src: require('./images/home/promos/promos-bg.jpg')
}
const theCompanyBg: IImgSrcInput = {
  src: require('./images/home/the-company/the-company-bg.jpg'),
  webP: require('./images/home/the-company/the-company-bg.webp')
}
const kezeraBg: IImgSrcInput = {
  src: require('./images/home/solutions/kezera/bg.jpg'),
  webP: require('./images/home/solutions/kezera/bg.webp')
}
const kezeraLogo: IImgSrcInput = {
  src: require('./images/home/solutions/kezera/logo.png')
}
const kezeraWordMark: IImgSrcInput = {
  src: require('./images/home/solutions/kezera/word-mark.png')
}
const sunitLogo: IImgSrcInput = {
  src: require('./images/home/partners/sun-it-logo-512.png')
}
const fffLogo: IImgSrcInput = {
  src: require('./images/home/partners/3f-logo-512.png')
}

const dreamLogo: IImgSrcInput = {
  src: require('./images/home/partners/dream-logo-512.png')
}

const config: IConfigSrc = {
  brand: {
    logo: {
      svgSrc: logoSvg.src
    },
    wordMark: {
      component: <KelalWordMark />
    },
    motto: 'Empower Creators!'
  },

  home: {
    components: [
      {
        type: 'intro',
        props: {
          bg: introBg,
          displayTitle: 'We Empower Creators.',
          displaySubtitle: 'Through Digital Platforms.'
        }
      },

      {
        type: 'promos',
        props: {
          bg: promosBg,
          maxPromoPerColumn: 3,
          promos: [
            {
              icon: faAward,
              label: (
                <>
                  We Deliver <span className="fg-primary">Excellence!</span>
                </>
              )
            },
            {
              icon: faHandshake,
              label: (
                <>
                  We Love <span className="fg-primary">Partnerships!</span>
                </>
              )
            },
            {
              icon: faChartLine,
              label: (
                <>
                  We Help You <span className="fg-primary">Grow Bigger!</span>
                </>
              )
            }
          ]
        }
      },

      {
        type: 'solutions',
        props: {
          description: (
            <>
              kelal tech. works on a wide range of software and system products,
              from simple websites for small businesses and useful mobile
              applications to open source libraries and fully integrated systems
              for enterprises. We've got you covered!
            </>
          ),

          primarySolution: {
            bg: kezeraBg,
            logo: kezeraLogo,
            logoSize: '6XL',
            title: (
              <LiteImage
                src={kezeraWordMark}
                alt="kezera"
                className="our-solutions-solution_kezera-word-mark"
                native
              />
            ),
            description: (
              <>
                A social platform for voluntary actions that connects volunteers
                to charity (and social enterprise) organizations to respond to
                requests, news and events.
              </>
            ),
            overlayProps: {
              maxCol: 2,
              style: { backgroundColor: 'rgba(63, 81, 181, 0.56)' }
            },
            actions: [
              <a
                href="https://kezera.herokuapp.com/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <FontAwesomeIcon
                    icon={faSmileWink}
                    className="margin-right-normal"
                  />
                  Beta Test Now
                </Button>
              </a>
            ]
          },
          otherSolutionsMaxPerCol: 2,
          otherSolutions: [
            {
              className: 'our-solutions-solution_gerami',
              bg: logoSvg,
              title: 'GERAMI',
              description: (
                <>
                  An open source library for UI designers and web programmers
                  that use{' '}
                  <a
                    className="gerami-anchor"
                    href="https://reactjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', fontWeight: 'bold' }}
                  >
                    React
                  </a>
                  . These GERAMI react components are at the core of our
                  products' beauty.
                </>
              ),
              overlayProps: {
                maxCol: 1,
                style: { backgroundColor: 'rgba(0, 120, 180, 0.56)' }
              },
              actions: [
                <a
                  href="https://www.npmjs.com/package/gerami"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>
                    <FontAwesomeIcon
                      icon={faNpm}
                      className="margin-right-normal"
                    />
                    View on NPM
                  </Button>
                </a>,
                <a
                  href="https://www.gitlab.com/kelal/_dev/gerami"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>
                    <FontAwesomeIcon
                      icon={faGitlab}
                      className="margin-right-normal"
                    />
                    Contribute on GitLab
                  </Button>
                </a>,
                <a
                  href="https://gerami.kelaltech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>
                    <FontAwesomeIcon
                      icon={faGlobeAfrica}
                      className="margin-right-normal"
                    />
                    See the Components (and Docs)
                  </Button>
                </a>
              ]
            },
            {
              title: 'For Enterprises',
              description: (
                <>
                  If you've got a company with special (or custom) IT needs,
                  kelal tech. has got you covered. Just contact us and we'll
                  make a deal.
                  <br />
                  <span className="italic">We promise to be fair!</span>
                </>
              ),
              overlayProps: { maxCol: 1, className: 'bg-accent' },
              actions: [
                <a href="#contact">
                  <Button>
                    <FontAwesomeIcon
                      icon={faHandshake}
                      className="margin-right-normal fg-primary"
                    />
                    Let's Make a Deal
                  </Button>
                </a>
              ]
            }
          ]
        }
      },
      {
        type: 'partners',
        props: {
          partners: [
            {
              logo: sunitLogo,
              name: 'Sun it solutions'
            },
            {
              logo: dreamLogo,
              name: 'Dream Engineering plc'
            },
            {
              logo: fffLogo,
              name: 'Finfine Furniture Factory'
            }
          ]
        }
      },
      {
        type: 'company',
        props: {
          bg: theCompanyBg,
          description: (
            <>
              <p>
                <span>
                  We are a software development company that provides the best
                  IT solutions based on your business needs. Companies like us
                  are the core for a country that is advancing fast into the
                  tech industry; steps taken into the digital world is
                  inevitable.{' '}
                </span>
                <strong>kelal tech.</strong>
                <span>
                  {' '}
                  will be with you on this journey: guiding, consulting and
                  building your company with the latest and modern technologies.
                </span>
              </p>
            </>
          ),
          team: [
            {
              name: 'Biruk Tesfaye',
              photoSrc: {
                src: `/api/gravatar?email=${encodeURIComponent(
                  'biruktesfayeve@gmail.com'
                )}&s=100&d=mp`
              },
              links: [
                { icon: faGlobeAfrica, url: 'https://biruk.kelaltech.com/' },
                { icon: faAt, url: 'mailto:biruk@kelaltech.com' },
                {
                  icon: faLinkedin,
                  url: 'https://www.linkedin.com/in/biruktesfayeve'
                },
                { icon: faTelegram, url: 'https://t.me/BBBBBT6' },
                { icon: faTwitter, url: 'https://twitter.com/biruktesfayeve' }
              ]
            },
            {
              name: 'Brook Belihu',
              photoSrc: {
                src: `/api/gravatar?email=${encodeURIComponent(
                  'brookbdt@gmail.com'
                )}&s=100&d=mp`
              },
              links: [
                // { icon: faGlobeAfrica, url: 'https://brook.kelaltech.com/' },
                { icon: faAt, url: 'mailto:brook@kelaltech.com' },
                {
                  icon: faLinkedin,
                  url: 'https://www.linkedin.com/in/brook-belihu-2070b2191'
                },
                { icon: faTelegram, url: 'https://t.me/aCut_Above' },
                { icon: faTwitter, url: 'https://twitter.com/brookisha_b97' }
              ]
            },
            {
              name: 'Dagem Mekonnen',
              photoSrc: {
                src: `/api/gravatar?email=${encodeURIComponent(
                  'dagixmeko@gmail.com'
                )}&s=100&d=mp`
              },
              links: [
                //  { icon: faGlobeAfrica, url: 'https://dagem.kelaltech.com/' },
                { icon: faAt, url: 'mailto:dagem@kelaltech.com' },
                {
                  icon: faLinkedin,
                  url: 'https://www.linkedin.com/in/dagem-mekonnen-939a50140'
                },
                { icon: faTelegram, url: 'https://t.me/justLivingtoo' },
                { icon: faTwitter, url: 'https://twitter.com/dagemmekonnen' }
              ]
            },
            {
              name: 'Hiskias Melke',
              photoSrc: {
                src: `/api/gravatar?email=${encodeURIComponent(
                  'hiskias.melke1@gmail.com'
                )}&s=100&d=mp`
              },
              links: [
                //  { icon: faGlobeAfrica, url: 'https://hiskias.kelaltech.com/' },
                { icon: faAt, url: 'mailto:hiskias@kelaltech.com' },
                {
                  icon: faLinkedin,
                  url: 'https://www.linkedin.com/in/hiskias-dingeto-5b05a2120'
                },
                { icon: faTelegram, url: 'https://t.me/hisku' },
                { icon: faTwitter, url: 'https://twitter.com/hiskuMelke' }
              ]
            },
            {
              name: 'Kaleab S. Melkie',
              photoSrc: {
                src: `/api/gravatar?email=${encodeURIComponent(
                  'kaleabmelkie@gmail.com'
                )}&s=100&d=mp`
              },
              links: [
                { icon: faGlobeAfrica, url: 'https://kaleab.kelaltech.com/' },
                { icon: faAt, url: 'mailto:kaleab@kelaltech.com' },
                {
                  icon: faLinkedin,
                  url: 'https://www.linkedin.com/in/kaleabmelkie'
                },
                { icon: faTelegram, url: 'https://t.me/kaleab14' },
                { icon: faTwitter, url: 'https://twitter.com/kaleab14' }
              ]
            }
          ],
          solutionTypes: [
            {
              icon: faGlobeAfrica,
              name: 'We Design Simple and Complex Web Systems'
            },
            {
              icon: faMobileAlt,
              name: 'We Make Beautiful and Useful Mobile Apps'
            },
            {
              icon: faSignal,
              name: 'We Implement Small Network Infrastructures'
            },
            {
              icon: faHandHoldingHeart,
              name: 'We Give Back to the Open Source Community'
            }
          ]
        }
      },

      {
        type: 'contact',
        props: {
          description: (
            <>
              Want to make a deal with us? Want to help us improve something?
              Looking for some information? Or, just want to chat? We'd be very
              happy to hear from you.
            </>
          ),
          phones: [
            '+251 92 363 7040',
            '+251 91 263 3365',
            '+251 91 148 0875',
            '+251 92 377 2839'
          ],
          emails: ['info@kelaltech.com'],
          addresses: [
            {
              name: 'Addis Ababa, Ethiopia',
              url: 'https://www.google.com/maps/@8.9826155,38.7829168,11z'
            }
          ],
          socials: [
            { icon: faLinkedin, url: 'https://www.linkedin.com/company/kelal' },
            { icon: faTelegram, url: 'https://t.me/kelalTech' },
            { icon: faTwitter, url: 'https://twitter.com/kelaltech' },
            { icon: faInstagram, url: 'https://instagram.com/kelaltech' },
            { icon: faFacebook, url: 'https://www.facebook.com/kelaltech' }
          ],

          messageSubmitApiPath: '/api/message/send'
        }
      }
    ]
  }
}

export default config
