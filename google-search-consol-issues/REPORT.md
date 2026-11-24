# Thrill Edge Website — SEO & Deployment Fix Report

Prepared: 17 November 2026
Repository: https://github.com/thrilledge/thrilledge

---

## 1. The problem in one paragraph

Google Search Console was only showing about **2 pages** from thrilledge.com as indexed, and most of the site's important pages (blog posts, case studies, careers, service and industry pages) were returning **HTTP 500 "Internal Server Error"** when someone opened them. Google treats a 500 error as "this site is broken right now", so it stops indexing those pages. On top of that, some old WordPress links were pointing at addresses that no longer existed, and the non-`www` version of the domain was competing with the `www` version for the same pages. The result: very few pages indexed, and no clear signal to Google about which address is the "real" one.

---

## 2. What was actually wrong (plain language)

| # | What we found | Why it mattered |
|---|---|---|
| 1 | Blog posts, case studies and job pages were being loaded in a way that forced the server to rebuild them on **every single visit**. Each rebuild went to WordPress, and the combination crashed the page. | Every one of these URLs returned **500 Internal Server Error**. Google saw the whole site as broken and dropped the pages from the index. |
| 2 | The website had **no single agreed address**. Some pages said `thrilledge.com`, some said `www.thrilledge.com`. | Google sees two versions of every page and picks neither, so both stay out of the index. |
| 3 | Pages that did not exist returned a normal-looking page (a "soft 404") instead of a proper "not found" answer. | Google keeps recrawling dead URLs forever instead of deleting them. |
| 4 | About 60-70 old WordPress tag, category and date-archive links from the previous website still pointed at addresses that were never recreated. | Constant 404s in Search Console, which wastes the crawl budget Google gives the site. |
| 5 | The sitemap (the list of pages we hand to Google) told Google the whole site changed on every deploy, and it pointed at URLs that no longer existed. | Google learns to ignore the "last updated" dates, so it does not know what is actually new. |
| 6 | The deploy pipeline was building the site on a machine that could not reach WordPress, and it gave up after ~3.5 minutes. | Even after all the code fixes, the new version could not go live — production kept serving the old, broken version. |

---

## 3. What we changed

### A. Stopped the 500 errors (the big one)
Blog posts, case studies, careers and category pages now load WordPress data once and cache it for 5 minutes instead of re-fetching on every visit. They are now properly pre-built pages ("Static Site Generation"), which is both much faster and much more stable. Result: **no more 500 errors on detail pages**.

### B. One official address
Every page, every sitemap entry and every link in the page metadata now points to **`https://www.thrilledge.com`**. The non-`www` version is set to permanently redirect (301) to the `www` version, so Google sees one site, not two.

### C. Real "page not found" answers
If someone opens a blog post, case study, service, industry or category that does not exist, the site now returns a real **404**. Google can then clean those dead URLs out of the index instead of retrying them forever.

### D. Old links handled properly
- Real old posts that still exist are redirected (301) to their new address, e.g. `thrilledge.com/some-post-title` → `thrilledge.com/blog/some-post-title`.
- Old category links redirect to the new categories section.
- Old project links redirect to the new case studies section.
- Old industry and service pages redirect to the matching new pages.
- Old tag and date-archive links are deliberately left as proper 404s. We do **not** dump hundreds of unrelated old URLs onto `/blog`, because Google treats that as a low-quality redirect and it does not help ranking.

### E. A sitemap Google can trust
- It now lists the **real** pages that exist, with the **real** date each one was last edited.
- It no longer lists `/work/...` URLs that return errors.
- It now includes case studies, which were missing before.
- It refreshes itself hourly on the live site, so it can never stay out of date for long.

### F. Deployment can no longer be blocked by WordPress
The build process used a private WordPress address that only works inside the live server. We changed it so that:
- During the build it uses the **public** WordPress address.
- If WordPress is unreachable, the build waits 10 seconds instead of 60+ and then carries on with placeholder content instead of failing the whole deploy.
- The sitemap and content refresh themselves automatically once the site is live, so any temporarily missing content fills back in without another deploy.

---

## 4. How we proved it works (test results)

| Test | Before | After |
|---|---|---|
| Blog post `/blog/deepseek-vs-gpt-5-which-ai-model-performs-better` | 500 error | **200 OK** |
| Blog posts, case studies, job pages | 500 errors | **200 OK**, pre-built and cached |
| Every URL in the sitemap (127 pages) | most returned 500 | **127 out of 127 returned 200, zero 500s** |
| A made-up blog URL | "soft" page instead of an error | **real 404** |
| A made-up category URL | "soft" page instead of an error | **real 404** |
| Old `?p=123` style link | page loaded | **301 redirect to homepage** |
| Site build (fresh, from scratch) | failed, deploy aborted | **succeeds even if WordPress is completely unreachable** |
| Build with WordPress unreachable | crashed after ~3.5 minutes | **finishes successfully in ~73 seconds** |

---

## 5. Status of the changes

- **Pull request #14** (`fix(seo): stop 500s on detail pages and the soft 404s`) — **merged into `main`**. Contains all the SEO and 500-error fixes (items A–E).
- **Pull request #15** (`fix(build): do not fail the deploy when WordPress is unreachable at build time`) — **open, ready to merge**. Contains the deployment fix (item F). Without this one, the deploy of #14 still fails.

Both together are what actually gets the fixed site live.

---

## 6. What still needs to be done outside the code

These are one-time settings on the server and in Google's tools. They cannot be done from the repository:

1. **Merge pull request #15** and let Coolify redeploy, or trigger a fresh deploy of `main` after merging.
2. **Coolify environment variables** — make sure this exists:
   - `NEXT_PUBLIC_WORDPRESS_URL = https://admin.thrilledge.com`
   - `NEXT_PUBLIC_SITE_URL = https://www.thrilledge.com`
   - Keep `WORDPRESS_INTERNAL_URL` as it is; the code now ignores it during the build.
3. **Server redirect** — confirm `http://thrilledge.com` and `https://thrilledge.com` both permanently redirect to `https://www.thrilledge.com`.
4. **Google Search Console**:
   - Resubmit `https://www.thrilledge.com/sitemap.xml`.
   - Use "Request Indexing" for the homepage, `/blog`, `/casestudy`, and the 5–10 most important blog posts.
   - Optionally use the "Validate fix" button on the old 500-error and 404 reports.

---

## 7. What to expect, and when

- **Immediately after deploy:** the 500 errors disappear, old links start redirecting correctly, and the site becomes noticeably faster.
- **Within 1–3 days:** Google starts recrawling. The "Server error (5xx)" report in Search Console should shrink.
- **Within 1–3 weeks:** most indexed-page counts should climb as Google works through the sitemap. Technical fixes remove the blockers, but Google still decides when and how much to index — steady internal linking and fresh content during this window helps.
- **Things that will stay as 404s:** old tag pages, old date archives and genuinely deleted posts. That is intentional and healthy; they should not be redirected to unrelated pages.

---

## 8. One-line summary for a non-technical reader

> The website was returning "server error" on almost every article page, which is why Google indexed only ~2 pages. We fixed the errors, made every page use one official `www` address, gave Google a correct list of pages with real update dates, cleaned up old links, and fixed the deploy so the corrected site can actually go live.
