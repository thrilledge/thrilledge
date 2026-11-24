'use client'

import { useState, useRef, useEffect } from 'react'
import { useUser, useClerk } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, Settings, LogOut, ChevronDown, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'

export function UserMenu() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!user) return null

  const initials = [user.firstName, user.lastName]
    .filter(Boolean)
    .map((n) => n?.[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || user.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || '?'

  const displayName = user.fullName || user.emailAddresses?.[0]?.emailAddress || 'User'
  const plan = (user.publicMetadata?.plan as string) || 'free'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl hover:bg-neutral-100 px-3 py-2 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-[#111212] text-white flex items-center justify-center text-xs font-semibold">
          {initials}
        </div>
        <ChevronDown size={14} className={cn('text-neutral-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#e5e5e5] rounded-2xl shadow-lg p-2 z-50">
          {/* User info */}
          <div className="px-3 py-3 border-b border-[#e5e5e5] mb-1">
            <p className="text-sm font-semibold text-neutral-900 truncate">{displayName}</p>
            <p className="text-xs text-neutral-500 truncate">{user.emailAddresses?.[0]?.emailAddress}</p>
            <span className={cn(
              'inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full',
              plan === 'unlimited' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
            )}>
              {plan === 'unlimited' ? 'Unlimited Plan' : 'Free Plan'}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-0.5">
            <Link
              href="/tools"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <Wrench size={16} className="text-neutral-400" />
              Toolkit
            </Link>
            <Link
              href="/tools/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <Settings size={16} className="text-neutral-400" />
              Settings
            </Link>
            <button
              onClick={() => signOut({ redirectUrl: '/' })}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
