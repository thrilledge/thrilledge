# Fixes applied (code changes)

Follow-up to `DIAGNOSIS.md`. The original report explains *why* the Search Console
reports existed; this file records what was changed in the codebase and how to
verify it.

Canonical host: **https://www.thrilledge.com**

---

## 1. Root cause of the 68 × HTTP 500 (fixed)

`lib/wordpress.ts` used `cache: 'no-store'` for every WordPress request. Any route
with `generateStaticParams()` (blog posts, careers, case studies) is statically /
ISR rendered, and a `no-store` fetch inside it makes Next throw at render time —
the `Internal Server Error` text/plain body came from Next, not nginx.

Changed to a revalidating server fetch:

```ts
const { cache, ...rest } = options
fetch(url, {
  ...rest,
  signal,
  headers: { ... },
  ...(isServer ? { next: { revalidate: WP_REVALIDATE_SECONDS } } : cache ? { cache } : {}),
})
```

- `WP_REVALIDATE_SECONDS` env var, default `300`.
- Browser/client code still honours an explicit `cache` option.
- `/api/revalidate` already existed for on-demand purging, so ISR was the intended
  design — this restores it.

**Verified locally:** `next build` now reports `● (SSG)` for `/blog/[slug]`,
`/careers/[slug]`, `/casestudy/[slug]`, `/industries/[slug]`,
`/technologies/[slug]` (previously these failed at request time). Requests to the
formerly-500 URLs return `200`.

## 2. Canonical host (partially fixed — nginx step still required)

- `lib/seo.ts` is now the single source of truth: `SITE_URL`, `SITE_HOST`,
  `SITE_NAME`, `absoluteUrl()`.
- All hardcoded `https://thrilledge.com` literals replaced with
  `https://www.thrilledge.com` across pages, schema, sitemap, robots and
  `components/common/image-wrapper.tsx`.
- Added `metadataBase: new URL(SITE_URL)` in `app/layout.tsx` so relative
  metadata URLs resolve on the canonical origin.
- `next.config.mjs` now redirects the non-www host to www
  (`has: [{ type: 'host', value: 'thrilledge.com' }]`) — but only if the non-www
  host actually reaches Next. **Still add the nginx 301** (see §8).

## 3. Sitemap (fixed)

`app/sitemap.ts` previously:

- emitted `lastModified: new Date()` for every URL on every build, and
- listed `/work/<slug>` URLs that did not exist anywhere (`404`).

Now:

- `lastModified` comes from the real WordPress `modified` date for posts and case
  studies (`getAllPostsForSitemap()`, `getAllWorkForSitemap()`), and is omitted
  for pages where no real date exists.
- Work URLs use the real route base `/casestudy`.
- `SITE_URL` is used instead of repeated literals.

## 4. Soft 404s (fixed)

Both `/services/<anything>` and `/categories/<anything>` returned HTTP 200 and
only called `notFound()` after hydration.

- `app/services/[slug]/page.tsx` now validates with `getService(slug)` on the
  server and calls `notFound()` → real 404, plus emits `robots: noindex` for
  unknown slugs.
- `app/categories/[slug]/page.tsx` is now a server entry that validates with
  `getCategory(slug)`; the interactive part moved to
  `category-client.tsx` (`CategoryClient`).
- `app/blog/[slug]/page.tsx` and `app/casestudy/[slug]/page.tsx` also guard with
  `notFound()` on the server for unknown slugs.

## 5. Work route renamed to `/casestudy`

Production serves `/casestudy`; the local checkout still had `app/work-pending`
and linked to a third spelling, `/work/<slug>` (a 404 on every card).

- `app/work-pending` → `app/casestudy`
- `components/sections/work-section.tsx` and `app/casestudy/work-grid.tsx` links
  point at `/casestudy/<slug>`
- `/work`, `/work/:slug`, `/work-pending`, `/work-pending/:slug` and
  `/our-projects/:slug` now 301 to the `/casestudy` equivalents.

## 6. Legacy WordPress 301s

Added to `next.config.mjs` for the URLs still in the Search Console reports:

| Old URL | New URL |
| --- | --- |
| `/healthcare-development` | `/industries/healthcare` |
| `/education-development` | `/industries/education` |
| `/real-estate-development` | `/industries/real-estate` |
| `/fintech-development` | `/industries/fintech` |
| `/hvac-web-development`, `/automotive-development`, `/music-development`, `/ecommerce-development`, `/on-demand-development` | `/industries` |
| `/ui-ux-design` | `/services/ui-ux-design` |
| `/erp-services`, `/a-deep-dive-into-sap-solutions` | `/services/custom-web-development` |
| `/amazon-ppc-advertising` | `/services` |
| `/contact-us` | `/contact` |
| `/certifications`, `/featured-partner` | `/about` |
| `/tag/:slug` | `/blog` |
| `/category/:slug` | `/categories` |
| `/:year/:month/:day`, `/:year/:month` | `/blog` |
| `/?p=<id>` (handled in `middleware.ts`) | `/` |
| old root-level post slugs | `/blog/<same-slug>` |

