'use client'

import React from 'react'
import { useWorkItem } from '@/hooks/use-work'
import { useQuery } from '@tanstack/react-query'
import { getTestimonial, getAdjacentWorkItems } from '@/lib/wordpress'
import {
  Loader, Github, CheckCircle2, ArrowRight, ArrowLeft,
  Target, Layers, Code2, ChevronRight, Quote, ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cn } from '../../../lib/utils'
import { CTASection } from '@/components/sections/cta-section'
import { Animate } from '@/components/common/animate'

interface WorkPageProps {
  params: Promise<{ slug: string }>
}

/* ── Reusable blocks ────────────────────────────────────────────────────── */

function Eyebrow({ index, children }: { index?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {index && (
        <span className="font-mono text-[10px] font-bold tracking-widest text-white bg-white/10 border border-white/20 px-2.5 py-1 rounded-full uppercase">
          {index}
        </span>
      )}
      <span className="font-inter text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">
        {children}
      </span>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2 font-mont font-extrabold text-[28px] text-white tracking-tight leading-[1.15] md:text-[42px]">
      {children}
    </h2>
  )
}

function BodySection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('w-full max-w-360 mx-auto md:px-10 px-4', className)}>
      {children}
    </section>
  )
}

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      'bg-black/80 backdrop-blur-2xl rounded-[32px] border border-white/15 p-8 md:p-12',
      'shadow-[0_30px_100px_-30px_rgba(255,255,255,0.05)] relative overflow-hidden',
      'before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.04] before:to-transparent before:pointer-events-none',
      className
    )}>
      {children}
    </div>
  )
}

