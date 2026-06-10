import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { saveToolGeneration, getToolHistory } from '@/lib/wp-tool-history'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { tool_type, input_data, output_data } = await req.json()

    if (!tool_type || !input_data || !output_data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const success = await saveToolGeneration({
      clerk_user_id: userId,
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
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    const history = await getToolHistory(userId, limit)

    return NextResponse.json({ history })
  } catch (err) {
    console.error('[History API] Fetch error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
