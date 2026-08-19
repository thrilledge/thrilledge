import type { Metadata } from 'next'
import { Suspense } from 'react'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CTASection } from '@/components/sections/cta-section'
import { SAPLearningClient } from './sap-learning-client'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'SAP Learning | Thrill Edge Technologies',
  description:
    'Practical, structured and career-focused SAP learning designed for students, professionals and aspiring SAP consultants. Learn SAP modules, build real-world skills and prepare for consulting careers.',
  alternates: { canonical: `${SITE_URL}/services/sap-learning` },
  openGraph: {
    title: 'SAP Learning | Thrill Edge Technologies',
    description:
      'Practical, structured and career-focused SAP learning designed for students, professionals and aspiring SAP consultants.',
    type: 'website',
    url: `${SITE_URL}/services/sap-learning`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAP Learning | Thrill Edge Technologies',
    description:
      'Practical, structured and career-focused SAP learning designed for students, professionals and aspiring SAP consultants.',
  },
}

export default function SAPLearningPage() {
  return (
    <>
      <SAPLearningClient />
      <Suspense fallback={null}>
        <TestimonialsSection show={8} />
      </Suspense>
      <CTASection />
    </>
  )
}
