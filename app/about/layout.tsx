import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Thrill Edge Technologies',
  description:
    'Custom software development company specialising in AI, web, mobile, and SaaS. Founded in 2022, trusted by clients across the US, UK, Canada, and Australia.',
  alternates: { canonical: 'https://www.thrilledge.com/about' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
