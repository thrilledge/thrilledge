import { MetadataRoute } from 'next'
import {
  getAllCategorySlugs,
  getAllPostsForSitemap,
  getAllWorkForSitemap,
  getJobs,
} from '@/lib/wordpress'
import { SITE_URL } from '@/lib/site'

const SERVICE_SLUGS = [
  'ai-ml-solutions',
  'ai-workflow-automation',
  'custom-web-development',
  'ui-ux-design',
  'mobile-app-development',
  'mvp-product-strategy',
  'saas-solutions',
  'shopify-plus-agency',
  'sap-learning',
]

const INDUSTRY_SLUGS = [
  'healthcare',
  'education',
  'real-estate',
  'blockchain',
  'fintech',
  'logistics',
  'legal-services',
  'ecommerce-retail',
  'home-services',
]

const TECHNOLOGY_SLUGS = [
  'ai-machine-learning',
  'frontend-development',
  'backend-development',
  'mobile-development',
  'databases',
]

/**
 * Refresh the sitemap hourly at runtime.
 *
 * The sitemap is normally generated at build time. If WordPress happens to be
 * unreachable from the build container, the build still succeeds but with only
 * the static routes; this revalidate makes the sitemap heal itself on the next
 * request after deploy instead of staying degraded until the next deploy.
 */
export const revalidate = 3600

/**
 * `lastModified` is intentionally omitted for pages whose real modification
 * date is unknown. Emitting `new Date()` for every URL on every build tells
 * Google the whole site changed, which makes the value useless and can cause
 * crawlers to distrust the sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                          changeFrequency: 'daily',   priority: 1.0 },
    { url: `${SITE_URL}/about`,               changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/casestudy`,           changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/blog`,                changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/careers`,             changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE_URL}/contact`,             changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${SITE_URL}/client-reviews`,      changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/faqs`,                changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/categories`,          changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${SITE_URL}/project-cost-estimation`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/tools`,               changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`,      changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/terms-condition`,     changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`,    changeFrequency: 'yearly',  priority: 0.3 },
    // Services
    ...SERVICE_SLUGS.map(slug => ({
      url: `${SITE_URL}/services/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Industries
    ...INDUSTRY_SLUGS.map(slug => ({
      url: `${SITE_URL}/industries/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Technologies
    ...TECHNOLOGY_SLUGS.map(slug => ({
      url: `${SITE_URL}/technologies/${slug}`,
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
        url: `${SITE_URL}/blog/${post.slug}`,
        ...(post.modified ? { lastModified: new Date(post.modified) } : {}),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
      ...categorySlugs.map(slug => ({
        url: `${SITE_URL}/categories/${slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
      ...workItems.map(work => ({
        url: `${SITE_URL}/casestudy/${work.slug}`,
        ...(work.modified ? { lastModified: new Date(work.modified) } : {}),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      ...jobs.map(job => ({
        url: `${SITE_URL}/careers/${job.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ]
  } catch (error) {
    console.error('[Sitemap Error]', error)
    return staticRoutes
  }
}
