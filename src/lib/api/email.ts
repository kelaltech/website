import { createTransport, SentMessageInfo } from 'nodemailer'

export interface IEmailConfig {
  service?: string // default is 'gmail'

  from?: string
  pass?: string

  subject?: string
  to: string
  html?: string
  text?: string
}

export function email(config: IEmailConfig): Promise<SentMessageInfo> {
  if (process.env.NO_EMAIL === 'true') {
    console.warn(
      'WARNING! Skipping sending an email, because NO_EMAIL environment variable is set to true.'
    )
    return undefined as any
  }

  if (!config)
    throw new Error('NO_EMAIL_CONFIG: Email configuration is not found.')
  if (!config.from && !process.env.EMAIL_FROM)
    throw new Error('NO_EMAIL_FROM: Sender email address not provided.')
  if (!config.pass && !process.env.EMAIL_PASS)
    throw new Error('NO_EMAIL_PASS: Sender email password not provided.')
  if (!config.to)
    throw new Error('NO_EMAIL_TO: Target emailTo address not provided.')
  if (!config.html && !config.text)
    throw new Error(
      "NO_EMAIL_BODY: Neither 'emailTo.html' nor 'emailTo.text' is provided."
    )

  return createTransport({
    service: config.service || process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: config.from || process.env.EMAIL_FROM,
      pass: config.pass || process.env.EMAIL_PASS
    }
  }).sendMail({
    from: config.from || process.env.EMAIL_FROM,
    to: config.to,
    subject: config.subject || '',
    html: config.html,
    text: !config.html ? config.text : ''
  })
}
