import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost, getAllPostSlugs } from '@/lib/wordpress'
import { SITE_URL } from '@/lib/site'
import PostClient from './post-client'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs().catch(() => [])
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug).catch(() => null)
  if (!post) return { title: 'Blog | Thrill Edge Technologies' }

  const title = post.title.rendered.replace(/<[^>]*>/g, '')
  const description = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim().slice(0, 160) ?? ''
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url

  return {
    title: `${title} | Thrill Edge Technologies`,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.date,
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  // Real 404 for unknown slugs (previously the 200 shell deferred this to the client).
  if (!post) notFound()

  const articleSchema = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title.rendered.replace(/<[^>]*>/g, ''),
        description: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim().slice(0, 160) ?? '',
        datePublished: post.date,
        dateModified: post.modified ?? post.date,
        author: { '@type': 'Organization', name: 'Thrill Edge Technologies' },
        publisher: {
          '@type': 'Organization',
          name: 'Thrill Edge Technologies',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
        },
        url: `${SITE_URL}/blog/${slug}`,
        ...(post._embedded?.['wp:featuredmedia']?.[0]?.source_url && {
          image: post._embedded['wp:featuredmedia'][0].source_url,
        }),
      }
    : null

  return (
    <>
      {articleSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      )}
      <PostClient params={params} />
    </>
  )
}
