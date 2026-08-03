import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers | Thrill Edge Technologies',
  description:
    'Join Thrill Edge Technologies. We hire senior software engineers, AI specialists, and growth roles — remote-friendly, global team.',
  alternates: { canonical: 'https://www.thrilledge.com/careers' },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
