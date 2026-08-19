'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react'
import { Animate } from '@/components/common/animate'

/* ──────────────────────────────────────────────────────────────
   DATA – every word taken verbatim from the DOCX
   ────────────────────────────────────────────────────────────── */

const whyLearnSAP = [
  {
    title: 'Business Process Understanding',
    text: 'Understand how organizations operate and how SAP supports their end-to-end business processes.',
  },
  {
    title: 'Practical SAP Knowledge',
    text: 'Learn SAP functionality through structured lessons, demonstrations and practical scenarios.',
  },
  {
    title: 'Real-World Scenarios',
    text: 'Explore situations that SAP consultants encounter during implementations, rollouts and support projects.',
  },
  {
    title: 'Career Preparation',
    text: 'Develop the knowledge and confidence required for SAP interviews, projects and professional growth.',
  },
]

const sapModules = [
  {
    code: 'SAP MM',
    title: 'Materials Management',
    desc: 'Learn procurement, purchasing, inventory management, material master, MRP, invoice verification and MM integration.',
    ideal: 'Procurement, supply chain professionals and aspiring SAP MM consultants.',
  },
  {
    code: 'SAP FI',
    title: 'Financial Accounting',
    desc: 'Understand financial accounting processes including General Ledger, Accounts Payable, Accounts Receivable, Asset Accounting, Bank Accounting and integration with other SAP modules.',
    ideal: 'Finance professionals and aspiring SAP FI consultants.',
  },
  {
    code: 'SAP SD',
    title: 'Sales & Distribution',
    desc: 'Learn the complete Order-to-Cash process including sales orders, delivery, shipping, billing, pricing and integration with FI and MM.',
    ideal: 'Sales professionals and aspiring SAP SD consultants.',
  },
  {
    code: 'SAP PP',
    title: 'Production Planning',
    desc: 'Understand production planning and execution, including MRP, BOMs, work centers, routings, production orders and manufacturing processes.',
    ideal: 'Manufacturing professionals and aspiring SAP PP consultants.',
  },
  {
    code: 'SAP HCM',
    title: 'Human Capital Management',
    desc: 'Learn the fundamentals of SAP HCM, including Organizational Management, Personnel Administration, Time Management and Payroll concepts.',
    ideal: 'HR professionals and aspiring SAP HCM consultants.',
  },
  {
    code: 'SAP Success Factors',
    title: 'Cloud Human Experience Management',
    desc: "Build knowledge of SAP's cloud-based HXM solutions and understand how SuccessFactors supports modern HR processes and employee experiences.",
    ideal: 'HR professionals and SAP HCM professionals looking to transition toward cloud-based HXM.',
  },
  {
    code: 'SAP Analytics Cloud',
    title: 'Analytics & Planning',
    desc: 'Learn how to transform business data into meaningful insights through analytics, dashboards, reporting and planning.',
    ideal: 'Business analysts, SAP professionals and aspiring analytics consultants.',
  },
]

const careerPaths = [
  {
    title: 'SAP MM Consultant Path',
    description: 'Master procurement workflows, inventory control and material management processes to become a confident SAP MM consultant ready for real-world projects.',
    steps: ['SAP Fundamentals', 'MM Business Processes', 'Procurement', 'Inventory Management', 'MRP', 'Configuration', 'Integration', 'Implementation & Support', 'Interview Preparation'],
  },
  {
    title: 'SAP FI Consultant Path',
    description: 'Build deep expertise in financial accounting, General Ledger, sub-ledger management and period-end closings to handle end-to-end SAP FI consulting engagements.',
    steps: ['SAP Fundamentals', 'FI Fundamentals', 'General Ledger', 'Accounts Payable & Receivable', 'Asset Accounting', 'Bank Accounting', 'Integration', 'Configuration', 'Implementation & Support'],
  },
  {
    title: 'SAP SD Consultant Path',
    description: 'Learn the complete Order-to-Cash cycle from sales orders to billing and pricing, equipping you to manage SAP SD implementations across industries.',
    steps: ['SAP Fundamentals', 'Sales Processes', 'Pricing', 'Shipping & Delivery', 'Billing', 'Order-to-Cash', 'Integration', 'Configuration', 'Implementation & Support'],
  },
  {
    title: 'SAP PP Consultant Path',
    description: 'Understand production planning, MRP runs, BOMs and manufacturing execution to confidently support SAP PP implementations in production-heavy environments.',
    steps: ['SAP Fundamentals', 'Production Planning', 'Demand Management', 'MRP', 'BOM & Work Centers', 'Routings', 'Production Orders', 'Production Execution', 'Integration & Implementation'],
  },
  {
    title: 'SAP HR + SuccessFactors Path',
    description: 'Combine on-premise SAP HCM knowledge with cloud-based SuccessFactors expertise to lead HR transformation projects and modern employee experience initiatives.',
    steps: ['HR Fundamentals', 'SAP HCM', 'Organizational Management', 'Personnel Administration', 'Time Management', 'HCM Processes', 'SuccessFactors', 'Cloud HXM', 'Implementation & Integration'],
  },
  {
    title: 'SAP Analytics Path',
    description: 'Transform raw business data into actionable insights through SAP Analytics Cloud dashboards, stories and planning models that drive smarter decision-making.',
    steps: ['Data & Analytics Fundamentals', 'SAP Analytics Cloud', 'Data Visualization', 'Stories & Dashboards', 'Reporting', 'Planning', 'Business Scenarios', 'Analytics Projects'],
  },
]

