import { NextRequest, NextResponse } from 'next/server'
import { getPaddle } from '@/lib/paddle'
import { clerkClient } from '@clerk/nextjs/server'

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

  let eventType: string
  let customData: Record<string, unknown> | null
  try {
    const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET || ''
    const event = await paddle.webhooks.unmarshal(raw, webhookSecret, signature)
    eventType = event.eventType
    customData = (event.data as { customData?: Record<string, unknown> })?.customData ?? null
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  try {
    const userId = (customData as Record<string, string>)?.userId

    if (!userId) {
      return NextResponse.json({ success: true })
    }

    if (eventType === 'checkout.completed' || eventType === 'subscription.activated') {
      const client = await clerkClient()
      await client.users.updateUser(userId, {
        publicMetadata: { plan: 'unlimited' },
      })
    }

    if (eventType === 'subscription.canceled') {
      const client = await clerkClient()
      await client.users.updateUser(userId, {
        publicMetadata: { plan: 'free' },
      })
    }
  } catch {
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
