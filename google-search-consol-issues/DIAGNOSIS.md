# Google Search Console — Root Cause Analysis

Site: https://thrilledge.com (Next.js on nginx, WordPress headless at admin.thrilledge.com)
Checked live: 16 Nov 2026

---

## TL;DR — why only ~2 pages are indexed

| # | Cause | Impact |
|---|-------|--------|
| **1** | **All content detail pages return HTTP 500.** 68 of the 127 URLs in the live sitemap are broken (60 blog posts + 3 careers + 5 case studies). | Google cannot index the entire blog, careers and case-study section. This alone explains "2 indexed pages". |
| **2** | **non-www and www both serve the site with 200** and every canonical points to `https://www.thrilledge.com`, while the GSC property, sitemap and code use `https://thrilledge.com`. | Every non-www page Google crawls is classified as "Alternate page with proper canonical tag". The non-www property therefore shows almost nothing as indexed. |
| **3** | Most of the other reports (noindex, 404, redirect, crawled-not-indexed) are **legacy WordPress URLs** from before the Next.js migration. They now 404 / redirect. They are old data + missing 301s, not new bugs. | Wasted crawl budget + lost backlink equity, but not the reason for low indexing. |

---

## 1. CRITICAL — every dynamic page returns 500

Live test of all 127 sitemap URLs:

```
200 : 59
500 : 68   <-- 60 blog posts + 3 careers + 5 case studies
```

Confirmed with a normal browser User-Agent **and** with the Googlebot User-Agent,
so this is what Google actually sees:

```
500  /blog/deepseek-vs-gpt-5-which-ai-model-performs-better   (2698 ms)
500  /blog/xyz-not-real                                      (2614 ms)   <-- even non-existent slug
500  /careers/full-stack-developer                           (2503 ms)
500  /casestudy/limitless-motion                             (2557 ms)
200  /services/ai-ml-solutions                              (3328 ms)
```

Response body is `Internal Server Error` (text/plain, 21 bytes) — a server-side
render crash, not a 404, not a WP problem.

### What is NOT the cause (verified)

- WordPress REST API is healthy:
  - `/wp-json/wp/v2/posts?slug=...&_embed` → 200 (22 KB, ~2.5–3.3 s)
  - `/wp-json/wp/v2/work?slug=...&_embed&acf_format=standard` → 200
  - `/wp-json/wp/v2/job?slug=...&acf_format=standard&_embed` → 200
  - non-existent slug returns `[]` correctly
- `/blog` list page server-renders 12 real post links → server can reach WP.
- root `not-found` works: `/nonexistent-page-xyz` → 404 (so the layout/error
  boundary is fine).
- The pattern is precise: routes that combine **`generateStaticParams()` +
  a WordPress fetch (`cache: 'no-store'`) in the page/`generateMetadata`** fail;
  routes with hard-coded data (`/industries/*`, `/technologies/*`) or client-only
  rendering (`/services/*`, `/categories/*`) work.

The ~2.5 s response time means the WP call completes and the crash happens
immediately after — i.e. inside `generateMetadata()` / the page render.

### Most likely code paths to check in the deployed build

1. Unguarded data access in `generateMetadata()` / page, e.g. `post.title.rendered`
   before `if (!post) return ...`. This explains why even a non-existent slug
   gives 500 instead of 404.
2. `fetch(..., { cache: 'no-store' })` (see `lib/wordpress.ts`, `wpFetch`) used by a
   route that Next treats as static/ISR because of `generateStaticParams()`.
   In Next 16 this combination can throw at request time.
3. A component rendered only on these three templates (post hero / case-study
   client / job page) that touches `window`, `localStorage`, or an unguarded
   array/date during SSR.

### How to fix

1. Get the real stack trace from the server:
   `pm2 logs <app>` or `journalctl -u <service> -n 200 --no-pager`
   then request one broken URL. The trace will name the file/line.
2. Repro locally:
   `npm install && npm run build && npm start` → open `/blog/<slug>`.
   (This folder has no `node_modules`, so it could not be reproduced here.)
3. In every detail route: null-guard the WP result and call `notFound()`,
   never dereference before the guard.
4. Make detail routes consistently dynamic, e.g. `export const dynamic = 'force-dynamic'`
   (or change `wpFetch` to `next: { revalidate: 300 }` instead of `no-store`)
   so ISR + no-store do not collide.
