import { NextRequest } from 'next/server'

interface TrackingInfo {
  ip: string
  country: string
  region: string
  city: string
  browser: string
  os: string
  device: string
}

export function extractTrackingInfo(req: NextRequest): TrackingInfo {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    req.headers.get('x-vercel-forwarded-for') ||
    ''

  const country = req.headers.get('x-vercel-ip-country') || ''
  const region  = req.headers.get('x-vercel-ip-country-region') || ''
  const city    = req.headers.get('x-vercel-ip-city') || ''

  const ua = req.headers.get('user-agent') || ''
  const { browser, os, device } = parseUA(ua)

  return { ip, country, region, city, browser, os, device }
}

function parseUA(ua: string) {
  let browser = 'Unknown'
  let os = 'Unknown'
  let device = 'Unknown'

  if (!ua) return { browser, os, device }

  // Device
  if (/tablet|ipad/i.test(ua)) device = 'Tablet'
  else if (/mobile|iphone|android.*mobile|windows phone/i.test(ua)) device = 'Mobile'
  else device = 'Desktop'

  // Browser
  if (/edge/i.test(ua)) browser = 'Edge'
  else if (/opr|opera/i.test(ua)) browser = 'Opera'
  else if (/chrome/i.test(ua) && !/chromium/i.test(ua)) browser = 'Chrome'
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari'
  else if (/firefox/i.test(ua)) browser = 'Firefox'
  else if (/msie|trident/i.test(ua)) browser = 'Internet Explorer'

  // OS
  if (/windows/i.test(ua)) os = 'Windows'
  else if (/mac os|macintosh/i.test(ua)) os = 'macOS'
  else if (/linux/i.test(ua) && !/android/i.test(ua)) os = 'Linux'
  else if (/android/i.test(ua)) os = 'Android'
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS'
  else if (/chrome os|cros/i.test(ua)) os = 'ChromeOS'

  return { browser, os, device }
}

export function trackingHtml(info: TrackingInfo): string {
  const locationParts = [info.city, info.region, info.country].filter(Boolean)
  const locationStr = locationParts.length ? locationParts.join(', ') : '—'

  const rows = [
    { label: 'IP Address', value: info.ip || '—' },
    { label: 'Location', value: locationStr },
    { label: 'Device', value: info.device },
    { label: 'Browser', value: info.browser },
    { label: 'OS', value: info.os },
  ]

  return rows.map(({ label, value }) => `
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 2px;font-size:11px;color:#929296;text-transform:uppercase;letter-spacing:1px;">${label}</p>
                  <p style="margin:0;font-size:15px;color:#111212;">${value}</p>
                </td>
              </tr>`).join('')
}
