import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/tools(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // WordPress short links (/?p=6526) used to render the home page with a 200.
  // Strip the parameter with a 301 so Google does not index the query variant.
  // This must live here: next.config redirects keep unmatched query strings,
  // which turned the config-level rule into a self-redirect loop.
  if (req.nextUrl.pathname === '/' && req.nextUrl.searchParams.has('p')) {
    const url = req.nextUrl.clone()
    url.searchParams.delete('p')
    return NextResponse.redirect(url, 301)
  }

  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
