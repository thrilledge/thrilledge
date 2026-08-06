import type { Metadata } from 'next'
import { getTestimonials } from '@/lib/wordpress'
import { WorkGrid } from './casestudy-grid'
import BrandsMarquee from '@/components/sections/brands'
import { TestimonialsMarquee } from '@/components/sections/testimonials-marquee'
import { CTASection } from '@/components/sections/cta-section'
import { Animate } from '@/components/common/animate'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Our Work | Thrill Edge Technologies',
  description: 'Explore our portfolio of products shipped across healthcare, fintech, eCommerce and more.',
  alternates: { canonical: 'https://www.thrilledge.com/casestudy' },
}

const HERO_STATS = [
  { number: '50+', label: 'Products Shipped' },
  { number: '4.9★', label: 'Clutch Rating' },
  { number: '98%', label: 'Client Satisfaction' },
  { number: '20+', label: 'Industries Served' },
  { number: '8+', label: 'Years in Market' },
]

export default async function WorkPage() {
  const testimonials = await getTestimonials(20).catch(() => [])

  return (
    <main className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#080808]">
        {/* Grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow orbs */}
        <div
          className="top-[-20%] left-[-10%] absolute opacity-[0.09] blur-[130px] rounded-full w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(circle,#ffffff,transparent 70%)' }}
        />
        <div
          className="right-[-10%] bottom-[-30%] absolute opacity-[0.06] blur-[120px] rounded-full w-[520px] h-[520px]"
          style={{ background: 'radial-gradient(circle,#ffffff,transparent 70%)' }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(8,8,8,0.85) 100%)' }} />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-9 pt-28 md:pt-36 pb-20 md:pb-24">
          <Animate variant="fade-up">
            <span className={cn(
              'inline-flex', 'items-center', 'gap-2',
              'bg-white/5', 'backdrop-blur-md',
              'px-4', 'py-2', 'border', 'border-white/10', 'rounded-full',
              'font-inter', 'font-semibold', 'text-[11px]', 'text-white/50',
              'uppercase', 'tracking-[0.2em]',
            )}>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              Our Work
            </span>
          </Animate>

          <div className="mt-6 md:mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Animate variant="fade-up" delay={80}>
              <h1 className={cn(
                'font-mont', 'font-bold', 'text-white',
                'text-[42px]', 'leading-[1.04]', 'tracking-tight',
                'md:text-[72px]', 'md:leading-[1.02]', 'max-w-3xl',
              )}>
                We Deliver.
                <br />
                <span className="text-white/45">Period.</span>
              </h1>
            </Animate>

            <Animate variant="fade-up" delay={160}>
              <p className={cn(
                'font-inter', 'text-white/50', 'leading-[1.8]',
                'text-[15px]', 'md:text-[16px]', 'md:max-w-sm',
              )}>
                Real products, real results — designed, engineered, and shipped.
                A selection of work we're proud of across SaaS, healthcare, fintech, and beyond.
              </p>
            </Animate>
          </div>

          {/* Stats */}
          <Animate variant="fade-up" delay={240}>
            <div className={cn(
              'mt-14', 'md:mt-20',
              'grid', 'grid-cols-2', 'md:grid-cols-5',
              'gap-px', 'bg-white/10', 'border', 'border-white/10',
              'rounded-2xl', 'overflow-hidden',
            )}>
              {HERO_STATS.map((s) => (
                <div key={s.label} className={cn(
                  'flex', 'flex-col', 'items-center', 'justify-center', 'gap-1',
                  'px-4', 'py-5', 'bg-[#080808]', 'transition-colors', 'duration-300', 'hover:bg-white/5',
                )}>
                  <span className={cn('font-mont', 'font-bold', 'text-[24px]', 'text-white', 'leading-none')}>
                    {s.number}
                  </span>
                  <span className={cn('font-inter', 'text-[11px]', 'text-white/35', 'whitespace-nowrap', 'text-center')}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Animate>
        </div>

        {/* Bottom fade */}
        <div className="absolute right-0 bottom-0 left-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom,transparent,#080808)' }} />
      </section>

      {/* ── Client logos ── */}
      <BrandsMarquee />

      {/* ── Work grid ── */}
      <WorkGrid />

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="relative overflow-hidden bg-[#111212] py-24">
          <div className="mb-12 text-center px-4">
            <p className="mb-3 font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.2em]">
              Social proof
            </p>
            <h2 className="font-mont font-bold text-[32px] text-white md:text-[48px]">
              What Our Clients Say
            </h2>
          </div>
          <TestimonialsMarquee testimonials={testimonials} />
          <div className="mx-auto px-4 md:px-9 max-w-[1440px]">
            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mt-16 pt-10 border-white/10 border-t">
              {[
                { number: '4.9/5', label: 'Average Rating' },
                { number: '98%', label: 'Satisfaction Rate' },
                { number: `${testimonials.length}+`, label: 'Happy Clients' },
                { number: '2M+', label: 'Revenue Generated' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-mont font-bold text-[32px] text-white">{s.number}</p>
                  <p className="mt-1 font-inter text-[14px] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <CTASection />
    </main>
  )
}
