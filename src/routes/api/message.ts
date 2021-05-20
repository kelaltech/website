import { email } from './email'

function getFormBody(body) {
  return [...body.entries()].reduce((data, [k, v]) => {
    let value = v
    if (value === 'true') value = true
    if (value === 'false') value = false
    if (k in data) data[k] = Array.isArray(data[k]) ? [...data[k], value] : [data[k], value]
    else data[k] = value
    return data
  }, {})
}

export type IMessage = {
  from: string
  subject: string
  text: string
}

// POST /api/message
export async function post(request, response) {
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
