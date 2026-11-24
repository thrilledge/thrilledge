'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { UserMenu } from './user-menu'
import { cn } from '@/lib/utils'
import { ProposalWriter } from './proposal-writer'
import { ColdEmail } from './cold-email'
import { ColdCall } from './cold-call'
import { UsageDisplay } from './usage-display'
import { GenerationHistory } from './generation-history'

const TABS = [
  { id: 'proposal', label: 'Upwork Proposal', icon: '✍️' },
  { id: 'cold-email', label: 'Cold Email', icon: '📧' },
  { id: 'cold-call', label: 'Cold Call Script', icon: '📞' },
  { id: 'history', label: 'History', icon: '📋' },
]

export function FreelancerToolsClient() {
  const [activeTab, setActiveTab] = useState('proposal')
  const { user } = useUser()

  const plan = (user?.publicMetadata?.plan as string) || 'free'
  const isUnlimited = plan === 'unlimited'

  return (
    <div className="max-w-360 mx-auto px-4 py-8">
      {/* User info bar */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-2xl border border-[#e5e5e5] px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-600">
            {user?.fullName || user?.emailAddresses?.[0]?.emailAddress}
          </span>
          <span className={cn(
            'text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full',
            isUnlimited
              ? 'bg-green-100 text-green-800'
              : 'bg-amber-100 text-amber-800'
          )}>
            {isUnlimited ? 'Unlimited Plan' : 'Free Plan'}
          </span>
        </div>
        <UserMenu />
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-white border border-[#e5e5e5] rounded-2xl p-1 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap',
              activeTab === tab.id
                ? 'bg-[#111212] text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            )}
          >
            <span className="text-base">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Usage display */}
      <UsageDisplay />

      {/* Tool panels */}
      <div className="mt-6">
        {activeTab === 'proposal' && <ProposalWriter />}
        {activeTab === 'cold-email' && <ColdEmail />}
        {activeTab === 'cold-call' && <ColdCall />}
        {activeTab === 'history' && <GenerationHistory />}
      </div>
    </div>
  )
}
