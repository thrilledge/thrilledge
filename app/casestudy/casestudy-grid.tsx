'use client'

import { useState, useMemo } from 'react'
import { useWorkItems } from '@/hooks/use-work'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, FolderOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Animate } from '@/components/common/animate'

function parseServices(services?: string): string[] {
  if (!services) return []
  return services
    .replace(/<[^>]*>/g, '')
    .split(/[,\n]/)
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 3)
}

function getMeta(work: any) {
  const img = work._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const industry = work.acf?.industry?.trim()
  const year = work.acf?.year
  const client = work.acf?.client
  const role = work.acf?.role
  return { img, industry, year, client, role }
}

function CardChips({ industry, year }: { industry?: string; year?: string }) {
  return (
    <>
      {industry && (
        <span className="top-4 left-4 absolute z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-inter font-medium text-[11px] text-[#111212] border border-[#e5e5e5]">
          {industry}
        </span>
      )}
      {year && (
        <span className="top-4 right-4 absolute z-10 bg-[#111212]/70 backdrop-blur-sm px-3 py-1.5 rounded-full font-inter font-medium text-[11px] text-white border border-white/10">
          {year}
        </span>
      )}
    </>
  )
}

function FeaturedCard({ work }: { work: any }) {
  const { img, industry, year, client, role } = getMeta(work)
  const tags = parseServices(work.acf?.services)
  const description = work.acf?.long_title || work.acf?.overview?.replace(/<[^>]*>/g, '')

  return (
    <Link
      href={`/casestudy/${work.slug}`}
      className="group grid lg:grid-cols-2 bg-white rounded-[28px] border border-[#e5e5e5] overflow-hidden hover:border-[#d0d0d0] transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[460px] overflow-hidden bg-[#111212]">
        {img ? (
          <Image
            src={img}
            alt={work.title.rendered}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-[#F3F3F3] to-[#e5e5e5]" />
        )}
        <CardChips industry={industry} year={year} />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-8 md:p-12 gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="font-inter text-[11px] font-semibold text-[#929296] uppercase tracking-[0.15em]">
              Featured Case Study
            </span>
            <span className="flex-1 h-px bg-[#e5e5e5]" />
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag}
                  className="bg-[#F3F3F3] px-3 py-1.5 rounded-full font-inter text-[11px] font-medium text-[#525252] border border-[#e5e5e5]">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className={cn(
            'font-mont', 'font-bold', 'text-[#111212]',
            'text-[26px]', 'leading-[1.15]', 'md:text-[34px]', 'md:leading-[1.12]',
            'group-hover:text-[#2a2a2a]', 'transition-colors', 'duration-300',
          )}>
            {work.title.rendered}
          </h3>

          {description && (
            <p className="font-inter text-[15px] leading-[1.75] text-[#525252] line-clamp-4">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#e5e5e5]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-inter text-[13px] text-[#929296]">
            {client && <span className="font-medium text-[#111212]">{client}</span>}
            {client && role && <span className="text-[#d0d0d0]">•</span>}
            {role && <span>{role}</span>}
          </div>

          <span className="inline-flex items-center gap-2 font-mont font-semibold text-[13px] text-[#111212]">
            View Case Study
            <span className="w-8 h-8 rounded-full bg-[#111212] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowUpRight size={15} />
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function WorkCard({ work, index }: { work: any; index: number }) {
  const { img, industry, year } = getMeta(work)
  const tags = parseServices(work.acf?.services)
  const description = work.acf?.long_title || work.acf?.overview?.replace(/<[^>]*>/g, '')

  return (
    <Animate variant="fade-up" delay={index * 80} className="h-full">
      <Link
        href={`/casestudy/${work.slug}`}
        className="group flex flex-col h-full bg-white rounded-[24px] border border-[#e5e5e5] overflow-hidden hover:border-[#d0d0d0] transition-colors duration-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#111212]">
          {img ? (
            <Image
              src={img}
              alt={work.title.rendered}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-[#F3F3F3] to-[#e5e5e5]" />
          )}
          <CardChips industry={industry} year={year} />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="flex flex-col gap-3 p-6 flex-1">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map(tag => (
                <span key={tag}
                  className="bg-[#F3F3F3] px-2.5 py-1 rounded-lg font-inter text-[11px] font-medium text-[#525252]">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className={cn(
            'font-mont', 'font-semibold', 'text-[#111212]', 'text-[18px]',
            'leading-snug', 'line-clamp-2',
            'group-hover:text-[#2a2a2a]', 'transition-colors', 'duration-300',
          )}>
            {work.title.rendered}
          </h3>

          {description && (
            <p className="font-inter text-[13px] text-[#929296] leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#e5e5e5]">
            <span className="inline-flex items-center gap-1.5 font-mont font-semibold text-[12px] text-[#111212]">
              View Case Study
              <ArrowRight size={14} className="text-[#929296] group-hover:text-[#111212] group-hover:translate-x-1 transition-all duration-200" />
            </span>
          </div>
        </div>
      </Link>
    </Animate>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white rounded-[24px] border border-[#e5e5e5] overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-[#e5e5e5]" />
      <div className="flex flex-col gap-3 p-6">
        <div className="h-3 w-2/3 rounded-full bg-[#e5e5e5]" />
        <div className="h-4 w-full rounded-full bg-[#e5e5e5]" />
        <div className="h-4 w-4/5 rounded-full bg-[#e5e5e5]" />
      </div>
    </div>
  )
}

export function WorkGrid() {
  const [activeIndustry, setActiveIndustry] = useState('All')

  const { data: workItems = [], isLoading } = useWorkItems({ per_page: 100 })

  const industryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: workItems.length }
    for (const w of workItems) {
      const ind = w.acf?.industry?.trim()
      if (ind) counts[ind] = (counts[ind] ?? 0) + 1
    }
    return counts
  }, [workItems])

  const industries = ['All', ...Object.keys(industryCounts).filter(i => i !== 'All')]

  const filtered = useMemo(() =>
    activeIndustry === 'All'
      ? workItems
      : workItems.filter(w => w.acf?.industry?.trim() === activeIndustry),
    [workItems, activeIndustry]
  )

  const [featured, ...rest] = filtered

  return (
    <section className="bg-[#F3F3F3] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-9">
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Animate variant="fade-up">
              <p className="mb-3 font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.2em]">
                Case Studies
              </p>
            </Animate>
            <Animate variant="fade-up" delay={60}>
              <h2 className="font-mont font-bold text-[32px] text-[#111212] leading-[1.1] md:text-[48px]">
                Selected Work
              </h2>
            </Animate>
          </div>

          {/* Filter chips */}
          <Animate variant="fade-up" delay={120}>
            <div className="flex flex-wrap gap-2">
              {industries.map(ind => {
                const isActive = activeIndustry === ind
                return (
                  <button key={ind} onClick={() => setActiveIndustry(ind)}
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-mont font-semibold text-[13px] transition-all duration-200 cursor-pointer border',
                      isActive
                        ? 'bg-[#111212] text-white border-[#111212]'
                        : 'bg-white text-[#525252] border-[#e5e5e5] hover:border-[#929296] hover:text-[#111212]'
                    )}>
                    {ind === 'All' ? 'All Work' : ind}
                    <span className={cn(
                      'px-1.5 py-0.5 rounded-full font-inter text-[11px] tabular-nums',
                      isActive ? 'bg-white/20 text-white' : 'bg-[#F3F3F3] text-[#929296]'
                    )}>
                      {industryCounts[ind] ?? 0}
                    </span>
                  </button>
                )
              })}
            </div>
          </Animate>
        </div>

        {/* Grid */}
        <div className="mt-12 md:mt-16">
          {isLoading ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 flex flex-col items-center gap-4 bg-white border border-dashed border-[#d0d0d0] rounded-[24px] text-center">
              <span className="w-12 h-12 rounded-full bg-[#F3F3F3] flex items-center justify-center">
                <FolderOpen size={20} className="text-[#929296]" />
              </span>
              <p className="font-mont font-semibold text-[20px] text-[#111212]">
                No projects in this category yet
              </p>
              <p className="font-inter text-[14px] text-[#929296]">Check back soon.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 md:gap-8">
              {featured && (
                <Animate variant="fade-up">
                  <FeaturedCard work={featured} />
                </Animate>
              )}

              {rest.length > 0 && (
                <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((work, idx) => (
                    <WorkCard key={work.id} work={work} index={idx} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
