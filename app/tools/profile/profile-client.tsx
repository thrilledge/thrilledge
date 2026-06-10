'use client'

import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2, LogOut, User, Mail, Crown, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface UsageData {
  plan: string
  usage: Record<string, number>
  limits: Record<string, number>
}

export function ProfilePageClient() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [usageData, setUsageData] = useState<UsageData | null>(null)
  const [usageLoading, setUsageLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return
    if (!user) {
      router.push('/auth/sign-in')
      return
    }

    fetch('/api/tools/usage')
      .then((res) => res.json())
      .then((d) => setUsageData(d))
      .catch(() => {})
      .finally(() => setUsageLoading(false))
  }, [isLoaded, user, router])

  if (!isLoaded || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={24} className="animate-spin text-neutral-400" />
      </div>
    )
  }

  const plan = usageData?.plan || (user.publicMetadata?.plan as string) || 'free'
  const isUnlimited = plan === 'unlimited'
  const initials = [user.firstName, user.lastName]
    .filter(Boolean)
    .map((n) => n?.[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || user.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || '?'

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Toolkit
      </Link>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#111212] text-white flex items-center justify-center text-xl font-semibold">
            {initials}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[#111212]">
              {user.fullName || 'User'}
            </h1>
            <p className="text-sm text-neutral-500">{user.emailAddresses?.[0]?.emailAddress}</p>
            <span className={cn(
              'inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full',
              isUnlimited ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
            )}>
              {isUnlimited ? 'Unlimited Plan' : 'Free Plan'}
            </span>
          </div>
        </div>
      </div>

      {/* Plan & Usage */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
        <h2 className="text-lg font-semibold text-[#111212] mb-4 flex items-center gap-2">
          <Crown size={18} className="text-neutral-500" />
          Plan & Usage
        </h2>

        {usageLoading ? (
          <div className="flex items-center gap-2 text-sm text-neutral-400 py-4">
            <Loader2 size={14} className="animate-spin" /> Loading...
          </div>
        ) : usageData ? (
          <div className="space-y-4">
            {Object.entries({ proposal: 'Upwork Proposals', 'cold-email': 'Cold Emails', 'cold-call': 'Cold Calls' }).map(([key, label]) => {
              const used = usageData.usage[key] || 0
              const limit = usageData.limits[key] || 0
              const isUnlimitedTier = limit === -1
              const percentage = !isUnlimitedTier && limit > 0 ? Math.min((used / limit) * 100, 100) : 100
              const isExhausted = !isUnlimitedTier && used >= limit

              return (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-700">{label}</span>
                    <span className="text-neutral-500">
                      {isUnlimitedTier ? 'Unlimited' : `${used} / ${limit}`}
                    </span>
                  </div>
                  {!isUnlimitedTier && (
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          isExhausted ? 'bg-red-400' : percentage > 70 ? 'bg-amber-400' : 'bg-neutral-400'
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  )}
                </div>
              )
            })}

            {!isUnlimited && (
              <div className="mt-4 pt-4 border-t border-[#e5e5e5]">
                <p className="text-sm text-neutral-600 mb-3">Need more? Upgrade to unlimited.</p>
                <a
                  href="https://billing.stripe.com/p/login/test_placeholder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#111212] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Crown size={15} />
                  Upgrade to Unlimited
                </a>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Account */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6">
        <h2 className="text-lg font-semibold text-[#111212] mb-4 flex items-center gap-2">
          <User size={18} className="text-neutral-500" />
          Account Details
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-[#e5e5e5]">
            <span className="text-neutral-500">Name</span>
            <span className="text-neutral-900">{user.fullName || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#e5e5e5]">
            <span className="text-neutral-500">Email</span>
            <span className="text-neutral-900">{user.emailAddresses?.[0]?.emailAddress || '—'}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-neutral-500">User ID</span>
            <span className="text-neutral-400 text-xs font-mono">{user.id}</span>
          </div>
        </div>
      </div>

      {/* Sign out */}
      <button
        onClick={() => signOut({ redirectUrl: '/' })}
        className="flex items-center justify-center gap-2 w-full bg-white border border-red-200 text-red-600 font-semibold text-sm rounded-xl py-3 hover:bg-red-50 transition-all duration-200"
      >
        <LogOut size={16} /> Sign out
      </button>
    </div>
  )
}
