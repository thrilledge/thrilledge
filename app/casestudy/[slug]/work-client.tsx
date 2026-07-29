'use client'

import React from 'react'
import { useWorkItem } from '@/hooks/use-work'
import { useQuery } from '@tanstack/react-query'
import { getTestimonial, getAdjacentWorkItems } from '@/lib/wordpress'
import { Loader, ExternalLink, Github, CheckCircle2, ArrowRight, ArrowLeft, Lightbulb, Target, Layers, BarChart3, Code2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/common/page-hero'
import { cn } from "../../../lib/utils";
import { CTASection } from '@/components/sections/cta-section'

interface WorkPageProps {
  params: Promise<{ slug: string }>
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 py-4 px-6 bg-white rounded-xl border border-[#e5e5e5]">
      <span className="text-[11px] font-inter font-semibold text-[#929296] uppercase tracking-[0.15em]">{label}</span>
      <span className="text-[15px] font-mont font-semibold text-[#111212]">{children}</span>
    </div>
  )
}

function SectionHeader({ icon: Icon, title }: { icon?: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {Icon && (
        <div className="w-9 h-9 rounded-lg bg-[#111212] flex items-center justify-center shrink-0">
          <Icon size={18} className="text-white" />
        </div>
      )}
      <h2 className="text-[26px] lg:text-[34px] font-mont font-bold text-[#111212] leading-tight">{title}</h2>
      <div className="flex-1 h-px bg-[#e5e5e5] ml-4" />
    </div>
  )
}

function Section({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('w-full max-w-[1120px] mx-auto md:px-9 px-4', className)} {...props}>
      {children}
    </section>
  )
}

