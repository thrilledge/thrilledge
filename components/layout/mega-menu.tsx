/**
 * Mega Menu Component
 * Matches reference: full-width panel from header top, SVG icons, card hover style,
 * image logo badge bar, right-side image panel with pill CTA.
 */

'use client'

import Link from 'next/link'
import {
  ChevronDown, Users, Star, HelpCircle, Briefcase, BookOpen, Mail,
  Brain, Globe, Palette, Smartphone, Rocket, Cloud,
  Cpu, PanelsTopLeft, Server, Database, GitBranch,
  Heart, GraduationCap, Building2, Blocks, Landmark, Truck, ShoppingCart,
  Wrench, TrendingUp, Search, Zap, Map, DollarSign, Share2, FileText, BriefcaseBusiness,
  ShieldCheck, BarChart3, Bug, Scale, ShoppingBag, Home,
  type LucideIcon,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from "../../lib/utils";

// ─── types ────────────────────────────────────────────────────────────────────
interface SubMenuItem {
  label: string
  href: string
  icon: LucideIcon
}

interface MenuItem {
  label: string
  href?: string
  description?: string
  icon: LucideIcon
  children?: SubMenuItem[]
}

interface MenuGroup {
  label: string
  href?: string
  children?: string
  categoryLabel?: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  items?: MenuItem[]
}

// ─── data ─────────────────────────────────────────────────────────────────────
const menus: MenuGroup[] = [
  {
    label: 'Company', categoryLabel: 'Company', image: '/company-menu.avif', imageAlt: 'About us', ctaLabel: 'About us', ctaHref: '/about',
    items: [
      { label: 'About', href: '/about', icon: Users, description: `Learn about our mission, team, and the innovative solutions driving businesses forward worldwide.` },
      { label: 'Team', href: '/team', icon: Users, description: 'Meet the engineers, designers, and strategists behind Thrill Edge Technologies.' },
      { label: 'Case Studies', href: '/casestudy', icon: BriefcaseBusiness, description: 'Explore our successful projects and learn how we helped businesses achieve their goals.' },
      { label: 'Reviews', href: '/client-reviews', icon: Star, description: 'Read client reviews and testimonials about our software, web, and IT solutions.' },
      { label: 'FAQs', href: '/faqs', icon: HelpCircle, description: 'Explore answers to frequently asked questions about our software, AI solutions, and partnership processes.' },
      { label: 'Careers', href: '/careers', icon: Briefcase, description: 'Join our growing team and build impactful digital products alongside talented developers and creatives.' },
      { label: 'Blogs', href: '/blog', icon: BookOpen, description: 'Discover expert insights, tutorials, and industry updates on our blog.' },
      { label: 'Contact', href: '/contact', icon: Mail, description: "You can tell us about your product, your timeline, how you heard about us, and where you're located." },
    ],
  },
  {
    label: 'Services', categoryLabel: 'Core Services', image: '/services-menu.avif', imageAlt: 'All services', ctaLabel: 'View all services', ctaHref: '/services',
    items: [
      { label: 'AI & ML Solutions', href: '/services/ai-ml-solutions', icon: Brain, description: 'We design intelligent systems that think, learn, and adapt, transforming data into decisions and automation into growth' },
      { label: 'Custom Web Development', href: '/services/custom-web-development', icon: Globe, description: 'Our web engineers craft scalable, secure, and high-performing applications that power growth' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design', icon: Palette, description: 'Our design philosophy blends aesthetics, usability, and psychology into effortless digital experiences' },
      { label: 'Mobile App Development', href: '/services/mobile-app-development', icon: Smartphone, description: 'We design and build powerful, scalable, and user-centric mobile apps across iOS and Android' },
      {
        label: 'MVP & Product Strategy', href: '/services/mvp-product-strategy', icon: Rocket,
        description: 'We help you transform ideas into market-ready products, fast, focused, and scalable',
      },
      { label: 'SaaS Solutions', href: '/services/saas-solutions', icon: Cloud, description: 'We build scalable, cloud-native software and multi-tenant platforms designed for high retention and recurring growth' },
      { label: 'AI Workflow Automation', href: '/services/ai-workflow-automation', icon: GitBranch, description: 'We automate complex business workflows using AI agents, LLMs, and intelligent pipelines that reduce manual effort and accelerate operations.' },
      {
        label: 'Digital Marketing Solutions', href: '/services/digital-marketing-solutions', icon: TrendingUp,
        description: 'We craft data-driven digital marketing strategies that grow your brand, drive qualified traffic, and convert visitors into loyal customers.',
      },
      { label: 'Shopify Plus Agency', href: '/services/shopify-plus-agency', icon: ShoppingCart, description: 'We build high-converting Shopify Plus stores optimized for performance, scalability, and revenue growth.' },
      { label: 'SAP Learning', href: '/services/sap-learning', icon: BookOpen, description: 'Practical, structured and career-focused SAP learning designed for students, professionals and aspiring SAP consultants.' },
    ],
  },
  {
    label: 'Technologies', categoryLabel: 'Technologies', image: '/technologies-menu.avif', imageAlt: 'View all technologies', ctaLabel: 'View all technologies', ctaHref: '/technologies',
    items: [
      { label: 'AI & Machine Learning', href: '/technologies/ai-machine-learning', icon: Cpu, description: 'We integrate AI and machine learning models to automate decision-making, enhance analytics, and deliver intelligent digital products.' },
      { label: 'Frontend Development', href: '/technologies/frontend-development', icon: PanelsTopLeft, description: 'We build responsive, high-performing interfaces using React, Vue.js, and Next.js, ensuring every pixel and interaction enhances user engagement.' },
      { label: 'Backend Development', href: '/technologies/backend-development', icon: Server, description: 'We develop secure, scalable, and high-availability backend systems using Node.js, Python, and Go, powering data flow and business logic behind every experience.' },
      { label: 'Mobile Development', href: '/technologies/mobile-development', icon: Smartphone, description: 'We create native and cross-platform mobile apps with Flutter and React Native, delivering smooth, fast, and visually stunning mobile experiences.' },
      { label: 'Databases', href: '/technologies/databases', icon: Database, description: 'We design and optimize data architectures using SQL and NoSQL databases like PostgreSQL, MongoDB, and Redis for reliability and performance.' },
      { label: 'Cloud & DevOps', href: '/technologies/cloud-devops', icon: Cloud, description: 'We architect cloud infrastructure on AWS, Azure, and GCP with CI/CD pipelines, container orchestration, and observability built in from day one.' },
      { label: 'Data Engineering & Big Data', href: '/technologies/data-engineering-big-data', icon: BarChart3, description: 'Reliable pipelines, warehousing, and real-time streaming that turn raw data into fast, trustworthy decisions.' },
      { label: 'Cybersecurity', href: '/technologies/cybersecurity', icon: ShieldCheck, description: 'Zero-trust security, IAM, and compliance-ready hardening that protects data and trust in enterprise and fintech environments.' },
      { label: 'QA & Testing Automation', href: '/technologies/qa-testing-automation', icon: Bug, description: 'Automated UI, API, and performance testing that catches issues early and keeps every release reliable.' },
    ],
  },
  {
    label: 'Industries', categoryLabel: 'Industries', image: '/industries-menu.avif', imageAlt: 'View all industries', ctaLabel: 'View all industries', ctaHref: '/industries',
    items: [
      { label: 'Healthcare', href: '/industries/healthcare', icon: Heart, description: 'Innovative healthcare solutions that prioritize patient care using React and cloud services.' },
      { label: 'Education', href: '/industries/education', icon: GraduationCap, description: 'Innovative tools for student engagement using Angular and AI to enhance learning.' },
      { label: 'Real Estate', href: '/industries/real-estate', icon: Building2, description: 'Technology and market insights to simplify buying and selling real estate.' },
      { label: 'Blockchain', href: '/industries/blockchain', icon: Blocks, description: 'Secure applications to improve data management and enhance trust in services.' },
      { label: 'Fintech', href: '/industries/fintech', icon: Landmark, description: 'Secure and scalable financial ecosystems from digital banking to payment gateways.' },
      { label: 'Logistics', href: '/industries/logistics', icon: Truck, description: 'Efficient logistics solutions using AI and blockchain to optimize supply chain management.' },
      { label: 'Legal Services', href: '/industries/legal-services', icon: Scale, description: 'Case management, document automation, and AI contract analysis for law firms and legal teams.' },
      { label: 'eCommerce & Retail', href: '/industries/ecommerce-retail', icon: ShoppingBag, description: 'Headless storefronts, marketplaces, and commerce platforms that convert visitors into customers.' },
      { label: 'Home Services', href: '/industries/home-services', icon: Home, description: 'Booking, scheduling, and field service platforms that keep home service businesses fully booked.' },
    ],
  },
  { label: 'Tools', href: '/tools' },

]

// ─── lucide icon renderer ─────────────────────────────────────────────────────
function MenuIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon size={24} className={cn('text-[#111212]', 'shrink-0')} />
}

// ─── badge logos ──────────────────────────────────────────────────────────────
const badgeLogos = [
  { src: '/google.svg', alt: 'Google' },
  { src: '/trustpilot.svg', alt: 'trustpilot' },
  { src: '/clutch.svg', alt: 'clutch' },
  { src: '/awwwards-black.svg', alt: 'Awwwards' },
  { src: '/designrush-black.svg', alt: 'Design Rush' },
  { src: '/csswinner-black.svg', alt: 'CssWinner' },
]


// ─── badge with image fallback ────────────────────────────────────────────────
function BadgeLogo({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false)
  if (err) {
    return <span className={cn('font-bold', 'text-[#111212]', 'text-xs')}>{alt}</span>
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={100}
      height={100}
      className={cn('w-16.75', 'xl:w-25 opacity-60 hover:opacity-100')}
      onError={() => setErr(true)}
    />
  )
}


// ─── mega menu nav ────────────────────────────────────────────────────────────
export function MegaMenu() {
  const [active, setActive] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActive(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const activeMenu = menus.find((m) => m.label === active) ?? null

  return (
    <div
      ref={navRef}
      className={cn('hidden', 'md:flex', 'items-center', 'gap-1')}
      onMouseLeave={() => setActive(null)}
    >
      {/* trigger buttons */}
      {menus.map((menu) => (
        menu.href ? (
          <Link key={menu.label} href={menu.href}
            className={cn('flex', 'items-center', 'gap-1.5', 'px-3', 'py-2', 'font-semibold', 'text-[#111212]', 'hover:text-accent', 'text-sm', 'transition-colors', 'cursor-pointer', 'capitalize')}>
            {menu.label}
          </Link>
        ) : (
          <button key={menu.label} onMouseEnter={() => setActive(menu.label)}
            className={cn('flex', 'items-center', 'gap-1.5', 'px-3', 'py-2', 'font-semibold', 'text-[#111212]', 'hover:text-accent', 'text-sm', 'transition-colors', 'cursor-pointer')}>
            {menu.label}
            <ChevronDown size={14} className={`transition-transform duration-200 ${active === menu.label ? 'rotate-180' : ''}`} />
          </button>
        )
      ))}

      {/* single shared panel positioned from the header via fixed top */}
      {activeMenu && (
        <div
          className={cn('right-0', 'left-0', 'z-9999', 'fixed', 'flex', 'justify-center', 'px-4')}
          style={{ top: '55px' }}
          onMouseEnter={() => setActive(activeMenu.label)}
          onMouseLeave={() => setActive(null)}
        >
          <div className={cn('flex', 'flex-col', 'gap-6', 'bg-white', 'p-3', 'rounded-[20px]', 'w-full', 'max-w-360', 'mega-shadow', 'border border-[#f0f0f0]')}>
            <div className={cn('px-8', 'py-10', 'w-full')}>
              <div className="flex">
                <p className={cn('mb-4', 'font-normal', 'text-[#929296]', 'text-[16px]')}>{activeMenu.categoryLabel}</p>
                {/* View all button */}
                {activeMenu.ctaLabel && activeMenu.ctaHref && (
                  <div className="mt-8 flex justify-center">
                    <Link
                      href={activeMenu.ctaHref}
                      onClick={() => setActive(null)}
                      className="mb-4 font-normal text-[#000]/[0.9] text-[16px] hover:text-accent transition-colors hover:underline hover:text-[#0000]/[0.9]/[1]"
                    >
                      {activeMenu.ctaLabel}
                    </Link>
                  </div>
                )}


              </div>

              <ul className={cn('gap-6', 'grid', 'grid-cols-3')}>
                {(activeMenu.items ?? []).map((item) => (
                  item.children ? (
                    <li key={item.href || item.label} className="h-full">
                      <div className={cn('box-border', 'hover:bg-gray-50', 'px-4', 'py-2', 'border', 'border-white', 'hover:border-[#F2F2F2]', 'rounded-xl', 'w-full', 'h-full', 'cursor-pointer')}>
                        <div className={cn('flex', 'items-start', 'gap-4')}>
                          <MenuIcon icon={item.icon} />
                          <div className={cn('flex', 'flex-col', 'gap-1.5', 'w-full')}>
                            <Link href={item.href || '#'} onClick={() => setActive(null)} className={cn('font-semibold', 'text-[16px]', 'text-black', 'leading-6', 'hover:underline')}>
                              {item.label}
                            </Link>
                            {item.description && (
                              <p className={cn('font-normal', 'text-[#929296]', 'text-[14px]', 'leading-4.5')}>{item.description}</p>
                            )}
                            <div className={cn('mt-2', 'space-y-1')}>
                              {item.children.map((child) => (
                                <Link key={child.label} href={child.href} onClick={() => setActive(null)}
                                  className={cn('flex', 'items-center', 'gap-2', 'py-1', 'text-[13px]', 'text-[#777]', 'hover:text-black', 'transition-colors')}>
                                  <child.icon size={14} className={cn('text-[#aaa]', 'shrink-0')} />
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li key={item.href} className="h-full">
                      <Link
                        href={item.href || '#'}
                        onClick={() => setActive(null)}
                        className={cn('block', 'box-border', 'hover:bg-gray-50', 'px-4', 'py-2', 'border', 'border-white', 'hover:border-[#F2F2F2]', 'rounded-xl', 'w-full', 'h-full', 'font-semibold', 'text-[16px]', 'text-black', 'leading-6', 'cursor-pointer')}
                      >
                        <div className={cn('flex', 'items-start', 'gap-4')}>
                          <MenuIcon icon={item.icon} />
                          <div className={cn('flex', 'flex-col', 'gap-2')}>
                            <p>{item.label}</p>
                            {item.description && (
                              <p className={cn('font-normal', 'text-[#929296]', 'text-[14px]', 'leading-4.5')}>{item.description}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </div>

            <div className="border-t border-[#ebebeb] py-4 pl-6">
              <p className="text-[10px] font-mont font-semibold text-[#c8c8cc] uppercase tracking-widest mb-3.5">
                Recognized By
              </p>

              <div className="flex items-center gap-15 flex-wrap">
                {badgeLogos.map((logo, index) => (
                  <BadgeLogo key={index} src={logo.src} alt={logo.alt} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}