import { Suspense } from 'react'
import type { Metadata } from 'next'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ServiceClient } from './service-client'
import { CTASection } from '@/components/sections/cta-section'
import { getService, findServiceOrThrow } from '@/lib/wordpress'
import { SITE_URL } from '@/lib/site'
import { decodeHtml } from '@/lib/utils'
import { notFound } from 'next/navigation'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

const SERVICE_FALLBACK: Record<string, { title: string; description: string }> = {
  'ai-ml-solutions': {
    title: 'AI & ML Solutions | Thrill Edge Technologies',
    description: 'Custom AI and machine learning development — NLP, computer vision, generative AI, and LLM integrations for healthcare, fintech, and eCommerce.',
  },
  'ai-workflow-automation': {
    title: 'AI Workflow Automation | Thrill Edge Technologies',
    description: 'Automate business processes with AI — workflow automation, document processing, and LLM-powered agents built to scale with your operations.',
  },
  'custom-web-development': {
    title: 'Custom Web Development | Thrill Edge Technologies',
    description: 'Scalable custom web development — portals, enterprise platforms, and high-performance websites built for US, UK, and Australian businesses.',
  },
  'ui-ux-design': {
    title: 'UI/UX Design Services | Thrill Edge Technologies',
    description: 'Product-led UI/UX design — research, wireframes, and pixel-perfect interfaces that turn users into customers.',
  },
  'mobile-app-development': {
    title: 'Mobile App Development | Thrill Edge Technologies',
    description: 'Native and cross-platform iOS and Android app development with Flutter and React Native, shipped by a top-rated software agency.',
  },
  'mvp-product-strategy': {
    title: 'MVP & Product Strategy | Thrill Edge Technologies',
    description: 'Validate your idea and ship faster — MVP scoping, product strategy, and rapid development for startups and founders.',
  },
  'saas-solutions': {
    title: 'SaaS Solutions | Thrill Edge Technologies',
    description: 'Multi-tenant SaaS platform development — subscriptions, billing, analytics, and cloud-native architecture built to scale.',
  },
  'shopify-plus-agency': {
    title: 'Shopify Plus Agency | Thrill Edge Technologies',
    description: 'High-growth eCommerce on Shopify Plus — custom themes, app integrations, headless builds, and store optimization.',
  },
}

function stripHtml(input: string): string {
  return decodeHtml(input).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug).catch(() => null)
  const fallback = SERVICE_FALLBACK[slug]

  const title = service
    ? `${stripHtml(service.title.rendered)} | Thrill Edge Technologies`
    : (fallback?.title ?? 'Services | Thrill Edge Technologies')

  const description = service?.acf?.service_solutions
    ? stripHtml(service.acf.service_solutions).slice(0, 160)
    : (fallback?.description ?? 'Comprehensive software development services — AI, web, mobile, and SaaS.')

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/services/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params

  /**
   * Validate on the server. Previously this page rendered a 200 shell for any
   * slug and only called `notFound()` inside the client component, so
   * /services/<anything> was a soft 404 that Google kept crawling.
   *
   * Slugs present in SERVICE_FALLBACK stay valid even when WordPress has no
   * matching `service` entry.
   */
  const service = await findServiceOrThrow(slug)
  if (!service && !SERVICE_FALLBACK[slug]) notFound()

  return (
    <>
      <ServiceClient slug={slug} />

      {/* <Suspense fallback={null}>
        <WorkSection show={3} />
      </Suspense> */}

      <Suspense fallback={null}>
        <TestimonialsSection show={8} />
      </Suspense>

      {/* CTA */}
      <CTASection />

    </>
  )
}