const learningSteps = [
  { num: '01', label: 'Learn', text: 'Build a strong foundation in SAP concepts, terminology and business processes.' },
  { num: '02', label: 'Understand', text: 'Discover how SAP supports real business operations and how different processes connect.' },
  { num: '03', label: 'Practice', text: 'Apply your knowledge through SAP transactions, exercises and practical scenarios.' },
  { num: '04', label: 'Apply', text: 'Solve realistic business requirements and understand how consultants approach SAP problems.' },
  { num: '05', label: 'Become Project-Ready', text: 'Develop an understanding of implementation, configuration, testing, documentation, support and troubleshooting.' },
]

const beyondTCodes = [
  'Why is this process required?',
  'What happens in SAP when a business transaction is performed?',
  'Which master data is involved?',
  'How does one SAP module integrate with another?',
  'What configuration controls the process?',
  'What happens when something goes wrong?',
]

const practiceAreas = [
  'Master data creation',
  'Transaction processing',
  'Configuration exercises',
  'End-to-end business processes',
  'Integration scenarios',
  'Testing',
  'Troubleshooting',
  'Real-world project scenarios',
]

const trainingPrograms = [
  { title: 'SAP MM Consultant Program', tags: 'Procurement | Inventory | MRP | Invoice Verification | Configuration | Integration | Projects' },
  { title: 'SAP FI Consultant Program', tags: 'GL | AP | AR | Asset Accounting | Banking | Integration | Configuration | Projects' },
  { title: 'SAP SD Consultant Program', tags: 'Sales | Pricing | Delivery | Shipping | Billing | Order-to-Cash | Integration' },
  { title: 'SAP PP Consultant Program', tags: 'MRP | BOM | Work Centers | Routings | Production Orders | Manufacturing | Integration' },
  { title: 'SAP HCM & SuccessFactors Program', tags: 'HR Processes | HCM | Organizational Management | Personnel Administration | SuccessFactors | Cloud HXM' },
  { title: 'SAP Analytics Cloud Program', tags: 'Analytics | Dashboards | Reporting | Visualization | Planning | Business Insights' },
]

const audience = [
  { title: 'Students & Fresh Graduates', text: 'Build a foundation and understand how to start a career in SAP.' },
  { title: 'Working Professionals', text: 'Add SAP expertise to your existing business or technical experience.' },
  { title: 'SAP End Users', text: 'Move beyond transactional knowledge and understand the functional processes behind your daily work.' },
  { title: 'Aspiring SAP Consultants', text: 'Develop the business, functional and project knowledge required for consulting roles.' },
  { title: 'Existing SAP Professionals', text: 'Strengthen your knowledge, explore new modules and prepare for your next career opportunity.' },
]

const whyThrillEdge = [
  { title: 'Practical', text: 'Learn concepts through realistic business scenarios.' },
  { title: 'Structured', text: 'Follow a clear learning journey from fundamentals to advanced concepts.' },
  { title: 'Career-Focused', text: 'Develop knowledge relevant to SAP consulting and professional growth.' },
  { title: 'Industry-Oriented', text: 'Understand how SAP is applied in real organizations and projects.' },
]

