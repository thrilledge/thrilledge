'use client'

import { ShieldCheck } from 'lucide-react'

export function UsageDisplay() {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck size={16} className="text-neutral-500" />
        <h3 className="text-sm font-semibold text-neutral-700">Fair Usage Limits</h3>
      </div>
      <p className="text-[13px] text-neutral-500 leading-relaxed">
        To keep the tools fast and free for everyone, each visitor gets{' '}
        <span className="font-medium text-neutral-700">5 generations per minute</span> and{' '}
        <span className="font-medium text-neutral-700">20 generations per day</span> per tool,
        based on your IP address.
      </p>
    </div>
  )
}