import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getServices } from '@/lib/wordpress'
import { cn, decodeHtml } from "@/lib/utils"
import { Animate } from '@/components/common/animate'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CTASection } from '@/components/sections/cta-section'

const SAP_LEARNING_CARD = {
  slug: 'sap-learning',
  title: 'SAP Learning',
  desc: 'Practical, structured and career-focused SAP learning designed for students, professionals and aspiring SAP consultants.',
  image: '/sap.jpg',
  stats: [
    { number: '200+', label: 'Concepts Covered' },
    { number: '85%', label: 'Improved Usability' },
    { number: '70%', label: 'Conversion Increase' },
  ],
}


export const metadata: Metadata = {
  title: 'Services | Thrill Edge Technologies',
  description: 'Comprehensive software development services AI, web, mobile, backend, and more.',
  alternates: { canonical: 'https://www.thrilledge.com/services' },
}

export default async function ServicesPage() {
  const services = await getServices(50).catch(() => [])

  return (
    <div className="bg-[#F3F3F3] min-h-screen">
      {/* Hero */}
      <section className="mx-auto p-2 w-full">
        <div className="relative bg-[#111212] rounded-[20px] w-full h-120 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          <div className="right-0 bottom-0 left-0 absolute flex lg:flex-row flex-col justify-between lg:items-end gap-4 mx-auto px-5 lg:px-9 py-8 lg:py-10 max-w-360">
            <div className="flex flex-col gap-3">
              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.2em]">Services</span>
              <h1 className="max-w-2xl font-mont font-bold text-[40px] text-white lg:text-[72px] leading-none">
                We Deliver.<br />Period.
              </h1>
            </div>
            <p className="lg:text-[18px] text-[15px] font-inter text-white/70 lg:max-w-1/2 leading-7">
              From idea to production we cover every layer of the stack.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-360 mx-auto">
          {services.length === 0 ? (
            <div className="py-24 border border-[#e5e5e5] border-dashed rounded-[20px] text-center">
              <p className="font-mont font-semibold text-[#111212] text-[20px]">Services coming soon.</p>
            </div>
          ) : (
            <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((service, idx) => {
                const img = service.acf?.image?.url || service._embedded?.['wp:featuredmedia']?.[0]?.source_url
                const counts = service.acf?.service_count
                const countItems = counts ? [counts.count_1, counts.count_2, counts.count_3].filter(Boolean) : []
                return (
                  <Animate key={service.id} variant="scale-in" delay={idx * 80}>
                    <Link href={`/services/${service.slug}`}
                      className="group flex flex-col bg-white border border-[#e5e5e5] hover:border-[#111212] rounded-[20px] overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                      <div className="relative bg-[#f3f3f3] w-full h-56 overflow-hidden">
                        {img ? (
                          <Image src={img} alt={decodeHtml(service.title.rendered)} fill sizes="(max-width: 768px) 100vw, 33vw"
                            priority={idx < 3} className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        ) : (
                          <div className="absolute inset-0 flex justify-center items-center bg-[#111212]">
                            <span className="font-mont font-bold text-white/10 text-[80px]">{decodeHtml(service.title.rendered).charAt(0)}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="flex flex-col flex-1 gap-4 p-6">
                        <div className="flex justify-between items-start gap-3">
                          <h2 className="font-mont font-semibold text-[#111212] text-[20px] leading-tight"
                            dangerouslySetInnerHTML={{ __html: decodeHtml(service.title.rendered) }} />
                          <span className="flex justify-center items-center group-hover:bg-[#111212] mt-0.5 border border-[#e5e5e5] group-hover:border-[#111212] rounded-full w-8 h-8 transition-all duration-300 shrink-0">
                            <ArrowUpRight size={14} className="text-[#929296] group-hover:text-white transition-colors duration-300" />
                          </span>
                        </div>
                        {service.acf?.service_solutions && (
                          <p className="font-inter text-[#929296] text-[14px] line-clamp-3 leading-6">{service.acf.service_solutions}</p>
                        )}
                        {countItems.length > 0 && (
                          <div className="flex gap-6 mt-auto pt-4 border-[#f3f3f3] border-t">
                            {countItems.map((c, i) => (
                              <div key={i}>
                                <p className="font-mont font-bold text-[#111212] text-[20px]">{c!.number}</p>
                                <p className="mt-0.5 font-inter text-[#929296] text-[11px]">{c!.label}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </Animate>
                )
              })}

              {/* SAP Learning static card */}
              <Animate key="sap-learning" variant="scale-in" delay={3 * 80}>
                <Link href={`/services/${SAP_LEARNING_CARD.slug}`}
                  className="group flex flex-col bg-white border border-[#e5e5e5] hover:border-[#111212] rounded-[20px] overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                  <div className="relative bg-[#f3f3f3] w-full h-56 overflow-hidden">
                    <Image src={SAP_LEARNING_CARD.image} alt={SAP_LEARNING_CARD.title} fill sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="flex flex-col flex-1 gap-4 p-6">
                    <div className="flex justify-between items-start gap-3">
                      <h2 className="font-mont font-semibold text-[#111212] text-[20px] leading-tight">
                        {SAP_LEARNING_CARD.title}
                      </h2>
                      <span className="flex justify-center items-center group-hover:bg-[#111212] mt-0.5 border border-[#e5e5e5] group-hover:border-[#111212] rounded-full w-8 h-8 transition-all duration-300 shrink-0">
                        <ArrowUpRight size={14} className="text-[#929296] group-hover:text-white transition-colors duration-300" />
                      </span>
                    </div>
                    <p className="font-inter text-[#929296] text-[14px] line-clamp-3 leading-6">
                      {SAP_LEARNING_CARD.desc}
                    </p>
                    <div className="flex gap-6 mt-auto pt-4 border-[#f3f3f3] border-t">
                      {SAP_LEARNING_CARD.stats.map((stat, i) => (
                        <div key={i}>
                          <p className="font-mont font-bold text-[#111212] text-[20px]">{stat.number}</p>
                          <p className="mt-0.5 font-inter text-[#929296] text-[11px]">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </Animate>

              {services.slice(3).map((service, idx) => {
                const img = service.acf?.image?.url || service._embedded?.['wp:featuredmedia']?.[0]?.source_url
                const counts = service.acf?.service_count
                const countItems = counts ? [counts.count_1, counts.count_2, counts.count_3].filter(Boolean) : []
                return (
                  <Animate key={service.id} variant="scale-in" delay={(4 + idx) * 80}>
                    <Link href={`/services/${service.slug}`}
                      className="group flex flex-col bg-white border border-[#e5e5e5] hover:border-[#111212] rounded-[20px] overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                      <div className="relative bg-[#f3f3f3] w-full h-56 overflow-hidden">
                        {img ? (
                          <Image src={img} alt={decodeHtml(service.title.rendered)} fill sizes="(max-width: 768px) 100vw, 33vw"
                            priority={idx < 3} className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        ) : (
                          <div className="absolute inset-0 flex justify-center items-center bg-[#111212]">
                            <span className="font-mont font-bold text-white/10 text-[80px]">{decodeHtml(service.title.rendered).charAt(0)}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="flex flex-col flex-1 gap-4 p-6">
                        <div className="flex justify-between items-start gap-3">
                          <h2 className="font-mont font-semibold text-[#111212] text-[20px] leading-tight"
                            dangerouslySetInnerHTML={{ __html: decodeHtml(service.title.rendered) }} />
                          <span className="flex justify-center items-center group-hover:bg-[#111212] mt-0.5 border border-[#e5e5e5] group-hover:border-[#111212] rounded-full w-8 h-8 transition-all duration-300 shrink-0">
                            <ArrowUpRight size={14} className="text-[#929296] group-hover:text-white transition-colors duration-300" />
                          </span>
                        </div>
                        {service.acf?.service_solutions && (
                          <p className="font-inter text-[#929296] text-[14px] line-clamp-3 leading-6">{service.acf.service_solutions}</p>
                        )}
                        {countItems.length > 0 && (
                          <div className="flex gap-6 mt-auto pt-4 border-[#f3f3f3] border-t">
                            {countItems.map((c, i) => (
                              <div key={i}>
                                <p className="font-mont font-bold text-[#111212] text-[20px]">{c!.number}</p>
                                <p className="mt-0.5 font-inter text-[#929296] text-[11px]">{c!.label}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </Animate>
                )
              })}
            </div>
          )}
        </div>
      </div>
      {/* reviews */}
      <TestimonialsSection show={12} />
      {/* CTA */}
      <CTASection />

    </div>
  )
}
