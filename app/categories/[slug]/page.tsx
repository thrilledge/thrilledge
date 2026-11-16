/**
 * Category Posts Page (server entry)
 *
 * The category is validated on the server so an unknown slug returns a real
 * 404. Previously the whole page was a client component that only called
 * `notFound()` after hydration, which made every /categories/<anything>
 * return HTTP 200 (a soft 404 for Google).
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findCategoryOrThrow } from '@/lib/wordpress'
import { SITE_URL } from '@/lib/site'
import { CategoryClient } from './category-client'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await findCategoryOrThrow(slug).catch(() => null)

  if (!category) {
    return {
      title: 'Category | Thrill Edge Technologies',
      robots: { index: false, follow: false },
    }
  }

  return {
    title: `${category.name} | Thrill Edge Technologies`,
    ...(category.description ? { description: category.description } : {}),
    alternates: { canonical: `${SITE_URL}/categories/${slug}` },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await findCategoryOrThrow(slug)
  if (!category) notFound()

  return <CategoryClient slug={slug} />
}