/* ──────────────────────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────────────────────── */

export function SAPLearningClient() {
  return (
    <div className="relative bg-[#F3F3F3]">

      {/* ─── Hero ─── */}
      <section className="px-3 md:px-2.5 w-full">
        <div className="relative rounded-[20px] w-full h-120 overflow-hidden bg-[#111212]">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
          <div
            className="absolute inset-0 rounded-[20px]"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.5), rgba(0,0,0,0))',
            }}
          />
          <div className="right-0 bottom-0 left-0 absolute flex lg:flex-row flex-col justify-between lg:items-end gap-4 mx-auto px-5 lg:px-9 py-6 lg:py-10 max-w-360">
            <div className="flex flex-col gap-3">
              <span className="font-inter font-semibold text-[14px] text-white/60 uppercase tracking-[0.2em]">
                Service
              </span>
              <h1 className="max-w-2xl font-mont font-semibold text-[36px] text-white lg:text-[60px] leading-none">
                SAP Learning
              </h1>
              <p className="max-w-xl font-mont font-medium text-[20px] text-white/80 lg:text-[28px] leading-tight mt-2">
                Learn SAP. Understand Business. Build Your Career.
              </p>
            </div>
            <p className="lg:text-[18px] text-[15px] font-inter text-white/70 lg:max-w-1/2 leading-7">
              Practical, structured and career-focused SAP learning designed for students, professionals and aspiring SAP consultants.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Intro Description ─── */}
      <section className="py-12 md:py-16">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <p className="max-w-4xl font-inter text-[#555] text-[17px] md:text-[19px] leading-8">
              Whether you are starting your SAP journey, strengthening your existing skills, or preparing for a consulting career, our learning programs help you move beyond theory and understand how SAP works in real-world business environments.
            </p>
          </Animate>
          <Animate variant="fade-up" delay={100}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="#explore-modules"
                className="inline-flex items-center gap-2 bg-[#111212] text-white font-mont font-semibold text-[14px] px-7 py-3.5 rounded-full hover:scale-[1.02] transition-all duration-300"
              >
                Explore SAP Modules
                <ChevronRight size={16} />
              </Link>
              <Link
                href="#career-paths"
                className="inline-flex items-center gap-2 border border-[#111212] text-[#111212] font-mont font-semibold text-[14px] px-7 py-3.5 rounded-full hover:bg-[#111212] hover:text-white transition-all duration-300"
              >
                Find Your Learning Path
                <ArrowRight size={16} />
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* ─── Why Learn SAP With Thrill Edge? ─── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] uppercase tracking-[0.22em] text-[#929296]">
                Why Learn SAP
              </span>
              <h2 className="mt-4 font-mont font-semibold text-[32px] leading-[1.1] text-[#111212] md:text-[48px]">
                Why Learn SAP With Thrill Edge?
              </h2>
              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                SAP is more than transactions, configuration and technical terminology. To become a successful SAP professional, you need to understand the connection between business processes, SAP functionality, configuration and real-world project requirements.
              </p>
              <p className="mt-3 font-inter text-[#929296] text-[16px]">
                Our learning approach focuses on:
              </p>
            </div>
          </Animate>
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
            {whyLearnSAP.map((item, i) => (
              <Animate key={i} variant="scale-in" delay={i * 80}>
                <div className="group flex flex-col gap-4 bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-7 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111212] font-mont text-[13px] font-semibold text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-mont font-semibold text-[#111212] text-[20px] md:text-[22px]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-inter text-[#555] text-[15px] leading-7">
                    {item.text}
                  </p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Explore SAP Modules ─── */}
      <section id="explore-modules" className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] uppercase tracking-[0.22em] text-[#929296]">
                SAP Modules
              </span>
              <h2 className="mt-4 font-mont font-semibold text-[32px] leading-[1.1] text-[#111212] md:text-[48px]">
                Explore SAP Modules
              </h2>
              <p className="mt-4 font-inter text-[#929296] text-[16px]">
                Build your knowledge across some of the most widely used SAP functional and analytics solutions.
              </p>
            </div>
          </Animate>
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {sapModules.map((mod, i) => (
              <Animate key={i} variant="scale-in" delay={i * 70}>
                <div className="group flex flex-col bg-white border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                  <div className="bg-[#111212] px-6 py-5">
                    <span className="font-mont font-bold text-white/40 text-[13px] uppercase tracking-wider">
                      {mod.code}
                    </span>
                    <h3 className="mt-1 font-mont font-semibold text-white text-[22px] md:text-[24px] leading-tight">
                      {mod.title}
                    </h3>
                  </div>
                  <div className="flex flex-col flex-1 gap-4 p-6">
                    <p className="font-inter text-[#555] text-[15px] leading-7">
                      {mod.desc}
                    </p>
                    <div className="mt-auto pt-4 border-t border-[#F3F3F3]">
                      <p className="font-inter text-[13px] text-[#929296]">
                        <span className="font-semibold text-[#111212]">Ideal for:</span>{' '}
                        {mod.ideal}
                      </p>
                    </div>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 font-mont font-semibold text-[14px] text-[#111212] hover:gap-3 transition-all duration-300"
                    >
                      Explore {mod.code.replace('SAP ', '')}
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Choose Your SAP Career Path ─── */}
      <section id="career-paths" className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] uppercase tracking-[0.22em] text-[#929296]">
                Career Paths
              </span>
              <h2 className="mt-4 font-mont font-semibold text-[32px] leading-[1.1] text-[#111212] md:text-[48px]">
                Choose Your SAP Career Path
              </h2>
              <p className="mt-4 max-w-2xl font-inter text-[#555] text-[16px] leading-7">
                Not sure where to start? Your SAP learning journey should be based on your background, experience and career goals.
              </p>
            </div>
          </Animate>

          {/* Career path cards */}
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {careerPaths.map((path, i) => (
              <Animate key={i} variant="scale-in" delay={i * 70}>
                <div className="group flex flex-col bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                  <div className="bg-[#111212] px-6 py-5">
                    <h3 className="font-mont font-semibold text-white text-[20px] md:text-[22px] leading-tight">
                      {path.title}
                    </h3>
                  </div>
                  <div className="flex flex-col flex-1 gap-4 p-6">
                    <p className="font-inter text-[#555] text-[15px] leading-7">
                      {path.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-[#E5E5E5]">
                      <div className="flex flex-col gap-0">
                        {path.steps.map((step, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-3 py-2.5 border-t border-[#E5E5E5] first:border-t-0"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111212] font-mont text-[10px] font-semibold text-white">
                              {String(j + 1).padStart(2, '0')}
                            </span>
                            <span className="font-inter text-[#111212] text-[14px]">
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 font-mont font-semibold text-[14px] text-[#111212] hover:gap-3 transition-all duration-300"
                    >
                      Start {path.title.replace(' Path', '')}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Learning Approach ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-4">
              <span className="font-inter font-semibold text-[11px] uppercase tracking-[0.22em] text-[#929296]">
                Our Approach
              </span>
              <h2 className="mt-4 font-mont font-semibold text-[32px] leading-[1.1] text-[#111212] md:text-[48px]">
                Our Learning Approach
              </h2>
            </div>
            <p className="mt-3 max-w-2xl font-mont font-medium text-[#111212] text-[18px] md:text-[22px] leading-7 mb-14">
              Learn &middot; Practice &middot; Apply &middot; Become Project-Ready
            </p>
          </Animate>
          <div className="flex lg:flex-row flex-col md:gap-16 gap-12 items-start">
            <div className="lg:w-105 w-full shrink-0 lg:sticky lg:top-25">
              <div className="bg-[#111212] rounded-[20px] p-8 text-center">
                <BookOpen size={40} className="text-white/40 mx-auto mb-4" />
                <p className="font-mont font-semibold text-white text-[18px]">
                  Learn Beyond T-Codes
                </p>
                <p className="mt-3 font-inter text-white/50 text-[14px] leading-6">
                  Memorizing SAP transaction codes is not enough. A good SAP professional should be able to answer the questions below.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:flex lg:flex-col lg:flex-1">
              {learningSteps.map((step, i) => (
                <Animate key={i} variant="fade-up" delay={i * 80}>
                  <div className="group flex flex-col gap-4 items-start px-5 py-8 border-t border-[#D9D9D9] hover:border-[#111212] transition-all duration-300">
                    <div className="flex justify-center items-center bg-[#f7f7f7] group-hover:bg-[#111212] rounded-[12px] w-12 h-12 transition-colors duration-300">
                      <span className="font-mont font-bold text-[#929296] group-hover:text-white text-[14px] tabular-nums transition-colors duration-300">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-mont font-semibold text-black text-[20px] md:text-[24px]">
                      {step.label}
                    </h3>
                    <p className="font-inter text-[#111212] text-[16px] leading-6.5">
                      {step.text}
                    </p>
                  </div>
                </Animate>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Learn Beyond T-Codes (Questions) ─── */}
      <section className="py-16 md:py-20 bg-[#111212]">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-12">
              <h2 className="font-mont font-bold text-white text-[32px] md:text-[48px] leading-[1.1]">
                Learn Beyond T-Codes
              </h2>
              <p className="mt-4 max-w-2xl font-inter text-white/50 text-[16px] leading-7">
                Memorizing SAP transaction codes is not enough. A good SAP professional should be able to answer:
              </p>
            </div>
          </Animate>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {beyondTCodes.map((q, i) => (
              <Animate key={i} variant="scale-in" delay={i * 70}>
                <div className="group flex items-start gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-[20px] p-7 transition-all duration-300 h-full">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 font-mont text-[13px] font-bold text-white/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-inter text-white/80 text-[15px] leading-7">
                    {q}
                  </p>
                </div>
              </Animate>
            ))}
          </div>
          <Animate variant="fade-up" delay={200}>
            <p className="mt-10 max-w-3xl font-inter text-white/60 text-[16px] leading-7">
              Our learning approach focuses on answering these questions — so you learn how SAP works, not just which transaction to execute.
            </p>
          </Animate>
        </div>
      </section>

      {/* ─── Hands-On SAP Learning ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Animate variant="fade-up">
              <div>
                <span className="font-inter font-semibold text-[11px] uppercase tracking-[0.22em] text-[#929296]">
                  Practical Training
                </span>
                <h2 className="mt-4 font-mont font-semibold text-[32px] leading-[1.1] text-[#111212] md:text-[48px]">
                  Hands-On SAP Learning
                </h2>
                <p className="mt-2 font-mont font-medium text-[#111212] text-[20px] md:text-[24px]">
                  Don&apos;t Just Watch. Practice.
                </p>
                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  Understanding SAP requires practical experience. Where applicable, our programs combine learning with hands-on exercises, allowing you to apply concepts in an SAP environment.
                </p>
                <p className="mt-3 font-inter text-[#929296] text-[16px]">
                  Practice areas may include:
                </p>
              </div>
            </Animate>
            <Animate variant="fade-up" delay={100}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {practiceAreas.map((area, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-[14px] border border-[#E5E5E5] bg-[#F7F7F7] px-4 py-3.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#111212] font-mont text-[10px] font-semibold text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-inter text-[15px] text-[#111212]">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#111212] text-white font-mont font-semibold text-[14px] px-7 py-3.5 rounded-full hover:scale-[1.02] transition-all duration-300"
                >
                  Explore Practical Training
                  <ArrowRight size={16} />
                </Link>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ─── SAP Training Programs ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] uppercase tracking-[0.22em] text-[#929296]">
                Training Programs
              </span>
              <h2 className="mt-4 font-mont font-semibold text-[32px] leading-[1.1] text-[#111212] md:text-[48px]">
                SAP Training Programs
              </h2>
              <p className="mt-4 max-w-2xl font-inter text-[#929296] text-[16px]">
                Build Skills That Go Beyond the Classroom. Our structured training programs are designed to take learners from fundamentals to practical SAP knowledge.
              </p>
            </div>
          </Animate>
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {trainingPrograms.map((prog, i) => (
              <Animate key={i} variant="scale-in" delay={i * 70}>
                <div className="group flex flex-col bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-7 transition-all duration-300 h-full">
                  <h3 className="font-mont font-semibold text-[#111212] text-[20px] md:text-[22px] leading-tight">
                    {prog.title}
                  </h3>
                  <p className="mt-3 font-inter text-[#929296] text-[14px] leading-6">
                    {prog.tags}
                  </p>
                  <div className="mt-auto pt-6">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 font-mont font-semibold text-[14px] text-[#111212] hover:gap-3 transition-all duration-300"
                    >
                      View Program
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Who Is This For? ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] uppercase tracking-[0.22em] text-[#929296]">
                Who Is This For
              </span>
              <h2 className="mt-4 font-mont font-semibold text-[32px] leading-[1.1] text-[#111212] md:text-[48px]">
                Who Is This For?
              </h2>
            </div>
          </Animate>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {audience.map((item, i) => (
              <Animate key={i} variant="scale-in" delay={i * 80}>
                <div className="flex items-start gap-4 bg-white border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-6 transition-all duration-300 h-full">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111212] font-mont text-[13px] font-semibold text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-mont font-semibold text-[#111212] text-[18px] md:text-[20px] leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-inter text-[#555] text-[15px] leading-7">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Thrill Edge? (Dark Section) ─── */}
      <section className="bg-[#111212] w-full">
        <div className="px-4 py-16 md:py-24 w-full">
          <div className="max-w-360 mx-auto">
            <Animate variant="fade-up">
              <div className="flex md:flex-row flex-col justify-between md:items-end gap-8 mb-16">
                <div>
                  <span className="font-inter font-semibold text-[11px] uppercase tracking-[0.22em] text-white/30">
                    Why Thrill Edge
                  </span>
                  <h2 className="mt-4 max-w-140 font-mont font-bold text-white text-[32px] md:text-[48px] leading-[1.1]">
                    Why Thrill Edge?
                  </h2>
                </div>
                <div className="max-w-90">
                  <p className="font-mont font-medium text-white/60 text-[18px] md:text-[20px] leading-7">
                    Technology. Knowledge. Practical Experience.
                  </p>
                  <p className="mt-3 font-inter text-white/40 text-[15px] leading-6.5">
                    At Thrill Edge Technology, we believe professional learning should connect knowledge with practical application. Our SAP learning initiative focuses on helping learners understand the relationship between business requirements, SAP processes and real-world implementation scenarios.
                  </p>
                </div>
              </div>
            </Animate>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {whyThrillEdge.map((item, i) => (
                <Animate key={i} variant="scale-in" delay={i * 70}>
                  <div className="group flex flex-col justify-center gap-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-[20px] p-8 transition-all duration-300 md:h-60">
                    <span className="font-mont font-bold text-white/15 text-[56px] leading-none tabular-nums select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col gap-2.5">
                      <h3 className="font-mont font-semibold text-white text-[20px] leading-7">
                        {item.title}
                      </h3>
                      <p className="font-inter text-white/50 text-[15px] leading-6.5">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Animate>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Start Your SAP Journey (CTA) ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="scale-in">
            <div className="bg-[#111212] rounded-[24px] overflow-hidden text-center px-6 py-16 md:py-24">
              <h2 className="font-mont font-bold text-white text-[32px] md:text-[48px] leading-[1.1]">
                Start Your SAP Journey
              </h2>
              <p className="mt-5 max-w-2xl mx-auto font-inter text-white/60 text-[16px] md:text-[18px] leading-7">
                Whether you are taking your first step into SAP or looking to advance your existing career, choose a learning path that matches your goals.
              </p>
              <p className="mt-4 max-w-xl mx-auto font-mont font-medium text-white/80 text-[18px] md:text-[22px]">
                Learn SAP. Understand Business. Build Your Career.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <Link
                  href="#explore-modules"
                  className="inline-flex items-center gap-2 bg-white text-[#111212] font-mont font-semibold text-[14px] px-8 py-3.5 rounded-full hover:scale-[1.02] transition-all duration-300"
                >
                  Explore SAP Modules
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-mont font-semibold text-[14px] px-8 py-3.5 rounded-full hover:bg-white hover:text-[#111212] transition-all duration-300"
                >
                  Start Learning
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-mont font-semibold text-[14px] px-8 py-3.5 rounded-full hover:bg-white hover:text-[#111212] transition-all duration-300"
                >
                  Contact Us
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Animate>
          <Animate variant="fade-up" delay={100}>
            <div className="mt-10 text-center">
              <p className="font-inter text-[#929296] text-[14px]">
                Thrill Edge Technology — SAP Learning | Technology | Professional Development
              </p>
              <p className="mt-1 font-inter text-[#929296] text-[14px]">
                Helping professionals build practical technology and SAP skills for the future.
              </p>
            </div>
          </Animate>
        </div>
      </section>

    </div>
  )
}
