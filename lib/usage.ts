import { clerkClient } from '@clerk/nextjs/server'

const MONTHLY_LIMITS: Record<string, number> = {
  proposal: 5,
  'cold-email': 10,
  'cold-call': 5,
}

export async function checkUsage(userId: string, tool: string): Promise<{ allowed: boolean; plan: string }> {
  const client = await clerkClient()
  const user = await client.users.getUser(userId)

  const metadata = user.publicMetadata || {}
  const plan = (metadata.plan as string) || 'free'

  if (plan === 'unlimited') {
    return { allowed: true, plan }
  }

  const usage = (metadata.usage as Record<string, number>) || {}
  const currentUsage = usage[tool] || 0
  const limit = MONTHLY_LIMITS[tool] || 5

  if (currentUsage >= limit) {
    return { allowed: false, plan }
  }

  return { allowed: true, plan }
}

export async function incrementUsage(userId: string, tool: string): Promise<void> {
  const client = await clerkClient()
  const user = await client.users.getUser(userId)

  const metadata = user.publicMetadata || {}
  const plan = (metadata.plan as string) || 'free'

  if (plan === 'unlimited') return

  const usage = (metadata.usage as Record<string, number>) || {}
  usage[tool] = (usage[tool] || 0) + 1

  await client.users.updateUser(userId, {
    publicMetadata: {
      ...metadata,
      usage,
    },
  })
}

export function getMonthlyLimits(plan: string): Record<string, number> {
  if (plan === 'unlimited') {
    return { proposal: -1, 'cold-email': -1, 'cold-call': -1 }
  }
  return { ...MONTHLY_LIMITS }
}

export { MONTHLY_LIMITS }
