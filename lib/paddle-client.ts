'use client'

import { initializePaddle } from '@paddle/paddle-js'
import type { Paddle } from '@paddle/paddle-js'

let paddleInstance: Paddle | null = null

export async function getPaddleClient(): Promise<Paddle | null> {
  if (paddleInstance) return paddleInstance

  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
  if (!token || token === 'placeholder_paddle_client_token') {
    console.warn('[Paddle] Client token not configured')
    return null
  }

  try {
    const p = await initializePaddle({
      token,
      environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'production'
        ? 'production'
        : 'sandbox',
    })
    paddleInstance = p ?? null
    return paddleInstance
  } catch (err) {
    console.error('[Paddle] Failed to initialize:', err)
    return null
  }
}

export function openCheckout(priceId: string, userId: string, userEmail: string) {
  getPaddleClient().then((paddle) => {
    if (!paddle) return
    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: { email: userEmail },
      customData: { userId },
      settings: {
        displayMode: 'overlay',
        successUrl: `${window.location.origin}/tools/profile?checkout=success`,
      },
    })
  })
}
