import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Cost Estimation | Thrill Edge Technologies',
  description:
    'Estimate the cost and timeline of your software project. Get a clear breakdown for web, mobile, AI, and SaaS builds within minutes.',
  alternates: { canonical: 'https://www.thrilledge.com/project-cost-estimation' },
}

export default function ProjectCostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
