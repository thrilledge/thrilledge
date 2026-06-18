import { NextRequest, NextResponse } from 'next/server'
import { generateJitsiLink } from '../_helpers/jitsi'
import { createCalendarEvent } from '../_helpers/google-calendar'

export async function GET(req: NextRequest) {
  const results: any = {
    jitsi: null,
    calendar: null,
    env: {
      GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? '✓ set' : '✗ missing',
      GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY ? '✓ set' : '✗ missing',
      GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID ? '✓ set' : '✗ missing',
    },
  }

  // Test Jitsi
  const link1 = generateJitsiLink()
  const link2 = generateJitsiLink()
  const link3 = generateJitsiLink()
  results.jitsi = {
    status: '✓ Working',
    sampleLinks: [link1, link2, link3],
  }

  // Test Calendar event
  if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_CALENDAR_ID) {
    const now = new Date()
    const start = new Date(now.getTime() + 60000).toISOString()
    const end = new Date(now.getTime() + 600000).toISOString()

    const eventId = await createCalendarEvent(
      '[TEST] Jitsi Diagnostic',
      start,
      end,
      [process.env.GOOGLE_CALENDAR_ID],
      `Test event with Jitsi link: ${link1}`,
    )

    results.calendar = eventId
      ? { status: '✓ Event created', eventId }
      : { status: '✗ Failed — check server logs' }
  } else {
    results.calendar = { status: '⏭ Skipped — env vars missing' }
  }

  return NextResponse.json(results)
}
