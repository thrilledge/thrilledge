import { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
const useUpstash = Boolean(UPSTASH_URL && UPSTASH_TOKEN)

function buildRedis(): Redis | null {
  if (!useUpstash) return null
  try {
    return Redis.fromEnv()
  } catch {
    return null
  }
}

const redis = buildRedis()

export const dailyLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 d'),
      prefix: 'rl:tools:daily',
    })
  : null

export const burstLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 m'),
      prefix: 'rl:tools:burst',
    })
  : null

const inMemory = new Map<string, { count: number; windowStart: number }>()
const IN_MEMORY_WINDOW_MS = 60_000
const IN_MEMORY_LIMIT = 5

function inMemoryCheck(key: string): boolean {
  const now = Date.now()
  const entry = inMemory.get(key)
  if (!entry || now - entry.windowStart > IN_MEMORY_WINDOW_MS) {
    inMemory.set(key, { count: 1, windowStart: now })
    return true
  }
  if (entry.count >= IN_MEMORY_LIMIT) return false
  entry.count++
  return true
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp
  const vercel = req.headers.get('x-vercel-forwarded-for')
  if (vercel) return vercel
  return req.ip || 'unknown'
}

export async function checkRateLimit(
  req: NextRequest,
  tool: string
): Promise<{ success: boolean; remaining?: number; reset?: number }> {
  const ip = getClientIp(req)
  const identifier = `${tool}:${ip}`

  if (burstLimiter && dailyLimiter) {
    const [burst, daily] = await Promise.all([
      burstLimiter.limit(identifier),
      dailyLimiter.limit(identifier),
    ])
    const success = burst.success && daily.success
    return {
      success,
      remaining: Math.min(burst.remaining, daily.remaining),
      reset: Math.max(burst.reset, daily.reset),
    }
  }

  const allowed = inMemoryCheck(identifier)
  return { success: allowed }
}