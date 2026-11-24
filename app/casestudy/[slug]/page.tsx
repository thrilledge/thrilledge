import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWorkItem, getAllWorkSlugs } from '@/lib/wordpress'
import { SITE_URL } from '@/lib/seo'
import WorkClient from './work-client'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllWorkSlugs().catch(() => [])
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const work = await getWorkItem(slug).catch(() => null)
  if (!work) return { title: 'Work | Thrill Edge Technologies' }

  const title = work.title.rendered.replace(/<[^>]*>/g, '')
  const description = work.acf?.long_title ?? `${title}, a project by Thrill Edge Technologies.`
  const image = work._embedded?.['wp:featuredmedia']?.[0]?.source_url

  return {
    title: `${title} | Work, Thrill Edge Technologies`,
    description,
    alternates: { canonical: `${SITE_URL}/casestudy/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/casestudy/${slug}`,
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image && { images: [image] }),
    },
  }
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params
  const work = await getWorkItem(slug)

  // Real 404 for unknown slugs (previously the 200 shell deferred this to the client).
  if (!work) notFound()

  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.title.rendered.replace(/<[^>]*>/g, ''),
    description: work.acf?.long_title ?? '',
    url: `${SITE_URL}/casestudy/${slug}`,
    creator: { '@type': 'Organization', name: 'Thrill Edge Technologies' },
    ...(work._embedded?.['wp:featuredmedia']?.[0]?.source_url && {
      image: work._embedded['wp:featuredmedia'][0].source_url,
    }),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />
      <WorkClient params={params} />
    </>
  )
}
