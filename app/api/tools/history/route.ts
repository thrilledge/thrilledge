import { NextRequest, NextResponse } from 'next/server'
import { saveToolGeneration, getToolHistory } from '@/lib/wp-tool-history'
import { getClientIp } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)

    const { tool_type, input_data, output_data } = await req.json()

    if (!tool_type || !input_data || !output_data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const success = await saveToolGeneration({
      ip_key: ip,
      tool_type,
      input_data,
      output_data,
    })

    if (!success) {
      return NextResponse.json({ error: 'Failed to save history' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[History API] Save error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req)

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    const history = await getToolHistory(ip, limit)

    return NextResponse.json({ history })
  } catch (err) {
    console.error('[History API] Fetch error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}