'use client'

import { Crown } from 'lucide-react'
import { openCheckout } from '@/lib/paddle-client'

export function PaddleCheckoutButton() {
  const handleUpgrade = () => {
    const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID || ''
    openCheckout(priceId, '')
  }

  return (
    <button
      onClick={handleUpgrade}
      className="inline-flex items-center gap-2 bg-[#111212] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
    >
      <Crown size={15} />
      Upgrade to Unlimited
    </button>
  )
}