/**
 * Single source of truth for the canonical site origin.
 *
 * IMPORTANT: this must stay in sync with:
 *  - the nginx 301 (non-www -> www)
 *  - NEXT_PUBLIC_SITE_URL in the server environment
 *  - the Google Search Console property
 *
 * Mixing hosts is what caused the "Alternate page with proper canonical tag"
 * entries: pages were served on thrilledge.com but canonicalised to
 * www.thrilledge.com.
 */
export const SITE_URL = 'https://www.thrilledge.com'
export const SITE_HOST = 'www.thrilledge.com'
export const SITE_NAME = 'Thrill Edge Technologies'

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