5. Rebuild + redeploy, then re-test all 68 URLs, then click "Validate fix" in GSC.

---

## 2. www vs non-www duplication (the "Alternate page" report)

```
GET https://thrilledge.com/       -> 200   canonical: https://www.thrilledge.com
GET https://www.thrilledge.com/   -> 200   canonical: https://www.thrilledge.com
GET https://thrilledge.com/blog   -> 200   canonical: https://www.thrilledge.com/blog
GET https://thrilledge.com/?p=6526-> 200   canonical: https://www.thrilledge.com
```

- No host redirect exists. Both hosts return 200 with identical content.
- Canonical, live sitemap and live robots.txt all use **www**.
- GSC reports and `.env.local` / code use **non-www** (`NEXT_PUBLIC_SITE_URL=https://thrilledge.com`,
  plus 11 hard-coded `https://thrilledge.com` canonicals in `app/**`).
- `/?p=6526` (old WordPress shortlink) serves the homepage → also becomes an
  "alternate page".

### Fix (pick ONE host, then be consistent everywhere)

Recommended: **www** (Google has already consolidated to www, so switching again
restarts the whole process). If you prefer non-www, then all 11 canonicals,
sitemap, robots, OG tags, JSON-LD must change instead.

nginx, before the proxy:

```nginx
server {
    listen 443 ssl;
    server_name thrilledge.com;
    return 301 https://www.thrilledge.com$request_uri;
}
```

Plus in `next.config.mjs` (or nginx):

```js
// old WP shortlinks
{ source: '/', has: [{ type: 'query', key: 'p' }], destination: '/', permanent: true }
```

Consistency checklist: `metadataBase` in `app/layout.tsx`, all `alternates.canonical`,
`openGraph.url`, `app/sitemap.ts` BASE, `app/robots.ts` sitemap, every JSON-LD `url`,
footer/internal links, and GSC property (use a **Domain** property so www + non-www
are measured together).

---

## 3. "Excluded by noindex tag" (58 URLs) — historical WordPress data

Every URL in that report is an old WordPress URL:
`/our-projects/...`, `/tag/...`, `/category/...`, `/?p=...`, root-level blog slugs.

The live Next.js site emits **no** noindex anywhere (checked `/`, `/blog`,
`/services`, `/casestudy`: `index, follow`). So this list is a snapshot of the old
WordPress site (crawled Jun–Sep 2026) and will drain on its own after recrawl.

Action: none required for those URLs. Optional: 301 the ones with backlinks.
Also confirm `admin.thrilledge.com` stays noindexed (its API already sends
`X-Robots-Tag: noindex`; verify the front-end too).

---

## 4. "Not found (404)" (50 URLs) — legacy URLs, some need 301s

Already handled by the live build (verified 308 → new URL):

```
/about-us              -> /about
/our-projects/*        -> /casestudy
/our-team              -> /about
/category/*            -> /categories/*
/custom-software-development/crm-solution -> /services/custom-web-development
/app-development/ios-app-development      -> /services/mobile-app-development
/amazon-ppc-advertising -> /blog/amazon-ppc-campaign-...
```

Still 404 and worth redirecting (have a clear new equivalent):

| old URL | new URL |
|---|---|
| `/fintech-development` | `/industries/fintech` |
| `/healthcare-development` | `/industries/healthcare` |
| `/education-development` | `/industries/education` |
| `/real-estate-development` | `/industries/real-estate` |
| `/ui-ux-design` | `/services/ui-ux-design` |
| `/erp-services` | `/services/sap-learning` (or closest service) |
| `/contact-us` | `/contact` |
| `/certifications`, `/featured-partner` | `/about` |
| `/our-projects/<slug>` | `/casestudy/<matching-slug>` |
| old root blog slug (`/why-seo-matters-...`) | `/blog/<slug>` |

Fast win: add a middleware/redirect rule that maps any root-level path whose slug
exists as a WordPress post to `/blog/<slug>` (301). That covers dozens of the
404s and the noindex leftovers in one rule.

Leave as 404/410 (no value): `/tag/*`, `/2025/05/24`, `/blog/page/6`,
`/wp-content/plugins/.../svg-shapes/`.

