'use client'

import { useState, useMemo } from 'react'
import { useWorkItems } from '@/hooks/use-work'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function WorkGrid() {
  const [activeIndustry, setActiveIndustry] = useState('All')

  const { data: workItems = [] } = useWorkItems({ per_page: 100 })

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

  return (
    <div className="w-full py-24">
      <div className="mx-auto px-4 md:px-9 max-w-[1120px]">
        <div className="flex flex-wrap gap-2 pb-1">
          {industries.map(ind => {
            const isActive = activeIndustry === ind
            return (
              <button key={ind} onClick={() => setActiveIndustry(ind)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-mont font-semibold text-[13px] transition-all duration-200 cursor-pointer border',
                  isActive
                    ? 'bg-[#111212] text-white border-[#111212]'
                    : 'bg-white text-[#525252] border-[#e5e5e5] hover:border-[#929296] hover:text-[#111212]'
                )}>
                {ind === 'All' ? 'All Work' : ind}
                <span className={cn(
                  'px-1.5 py-0.5 rounded-full font-inter text-[11px]',
                  isActive ? 'bg-white/20 text-white' : 'bg-[#F3F3F3] text-[#929296]'
                )}>
                  {industryCounts[ind] ?? 0}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto px-4 md:px-9 mt-10 max-w-[1120px]">
        {filtered.length === 0 ? (
          <div className="py-24 border border-[#e5e5e5] border-dashed rounded-2xl text-center">
            <p className="mb-2 font-mont font-semibold text-[#111212] text-[20px]">No projects in this category yet</p>
            <p className="font-inter text-[#929296] text-[14px]">Check back soon.</p>
          </div>
        ) : (
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((work, idx) => {
              const img = work._embedded?.['wp:featuredmedia']?.[0]?.source_url
              const servicesTags = work.acf?.services
                ? work.acf.services.replace(/<[^>]*>/g, '').split(/[,\n]/).map(s => s.trim()).filter(Boolean).slice(0, 3)
                : []

              return (
                <Link key={work.id} href={`/casestudy/${work.slug}`}
                  className="group flex flex-col bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden hover:border-[#d0d0d0] transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {img ? (
                      <Image
                        src={img}
                        alt={work.title.rendered}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={idx < 3}
                        loading={idx < 3 ? 'eager' : 'lazy'}
                        className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-[#F3F3F3] to-[#e5e5e5]" />
                    )}

                    {work.acf?.industry && (
                      <span className="top-3 left-3 absolute bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg font-inter font-medium text-[#111212] text-[11px] border border-[#e5e5e5]">
                        {work.acf.industry}
                      </span>
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="flex flex-col gap-3 p-5">
                    <h3 className="font-mont font-semibold text-[#111212] text-[18px] leading-snug line-clamp-2 group-hover:text-[#525252] transition-colors">
                      {work.title.rendered}
                    </h3>
                    {work.acf?.long_title && (
                      <p className="font-inter text-[13px] text-[#929296] leading-relaxed line-clamp-2">
                        {work.acf.long_title}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2 mt-auto">
                      {servicesTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {servicesTags.map(tag => (
                            <span key={tag}
                              className="bg-[#F3F3F3] px-2.5 py-1 rounded-lg text-[#525252] text-[11px] font-inter font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <ArrowRight size={16} className="text-[#929296] group-hover:text-[#111212] group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-auto" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
