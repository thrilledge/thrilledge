import { NextRequest, NextResponse } from 'next/server'
import { getPaddle } from '@/lib/paddle'

export async function POST(req: NextRequest) {
  const paddle = getPaddle()
  if (!paddle) {
    return NextResponse.json({ error: 'Paddle not configured' }, { status: 500 })
  }

  const signature = req.headers.get('paddle-signature') || ''

  let raw: string
  try {
    raw = await req.text()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  try {
    const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET || ''
    await paddle.webhooks.unmarshal(raw, webhookSecret, signature)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  return NextResponse.json({ success: true })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
