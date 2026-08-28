

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Database,
  FileText,
  Layers,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Animate } from '@/components/common/animate'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'SAP MM Training | Materials Management | Thrill Edge Technologies',
  description:
    'Learn SAP Materials Management with practical, structured and career-focused training covering procurement, purchasing, inventory management, MRP, invoice verification and SAP MM integration.',
  alternates: {
    canonical: `${SITE_URL}/services/sap-learning/materials-management`,
  },
  openGraph: {
    title: 'SAP MM Training | Materials Management | Thrill Edge Technologies',
    description:
      'Build practical SAP MM skills through structured learning covering procurement, inventory, MRP, purchasing, invoice verification and business process integration.',
    type: 'website',
    url: `${SITE_URL}/services/sap-learning/materials-management`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAP MM Training | Materials Management',
    description:
      'Learn SAP MM through practical business processes, procurement, inventory management, MRP and real-world scenarios.',
  },
}

const learningAreas = [
  {
    icon: Database,
    title: 'Material Master',
    text: 'Understand material master data, organizational levels, views and how material information supports business transactions.',
  },
  {
    icon: ShoppingCart,
    title: 'Procurement',
    text: 'Learn the complete procurement cycle from purchase requisitions and purchase orders to goods receipt and invoice verification.',
  },
  {
    icon: Layers,
    title: 'Inventory Management',
    text: 'Understand stock movements, goods receipts, goods issues, stock transfers and inventory-related processes.',
  },
  {
    icon: TrendingUp,
    title: 'MRP',
    text: 'Learn the fundamentals of Material Requirements Planning and understand how SAP supports material availability.',
  },
  {
    icon: FileText,
    title: 'Invoice Verification',
    text: 'Understand how invoices are processed and integrated with purchasing and financial accounting processes.',
  },
  {
    icon: Settings,
    title: 'Configuration',
    text: 'Build an understanding of the configuration settings that control procurement and inventory processes in SAP MM.',
  },
]

const mmTopics = [
  'SAP MM Fundamentals',
  'Enterprise Structure',
  'Material Master',
  'Vendor / Business Partner Master Data',
  'Purchase Requisition',
  'Request for Quotation',
  'Purchase Orders',
  'Goods Receipt',
  'Goods Issue',
  'Stock Transfer',
  'Inventory Management',
  'Physical Inventory',
  'MRP Fundamentals',
  'Invoice Verification',
  'Pricing & Conditions',
  'Release Procedures',
  'Account Determination',
  'SAP MM Integration',
]

const learningJourney = [
  {
    number: '01',
    title: 'SAP Fundamentals',
    text: 'Understand SAP navigation, terminology, organizational structures and the role of SAP MM within an organization.',
  },
  {
    number: '02',
    title: 'Material & Vendor Data',
    text: 'Learn how master data is created, maintained and used throughout procurement and inventory processes.',
  },
  {
    number: '03',
    title: 'Procurement Process',
    text: 'Follow the complete Procure-to-Pay process from requirement creation to purchasing and goods receipt.',
  },
  {
    number: '04',
    title: 'Inventory Management',
    text: 'Understand stock management, goods movements, transfers and physical inventory processes.',
  },
  {
    number: '05',
    title: 'MRP & Planning',
    text: 'Learn how MRP helps organizations plan material requirements and maintain material availability.',
  },
  {
    number: '06',
    title: 'Invoice Verification',
    text: 'Understand invoice processing and how purchasing transactions connect with financial accounting.',
  },
  {
    number: '07',
    title: 'Configuration',
    text: 'Explore the configuration concepts that influence purchasing, inventory and valuation processes.',
  },
  {
    number: '08',
    title: 'Integration',
    text: 'Understand how MM connects with FI, SD, PP and other SAP business processes.',
  },
  {
    number: '09',
    title: 'Implementation & Support',
    text: 'Develop an understanding of requirements, testing, documentation, troubleshooting and SAP project support.',
  },
]

const practicalSkills = [
  'Create and understand material master data',
  'Understand vendor and business partner master data',
  'Process purchase requisitions',
  'Create and understand purchase orders',
  'Understand goods receipt processes',
  'Process goods movements',
  'Understand stock transfers',
  'Work with inventory management concepts',
  'Understand MRP processes',
  'Understand invoice verification',
  'Analyze procurement scenarios',
  'Understand MM integration with FI, SD and PP',
]

const careerRoles = [
  {
    title: 'SAP MM Consultant',
    text: 'Work with organizations to analyze procurement and inventory requirements and support SAP MM implementations.',
  },
  {
    title: 'SAP MM Support Consultant',
    text: 'Help businesses troubleshoot SAP MM issues, support users and maintain day-to-day procurement processes.',
  },
  {
    title: 'SAP Procurement Specialist',
    text: 'Combine procurement knowledge with SAP skills to support purchasing and supply chain operations.',
  },
  {
    title: 'SAP Functional Consultant',
    text: 'Develop functional SAP expertise and work across business requirements, configuration, testing and implementation.',
  },
]

