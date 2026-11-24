import { MetadataRoute } from 'next'
import {
  getAllCategorySlugs,
  getAllPostsForSitemap,
  getAllWorkForSitemap,
  getJobs,
} from '@/lib/wordpress'
import { SITE_URL } from '@/lib/seo'

const BASE = SITE_URL

/**
 * Route bases kept in one place so the sitemap can never drift from the actual
 * App Router folders (the previous `/work/...` entries pointed at a route that
 * did not exist and produced 404s in Search Console).
 */
const WORK_ROUTE = '/casestudy'

const SERVICE_SLUGS = [
  'ai-ml-solutions',
  'custom-web-development',
  'ui-ux-design',
  'mobile-app-development',
  'mvp-product-strategy',
  'saas-solutions',
  'shopify-plus-agency',
]

const INDUSTRY_SLUGS = [
  'healthcare',
  'education',
  'real-estate',
  'blockchain',
  'fintech',
  'logistics',
]

const TECHNOLOGY_SLUGS = [
  'ai-machine-learning',
  'frontend-development',
  'backend-development',
  'mobile-development',
  'databases',
]

/**
 * `lastModified` is intentionally omitted for pages whose real modification
 * date is unknown. Emitting `new Date()` for every URL on every build tells
 * Google the whole site changed, which makes the value useless and can cause
 * crawlers to distrust the sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                               changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/about`,                    changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,                     changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/careers`,                  changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/contact`,                  changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE}/client-reviews`,           changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/faqs`,                     changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/categories`,               changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${BASE}${WORK_ROUTE}`,             changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/project-cost-estimation`,  changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy-policy`,           changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms-condition`,          changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms-of-service`,         changeFrequency: 'yearly',  priority: 0.3 },
    // Services
    ...SERVICE_SLUGS.map(slug => ({
      url: `${BASE}/services/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Industries
    ...INDUSTRY_SLUGS.map(slug => ({
      url: `${BASE}/industries/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Technologies
    ...TECHNOLOGY_SLUGS.map(slug => ({
      url: `${BASE}/technologies/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  try {
    const [posts, categorySlugs, workItems, jobs] = await Promise.all([
      getAllPostsForSitemap().catch(() => []),
      getAllCategorySlugs().catch(() => []),
      getAllWorkForSitemap().catch(() => []),
      getJobs().catch(() => []),
    ])

    return [
      ...staticRoutes,
      ...posts.map(post => ({
        url: `${BASE}/blog/${post.slug}`,
        ...(post.modified ? { lastModified: new Date(post.modified) } : {}),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
      ...categorySlugs.map(slug => ({
        url: `${BASE}/categories/${slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
      ...workItems.map(work => ({
        url: `${BASE}${WORK_ROUTE}/${work.slug}`,
        ...(work.modified ? { lastModified: new Date(work.modified) } : {}),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      ...jobs.map(job => ({
        url: `${BASE}/careers/${job.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ]
  } catch (error) {
    console.error('[Sitemap Error]', error)
    return staticRoutes
  }
}
