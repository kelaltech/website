import { NextApiRequest, NextApiResponse } from 'next'

import { email } from '../../src/lib/api/email'

export type IMessage = {
  from: string
  subject: string
  text: string
}

// POST /api/message
export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method.toUpperCase() !== 'POST') return response.status(405).end()

  try {
    const msg = request.body as IMessage | undefined
    if (!msg) throw new Error('NO_REQUEST_BODY: Request body not found')
    if (!msg.from) throw new Error('NO_FROM: Your Email is required!')
    if (!msg.subject) throw new Error('NO_SUBJECT: Subject is required!')
    if (!msg.text) throw new Error('NO_MESSAGE: Your Message is required!')

    await email({
      to: 'kelaltech@gmail.com',
      subject: `Message from Contact Us Form (#${Date.now()})`,
      text: `Let's Have a Chat (kelaltech.com)\n\nSENT ON:\n${new Date().toUTCString()}\n\nFROM:\n${
        msg.from
      }\n\nSUBJECT:\n${msg.subject}\n\nMESSAGE:\n${msg.text}`
    })

    response.json({ success: true })
  } catch (e) {
    response.status(500).send(e.message)
  }
}
