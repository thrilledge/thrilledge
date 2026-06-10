import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

const HISTORY_TTL = 60 * 60 * 24 * 365 // 1 year

function historyKey(clerkUserId: string) {
  return `tool-history:${clerkUserId}`
}

export interface ToolGenerationInput {
  tool_type: 'proposal' | 'cold-email' | 'cold-call'
  clerk_user_id: string
  user_email?: string
  input_data: Record<string, string>
  output_data: string
}

export interface ToolGenerationRecord {
  id: string
  tool_type: string
  user_email?: string
  input_data: string
  output_data: string
  created_at: string
}

export async function saveToolGeneration(data: ToolGenerationInput): Promise<boolean> {
  try {
    const key = historyKey(data.clerk_user_id)
    const record: ToolGenerationRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      tool_type: data.tool_type,
      user_email: data.user_email,
      input_data: JSON.stringify(data.input_data),
      output_data: data.output_data,
      created_at: new Date().toISOString(),
    }

    const existing = await redis.get<ToolGenerationRecord[]>(key)
    const history = Array.isArray(existing) ? existing : []
    history.unshift(record)

    await redis.setex(key, HISTORY_TTL, JSON.stringify(history))
    return true
  } catch (err) {
    console.error('[Tool History] Save failed:', err)
    return false
  }
}

export async function getToolHistory(clerkUserId: string, limit = 50): Promise<ToolGenerationRecord[]> {
  try {
    const key = historyKey(clerkUserId)
    const existing = await redis.get<ToolGenerationRecord[]>(key)
    if (!Array.isArray(existing)) return []
    return existing.slice(0, limit)
  } catch (err) {
    console.error('[Tool History] Fetch failed:', err)
    return []
  }
}