export default function WorkPage({ params }: WorkPageProps) {
  const { slug } = React.use(params)
  const { data: work, isLoading, error } = useWorkItem(slug)

  const reviewId = Array.isArray(work?.acf?.review)
    ? work.acf.review[0]
    : work?.acf?.review

  const reviewIdNumber = typeof reviewId === 'string' ? Number(reviewId) : reviewId
  const workId = typeof work?.id === 'string' ? Number(work.id) : work?.id

  const { data: testimonial } = useQuery({
    queryKey: ['testimonial', reviewIdNumber],
    queryFn: () => getTestimonial(reviewIdNumber!),
    enabled: !!reviewIdNumber,
  })

  const { data: adjacent } = useQuery({
    queryKey: ['adjacent-work', workId],
    queryFn: () => getAdjacentWorkItems(workId!),
    enabled: !!workId,
  })

  if (error) notFound()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center py-40">
          <div className="flex flex-col items-center gap-3">
            <Loader size={28} className="animate-spin text-[#111212]" />
            <span className="text-[13px] font-inter text-[#929296]">Loading case study...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!work) notFound()

  const featuredImage = work._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const acf = work.acf ?? {}
  const { year, services, industry, client, role, project_duration, project_status,
    project_url, github_url, overview, problem, solution, features, technical_highlights,
    challenges, results, tech_stack, project_metrics, gallery, faqs } = acf

  const servicesText = services ? services.replace(/<[^>]*>/g, '') : ''

  const parseListField = (val: string | Array<{ title?: string; description?: string }> | undefined | null): Array<{ title: string; description: string }> => {
    if (!val) return []
    if (Array.isArray(val)) return val.map(v => ({ title: v.title || '', description: v.description || '' }))
    return val.split('\n').map(line => line.replace(/^[-•*]\s*/, '').trim()).filter(Boolean).map(v => ({ title: v, description: '' }))
  }

  const parseTechStack = (val: string | Array<{ name?: string; icon?: string }> | undefined | null): Array<{ name: string; icon: string; category?: string }> => {
    if (!val) return []
    if (Array.isArray(val)) return val.map(v => ({ name: v.name || '', icon: v.icon || '' }))
    const lines = val.split('\n').map(l => l.trim()).filter(Boolean)
    let currentCategory = ''
    const result: Array<{ name: string; icon: string; category?: string }> = []
    for (const line of lines) {
      if (line.endsWith(':') || line.endsWith(':')) {
        currentCategory = line.replace(/[:\-]/g, '').trim()
      } else if (!line.startsWith('-') && !line.startsWith('•') && !line.startsWith('*')) {
        const clean = line.replace(/^[-•*]\s*/, '').trim()
        if (clean) result.push({ name: clean, icon: '', category: currentCategory || undefined })
      } else {
        const clean = line.replace(/^[-•*]\s*/, '').trim()
        if (clean) result.push({ name: clean, icon: '', category: currentCategory || undefined })
      }
    }
    return result
  }

  const parseMetrics = (val: string | Array<{ value?: string; label?: string }> | undefined | null): Array<{ value: string; label: string }> => {
    if (!val) return []
    if (Array.isArray(val)) return val.map(v => ({ value: v.value || '', label: v.label || '' }))
    return val.split('\n').map(line => line.replace(/^[-•*]\s*/, '').trim()).filter(Boolean).map(v => {
      const parts = v.split(/•|-/).map(s => s.trim())
      return parts.length >= 2 ? { value: parts[0], label: parts[1] } : { value: parts[0], label: '' }
    })
  }

  const featuresList = parseListField(features)
  const techHighlightsList = parseListField(technical_highlights)
  const challengesList = parseListField(challenges)
  const techStackList = parseTechStack(tech_stack)
  const metricsList = parseMetrics(project_metrics)

  const groupedTech: Record<string, Array<{ name: string; icon: string }>> = {}
  for (const t of techStackList) {
    const cat = t.category || 'Other'
    if (!groupedTech[cat]) groupedTech[cat] = []
    groupedTech[cat].push(t)
  }

  const metaFields = [
    { label: 'Year', value: year },
    { label: 'Services', value: servicesText },
    { label: 'Industry', value: industry },
    { label: 'Client', value: client },
    { label: 'Role', value: role },
    { label: 'Duration', value: project_duration },
    { label: 'Status', value: project_status },
  ].filter(f => f.value)

  return (
    <>
      {featuredImage && (
        <PageHero
          label="Our Work portfolio"
          title={work.title.rendered}
          image={featuredImage}
          imageAlt={work.title.rendered}
        />
      )}

      <div className="relative bg-[#F3F3F3] pt-[100px]">

        {/* Meta Info Bar */}
        <div className="relative -mt-7 z-10 max-w-[1120px] mx-auto px-4 md:px-9">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {metaFields.map(f => (
              <MetaItem key={f.label} label={f.label}>{f.value}</MetaItem>
            ))}
          </div>
        </div>

        {/* Links */}
        {(project_url || github_url) && (
          <Section className="pt-6">
            <div className="flex flex-wrap gap-3">
              {project_url && (
                <a href={project_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111212] text-white rounded-lg font-inter text-[13px] font-medium hover:bg-[#2a2a2a] transition-colors">
                  <ExternalLink size={15} /> View Live Project
                </a>
              )}
              {github_url && (
                <a href={github_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#111212] border border-[#e5e5e5] rounded-lg font-inter text-[13px] font-medium hover:bg-[#f7f7f7] transition-colors">
                  <Github size={15} /> View Source
                </a>
              )}
            </div>
          </Section>
        )}

        {/* Overview */}
        {overview && (
          <Section className="pt-16 md:pt-20">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10">
              <SectionHeader icon={Lightbulb} title="Overview" />
              <div className="text-[15px] md:text-[16px] leading-[1.75] font-inter text-[#525252] work-content max-w-[720px]"
                dangerouslySetInnerHTML={{ __html: overview }} />
            </div>
          </Section>
        )}

        {/* Problem & Solution side by side */}
        {(problem || solution) && (
          <Section className="pt-10 md:pt-14">
            <div className="grid md:grid-cols-2 gap-6">
              {problem && (
                <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10">
                  <SectionHeader icon={Target} title="Problem" />
                  <div className="text-[15px] leading-[1.75] font-inter text-[#525252] work-content"
                    dangerouslySetInnerHTML={{ __html: problem }} />
                </div>
              )}
              {solution && (
                <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10">
                  <SectionHeader icon={Layers} title="Solution" />
                  <div className="text-[15px] leading-[1.75] font-inter text-[#525252] work-content"
                    dangerouslySetInnerHTML={{ __html: solution }} />
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Features */}
        {featuresList.length > 0 && (
          <Section className="pt-10 md:pt-14">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10">
              <SectionHeader icon={CheckCircle2} title="Features" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {featuresList.map((f, i) => f.title && (
                  <div key={i}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-[#e5e5e5] bg-white hover:bg-[#F3F3F3] hover:border-[#d0d0d0] transition-all duration-200 cursor-default">
                    <div className="w-7 h-7 rounded-full bg-[#111212] flex items-center justify-center shrink-0">
                      <ChevronRight size={14} className="text-white" />
                    </div>
                    <span className="text-[14px] font-inter font-medium text-[#111212] leading-snug">{f.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Technical Highlights */}
        {techHighlightsList.length > 0 && (
          <Section className="pt-10 md:pt-14">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10">
              <SectionHeader icon={Code2} title="Technical Highlights" />
              <div className="grid sm:grid-cols-2 gap-4">
                {techHighlightsList.map((t, i) => t.title && (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#F3F3F3]">
                    <CheckCircle2 size={18} className="text-[#111212] mt-0.5 shrink-0" />
                    <span className="text-[14px] font-inter leading-relaxed text-[#525252]">{t.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Challenges */}
        {challengesList.length > 0 && (
          <Section className="pt-10 md:pt-14">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10">
              <SectionHeader title="Challenges" />
              <div className="flex flex-col gap-3">
                {challengesList.map((c, i) => c.title && (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#F3F3F3]">
                    <span className="w-6 h-6 rounded-full bg-[#111212] text-white text-[12px] font-bold font-mont flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-[15px] font-inter font-medium text-[#111212]">{c.title}</span>
                      {c.description && <p className="text-[13px] font-inter text-[#525252] mt-1 leading-relaxed">{c.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Results */}
        {results && (
          <Section className="pt-10 md:pt-14">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10">
              <SectionHeader title="Results" />
              <div className="text-[15px] md:text-[16px] leading-[1.75] font-inter text-[#525252] work-content max-w-[720px]"
                dangerouslySetInnerHTML={{ __html: results }} />
            </div>
          </Section>
        )}

        {/* Project Metrics */}
        {metricsList.length > 0 && (
          <Section className="pt-10 md:pt-14">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10">
              <SectionHeader icon={BarChart3} title="Project Metrics" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {metricsList.map((m, i) => m.value && (
                  <div key={i} className="text-center p-5 rounded-xl bg-[#F3F3F3] border border-[#e5e5e5]">
                    <p className="text-[24px] md:text-[30px] font-mont font-bold text-[#111212] leading-none">{m.value}</p>
                    {m.label && <p className="text-[12px] font-inter text-[#929296] mt-1.5 uppercase tracking-[0.05em] font-medium">{m.label}</p>}
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Tech Stack */}
        {Object.keys(groupedTech).length > 0 && (
          <Section className="pt-10 md:pt-14">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10">
              <SectionHeader title="Tech Stack" />
              <div className="flex flex-col gap-6">
                {Object.entries(groupedTech).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-[11px] font-inter font-semibold text-[#929296] uppercase tracking-[0.15em] mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((t, i) => t.name && (
                        <span key={i}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F3F3F3] rounded-lg text-[13px] font-inter font-medium text-[#111212] border border-[#e5e5e5]">
                          {t.icon && (
                            <Image src={t.icon} alt={t.name} width={16} height={16} className="rounded" />
                          )}
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Gallery */}
        {gallery && typeof gallery !== 'boolean' && (Array.isArray(gallery) ? gallery.length > 0 : true) && (
          <Section className="pt-10 md:pt-14">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10">
              <SectionHeader title="Gallery" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.isArray(gallery) && gallery.map((img, i) => img.url && (
                  <div key={i} className="relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer">
                    <Image src={img.url} alt={img.alt || ''} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}


        {/* FAQs */}
        {faqs && faqs.length > 0 && (
          <Section className="pt-10 md:pt-14">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10">
              <SectionHeader title="FAQs" />
              <div className="flex flex-col gap-4">
                {faqs.map((faq, i) => (faq.question || faq.answer) && (
                  <details key={i} className="group rounded-xl border border-[#e5e5e5] overflow-hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-[#F3F3F3] transition-colors">
                      <h3 className="text-[15px] font-inter font-semibold text-[#111212] pr-4">{faq.question}</h3>
                      <ChevronRight size={16} className="text-[#929296] shrink-0 group-open:rotate-90 transition-transform duration-200" />
                    </summary>
                    {faq.answer && (
                      <div className="px-5 pb-5 text-[14px] font-inter leading-relaxed text-[#525252] border-t border-[#e5e5e5] pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </details>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Testimonial / Review */}
        {testimonial && (
          <Section className="pt-10 md:pt-14">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F3F3F3] rounded-bl-[100%] -z-10" />
              <div className="max-w-[600px]">
                <span className="text-[11px] font-inter font-semibold text-[#929296] uppercase tracking-[0.15em]">Client Testimonial</span>
                <div
                  className="mt-4 text-[17px] md:text-[19px] leading-[1.7] font-inter text-[#111212] italic"
                  dangerouslySetInnerHTML={{ __html: testimonial.content.rendered }} />
                <div className="mt-6 pt-5 border-t border-[#e5e5e5] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#111212] flex items-center justify-center text-white font-mont font-bold text-[14px]">
                    {(testimonial.acf?.author_name ?? testimonial.title.rendered).charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold font-mont text-[#111212] text-[14px]">
                      {testimonial.acf?.author_name ?? testimonial.title.rendered}
                    </p>
                    {(testimonial.acf?.author_title || testimonial.acf?.author_company) && (
                      <p className="text-[12px] text-[#929296] font-inter">
                        {[testimonial.acf.author_title, testimonial.acf.author_company].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* Prev / Next Navigation */}
        <Section className="pt-14 pb-8">
          <div className="flex justify-between items-center border-t border-[#e5e5e5] pt-8">
            {adjacent?.prev ? (
              <Link href={`/casestudy/${adjacent.prev.slug}`}
                className="group flex items-center gap-2.5 text-[14px] font-mont font-semibold text-[#111212] hover:text-[#525252] transition-colors">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>{adjacent.prev.title.rendered.replace(/<[^>]*>/g, '')}</span>
              </Link>
            ) : <div />}
            {adjacent?.next ? (
              <Link href={`/casestudy/${adjacent.next.slug}`}
                className="group flex items-center gap-2.5 text-[14px] font-mont font-semibold text-[#111212] hover:text-[#525252] transition-colors text-right">
                <span>{adjacent.next.title.rendered.replace(/<[^>]*>/g, '')}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </Section>

        <CTASection />
      </div>
    </>
  )
}