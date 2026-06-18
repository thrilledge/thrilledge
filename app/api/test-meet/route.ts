import { NextRequest, NextResponse } from 'next/server'
import { createGoogleMeet } from '../_helpers/google-meet'

export async function GET(req: NextRequest) {
  const key = process.env.GOOGLE_PRIVATE_KEY || ''
  const keySlice = key.slice(0, 50)
  const hasNewlines = key.includes('\n')
  const hasBackslashN = key.includes('\\n')

  const results: any = {
    env: {
      GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? '✓ set' : '✗ missing',
      GOOGLE_PRIVATE_KEY: key
        ? `✓ set (${key.length} chars, starts: ${keySlice}..., hasRealNewlines: ${hasNewlines}, hasLiteralBackslashN: ${hasBackslashN})`
        : '✗ missing',
      GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID ? '✓ set' : '✗ missing',
    },
    meetTest: null,
    directApi: null,
  }

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !key || !process.env.GOOGLE_CALENDAR_ID) {
    return NextResponse.json(results)
  }

  // Test createGoogleMeet helper
  const now = new Date()
  const start = new Date(now.getTime() + 60000).toISOString()
  const end = new Date(now.getTime() + 600000).toISOString()

  try {
    const meet = await createGoogleMeet(
      '[TEST] Diagnostic Meeting — please ignore',
      start,
      end,
      [process.env.GOOGLE_CALENDAR_ID],
      'This is a diagnostic test from thrilledge.com',
    )
    if (meet) {
      results.meetTest = { status: '✓ Success', meetLink: meet.meetLink, eventId: meet.eventId }
      return NextResponse.json(results)
    }
    results.meetTest = { status: '✗ Failed — null returned' }
  } catch (e: any) {
    results.meetTest = { status: '✗ Error', message: e?.message || String(e) }
    return NextResponse.json(results)
  }

  // Direct API call with full error details
  try {
    const { JWT } = await import('google-auth-library')
    const { google } = await import('googleapis')

    let formattedKey = key
    if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
      formattedKey = formattedKey.slice(1, -1)
    }
    formattedKey = formattedKey.replace(/\\n/g, '\n')

    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      key: formattedKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    })

    // Test auth
    try {
      const token = await auth.getAccessToken()
      results.directAuth = { status: '✓ Token obtained', hasToken: !!token?.token }
    } catch (authErr: any) {
      results.directAuth = { status: '✗ Auth failed', message: authErr?.message || String(authErr) }
      return NextResponse.json(results)
    }

    const calendar = google.calendar({ version: 'v3' as any, auth: auth as any })

    const event: any = {
      summary: '[TEST] Diagnostic — please ignore',
      description: 'Test from thrilledge.com/api/test-meet',
      start: { dateTime: start, timeZone: 'Asia/Karachi' },
      end: { dateTime: end, timeZone: 'Asia/Karachi' },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    }

    const res = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'none',
    })

    results.directApi = {
      status: '✓ Event created',
      id: res.data.id,
      hangoutLink: res.data.hangoutLink || '(no link)',
      htmlLink: res.data.htmlLink,
    }
  } catch (directErr: any) {
    results.directApi = {
      status: '✗ Direct API call failed',
      message: directErr?.message || String(directErr),
      code: directErr?.response?.data?.error?.code,
      errorDetails: directErr?.response?.data?.error,
    }
  }

  return NextResponse.json(results)
}
