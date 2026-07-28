'use client'

import React from 'react'
import { useWorkItem } from '@/hooks/use-work'
import { useQuery } from '@tanstack/react-query'
import { getTestimonial, getAdjacentWorkItems } from '@/lib/wordpress'
import { Loader, ExternalLink, Github, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/common/page-hero'
import { cn } from "../../../lib/utils";
import { CTASection } from '@/components/sections/cta-section'

interface WorkPageProps {
  params: Promise<{ slug: string }>
}

export default function WorkPage({ params }: WorkPageProps) {
  const { slug } = React.use(params)
  const { data: work, isLoading, error } = useWorkItem(slug)

  const reviewId = Array.isArray(work?.acf?.review)
    ? work.acf.review[0]
    : work?.acf?.review

  const { data: testimonial } = useQuery({
    queryKey: ['testimonial', reviewId],
    queryFn: () => getTestimonial(reviewId!),
    enabled: !!reviewId,
  })

  const { data: adjacent } = useQuery({
    queryKey: ['adjacent-work', work?.id],
    queryFn: () => getAdjacentWorkItems(work!.id),
    enabled: !!work?.id,
  })

  if (error) notFound()

  if (isLoading) {
    return (
      <div className={cn('min-h-screen', 'bg-white')}>
        <div className={cn('flex', 'items-center', 'justify-center', 'py-40')}>
          <Loader size={32} className={cn('animate-spin', 'text-black')} />
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
      <section className={cn('max-w-360', 'w-full', 'mx-auto', 'p-4', 'rounded-[20px]', 'overflow-hidden')}>
        <div className={cn('relative', 'w-full', 'h-full', 'flex', 'flex-col')}>
          <div className={cn('absolute', 'z-50', 'bottom-0', 'left-0', 'right-0', 'h-fit', 'w-full', 'flex', 'lg:flex-row', 'flex-col', 'justify-between', 'lg:items-center', 'lg:gap-6', 'gap-2', 'lg:px-9', 'px-5', 'lg:py-6', 'py-6')}>
            <h1 className={cn('h-fit', 'text-[40px]', 'leading-10', 'lg:text-[64px]', 'lg:leading-16', 'font-mont', 'font-semibold', 'text-white')}
              dangerouslySetInnerHTML={{ __html: work.title.rendered }}
            />
            {acf.long_title && (
              <p className={cn('lg:text-[32px]', 'text-[24px]', 'font-mont', 'font-semibold', 'text-white', 'lg:max-w-lg', 'lg:leading-10', 'leading-7.5')}>
                {acf.long_title}
              </p>
            )}
          </div>
          <div
            className={cn('absolute', 'inset-0', 'transition', 'duration-300', 'rounded-[20px]')}
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), rgba(0,0,0,0), rgba(0,0,0,0))' }}
          />
        </div>
      </section>
      <div className={cn('relative', 'bg-[#F3F3F3]')}>

        {/* Meta row: Year / Services / Industry */}
        <div className={cn('relative', 'max-w-360', 'w-full', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'lg:gap-1', 'gap-4', 'mx-auto', 'md:px-9', 'px-4', 'mt-8')}>
          {year && (
            <div className={cn('w-full', 'flex', 'flex-col', 'gap-2')}>
              <h6 className={cn('text-[16px]', 'leading-6', 'font-inter', 'text-[#929296]')}>Year</h6>
              <p className={cn('text-[20px]', 'font-semibold', 'font-mont', 'text-black')}>{year}</p>
            </div>
          )}
          {servicesText && (
            <div className={cn('w-full', 'flex', 'flex-col', 'gap-2')}>
              <h6 className={cn('text-[16px]', 'leading-6', 'font-inter', 'text-[#929296]')}>Services</h6>
              <p className={cn('text-[20px]', 'font-semibold', 'font-mont', 'text-black', 'max-w-90')}>{servicesText}</p>
            </div>
          )}
          {industry && (
            <div className={cn('w-full', 'flex', 'flex-col', 'gap-2')}>
              <h6 className={cn('text-[16px]', 'leading-6', 'font-inter', 'text-[#929296]')}>Industry</h6>
              <p className={cn('text-[20px]', 'font-semibold', 'font-mont', 'text-black')}>{industry}</p>
            </div>
          )}
          {client && (
            <div className={cn('w-full', 'flex', 'flex-col', 'gap-2')}>
              <h6 className={cn('text-[16px]', 'leading-6', 'font-inter', 'text-[#929296]')}>Client</h6>
              <p className={cn('text-[20px]', 'font-semibold', 'font-mont', 'text-black')}>{client}</p>
            </div>
          )}
          {role && (
            <div className={cn('w-full', 'flex', 'flex-col', 'gap-2')}>
              <h6 className={cn('text-[16px]', 'leading-6', 'font-inter', 'text-[#929296]')}>Role</h6>
              <p className={cn('text-[20px]', 'font-semibold', 'font-mont', 'text-black')}>{role}</p>
            </div>
          )}
          {project_duration && (
            <div className={cn('w-full', 'flex', 'flex-col', 'gap-2')}>
              <h6 className={cn('text-[16px]', 'leading-6', 'font-inter', 'text-[#929296]')}>Duration</h6>
              <p className={cn('text-[20px]', 'font-semibold', 'font-mont', 'text-black')}>{project_duration}</p>
            </div>
          )}
          {project_status && (
            <div className={cn('w-full', 'flex', 'flex-col', 'gap-2')}>
              <h6 className={cn('text-[16px]', 'leading-6', 'font-inter', 'text-[#929296]')}>Status</h6>
              <p className={cn('text-[20px]', 'font-semibold', 'font-mont', 'text-black')}>{project_status}</p>
            </div>
          )}
        </div>

        {/* Links row */}
        {(project_url || github_url) && (
          <div className={cn('relative', 'max-w-360', 'w-full', 'flex', 'gap-4', 'mx-auto', 'md:px-9', 'px-4', 'mt-6')}>
            {project_url && (
              <a href={project_url} target="_blank" rel="noopener noreferrer"
                className={cn('inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'bg-[#111212]', 'text-white', 'rounded-lg', 'font-inter', 'text-[14px]', 'hover:bg-black/80', 'transition-colors')}>
                <ExternalLink size={16} /> View Project
              </a>
            )}
            {github_url && (
              <a href={github_url} target="_blank" rel="noopener noreferrer"
                className={cn('inline-flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'bg-[#111212]', 'text-white', 'rounded-lg', 'font-inter', 'text-[14px]', 'hover:bg-black/80', 'transition-colors')}>
                <Github size={16} /> GitHub
              </a>
            )}
          </div>
        )}

        {/* Overview */}
        {overview && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'md:py-24', 'py-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto')}>
              <h2 className={cn('text-[28px]', 'lg:text-[36px]', 'font-mont', 'font-bold', 'text-[#111212]', 'mb-6')}>Overview</h2>
              <div className={cn('text-[16px]', 'leading-7', 'font-inter', 'text-[#525252]', 'work-content')}
                dangerouslySetInnerHTML={{ __html: overview }} />
            </div>
          </section>
        )}

        {/* Problem */}
        {problem && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto')}>
              <h2 className={cn('text-[28px]', 'lg:text-[36px]', 'font-mont', 'font-bold', 'text-[#111212]', 'mb-6')}>Problem</h2>
              <div className={cn('text-[16px]', 'leading-7', 'font-inter', 'text-[#525252]', 'work-content')}
                dangerouslySetInnerHTML={{ __html: problem }} />
            </div>
          </section>
        )}

        {/* Solution */}
        {solution && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto')}>
              <h2 className={cn('text-[28px]', 'lg:text-[36px]', 'font-mont', 'font-bold', 'text-[#111212]', 'mb-6')}>Solution</h2>
              <div className={cn('text-[16px]', 'leading-7', 'font-inter', 'text-[#525252]', 'work-content')}
                dangerouslySetInnerHTML={{ __html: solution }} />
            </div>
          </section>
        )}

        {/* Features */}
        {features && features.length > 0 && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto')}>
              <h2 className={cn('text-[28px]', 'lg:text-[36px]', 'font-mont', 'font-bold', 'text-[#111212]', 'mb-6')}>Features</h2>
              <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4')}>
                {features.map((f, i) => (f.title || f.description) && (
                  <div key={i} className={cn('bg-white', 'border', 'border-[#e5e5e5]', 'rounded-xl', 'p-6')}>
                    {f.title && <h3 className={cn('font-mont', 'font-semibold', 'text-[18px]', 'text-[#111212]', 'mb-2')}>{f.title}</h3>}
                    {f.description && <p className={cn('font-inter', 'text-[14px]', 'leading-6', 'text-[#525252]')}>{f.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Technical Highlights */}
        {technical_highlights && technical_highlights.length > 0 && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto')}>
              <h2 className={cn('text-[28px]', 'lg:text-[36px]', 'font-mont', 'font-bold', 'text-[#111212]', 'mb-6')}>Technical Highlights</h2>
              <div className={cn('flex', 'flex-col', 'gap-3')}>
                {technical_highlights.map((t, i) => (t.title || t.description) && (
                  <div key={i} className={cn('flex', 'items-start', 'gap-3')}>
                    <CheckCircle2 size={20} className="text-[#111212] mt-0.5 shrink-0" />
                    <div>
                      {t.title && <h3 className={cn('font-mont', 'font-semibold', 'text-[16px]', 'text-[#111212]')}>{t.title}</h3>}
                      {t.description && <p className={cn('font-inter', 'text-[14px]', 'leading-6', 'text-[#525252]')}>{t.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Challenges */}
        {challenges && challenges.length > 0 && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto')}>
              <h2 className={cn('text-[28px]', 'lg:text-[36px]', 'font-mont', 'font-bold', 'text-[#111212]', 'mb-6')}>Challenges</h2>
              <div className={cn('flex', 'flex-col', 'gap-3')}>
                {challenges.map((c, i) => (c.title || c.description) && (
                  <div key={i} className={cn('bg-white', 'border', 'border-[#e5e5e5]', 'rounded-xl', 'p-5')}>
                    {c.title && <h3 className={cn('font-mont', 'font-semibold', 'text-[16px]', 'text-[#111212]', 'mb-1')}>{c.title}</h3>}
                    {c.description && <p className={cn('font-inter', 'text-[14px]', 'leading-6', 'text-[#525252]')}>{c.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        {results && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto')}>
              <h2 className={cn('text-[28px]', 'lg:text-[36px]', 'font-mont', 'font-bold', 'text-[#111212]', 'mb-6')}>Results</h2>
              <div className={cn('text-[16px]', 'leading-7', 'font-inter', 'text-[#525252]', 'work-content')}
                dangerouslySetInnerHTML={{ __html: results }} />
            </div>
          </section>
        )}

        {/* Project Metrics */}
        {project_metrics && project_metrics.length > 0 && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto')}>
              <h2 className={cn('text-[28px]', 'lg:text-[36px]', 'font-mont', 'font-bold', 'text-[#111212]', 'mb-6')}>Project Metrics</h2>
              <div className={cn('grid', 'grid-cols-2', 'md:grid-cols-4', 'gap-4')}>
                {project_metrics.map((m, i) => (m.value || m.label) && (
                  <div key={i} className={cn('bg-white', 'border', 'border-[#e5e5e5]', 'rounded-xl', 'p-5', 'text-center')}>
                    {m.value && <p className={cn('font-mont', 'font-bold', 'text-[28px]', 'text-[#111212]')}>{m.value}</p>}
                    {m.label && <p className={cn('font-inter', 'text-[13px]', 'text-[#929296]', 'mt-1')}>{m.label}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        {tech_stack && tech_stack.length > 0 && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto')}>
              <h2 className={cn('text-[28px]', 'lg:text-[36px]', 'font-mont', 'font-bold', 'text-[#111212]', 'mb-6')}>Tech Stack</h2>
              <div className={cn('flex', 'flex-wrap', 'gap-3')}>
                {tech_stack.map((t, i) => t.name && (
                  <div key={i} className={cn('flex', 'items-center', 'gap-2', 'bg-white', 'border', 'border-[#e5e5e5]', 'rounded-lg', 'px-4', 'py-2')}>
                    {t.icon && (
                      <Image src={t.icon} alt={t.name} width={20} height={20} className="rounded" />
                    )}
                    <span className={cn('font-inter', 'text-[14px]', 'font-medium', 'text-[#111212]')}>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        {gallery && gallery.length > 0 && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto')}>
              <h2 className={cn('text-[28px]', 'lg:text-[36px]', 'font-mont', 'font-bold', 'text-[#111212]', 'mb-6')}>Gallery</h2>
              <div className={cn('grid', 'grid-cols-2', 'md:grid-cols-3', 'gap-4')}>
                {gallery.map((img, i) => img.url && (
                  <div key={i} className={cn('relative', 'rounded-xl', 'overflow-hidden', 'aspect-video')}>
                    <Image src={img.url} alt={img.alt || ''} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Post Content */}
        {work.content?.rendered && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'md:py-24', 'py-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'flex', 'flex-col', 'gap-8', 'mx-auto', 'work-content')}>
              <div dangerouslySetInnerHTML={{ __html: work.content.rendered }} />
            </div>
          </section>
        )}

        {/* FAQs */}
        {faqs && faqs.length > 0 && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto')}>
              <h2 className={cn('text-[28px]', 'lg:text-[36px]', 'font-mont', 'font-bold', 'text-[#111212]', 'mb-6')}>FAQs</h2>
              <div className={cn('flex', 'flex-col', 'gap-4')}>
                {faqs.map((faq, i) => (faq.question || faq.answer) && (
                  <div key={i} className={cn('bg-white', 'border', 'border-[#e5e5e5]', 'rounded-xl', 'p-6')}>
                    {faq.question && <h3 className={cn('font-mont', 'font-semibold', 'text-[16px]', 'text-[#111212]', 'mb-2')}>{faq.question}</h3>}
                    {faq.answer && <p className={cn('font-inter', 'text-[14px]', 'leading-6', 'text-[#525252]')}>{faq.answer}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonial / Review */}
        {testimonial && (
          <section className={cn('w-full', 'max-w-360', 'md:px-9', 'px-4', 'pb-16', 'mx-auto')}>
            <div className={cn('max-w-259.5', 'w-full', 'mx-auto', 'bg-[#f7f7f7]', 'border', 'border-[#e5e5e5]', 'rounded-2xl', 'p-8', 'flex', 'flex-col', 'gap-4')}>
              <div
                className={cn('text-[18px]', 'leading-7', 'font-inter', 'text-[#111212]', 'italic')}
                dangerouslySetInnerHTML={{ __html: testimonial.content.rendered }}
              />
              <div className={cn('pt-4', 'border-t', 'border-[#e5e5e5]')}>
                <p className={cn('font-semibold', 'font-mont', 'text-black', 'text-[16px]')}>
                  {testimonial.acf?.author_name ?? testimonial.title.rendered}
                </p>
                {(testimonial.acf?.author_title || testimonial.acf?.author_company) && (
                  <p className={cn('text-[14px]', 'text-[#929296]', 'font-inter')}>
                    {[testimonial.acf.author_title, testimonial.acf.author_company].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Prev / Next Navigation */}
        <div className={cn('w-full', 'max-w-360', 'flex', 'justify-between', 'items-center', 'mx-auto', 'md:px-9', 'px-4', 'py-6')}>
          {adjacent?.prev ? (
            <Link
              href={`/work/${adjacent.prev.slug}`}
              className={cn('flex', 'gap-2', 'text-[24px]', 'leading-6', 'font-bold', 'font-mont', 'group', 'items-center')}
            >
              <span className={cn('w-6', 'flex', 'items-center', 'justify-center')}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className={cn('group-hover:-translate-x-0.5', 'transition-all', 'duration-300', 'ease-in-out')}>
                  <path d="M7 1L1 6L7 11" stroke="#111212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="pt-0.75">Previous</span>
            </Link>
          ) : (
            <span className={cn('flex', 'gap-2', 'text-[24px]', 'leading-6', 'font-bold', 'font-mont', 'text-[#ccc]', 'items-center', 'cursor-not-allowed')}>
              <span className={cn('w-6', 'flex', 'items-center', 'justify-center')}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1L1 6L7 11" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="pt-0.75">Previous</span>
            </span>
          )}

          {adjacent?.next ? (
            <Link
              href={`/work/${adjacent.next.slug}`}
              className={cn('flex', 'items-center', 'gap-2', 'text-[24px]', 'leading-6', 'font-bold', 'font-mont', 'group')}
            >
              <span className="pt-0.75">Next</span>
              <span className={cn('w-6', 'flex', 'items-center', 'justify-center')}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className={cn('rotate-180', 'group-hover:translate-x-0.5', 'transition-all', 'duration-300', 'ease-in-out')}>
                  <path d="M7 1L1 6L7 11" stroke="#111212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ) : (
            <span className={cn('flex', 'items-center', 'gap-2', 'text-[24px]', 'leading-6', 'font-bold', 'font-mont', 'text-[#ccc]', 'cursor-not-allowed')}>
              <span className="pt-0.75">Next</span>
              <span className={cn('w-6', 'flex', 'items-center', 'justify-center')}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                  <path d="M7 1L1 6L7 11" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          )}
        </div>

        {/* CTA */}
   <CTASection/>


      </div>
    </>
  )
}
