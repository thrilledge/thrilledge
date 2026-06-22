'use client'

import { Crown } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { openCheckout } from '@/lib/paddle-client'

export function PaddleCheckoutButton() {
  const { user, isLoaded } = useUser()

  const handleUpgrade = () => {
    const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID || ''
    const email = user?.emailAddresses?.[0]?.emailAddress || ''
    const userId = user?.id || ''
    openCheckout(priceId, userId, email)
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={!isLoaded || !user}
      className="inline-flex items-center gap-2 bg-[#111212] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Crown size={15} />
      Upgrade to Unlimited
    </button>
  )
}
