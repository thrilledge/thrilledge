import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Categories | Thrill Edge Technologies',
  description:
    'Browse all Thrill Edge Technologies blog categories — AI, web development, mobile apps, SaaS, eCommerce, and more.',
  alternates: { canonical: 'https://www.thrilledge.com/categories' },
}

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
