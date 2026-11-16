/**
 * Categories Listing Page
 * Displays all blog categories.
 *
 * Server component: categories are known at build time, so the page ships real
 * HTML instead of a loading spinner (client-only rendering gave Google an empty
 * shell for a URL that is in the sitemap).
 */

import { getCategories } from '@/lib/wordpress'
import { ShadowCard } from '@/components/common/shadow-card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { decodeHtml } from '@/lib/utils'

export const revalidate = 300

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <main className="bg-background min-h-screen text-foreground">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-40 pb-16">
        <div className="space-y-6 mx-auto max-w-4xl text-center">
          <h1 className="font-bold text-foreground text-5xl md:text-6xl">
            Blog <span className="text-accent">Categories</span>
          </h1>
          <p className="text-muted-foreground text-xl">
            Browse articles by topic and find the content you&apos;re looking for
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-6xl">
          {categories.length > 0 ? (
            <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                >
                  <ShadowCard className="h-full" hover>
                    <div className="space-y-4">
                      {/* Category Icon */}
                      <div className="flex justify-center items-center bg-accent/20 rounded-lg w-16 h-16">
                        <span className="text-accent text-3xl">
                          {decodeHtml(category.name).charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* Category Name */}
                      <h3 className="font-bold text-foreground group-hover:text-accent text-2xl transition-colors">
                        {decodeHtml(category.name)}
                      </h3>

                      {/* Description */}
                      {category.description && (
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                      )}

                      {/* Post Count */}
                      <div className="pt-4 border-border/50 border-t">
                        <p className="font-semibold text-accent">
                          {category.count} {category.count === 1 ? 'Article' : 'Articles'}
                        </p>
                      </div>

                      {/* Link */}
                      <div className="flex items-center gap-2 pt-2 text-accent transition-transform group-hover:translate-x-1">
                        <span className="font-semibold text-sm">View Category</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </ShadowCard>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-muted-foreground text-center">
              <p>No categories available.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