const audience = [
  'Students and fresh graduates',
  'Procurement professionals',
  'Supply chain professionals',
  'Inventory professionals',
  'Business professionals',
  'SAP end users',
  'Aspiring SAP MM consultants',
  'Existing SAP professionals',
]

const faqs = [
  {
    question: 'What is SAP MM?',
    answer:
      'SAP Materials Management is an SAP module that supports procurement, purchasing, inventory management, material planning and related business processes.',
  },
  {
    question: 'Who should learn SAP MM?',
    answer:
      'SAP MM is suitable for students, graduates, procurement professionals, supply chain professionals, SAP end users and anyone interested in a career as an SAP MM consultant.',
  },
  {
    question: 'Do I need SAP experience before learning MM?',
    answer:
      'No. The learning journey can begin with SAP fundamentals before moving into MM business processes, transactions, configuration concepts and integration.',
  },
  {
    question: 'Will I learn only SAP transaction codes?',
    answer:
      'No. The focus is on understanding the business process behind the transaction, why the process exists, how SAP handles it and how different modules integrate.',
  },
]

export default function MaterialsManagementPage() {
  return (
    <div className="relative bg-[#F3F3F3]">

      {/* Hero */}
      <section className="px-3 md:px-2.5 w-full">
        <div className="relative w-full h-[620px] overflow-hidden rounded-[20px] bg-[#111212]">

          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'url(/sapmm.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="right-0 bottom-0 left-0 absolute mx-auto px-5 lg:px-9 py-8 lg:py-12 max-w-360">
            <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-8">

              <div>
                <span className="font-inter font-semibold text-[13px] text-white/50 uppercase tracking-[0.2em]">
                  SAP Learning / Materials Management
                </span>

                <h1 className="mt-4 max-w-3xl font-mont font-semibold text-white text-[40px] md:text-[64px] leading-[0.95]">
                  SAP Materials Management
                </h1>

                <p className="mt-5 font-mont font-medium text-white/80 text-[20px] md:text-[28px]">
                  Master Procurement - Manage Materials - Build SAP Expertise.
                </p>
              </div>

              <p className="max-w-xl font-inter text-white/65 text-[15px] md:text-[17px] leading-7">
                Build practical SAP MM knowledge across procurement,
                purchasing, inventory management, MRP, invoice verification
                and real-world business processes.
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
                  What Is SAP MM?
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Understand How Materials Move Through a Business.
                </h2>
              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="space-y-5">
                <p className="font-inter text-[#555] text-[16px] leading-7">
                  SAP Materials Management helps organizations manage
                  purchasing, procurement, inventory and material-related
                  business processes.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  Our SAP MM learning path takes you beyond transaction
                  codes and helps you understand how procurement and
                  inventory processes work from a business perspective.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  You will learn how SAP MM connects business requirements,
                  master data, transactions, configuration and integration
                  across the SAP ecosystem.
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

      {/* What You'll Learn */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Core Learning Areas
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                What Will You Learn in SAP MM?
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Develop a strong understanding of the core processes that
                make SAP MM one of the most important modules for procurement
                and supply chain operations.
              </p>
            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {learningAreas.map((item, i) => {
              const Icon = item.icon

              return (
                <Animate key={i} variant="scale-in" delay={i * 70}>
                  <div className="group h-full bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-7 transition-all duration-300">

                    <div className="flex items-center justify-center w-11 h-11 rounded-[12px] bg-[#111212]">
                      <Icon size={20} className="text-white" />
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

      {/* Topics */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12">

            <Animate variant="fade-up">
              <div className="lg:sticky lg:top-25">

                <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                  SAP MM Topics
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Build Knowledge Across the MM Lifecycle.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  From material master data to procurement, inventory,
                  planning and integration, understand the complete SAP MM
                  ecosystem.
                </p>

              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="grid sm:grid-cols-2 gap-3">
                {mmTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white border border-[#E5E5E5] rounded-[14px] px-5 py-4 hover:border-[#111212] transition-colors"
                  >
                    <span className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-[#111212] text-white font-mont text-[10px] font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="font-inter text-[#111212] text-[14px]">
                      {topic}
                    </span>
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
                From SAP Fundamentals to Project Readiness.
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-white/50 text-[16px] leading-7">
                Follow a structured path that gradually takes you from
                understanding SAP MM concepts to applying them in realistic
                business and project scenarios.
              </p>
            </div>
          </Animate>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningJourney.map((step, i) => (
              <Animate key={i} variant="scale-in" delay={i * 60}>
                <div className="group h-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-[20px] p-7 transition-all duration-300">

                  <span className="font-mont font-bold text-white/20 text-[48px] leading-none">
                    {step.number}
                  </span>

                  <h3 className="mt-8 font-mont font-semibold text-white text-[20px]">
                    {step.title}
                  </h3>

                  <p className="mt-3 font-inter text-white/50 text-[15px] leading-7">
                    {step.text}
                  </p>

                </div>
              </Animate>
            ))}
          </div>

        </div>
      </section>

      {/* Practical Skills */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            <Animate variant="fade-up">
              <div>
                <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                  Practical SAP MM
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Learn SAP MM by Understanding How the Business Works.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  Practical SAP knowledge is more than remembering
                  transaction codes. You need to understand what happens
                  before, during and after a transaction.
                </p>

                <div className="mt-8 p-7 rounded-[20px] bg-[#111212]">
                  <BookOpen size={34} className="text-white/40" />

                  <h3 className="mt-5 font-mont font-semibold text-white text-[21px]">
                    Learn Beyond T-Codes
                  </h3>

                  <p className="mt-3 font-inter text-white/50 text-[14px] leading-6">
                    Understand the business requirement, master data,
                    process flow, configuration and integration behind
                    every SAP MM transaction.
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
                      <Check size={13} className="text-white" />
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

      {/* Career Opportunities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Career Opportunities
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Where Can SAP MM Take Your Career?
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                SAP MM skills can support careers across consulting,
                procurement, supply chain, inventory management and SAP
                support.
              </p>
            </div>
          </Animate>

          <div className="grid md:grid-cols-2 gap-5">
            {careerRoles.map((role, i) => (
              <Animate key={i} variant="scale-in" delay={i * 70}>
                <div className="flex gap-5 h-full bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-7 transition-all">

                  <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-[#111212]">
                    <Users size={18} className="text-white" />
                  </div>

                  <div>
                    <h3 className="font-mont font-semibold text-[#111212] text-[20px]">
                      {role.title}
                    </h3>

                    <p className="mt-2 font-inter text-[#555] text-[15px] leading-7">
                      {role.text}
                    </p>
                  </div>

                </div>
              </Animate>
            ))}
          </div>

        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Who Is This For?
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Is SAP MM Right for You?
              </h2>
            </div>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audience.map((item, i) => (
              <Animate key={i} variant="scale-in" delay={i * 60}>
                <div className="flex items-center gap-4 bg-white border border-[#E5E5E5] hover:border-[#111212] rounded-[18px] p-5 transition-all">

                  <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-[#111212] text-white font-mont text-[11px] font-semibold">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="font-inter text-[#111212] text-[14px] leading-6">
                    {item}
                  </span>

                </div>
              </Animate>
            ))}
          </div>

        </div>
      </section>

      {/* Why Thrill Edge */}
      <section className="py-16 md:py-24 bg-[#111212]">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-14">
              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.22em]">
                Why Learn SAP MM With Us?
              </span>

              <h2 className="mt-4 max-w-4xl font-mont font-bold text-white text-[34px] md:text-[48px] leading-[1.05]">
                Learn the Process. Understand the System & Build Your Career.
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
                  Business-Focused
                </h3>

                <p className="mt-3 font-inter text-white/50 text-[15px] leading-7">
                  Understand procurement and inventory from the perspective
                  of real business operations.
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
                  Connect concepts with transactions, scenarios, testing,
                  troubleshooting and practical exercises.
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
                  Build knowledge relevant to SAP MM consulting, support
                  projects and professional growth.
                </p>
              </div>
            </Animate>

          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                SAP MM FAQ
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Common Questions About SAP MM
              </h2>
            </div>
          </Animate>

          <div className="max-w-4xl">
            {faqs.map((faq, i) => (
              <Animate key={i} variant="fade-up" delay={i * 60}>
                <div className="border-t border-[#D9D9D9] py-7">

                  <div className="flex gap-5">
                    <span className="font-mont font-semibold text-[#929296] text-[13px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div>
                      <h3 className="font-mont font-semibold text-[#111212] text-[20px]">
                        {faq.question}
                      </h3>

                      <p className="mt-3 font-inter text-[#555] text-[15px] leading-7">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                </div>
              </Animate>
            ))}
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
                  Start Your SAP MM Journey
                </span>

                <h2 className="mt-5 font-mont font-bold text-white text-[34px] md:text-[52px] leading-[1.05]">
                  Ready to Build Your SAP MM Skills?
                </h2>

                <p className="mt-5 max-w-2xl mx-auto font-inter text-white/55 text-[16px] md:text-[18px] leading-7">
                  Learn procurement, inventory management, MRP and
                  real-world SAP MM processes through a structured,
                  practical and career-focused learning journey.
                </p>

                <p className="mt-5 font-mont font-medium text-white/80 text-[19px] md:text-[22px]">
                  Learn SAP MM - Understand Business - Build Your Career.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-10">

                  <Link
                  href="/project-cost-estimation"
                          className="inline-flex items-center gap-2 bg-white text-[#111212] px-8 py-3.5 rounded-full font-mont font-semibold text-[14px] hover:scale-[1.02] transition-all"

                >
                  Get Project Estimate
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
            Thrill Edge Technologies — SAP MM | Materials Management | Professional Development
          </p>

        </div>
      </section>

    </div>
  )
}

