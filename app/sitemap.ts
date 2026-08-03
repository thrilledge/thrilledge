import { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllCategorySlugs, getAllWorkSlugs, getJobs } from '@/lib/wordpress'
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/casestudy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/careers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE_URL}/client-reviews`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/faqs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/project-cost-estimation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-condition`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    // Services
    ...SERVICE_SLUGS.map(slug => ({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Industries
    ...INDUSTRY_SLUGS.map(slug => ({
      url: `${SITE_URL}/industries/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Technologies
    ...TECHNOLOGY_SLUGS.map(slug => ({
      url: `${SITE_URL}/technologies/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  try {
    const [postSlugs, categorySlugs, workSlugs, jobs] = await Promise.all([
      getAllPostSlugs(),
      getAllCategorySlugs(),
      getAllWorkSlugs(),
      getJobs().catch(() => []),
    ])

    return [
      ...staticRoutes,
      ...postSlugs.map(slug => ({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
      ...categorySlugs.map(slug => ({
        url: `${SITE_URL}/categories/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
      ...workSlugs.map(slug => ({
        url: `${SITE_URL}/casestudy/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
      ...jobs.map(job => ({
        url: `${SITE_URL}/careers/${job.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ]
  } catch (error) {
    console.error('[Sitemap Error]', error)
    return staticRoutes
  }
}
