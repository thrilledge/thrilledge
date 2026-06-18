let cachedClient: any = null

async function getAuthClient() {
  if (cachedClient) return cachedClient

  const { JWT } = await import('google-auth-library')

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY

  if (!email || !key) {
    console.error('[Google Meet] Missing env vars:',
      !email ? 'GOOGLE_SERVICE_ACCOUNT_EMAIL' : '',
      !key ? 'GOOGLE_PRIVATE_KEY' : '',
    )
    return null
  }

  let formattedKey = key
  if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
    formattedKey = formattedKey.slice(1, -1)
  }
  formattedKey = formattedKey.replace(/\\n/g, '\n')

  const client = new JWT({
    email,
    key: formattedKey,
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
  if (!calendarId) {
    console.error('[Google Meet] GOOGLE_CALENDAR_ID not set')
    return null
  }

  try {
    const auth = await getAuthClient()
    if (!auth) {
      console.error('[Google Meet] Auth client not created — check env vars')
      return null
    }

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
      attendees: attendeeEmails.filter(Boolean).map(email => ({ email })),
    }

    console.log('[Google Meet] Creating event:', summary, startISO)

    const res = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'none',
    })

    const meetLink = res.data.hangoutLink
    const eventId = res.data.id

    if (!meetLink) {
      console.error('[Google Meet] No hangoutLink in response')
      return null
    }

    console.log('[Google Meet] Created:', meetLink)
    return { meetLink, eventId: eventId! }
  } catch (e: any) {
    console.error('[Google Meet] Failed:', e?.message || e)
    if (e?.response?.data?.error) {
      console.error('[Google Meet] API error details:', JSON.stringify(e.response.data.error))
    }
    return null
  }
}
