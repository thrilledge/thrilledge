import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQs | Thrill Edge Technologies',
  description:
    'Answers to common questions about working with Thrill Edge Technologies — process, pricing, IP ownership, AI & ML services, and timelines.',
  alternates: { canonical: 'https://www.thrilledge.com/faqs' },
}

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
