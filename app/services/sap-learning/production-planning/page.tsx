import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Factory,
  Settings,
  Package,
  Boxes,
  Workflow,
} from 'lucide-react'

import { Animate } from '@/components/common/animate'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'SAP Production Planning (PP) | Thrill Edge Technologies',
  description:
    'Learn SAP Production Planning (PP) with practical training covering MRP, BOMs, work centers, routings, production orders, production execution and manufacturing processes.',
  alternates: {
    canonical: `${SITE_URL}/services/sap-learning/production-planning`,
  },
  openGraph: {
    title: 'SAP Production Planning (PP) | Thrill Edge Technologies',
    description:
      'Build practical SAP PP knowledge across production planning, MRP, BOMs, work centers, routings and production execution.',
    type: 'website',
    url: `${SITE_URL}/services/sap-learning/production-planning`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAP Production Planning (PP)',
    description:
      'Learn SAP PP through practical production planning, MRP, BOMs, work centers, routings and production execution.',
  },
}

const learningAreas = [
  {
    title: 'Production Planning',
    text: 'Understand how organizations plan production requirements, materials, capacity and manufacturing activities.',
    icon: Factory,
  },
  {
    title: 'Material Requirements Planning',
    text: 'Learn how MRP helps determine material requirements and supports efficient production planning.',
    icon: ClipboardList,
  },
  {
    title: 'Bill of Materials',
    text: 'Understand BOM structures and how components are defined and consumed during manufacturing.',
    icon: Boxes,
  },
  {
    title: 'Work Centers',
    text: 'Learn how work centers represent production resources, capacities and manufacturing operations.',
    icon: Settings,
  },
  {
    title: 'Routings',
    text: 'Understand production sequences, operations and the activities required to manufacture products.',
    icon: Workflow,
  },
  {
    title: 'Production Orders',
    text: 'Learn how production orders control and monitor the execution of manufacturing activities.',
    icon: Package,
  },
]

const learningPath = [
  'SAP Fundamentals',
  'Production Planning Fundamentals',
  'Demand Management',
  'Material Requirements Planning',
  'Material Master',
  'Bill of Materials',
  'Work Centers',
  'Routings',
  'Production Orders',
  'Production Execution',
  'Integration & Implementation',
]

const practicalSkills = [
  'Material master data',
  'Production planning',
  'Demand management',
  'MRP processing',
  'BOM creation and management',
  'Work center setup',
  'Routing processes',
  'Production orders',
  'Production execution',
  'Goods movements',
  'Manufacturing scenarios',
  'Troubleshooting',
]

const careerOutcomes = [
  'Understand complete SAP PP business processes',
  'Build strong production planning knowledge',
  'Understand MRP and material requirements',
  'Work with BOMs, work centers and routings',
  'Understand production order processing',
  'Prepare for SAP PP consultant interviews',
]

