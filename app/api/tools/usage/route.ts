import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { getMonthlyLimits } from '@/lib/usage'

export async function GET(_req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const metadata = user.publicMetadata || {}
    const plan = (metadata.plan as string) || 'free'
    const usage = (metadata.usage as Record<string, number>) || {}

    return NextResponse.json({
      plan,
      usage,
      limits: getMonthlyLimits(plan),
    })
  } catch (err) {
    console.error('[Usage API] Error:', err)
    return NextResponse.json({ error: 'Failed to fetch usage' }, { status: 500 })
  }
}