Also set `trailingSlash: false` so `/path` and `/path/` cannot both be served.

`/?p=<id>` is stripped by a 301 in `middleware.ts`. It cannot be a
`next.config.mjs` rule: Next keeps unmatched query strings, so a config-level
`source: '/'` + `has: query p` redirect resolves to the same URL and loops.

Legacy WordPress tag/category URLs that have no modern equivalent are
intentionally left as 404/410 — mass-redirecting them to `/blog` creates
soft-404 noise rather than helping.

## 7. Revalidation endpoint

`app/api/revalidate/route.ts` revalidated `/work/<slug>`; updated to
`/casestudy/<slug>` + `/casestudy`, and `deleted` actions now clear the list page
too.

## 8. Remaining manual steps (cannot be done from the repo)

1. **nginx / load balancer**
   ```nginx
   server {
     listen 443 ssl;
     server_name thrilledge.com;
     return 301 https://www.thrilledge.com$request_uri;
   }
   ```
   Add the equivalent for port 80. Keep the `www` server block as-is.
2. **Environment** — set `NEXT_PUBLIC_SITE_URL=https://www.thrilledge.com` (used
   by client code) and `WP_REVALIDATE_SECONDS` if the default of 300 s is not
   wanted. `.env.local` in this checkout still has the non-www value.
3. **Google Search Console**
   - Use the `https://www.thrilledge.com` property (or a Domain property) as the
     primary one.
   - After deploy: open *Sitemaps*, submit/resubmit
     `https://www.thrilledge.com/sitemap.xml`.
   - Use *URL Inspection → Request indexing* for the homepage, `/blog`, `/casestudy`
     and 5–10 key blog posts.
   - Expect the 404 / noindex / redirect buckets to drain over the next 2–4 crawl
     cycles; they are historical WordPress data, not new errors.
4. **Nothing else is indexed yet** because every detail page was 500 — once the
   fixed build is live, start with the sitemap resubmission; do not bulk-request
   hundreds of URLs at once.

---

## Verification results (local production build, Next 16.2.6)

Crawl of every URL in the generated sitemap **before → after**:

| | before | after |
| --- | --- | --- |
| sitemap URLs | 127 | 121 |
| return 200 | 59 | **121** |
| return 500 | 68 | **0** |
| `/work/...` URLs (404) | 5 | 0 |
| `/casestudy/...` URLs | 5 | 6 |

Spot checks:

| URL | before | after |
| --- | --- | --- |
| `/blog/top-benefits-of-whatsapp-status-feature` | 500 | 200 |
| `/careers/full-stack-developer` | 500 | 200 |
| `/casestudy/carepulse-clinic-management-system` | 500 | 200 |
| `/services/<unknown>` | 200 (soft 404) | 404 |
| `/categories/<unknown>` | 200 (soft 404) | 404 |
| `/blog/<unknown>` | 200 (soft 404) | 404 |
| `/fintech-development` | 404 | 308 → `/industries/fintech` |
| `/work/limitless-motion` | 404 | 308 → `/casestudy/limitless-motion` |
| `/contact-us` | 404 | 308 → `/contact` |
| `/?p=6526` | 200 (duplicate home) | 301 → `/` |
| non-www host | 200 (duplicate) | 308 → `https://www.thrilledge.com/...` |

Canonicals verified on blog / career / casestudy / category / service pages: all
`https://www.thrilledge.com/...`, all `index, follow`.

Sitemap `lastmod` now uses real WordPress dates, e.g.
`<lastmod>2025-12-05T07:58:40.000Z</lastmod>`.

`npx tsc --noEmit` is clean.

---

## Verification checklist

```bash
npm run build
npx next start -p 3100

# was 500, must be 200
curl -s -o NUL -w "%{http_code}\n" http://localhost:3100/blog/top-benefits-of-whatsapp-status-feature
curl -s -o NUL -w "%{http_code}\n" http://localhost:3100/careers/full-stack-developer
curl -s -o NUL -w "%{http_code}\n" http://localhost:3100/casestudy/carepulse-clinic-management-system

# soft 404s, must now be 404
curl -s -o NUL -w "%{http_code}\n" http://localhost:3100/services/this-slug-does-not-exist-xyz
curl -s -o NUL -w "%{http_code}\n" http://localhost:3100/categories/this-does-not-exist-xyz

# legacy 301s
curl -s -o NUL -w "%{http_code} %{redirect_url}\n" http://localhost:3100/fintech-development
curl -s -o NUL -w "%{http_code} %{redirect_url}\n" http://localhost:3100/work/some-case-study

# sitemap sanity: real lastmod, no /work/ entries
curl -s http://localhost:3100/sitemap.xml
```
