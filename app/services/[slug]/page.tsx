import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getService, findServiceOrThrow } from '@/lib/wordpress'
import { SITE_URL } from '@/lib/seo'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ServiceClient } from './service-client'
import { CTASection } from '@/components/sections/cta-section'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug).catch(() => null)

  if (!service) {
    return {
      title: 'Service | Thrill Edge Technologies',
      alternates: { canonical: `${SITE_URL}/services/${slug}` },
      robots: { index: false, follow: false },
    }
  }

  const title = service.title.rendered.replace(/<[^>]*>/g, '')

  return {
    title: `${title} | Thrill Edge Technologies`,
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
    openGraph: {
      title,
      type: 'website',
      url: `${SITE_URL}/services/${slug}`,
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params

  /**
   * Validate on the server. Previously this page rendered a 200 shell for any
   * slug and only called `notFound()` inside the client component, so
   * /services/<anything> was a soft 404 that Google kept crawling.
   */
  const service = await findServiceOrThrow(slug)
  if (!service) notFound()

  return (
    <>
      <ServiceClient slug={slug} />

      <Suspense fallback={null}>
        <TestimonialsSection show={8} />
      </Suspense>

      {/* CTA */}
      <CTASection />
    </>
  )
}