---

## 5. "Page with redirect" (38 URLs) — mostly expected

This is normal after a migration, but three quality issues:

1. **Both `/x` and `/x/` are listed** → Google is discovering trailing-slash
   duplicates. Next answers `/x/` with a 308 to `/x`. Make sure internal links and
   sitemap use no trailing slash (they do) and add `trailingSlash: false`
   explicitly to avoid surprises.
2. **Old service pages are mass-redirected to `/services`** (a generic hub).
   Google treats these as soft-404-ish. Point each one at the closest real page.
3. Check for **redirect chains** (e.g. `/x/` → `/x` → `/services`) — every hop is
   wasted crawl budget. Redirect straight to the final URL in one hop.

---

## 6. "Crawled – currently not indexed" (39 URLs) — thin/duplicate legacy pages

Content of the report: old `/tag/*` pages (20+), old paginated `/blog/page/6`,
`/category/*`, `/our-projects/*`, and duplicate blog slugs such as
`how-to-build-a-saas-from-scratch-3`, `-5`, `how-to-validate-your-startup-idea-2/-3/-4`.

- The duplicate `-2/-3/-4/-5` posts are real duplicates created by WordPress slug
  auto-increment during imports. In WP admin: merge/delete them and 301 to the
  main post. They currently return 500 as well.
- Going forward, the new site also ships **26 `/categories/*` pages** in the
  sitemap which are thin archives. Either add unique copy to each or
  `robots: { index: false }` + remove from the sitemap, to avoid reproducing the
  same "crawled – not indexed" pattern.

---

## 7. Sitemap / robots quality issues (found while checking)

1. `app/sitemap.ts` uses `lastModified: new Date()` for **every** entry on every
   request. Live sitemap proves it (all URLs = request time). Google learns
   lastmod is fake and ignores it. Use `post.modified` / real data.
2. The live sitemap lists 68 URLs that return 500 → Google sees a broken sitemap.
   Fix the 500s before resubmitting.
3. This local copy of the project is **out of sync with production**:
   - production has `/casestudy`; this folder has `/work-pending` (and
     `app/sitemap.ts` advertises `/work/...`, which is a 404 on production).
   - production canonicals = www; this folder = non-www.
   Deploying this folder as-is would break the sitemap and flip all canonicals.
   Sync with the deployed branch first.
4. `app/robots.ts` and `public/robots.txt` both exist; the live file is the static
   `public/robots.txt` (it has the wp-admin rules). Pick one source of truth.
5. Soft 404s: `/services/anything` and `/categories/anything` return **200** for
   non-existent slugs. They must call `notFound()` → 404, otherwise Google can
   index unlimited junk URLs.

---

## 8. Priority order

**P0 — this week**
1. Fix the 500s (get the PM2/Next stack trace, null-guard, rebuild, redeploy).
2. 301 non-www → www at nginx; align canonicals/sitemap/robots/GSC property.

**P1 — next**
3. Add the 301 map for legacy URLs (industries, contact-us, old root blog slugs).
4. `notFound()` for unknown `/services/*` and `/categories/*` slugs.
5. Fix sitemap `lastModified`; remove broken URLs.

**P2 — content/cleanup**
6. Merge duplicate WP posts (`-2/-3/-4/-5`).
7. Decide categories: add content or noindex + drop from sitemap.
8. In GSC: validate the fixed URLs, resubmit the sitemap, request indexing for the
   8 service pages, 10 industry pages, 5 technology pages and top blog posts.

---

### Reproduce the checks

```powershell
# all sitemap URLs
node -e "const r=await fetch('https://www.thrilledge.com/sitemap.xml');const x=await r.text();const u=[...x.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);let i=0;const o=[];await Promise.all([...Array(10)].map(async()=>{while(i<u.length){const s=u[i++];try{const q=await fetch(s,{method:'HEAD'});o.push(q.status+' '+s)}catch(e){o.push('ERR '+s)}}}));o.sort();console.log(o.join('\n'))"

# one broken page with Googlebot UA
curl.exe -s -o NUL -w "%{http_code}`n" -A "Mozilla/5.0 (compatible; Googlebot/2.1)" https://www.thrilledge.com/blog/top-benefits-of-whatsapp-status-feature
```
