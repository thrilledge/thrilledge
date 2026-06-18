let cachedClient: any = null

async function getAuthClient() {
  if (cachedClient) return cachedClient

  const { JWT } = await import('google-auth-library')

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY

  if (!email || !key) return null

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

export async function createCalendarEvent(
  summary: string,
  startISO: string,
  endISO: string,
  attendeeEmails: string[],
  description?: string,
): Promise<string | null> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  if (!calendarId) return null

  try {
    const auth = await getAuthClient()
    if (!auth) return null

    const { google } = await import('googleapis')
    const calendar = google.calendar({ version: 'v3', auth })

    const event: any = {
      summary,
      description: description || '',
      start: { dateTime: startISO, timeZone: 'Asia/Karachi' },
      end: { dateTime: endISO, timeZone: 'Asia/Karachi' },
      attendees: attendeeEmails.filter(Boolean).map(email => ({ email })),
    }

    const res = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: 'none',
    })

    return res.data.id || null
  } catch (e: any) {
    console.error('[Google Calendar] Failed:', e?.message || e)
    return null
  }
}
