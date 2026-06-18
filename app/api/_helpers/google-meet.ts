/**
 * Google Meet Link Generator
 *
 * Setup required:
 * 1. Go to https://console.cloud.google.com → Create a project → Enable Google Calendar API
 * 2. Create a Service Account → Download JSON key
 * 3. In Google Calendar settings → Share your calendar with the service account email (Make changes to events)
 * 4. Set these env vars:
 *    GOOGLE_SERVICE_ACCOUNT_EMAIL — service account client_email
 *    GOOGLE_PRIVATE_KEY — service account private_key (with actual newlines)
 *    GOOGLE_CALENDAR_ID — your Google email address (the calendar to create events on)
 */

let cachedClient: any = null

async function getAuthClient() {
  if (cachedClient) return cachedClient

  const { JWT } = await import('google-auth-library')

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY

  if (!email || !key) {
    throw new Error('Google Meet: GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY must be set')
  }

  const client = new JWT({
    email,
    key: key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  cachedClient = client
  return client
}

export interface MeetLinkResult {
  meetLink: string
  eventId: string
}

export async function createGoogleMeet(
  summary: string,
  startISO: string,
  endISO: string,
  attendeeEmails: string[],
  description?: string,
): Promise<MeetLinkResult | null> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  if (!calendarId) return null

  try {
    const auth = await getAuthClient()
    const { google } = await import('googleapis')
    const calendar = google.calendar({ version: 'v3', auth })

    const event = {
      summary,
      description: description || '',
      start: { dateTime: startISO, timeZone: 'Asia/Karachi' },
      end: { dateTime: endISO, timeZone: 'Asia/Karachi' },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      attendees: attendeeEmails.map(email => ({ email })),
    }

    const res = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    })

    const meetLink = res.data.hangoutLink
    const eventId = res.data.id

    if (!meetLink) return null

    return { meetLink, eventId: eventId! }
  } catch (e) {
    console.error('[Google Meet] Failed to create meeting:', e)
    return null
  }
}
