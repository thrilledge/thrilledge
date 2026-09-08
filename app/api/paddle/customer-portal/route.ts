import { NextRequest, NextResponse } from 'next/server'
import { getPaddle } from '@/lib/paddle'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const rateLimit = await checkRateLimit(req, 'paddle-portal')
  if (!rateLimit.success) {
    return NextResponse.json({ error: 'Rate limit reached. Please try again later.' }, { status: 429 })
  }

  const paddle = getPaddle()
  if (!paddle) {
    return NextResponse.json({ error: 'Paddle not configured' }, { status: 500 })
  }

  const { customerId, subscriptionId } = await req.json()

  if (!customerId || !subscriptionId) {
    return NextResponse.json({ error: 'customerId and subscriptionId required' }, { status: 400 })
  }

  try {
    const session = await paddle.customerPortalSessions.create(customerId, [subscriptionId])
    const urls = session.urls.subscriptions[0]

    return NextResponse.json({
      cancelUrl: urls.cancelSubscription,
      updatePaymentUrl: urls.updateSubscriptionPaymentMethod,
    })
  } catch (err) {
    console.error('[Paddle] Failed to generate portal session:', err)
    return NextResponse.json({ error: 'Failed to generate portal session' }, { status: 500 })
  }
}