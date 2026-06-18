import { NextRequest, NextResponse } from 'next/server'
import { createGoogleMeet } from '../_helpers/google-meet'

export async function GET(req: NextRequest) {
  const results: Record<string, any> = {
    env: {
      GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? '✓ set' : '✗ missing',
      GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY
        ? `✓ set (${process.env.GOOGLE_PRIVATE_KEY.length} chars, starts with ${process.env.GOOGLE_PRIVATE_KEY.slice(0, 30)}...)`
        : '✗ missing',
      GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID ? '✓ set' : '✗ missing',
    },
    meetTest: null,
  }

  if (
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY &&
    process.env.GOOGLE_CALENDAR_ID
  ) {
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
        results.meetTest = {
          status: '✓ Success',
          meetLink: meet.meetLink,
          eventId: meet.eventId,
        }
      } else {
        results.meetTest = {
          status: '✗ Failed',
          note: 'createGoogleMeet returned null. Check Vercel logs for [Google Meet] errors.',
        }
      }
    } catch (e: any) {
      results.meetTest = {
        status: '✗ Error',
        message: e?.message || String(e),
      }
    }
  } else {
    results.note = 'Set env vars first, then deploy again.'
  }

  return NextResponse.json(results)
}
