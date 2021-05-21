import { email } from './email'

export type IMessage = {
  from: string
  subject: string
  text: string
}

type EndpointOutput = {
  status?: number
  headers?: Headers
  body?: string | Uint8Array | JSON | unknown
}

// POST /api/message
export async function post(request): Promise<EndpointOutput> {
  if (request.method.toUpperCase() !== 'POST') return { status: 405 }

  const body = request.body

  try {
    const msg = body as IMessage | undefined
    if (!msg) throw new Error('NO_REQUEST_BODY: Request body not found')
    if (!msg.from) throw new Error('NO_FROM: Your Email is required!')
    if (!msg.subject) throw new Error('NO_SUBJECT: Subject is required!')
    if (!msg.text) throw new Error('NO_MESSAGE: Your Message is required!')

    await email({
      to: 'kelaltech@gmail.com',
      subject: `Message from Contact Us Form (#${Date.now()})`,
      text: `Let's Have a Chat (kelaltech.com)\n\nSENT ON:\n${new Date().toUTCString()}\n\nFROM:\n${
        msg.from
      }\n\nSUBJECT:\n${msg.subject}\n\nMESSAGE:\n${msg.text}`,
    })

    return {
      status: 200,
      body: {
        success: true,
        data: 'email sent successfully ',
      },
    }
  } catch (e) {
    return {
      status: 500,
      body: {
        error: e.message,
      },
    }
  }
}