function RichText({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn(
        'text-[16px] md:text-[17px] leading-[1.85] font-inter text-zinc-400 space-y-4',
        'prose prose-invert max-w-none', 'casestudy-content',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function StatusChip({ status }: { status?: string }) {
  if (!status) return null
  const lower = status.toLowerCase()
  const isLive = lower.includes('live')

  return (
    <span className={cn(
      'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-inter text-[12px] font-semibold border backdrop-blur-md shadow-lg',
      isLive ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-300 border-zinc-700',
    )}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
      </span>
      {status}
    </span>
  )
}

function HeroChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 font-inter text-[12px] font-medium text-zinc-300 shadow-sm">
      {children}
    </span>
  )
}

function BlockQuote({ testimonial }: { testimonial: any }) {
  const name = testimonial.acf?.author_name ?? testimonial.title.rendered
  return (
    <GlassCard className="p-8 md:p-14 border-white/20 bg-gradient-to-br from-black via-zinc-950 to-zinc-900">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <Quote size={44} className="text-white/40 mb-6 transform -scale-x-100" />
      <div
        className="text-[20px] md:text-[26px] leading-[1.6] font-inter font-medium text-white tracking-tight italic md:max-w-[760px]"
        dangerouslySetInnerHTML={{ __html: testimonial.content.rendered }}
      />
      <div className="mt-10 pt-8 border-t border-white/15 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-mont font-bold text-[18px] shadow-xl">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold font-mont text-white text-[16px]">{name}</p>
          {(testimonial.acf?.author_title || testimonial.acf?.author_company) && (
            <p className="text-[14px] text-zinc-400 font-inter mt-0.5">
              {[testimonial.acf.author_title, testimonial.acf.author_company].filter(Boolean).join(', ')}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

/* ── Page ───────────────────────────────────────────────────────────────── */

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-black border border-white/20 shadow-2xl flex items-center justify-center backdrop-blur-xl">
            <Loader size={24} className="animate-spin text-white" />
          </div>
          <span className="text-[13px] font-inter font-medium text-zinc-500 tracking-widest uppercase">Loading masterwork...</span>
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
  const titleText = work.title.rendered.replace(/<[^>]*>/g, '')

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
      if (line.endsWith(':')) {
        currentCategory = line.replace(/[:\-]/g, '').trim()
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

  const parseFaqs = (val: string | Array<{ question?: string; answer?: string }> | undefined | null): Array<{ question: string; answer: string }> => {
    if (!val) return []
    if (Array.isArray(val)) return val
      .map(f => ({ question: f.question || '', answer: f.answer || '' }))
      .filter(f => f.question || f.answer)
    return val
      .split('\n')
      .map(line => line.replace(/^[-•*]\s*/, '').trim())
      .filter(Boolean)
      .map(line => ({ question: line, answer: '' }))
  }

  const featuresList = parseListField(features)
  const techHighlightsList = parseListField(technical_highlights)
  const challengesList = parseListField(challenges)
  const techStackList = parseTechStack(tech_stack)
  const metricsList = parseMetrics(project_metrics)
  const faqList = parseFaqs(faqs)

  const groupedTech: Record<string, Array<{ name: string; icon: string }>> = {}
  for (const t of techStackList) {
    const cat = t.category || 'Other'
    if (!groupedTech[cat]) groupedTech[cat] = []
    groupedTech[cat].push(t)
  }

  const metaFields = [
    { label: 'Year', value: year },
    { label: 'Client', value: client },
    { label: 'Role', value: role },
    { label: 'Duration', value: project_duration },
  ].filter(f => f.value)

  const overviewSnippet = overview?.replace(/<[^>]*>/g, '') || acf.long_title || ''

  return (
    <div className="bg-black text-zinc-100 selection:bg-white selection:text-black min-h-screen relative overflow-x-hidden">

      {/* Background Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Hero Section ── */}
      <section className="relative z-10 pt-20 md:pt-32 pb-16">
        <div className="max-w-360 mx-auto md:px-10 px-4">

          <Animate variant="fade-up">
            <div className="flex items-center justify-between">
              <Link
                href="/casestudy"
                className="inline-flex items-center gap-2.5 font-inter text-[13px] font-semibold text-zinc-400 hover:text-white transition-colors duration-200 group bg-zinc-950 px-4.5 py-2.5 rounded-full border border-white/15 backdrop-blur-xl shadow-lg"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform text-white" />
                Return to Archive
              </Link>
              <StatusChip status={project_status} />
            </div>
          </Animate>

          <Animate variant="fade-up" delay={60}>
            <div className="mt-10 flex flex-wrap items-center gap-2.5">
              {industry && <HeroChip>{industry}</HeroChip>}
              {year && <HeroChip>{year}</HeroChip>}
              {servicesText && <HeroChip>{servicesText}</HeroChip>}
            </div>
          </Animate>

          <Animate variant="fade-up" delay={120}>
            <h1 className={cn(
              'mt-6 font-mont font-extrabold text-white tracking-tight',
              'text-[40px] leading-[1.06] md:text-[72px] md:leading-[1.02]',
            )}>
              {titleText}
            </h1>
          </Animate>

          {overviewSnippet && (
            <Animate variant="fade-up" delay={180}>
              <p className="mt-6 font-inter text-zinc-400 text-[17px] md:text-[19px] leading-[1.8] max-w-3xl">
                {overviewSnippet.length > 280 ? `${overviewSnippet.slice(0, 280)}…` : overviewSnippet}
              </p>
            </Animate>
          )}

          {(project_url || github_url) && (
            <Animate variant="fade-up" delay={220}>
              <div className="mt-10 flex flex-wrap gap-4">
                {project_url && (
                  <a href={project_url} target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-mont font-bold text-[14px] hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-white/10">
                    Explore Live Site <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                {github_url && (
                  <a href={github_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-950 hover:bg-zinc-900 border border-white/20 text-white rounded-full font-mont font-semibold text-[14px] transition-all duration-300 backdrop-blur-xl">
                    <Github size={16} className="text-white" /> Source Code
                  </a>
                )}
              </div>
            </Animate>
          )}

          {/* Master Showcase Display Window */}
          {featuredImage && (
            <Animate variant="fade-up" delay={280}>
              <div className="mt-16 md:mt-24 relative rounded-[32px] overflow-hidden border border-white/25 bg-black shadow-[0_50px_120px_-30px_rgba(255,255,255,0.15)] group">
                <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/15 bg-zinc-950 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-zinc-700" />
                    <span className="w-3 h-3 rounded-full bg-zinc-500" />
                    <span className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <span className="flex-1 max-w-[340px] h-8 rounded-xl bg-black border border-white/15 flex items-center justify-center px-4 text-[12px] font-mono text-zinc-400 truncate shadow-inner">
                    {project_url || `${slug}.thrilledge.com`}
                  </span>
                  <div className="w-12" />
                </div>
                <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
                  <Image
                    src={featuredImage}
                    alt={titleText}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1120px"
                    priority
                    className="object-cover group-hover:scale-[1.015] transition-transform duration-1000 ease-out grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 pointer-events-none" />
                </div>
              </div>
            </Animate>
          )}

          {/* Modern Bento Meta Grid */}
          {(metaFields.length > 0 || project_status) && (
            <Animate variant="fade-up" delay={340}>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-zinc-950 border border-white/15 p-4 rounded-[28px] backdrop-blur-2xl">
                {metaFields.map(f => (
                  <div key={f.label} className="px-5 py-5 bg-black rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300">
                    <p className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{f.label}</p>
                    <p className="mt-2 font-mont font-bold text-[16px] text-white tracking-tight truncate">{f.value}</p>
                  </div>
                ))}
                {project_status && (
                  <div className="px-5 py-5 bg-black rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 col-span-2 md:col-span-1">
                    <p className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Current Status</p>
                    <div className="mt-2"><StatusChip status={project_status} /></div>
                  </div>
                )}
              </div>
            </Animate>
          )}

        </div>
      </section>

      {/* ── Content Sections ── */}
      <div className="relative z-10 pb-24 space-y-20 md:space-y-32">

        {/* Overview */}
        {overview && (
          <BodySection>
            <Animate variant="fade-up">
              <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">
                <div className="lg:sticky lg:top-28">
                  <Eyebrow index="01">Overview</Eyebrow>
                  <SectionTitle>About This Project</SectionTitle>
                </div>
                <GlassCard>
                  <RichText html={overview} />
                </GlassCard>
              </div>
            </Animate>
          </BodySection>
        )}

        {/* Problem & Solution */}
        {(problem || solution) && (
          <BodySection>
            <div className="grid md:grid-cols-2 gap-8">
              {problem && (
                <Animate variant="fade-up">
                  <div className="bg-zinc-950 rounded-[32px] border border-white/15 p-8 md:p-12 h-full shadow-2xl flex flex-col justify-between relative overflow-hidden">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center mb-8 shadow-inner font-bold">
                        <Target size={22} />
                      </div>
                      <Eyebrow index="02">The Challenge</Eyebrow>
                      <h3 className="mt-3 font-mont font-bold text-[24px] text-white tracking-tight">The core problem</h3>
                      <div className="mt-6"><RichText html={problem} /></div>
                    </div>
                  </div>
                </Animate>
              )}
              {solution && (
                <Animate variant="fade-up" delay={80}>
                  <div className="bg-zinc-950 rounded-[32px] border border-white/15 p-8 md:p-12 h-full shadow-2xl flex flex-col justify-between relative overflow-hidden">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center mb-8 shadow-inner font-bold">
                        <Layers size={22} />
                      </div>
                      <Eyebrow index="03">The Solution</Eyebrow>
                      <h3 className="mt-3 font-mont font-bold text-[24px] text-white tracking-tight">What we engineered</h3>
                      <div className="mt-6"><RichText html={solution} /></div>
                    </div>
                  </div>
                </Animate>
              )}
            </div>
          </BodySection>
        )}

        {/* Features Matrix Grid */}
        {featuresList.length > 0 && (
          <BodySection>
            <Animate variant="fade-up">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <Eyebrow index="04">Features</Eyebrow>
                  <SectionTitle>Key Capabilities</SectionTitle>
                </div>
                <p className="font-inter text-[15px] text-zinc-400 max-w-sm leading-relaxed">
                  Everything we designed and shipped to make the product work beautifully.
                </p>
              </div>
            </Animate>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuresList.map((f, i) => f.title && (
                <Animate key={i} variant="fade-up" delay={i * 50}>
                  <div className="group flex items-center gap-4 p-6 bg-zinc-950 backdrop-blur-xl rounded-[24px] border border-white/15 hover:border-white hover:bg-zinc-900 transition-all duration-300 h-full shadow-lg">
                    <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-[15px] font-inter font-semibold text-zinc-200 leading-snug">{f.title}</span>
                  </div>
                </Animate>
              ))}
            </div>
          </BodySection>
        )}

        {/* Technical Highlights */}
        {techHighlightsList.length > 0 && (
          <BodySection>
            <Animate variant="fade-up">
              <div>
                <Eyebrow index="05">Engineering</Eyebrow>
                <SectionTitle>Technical highlights</SectionTitle>
              </div>
            </Animate>
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {techHighlightsList.map((t, i) => t.title && (
                <Animate key={i} variant="fade-up" delay={i * 50}>
                  <div className="flex items-start gap-4 p-6 bg-zinc-950 backdrop-blur-xl rounded-[24px] border border-white/15 h-full shadow-lg">
                    <span className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center shrink-0 text-white">
                      <Code2 size={18} />
                    </span>
                    <span className="text-[15px] font-inter leading-relaxed text-zinc-300 pt-1">{t.title}</span>
                  </div>
                </Animate>
              ))}
            </div>
          </BodySection>
        )}

        {/* Challenges Overcome */}
        {challengesList.length > 0 && (
          <BodySection>
            <Animate variant="fade-up">
              <div>
                <Eyebrow index="06">Hurdles</Eyebrow>
                <SectionTitle>Challenges We Overcame</SectionTitle>
              </div>
            </Animate>
            <div className="mt-10 flex flex-col gap-4">
              {challengesList.map((c, i) => c.title && (
                <Animate key={i} variant="fade-up" delay={i * 50}>
                  <div className="flex items-start gap-6 bg-zinc-950 backdrop-blur-xl rounded-[24px] border border-white/15 p-7 hover:border-white/40 transition-all duration-300 shadow-lg">
                    <span className="font-mono font-bold text-[13px] text-white bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl tabular-nums shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-1.5">
                      <span className="text-[16px] font-inter font-bold text-white">{c.title}</span>
                      {c.description && (
                        <p className="text-[14px] font-inter text-zinc-400 leading-relaxed">{c.description}</p>
                      )}
                    </div>
                  </div>
                </Animate>
              ))}
            </div>
          </BodySection>
        )}

        {/* Results */}
        {results && (
          <BodySection>
            <Animate variant="fade-up">
              <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">
                <div className="lg:sticky lg:top-28">
                  <Eyebrow index="07">Outcome</Eyebrow>
                  <SectionTitle>Results That Matter</SectionTitle>
                </div>
                <GlassCard>
                  <RichText html={results} />
                </GlassCard>
              </div>
            </Animate>
          </BodySection>
        )}

        {/* Metrics Banner */}
        {metricsList.length > 0 && (
          <BodySection>
            <Animate variant="fade-up">
              <div>
                <Eyebrow index="08">Metrics</Eyebrow>
                <SectionTitle> Project Metrics </SectionTitle>
              </div>
            </Animate>
            <Animate variant="scale-in">
              <div className="relative overflow-hidden rounded-[36px] bg-zinc-950 p-2 md:p-3 border border-white/20 shadow-2xl mt-10">
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
                    backgroundSize: '48px 48px',
                  }}
                />
                <div className="relative z-10 grid md:grid-cols-2 gap-3 bg-transparent">
                  {metricsList.map((m, i) => m.value && (
                    <div key={i} className="flex flex-col items-center justify-center gap-2 px-6 py-12 bg-black rounded-[30px] border border-white/10 text-center shadow-xl group hover:border-white/40 transition-colors">
                      <p className="font-mont font-extrabold text-[30px]  text-white tracking-tight leading-none">
                        {m.value}
                      </p>
                      {m.label && (
                        <p className="font-inter text-[11px] md:text-[12px] text-zinc-400 uppercase tracking-[0.2em] font-bold mt-2">
                          {m.label}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          </BodySection>
        )}





        {/* Tech Stack Matrix */}
        {Object.keys(groupedTech).length > 0 && (
          <BodySection>
            <Animate variant="fade-up">
              <div>
                <Eyebrow index="09">Stack</Eyebrow>
                <SectionTitle>Technology Used</SectionTitle>
              </div>
            </Animate>
            <GlassCard className="mt-10">
              <div className="flex flex-col gap-10">
                {Object.entries(groupedTech).map(([category, items]) => (
                  <div key={category} className="space-y-4">
                    <h3 className="font-inter text-[12px] font-bold text-white uppercase tracking-[0.2em] pb-3 border-b border-white/15">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {items.map((t, i) => t.name && (
                        <span key={i}
                          className="inline-flex items-center gap-2.5 px-4.5 py-2.5 bg-zinc-950 rounded-xl text-[14px] font-inter font-semibold text-zinc-200 border border-white/15 shadow-lg hover:border-white transition-colors">
                          {t.icon && (
                            <Image src={t.icon} alt={t.name} width={18} height={18} className="object-contain filter invert" />
                          )}
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </BodySection>
        )}

        {/* Gallery Grid */}
        {gallery && typeof gallery !== 'boolean' && (Array.isArray(gallery) ? gallery.length > 0 : true) && (
          <BodySection>
            <Animate variant="fade-up">
              <div>
                <Eyebrow index="10">Gallery</Eyebrow>
                <SectionTitle>In The Product</SectionTitle>
              </div>
            </Animate>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(gallery) && gallery.map((img, i) => img.url && (
                <Animate key={i} variant="fade-up" delay={i * 60}>
                  <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] group border border-white/20 shadow-xl bg-zinc-950">
                    <Image
                      src={img.url}
                      alt={img.alt || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Animate>
              ))}
            </div>
          </BodySection>
        )}

        {/* Testimonial */}
        {testimonial && (
          <BodySection>
            <Animate variant="fade-up">
              <div>
                <Eyebrow index="11">Testimonial</Eyebrow>
                <SectionTitle>What The Client Says</SectionTitle>
              </div>
            </Animate>
            <div className="mt-10">
              <BlockQuote testimonial={testimonial} />
            </div>
          </BodySection>
        )}

        {/* FAQs */}
        {faqList.length > 0 && (
          <BodySection>
            <Animate variant="fade-up">
              <div>
                <Eyebrow index="12">FAQs</Eyebrow>
                <SectionTitle>Common Questions</SectionTitle>
              </div>
            </Animate>
            <div className="mt-10 flex flex-col gap-4 max-w-3xl">
              {faqList.map((faq, i) => (faq.question || faq.answer) && (
                <details key={i} className="group bg-zinc-950 backdrop-blur-xl rounded-[24px] border border-white/15 overflow-hidden open:border-white shadow-lg transition-all duration-300">
                  <summary className="flex items-center justify-between gap-4 p-6 md:p-7 cursor-pointer list-none hover:bg-white/[0.02] transition-colors">
                    <h3 className="text-[16px] font-inter font-bold text-white pr-4">{faq.question}</h3>
                    <span className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/20 flex items-center justify-center shrink-0 group-open:bg-white group-open:text-black group-open:rotate-90 transition-all duration-300 text-white">
                      <ChevronRight size={16} />
                    </span>
                  </summary>
                  {faq.answer && (
                    <div className="px-6 md:px-7 pb-7 text-[15px] font-inter leading-[1.8] text-zinc-400 border-t border-white/15 pt-5">
                      {faq.answer}
                    </div>
                  )}
                </details>
              ))}
            </div>
          </BodySection>
        )}

        {/* Adjacent Navigation */}
        {(adjacent?.prev || adjacent?.next) && (
          <BodySection className="pt-10">
            <div className="grid sm:grid-cols-2 gap-6">
              {adjacent?.prev ? (
                <Link href={`/casestudy/${adjacent.prev.slug}`}
                  className="group flex items-center gap-5 bg-zinc-950 backdrop-blur-xl rounded-[28px] border border-white/15 p-7 hover:border-white hover:bg-black transition-all duration-300 shadow-xl">
                  <span className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/20 group-hover:bg-white group-hover:text-black flex items-center justify-center shrink-0 transition-colors duration-300 text-white">
                    <ArrowLeft size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Previous Project</p>
                    <p className="mt-1 font-mont font-bold text-[16px] text-white truncate tracking-tight">
                      {adjacent.prev.title.rendered.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                </Link>
              ) : <div />}
              {adjacent?.next ? (
                <Link href={`/casestudy/${adjacent.next.slug}`}
                  className="group flex items-center gap-5 justify-end bg-zinc-950 backdrop-blur-xl rounded-[28px] border border-white/15 p-7 text-right hover:border-white hover:bg-black transition-all duration-300 shadow-xl">
                  <div className="min-w-0">
                    <p className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Next Project</p>
                    <p className="mt-1 font-mont font-bold text-[16px] text-white truncate tracking-tight">
                      {adjacent.next.title.rendered.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                  <span className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/20 group-hover:bg-white group-hover:text-black flex items-center justify-center shrink-0 transition-colors duration-300 text-white">
                    <ArrowRight size={20} />
                  </span>
                </Link>
              ) : <div />}
            </div>
          </BodySection>
        )}

        <CTASection />

      </div>
    </div>
  )
}