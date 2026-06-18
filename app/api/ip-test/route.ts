import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const clientIp = searchParams.get('ip')

    const serverIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      req.headers.get('x-vercel-forwarded-for') ||
      ''

    const ip = clientIp || serverIp

    const token = 'f4a60f2c1a8e0a'

    let ipInfo: Record<string, unknown> = {}

    if (ip) {
      const res = await fetch(`https://ipinfo.io/${ip}?token=${token}`, {
        headers: { 'Accept': 'application/json' },
      })
      if (res.ok) {
        ipInfo = await res.json()
      } else {
        ipInfo = { error: `ipinfo.io returned ${res.status}` }
      }
    } else {
      ipInfo = { error: 'No IP found' }
    }

    return NextResponse.json({
      ip,
      ipinfo: ipInfo,
      headers: {
        'x-vercel-ip-country': req.headers.get('x-vercel-ip-country') || null,
        'x-vercel-ip-country-region': req.headers.get('x-vercel-ip-country-region') || null,
        'x-vercel-ip-city': req.headers.get('x-vercel-ip-city') || null,
        'user-agent': req.headers.get('user-agent') || null,
      },
    })
  } catch (e) {
    console.error('[IP Test API]', e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
