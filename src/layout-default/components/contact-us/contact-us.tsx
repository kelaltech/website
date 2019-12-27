import React, { useMemo, useState } from 'react'
import {
  Block,
  Button,
  Content,
  Input,
  Loading,
  TextArea,
  Warning,
  Yoga
} from 'gerami'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAt,
  faEnvelope,
  faMapSigns,
  faPhone
} from '@fortawesome/free-solid-svg-icons'
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons'
import Axios from 'axios'

import './contact-us.scss'
import { ContactUsProps } from './contact-us-props'
import { IMessage } from '../../../../pages/api/message'
import LiteParallax from '../../../shared/components/lite-parallax/lite-parallax'

function ContactUs({
  bg,
  description,

  phones,
  emails,
  addresses,
  socials,

  messageSubmitApiPath
}: ContactUsProps) {
  const actionPath = useMemo(() => '/api/message', [])

  const [msg, setMsg] = useState<IMessage>({ from: '', subject: '', text: '' })
  const [status, setStatus] = useState<'INITIAL' | 'SENDING' | 'SENT'>(
    'INITIAL'
  )
  const [error, setError] = useState()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    setStatus('SENDING')
    setError(undefined)
    Axios.post<IMessage>(actionPath, msg)
      .then(() => setStatus('SENT'))
      .catch(e => {
        setStatus('INITIAL')
        setError(e)
      })
  }

  return (
    <>
      <LiteParallax src={bg} strength={300} className="bg-accent">
        <div className="contact-us-container padding-vertical-very-big">
          <Content size="3XL" transparent data-aos="fade-up">
            <Block first>
              <h1>Contact Us</h1>
            </Block>

            {description && (
              <Block last className="fg-blackish justify">
                {description}
              </Block>
            )}

            <Block last>
              <Yoga maxCol={messageSubmitApiPath !== undefined ? 2 : 1}>
                <div>
                  {phones && !!phones.length && (
                    <div className="contact-us-unit" data-aos="fade-up">
                      <FontAwesomeIcon
                        icon={faPhone}
                        size="2x"
                        className="contact-us-icon"
                        title="Give us a call"
                      />
                      <div className="contact-us-label">
                        {phones.map((p, i) => (
                          <div key={i}>
                            <a
                              className="gerami-anchor"
                              href={`tel:${p.replace(/ /g, '')}`}
                            >
                              {p}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {emails && !!emails.length && (
                    <div className="contact-us-unit" data-aos="fade-up">
                      <FontAwesomeIcon
                        icon={faAt}
                        size="2x"
                        className="contact-us-icon"
                        title="Company Email"
                      />
                      <div className="contact-us-label">
                        {emails.map((e, i) => (
                          <div key={i}>
                            <a className="gerami-anchor" href={`mailto:${e}`}>
                              {e}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {addresses && !!addresses.length && (
                    <div className="contact-us-unit" data-aos="fade-up">
                      <FontAwesomeIcon
                        icon={faMapSigns}
                        size="2x"
                        className="contact-us-icon"
                        title="Locate our operations base"
                      />
                      <div className="contact-us-label">
                        {addresses.map((a, i) => (
                          <div key={i}>
                            <a
                              className="gerami-anchor"
                              href={a.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {a.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {socials && !!socials.length && (
                    <div className="contact-us-unit" data-aos="fade-up">
                      <FontAwesomeIcon
                        icon={faConnectdevelop}
                        size="2x"
                        className="contact-us-icon"
                        title="Connect with us on our social accounts"
                      />
                      <div className="contact-us-label margin-left-none">
                        {socials.map((s, i) => (
                          <a
                            className="gerami-anchor"
                            key={i}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.url}
                            title={s.title}
                          >
                            <FontAwesomeIcon
                              icon={s.icon}
                              size="2x"
                              className="fg-blackish contact-us-icon contact-us-social-icon"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {messageSubmitApiPath !== undefined && (
                  <div
                    className="contact-us-unit padding-vertical-very-big"
                    data-aos="fade-up"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      size="2x"
                      className="contact-us-icon margin-top-small"
                      title="Send Us a Message"
                    />
                    <div className="contact-us-label">
                      <form
                        method="POST"
                        action={actionPath}
                        onSubmit={handleSubmit}
                      >
                        <h3>Let's Have a Chat</h3>

                        {error && (
                          <Warning
                            problem={error}
                            shy={setError}
                            className="margin-bottom-normal"
                          />
                        )}

                        {status === 'SENT' ? (
                          <>
                            Thank You!
                            <br />
                            We'll keep in touch with you very soon.
                          </>
                        ) : (
                          <>
                            <div>
                              <Input
                                name="email"
                                value={msg.from}
                                onChange={e =>
                                  setMsg({ ...msg, from: e.target.value })
                                }
                                placeholder="Your Email"
                                type="email"
                                className="contact-us-send-message-input"
                                disabled={status === 'SENDING'}
                                required
                              />
                            </div>

                            <div>
                              <Input
                                name="subject"
                                value={msg.subject}
                                onChange={e =>
                                  setMsg({ ...msg, subject: e.target.value })
                                }
                                placeholder="Subject"
                                type="text"
                                className="contact-us-send-message-input"
                                disabled={status === 'SENDING'}
                                required
                              />
                            </div>

                            <div>
                              <TextArea
                                name="text"
                                value={msg.text}
                                onChange={e =>
                                  setMsg({ ...msg, text: e.target.value })
                                }
                                placeholder="Your Message"
                                className="contact-us-send-message-input"
                                disabled={status === 'SENDING'}
                                required
                                rows={6}
                              />
                            </div>

                            <div>
                              <Button
                                primary
                                type="submit"
                                className="contact-us-send-message-submit"
                                disabled={status === 'SENDING'}
                                aria-label="Send Message"
                              >
                                {status === 'SENDING' ? (
                                  <Loading className="padding-none" />
                                ) : (
                                  <>Send Message</>
                                )}
                              </Button>
                            </div>
                          </>
                        )}
                      </form>
                    </div>
                  </div>
                )}
              </Yoga>
            </Block>
          </Content>
        </div>
      </LiteParallax>
    </>
  )
}

export default ContactUs
