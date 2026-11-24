'use client'

import { useEffect, useState } from 'react'
import { Loader2, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UsageData {
  plan: string
  usage: Record<string, number>
  limits: Record<string, number>
}

const TOOL_LABELS: Record<string, string> = {
  proposal: 'Proposals',
  'cold-email': 'Cold Emails',
  'cold-call': 'Cold Calls',
}

export function UsageDisplay() {
  const [data, setData] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tools/usage')
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-neutral-400 py-2">
        <Loader2 size={14} className="animate-spin" /> Loading usage...
      </div>
    )
  }

  if (!data) return null

  const isUnlimited = data.plan === 'unlimited'

  if (isUnlimited) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <Zap size={16} />
        Unlimited plan — no usage limits. Enjoy all tools!
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-2xl p-4">
      <h3 className="text-sm font-semibold text-neutral-700 mb-3">Monthly Usage</h3>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(TOOL_LABELS).map(([key, label]) => {
          const used = data.usage[key] || 0
          const limit = data.limits[key] || 0
          const percentage = limit > 0 ? Math.min((used / limit) * 100, 100) : 0
          const isExhausted = used >= limit

          return (
            <div key={key} className="text-center">
              <div className="text-xs text-neutral-500 mb-1">{label}</div>
              <div className="text-lg font-semibold text-neutral-800">
                {used}<span className="text-neutral-400 text-sm font-normal">/{limit}</span>
              </div>
              <div className="mt-1.5 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    isExhausted ? 'bg-red-400' : percentage > 70 ? 'bg-amber-400' : 'bg-neutral-400'
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {isExhausted && (
                <p className="text-[10px] text-red-500 mt-1">Limit reached</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