export default function ProductionPlanningPage() {
  return (
    <div className="relative bg-[#F3F3F3]">

      {/* Hero */}
      <section className="px-3 md:px-2.5 w-full">
        <div className="relative w-full h-[620px] overflow-hidden rounded-[20px] bg-[#111212]">

          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'url(/pp.jpg)',
              backgroundSize: 'cover',
              // backgroundPosition: 'center',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="right-0 bottom-0 left-0 absolute mx-auto px-5 lg:px-9 py-8 lg:py-12 max-w-360">
            <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-8">

              <div>
                <span className="font-inter font-semibold text-[13px] text-white/50 uppercase tracking-[0.2em]">
                  SAP Learning / Production Planning
                </span>

                <div className="flex items-center gap-3 mt-4">
                  <span className="rounded-full bg-white/10 border border-white/10 px-4 py-2 font-mont font-semibold text-white/70 text-[13px]">
                    SAP PP
                  </span>
                </div>

                <h1 className="mt-4 max-w-3xl font-mont font-semibold text-white text-[40px] md:text-[64px] leading-[0.95]">
                  Production Planning
                </h1>

                <p className="mt-5 font-mont font-medium text-white/80 text-[20px] md:text-[28px]">
                  Plan, Execute & Understand Modern Manufacturing.
                </p>
              </div>

              <p className="max-w-xl font-inter text-white/65 text-[15px] md:text-[17px] leading-7">
                Learn how SAP supports production planning and execution
                through MRP, BOMs, work centers, routings and production
                orders.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-14 md:py-20">
        <div className="max-w-360 mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            <Animate variant="fade-up">
              <div>
                <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                  SAP Production Planning
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Understand How SAP Supports Manufacturing
                </h2>
              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="space-y-5">

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  SAP Production Planning helps organizations plan, manage and
                  execute manufacturing processes. It connects demand,
                  materials, production resources and manufacturing operations.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  Our SAP PP learning path focuses on understanding the complete
                  production process rather than simply memorizing transaction
                  codes. You will learn how planning and execution work together
                  in real manufacturing environments.
                </p>

                <Link
                  href="#learning-journey"
                  className="inline-flex items-center gap-2 mt-3 bg-[#111212] text-white px-7 py-3.5 rounded-full font-mont font-semibold text-[14px] hover:scale-[1.02] transition-all"
                >
                  Explore Learning Journey
                  <ArrowRight size={16} />
                </Link>

              </div>
            </Animate>

          </div>

        </div>
      </section>

      {/* Learning Areas */}
      <section
        id="learning-areas"
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">

              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Core Learning Areas
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Core SAP PP Knowledge
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Build a strong understanding of the key processes involved in
                SAP Production Planning and manufacturing execution.
              </p>

            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {learningAreas.map((item, i) => {
              const Icon = item.icon

              return (
                <Animate
                  key={i}
                  variant="scale-in"
                  delay={i * 70}
                >
                  <div className="group h-full bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-7 transition-all duration-300">

                    <div className="flex items-center justify-center w-11 h-11 rounded-[12px] bg-[#111212]">
                      <Icon
                        size={20}
                        className="text-white"
                      />
                    </div>

                    <h3 className="mt-6 font-mont font-semibold text-[#111212] text-[21px]">
                      {item.title}
                    </h3>

                    <p className="mt-3 font-inter text-[#555] text-[15px] leading-7">
                      {item.text}
                    </p>

                  </div>
                </Animate>
              )
            })}

          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12">

            <Animate variant="fade-up">
              <div className="lg:sticky lg:top-25">

                <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                  End-to-End Manufacturing
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Understand the Production Process
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  Learn how SAP connects demand planning, material
                  requirements, production planning and manufacturing
                  execution into one integrated process.
                </p>

              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="grid sm:grid-cols-2 gap-3">

                {[
                  {
                    number: '01',
                    title: 'Demand',
                    text: 'Understand demand management and determine what products need to be manufactured.',
                  },
                  {
                    number: '02',
                    title: 'MRP',
                    text: 'Calculate material requirements and identify what materials are needed for production.',
                  },
                  {
                    number: '03',
                    title: 'Planning',
                    text: 'Plan production using BOMs, work centers, routings and available resources.',
                  },
                  {
                    number: '04',
                    title: 'Execution',
                    text: 'Create production orders and execute the manufacturing process.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group bg-white border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-7 transition-all duration-300"
                  >

                    <span className="font-mont font-bold text-[#D5D5D5] text-[48px] leading-none">
                      {item.number}
                    </span>

                    <h3 className="mt-8 font-mont font-semibold text-[#111212] text-[20px]">
                      {item.title}
                    </h3>

                    <p className="mt-3 font-inter text-[#555] text-[15px] leading-7">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>
            </Animate>

          </div>

       

        </div>
      </section>

      {/* Learning Journey */}
      <section
        id="learning-journey"
        className="py-16 md:py-24 bg-[#111212]"
      >
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-14">

              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.22em]">
                Your Learning Journey
              </span>

              <h2 className="mt-4 font-mont font-bold text-white text-[34px] md:text-[48px] leading-[1.05]">
                Your SAP PP Learning Path
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-white/50 text-[16px] leading-7">
                Follow a structured journey from SAP fundamentals to
                production execution and implementation.
              </p>

            </div>
          </Animate>

          <div className="max-w-5xl">

            {learningPath.map((step, i) => (
              <Animate
                key={i}
                variant="fade-up"
                delay={i * 50}
              >
                <div className="group flex items-center gap-5 py-5 border-t border-white/10">

                  <span className="flex items-center justify-center shrink-0 rounded-full bg-white w-10 h-10 font-mont font-semibold text-[#111212] text-[11px] group-hover:scale-110 transition-transform">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="font-mont font-semibold text-white text-[17px] md:text-[19px]">
                    {step}
                  </span>

                </div>
              </Animate>
            ))}

          </div>

        </div>
      </section>

      {/* Practical Training */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            <Animate variant="fade-up">
              <div>

                <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                  Practical SAP PP
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Learn Through Practical SAP PP Scenarios
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  Understanding production planning requires more than
                  theoretical knowledge. Our training focuses on practical
                  manufacturing scenarios so learners can understand how SAP
                  supports real production environments.
                </p>

                <div className="mt-8 p-7 rounded-[20px] bg-[#111212]">

                  <Factory
                    size={34}
                    className="text-white/40"
                  />

                  <h3 className="mt-5 font-mont font-semibold text-white text-[21px]">
                    Learn Production Beyond T-Codes
                  </h3>

                  <p className="mt-3 font-inter text-white/50 text-[14px] leading-6">
                    Understand planning, master data, manufacturing processes,
                    production orders, execution and integration behind SAP PP
                    transactions.
                  </p>

                </div>

              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="grid sm:grid-cols-2 gap-3">

                {practicalSkills.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white border border-[#E5E5E5] rounded-[14px] p-4"
                  >

                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-[#111212]">
                      <Check
                        size={13}
                        className="text-white"
                      />
                    </span>

                    <span className="font-inter text-[#111212] text-[14px] leading-6">
                      {skill}
                    </span>

                  </div>
                ))}

              </div>
            </Animate>

          </div>

        </div>
      </section>

      {/* Career Outcomes */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">

              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Career Preparation
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Build Skills for SAP PP Careers
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Develop practical production planning knowledge and build a
                stronger foundation for SAP PP consulting and professional
                opportunities.
              </p>

            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {careerOutcomes.map((item, i) => (
              <Animate
                key={i}
                variant="scale-in"
                delay={i * 70}
              >
                <div className="flex items-start gap-4 h-full bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-6 transition-all">

                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#111212]"
                  />

                  <p className="font-inter text-[#555] text-[15px] leading-7">
                    {item}
                  </p>

                </div>
              </Animate>
            ))}

          </div>

        </div>
      </section>

      {/* Why Learn SAP PP */}
      <section className="py-16 md:py-24 bg-[#111212]">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-14">

              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.22em]">
                Why Learn SAP PP With Us?
              </span>

              <h2 className="mt-4 max-w-4xl font-mont font-bold text-white text-[34px] md:text-[48px] leading-[1.05]">
                Learn the Process, Understand Manufacturing & Build Your Career.
              </h2>

            </div>
          </Animate>

          <div className="grid md:grid-cols-3 gap-4">

            <Animate variant="scale-in">
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-8 h-full">

                <span className="font-mont font-bold text-white/15 text-[52px]">
                  01
                </span>

                <h3 className="mt-8 font-mont font-semibold text-white text-[21px]">
                  Manufacturing-Focused
                </h3>

                <p className="mt-3 font-inter text-white/50 text-[15px] leading-7">
                  Understand production planning and execution from the
                  perspective of real manufacturing operations.
                </p>

              </div>
            </Animate>

            <Animate variant="scale-in" delay={80}>
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-8 h-full">

                <span className="font-mont font-bold text-white/15 text-[52px]">
                  02
                </span>

                <h3 className="mt-8 font-mont font-semibold text-white text-[21px]">
                  Practical Learning
                </h3>

                <p className="mt-3 font-inter text-white/50 text-[15px] leading-7">
                  Connect production concepts with MRP, BOMs, work centers,
                  routings, production orders and practical scenarios.
                </p>

              </div>
            </Animate>

            <Animate variant="scale-in" delay={160}>
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-8 h-full">

                <span className="font-mont font-bold text-white/15 text-[52px]">
                  03
                </span>

                <h3 className="mt-8 font-mont font-semibold text-white text-[21px]">
                  Career-Focused
                </h3>

                <p className="mt-3 font-inter text-white/50 text-[15px] leading-7">
                  Build knowledge relevant to SAP PP consulting, production
                  planning roles, support projects and professional growth.
                </p>

              </div>
            </Animate>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="scale-in">
            <div className="relative overflow-hidden rounded-[24px] bg-[#111212] px-6 py-16 md:px-12 md:py-24 text-center">

              <div className="relative z-10">

                <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.22em]">
                  Start Your SAP PP Journey
                </span>

                <h2 className="mt-5 font-mont font-bold text-white text-[34px] md:text-[52px] leading-[1.05]">
                  Ready to Build Your SAP PP Skills?
                </h2>

                <p className="mt-5 max-w-2xl mx-auto font-inter text-white/55 text-[16px] md:text-[18px] leading-7">
                  Build practical knowledge of production planning, MRP, BOMs,
                  work centers, routings and production execution.
                </p>

                <p className="mt-5 font-mont font-medium text-white/80 text-[19px] md:text-[22px]">
                  Learn SAP PP - Understand Manufacturing - Build Your Career.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-10">

                  <Link
                    href="#learning-journey"
                    className="inline-flex items-center gap-2 bg-white text-[#111212] px-8 py-3.5 rounded-full font-mont font-semibold text-[14px] hover:scale-[1.02] transition-all"
                  >
                    Explore Learning Path
                    <ChevronRight size={16} />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-full font-mont font-semibold text-[14px] hover:bg-white hover:text-[#111212] transition-all"
                  >
                    Contact Us
                    <ArrowRight size={16} />
                  </Link>

                </div>

              </div>

            </div>
          </Animate>

          <p className="mt-8 text-center font-inter text-[#929296] text-[13px]">
            Thrill Edge Technologies — SAP PP | Production Planning | Professional Development
          </p>

        </div>
      </section>

    </div>
  )
}