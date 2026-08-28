import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Factory,
  FileText,
  Package,
  ShoppingCart,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react'
import { Animate } from '@/components/common/animate'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title:
    'SAP SD Training | Sales & Distribution | Thrill Edge Technologies',
  description:
    'Learn SAP Sales and Distribution with practical, structured and career-focused training covering sales orders, pricing, delivery, shipping, billing, Order-to-Cash and SAP integration.',
  alternates: {
    canonical: `${SITE_URL}/services/sap-learning/sales-distribution`,
  },
  openGraph: {
    title:
      'SAP SD Training | Sales & Distribution | Thrill Edge Technologies',
    description:
      'Build practical SAP SD skills through structured learning covering sales, pricing, delivery, shipping, billing, Order-to-Cash and business process integration.',
    type: 'website',
    url: `${SITE_URL}/services/sap-learning/sales-distribution`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAP SD Training | Sales & Distribution',
    description:
      'Learn SAP SD through practical business processes, sales orders, pricing, delivery, billing and real-world Order-to-Cash scenarios.',
  },
}

const learningAreas = [
  {
    icon: ShoppingCart,
    title: 'Sales Processes',
    text: 'Understand how customer requirements move through sales inquiries, quotations, sales orders and complete sales processes.',
  },
  {
    icon: Users,
    title: 'Customer Master',
    text: 'Learn customer and business partner master data, organizational assignments and how customer information supports sales transactions.',
  },
  {
    icon: TrendingUp,
    title: 'Pricing & Conditions',
    text: 'Understand pricing procedures, condition records, discounts, surcharges and how pricing is determined in sales documents.',
  },
  {
    icon: Truck,
    title: 'Delivery & Shipping',
    text: 'Learn outbound delivery, picking, packing, transportation, goods issue and the complete shipping process.',
  },
  {
    icon: FileText,
    title: 'Billing',
    text: 'Understand billing documents, billing processes, cancellations and how sales billing integrates with financial accounting.',
  },
  {
    icon: Factory,
    title: 'SAP Integration',
    text: 'Understand how SAP SD connects with FI, MM, PP and other business processes across the organization.',
  },
]

const sdTopics = [
  'SAP SD Fundamentals',
  'Enterprise Structure',
  'Customer / Business Partner Master Data',
  'Material & Sales Master Data',
  'Inquiry & Quotation',
  'Sales Orders',
  'Pricing & Conditions',
  'Availability Check',
  'Outbound Delivery',
  'Picking & Packing',
  'Post Goods Issue',
  'Billing Documents',
  'Order-to-Cash Process',
  'Credit & Debit Processes',
  'Output & Document Flow',
  'Account Determination',
  'SAP SD Integration',
  'Configuration & Support',
]

const learningJourney = [
  {
    number: '01',
    title: 'SAP Fundamentals',
    text: 'Understand SAP navigation, terminology, organizational structures and the role of SAP SD within an organization.',
  },
  {
    number: '02',
    title: 'Customer & Material Data',
    text: 'Learn how customer, business partner and material data are created, maintained and used throughout sales processes.',
  },
  {
    number: '03',
    title: 'Sales Processes',
    text: 'Understand inquiries, quotations and sales orders while following customer requirements through the sales cycle.',
  },
  {
    number: '04',
    title: 'Pricing & Conditions',
    text: 'Learn how pricing procedures, condition records, discounts and surcharges influence sales transactions.',
  },
  {
    number: '05',
    title: 'Availability & Delivery',
    text: 'Understand availability checks, outbound deliveries and how SAP prepares products for customer shipment.',
  },
  {
    number: '06',
    title: 'Shipping & Goods Issue',
    text: 'Learn picking, packing, shipping activities and Post Goods Issue within the outbound delivery process.',
  },
  {
    number: '07',
    title: 'Billing',
    text: 'Understand billing document creation, billing scenarios and the connection between sales billing and financial accounting.',
  },
  {
    number: '08',
    title: 'Integration',
    text: 'Understand how SD connects with FI, MM, PP and other SAP modules to support integrated business processes.',
  },
  {
    number: '09',
    title: 'Implementation & Support',
    text: 'Develop an understanding of requirements, testing, documentation, troubleshooting and SAP project support.',
  },
]

const practicalSkills = [
  'Create and understand customer master data',
  'Understand material and sales master data',
  'Process inquiries and quotations',
  'Create and understand sales orders',
  'Understand pricing procedures',
  'Work with availability checks',
  'Process outbound deliveries',
  'Understand picking and packing',
  'Understand Post Goods Issue',
  'Work with billing documents',
  'Analyze Order-to-Cash scenarios',
  'Understand SD integration with FI and MM',
]

const careerRoles = [
  {
    title: 'SAP SD Consultant',
    text: 'Work with organizations to analyze sales requirements and support SAP SD implementations, configuration and business processes.',
  },
  {
    title: 'SAP SD Support Consultant',
    text: 'Help businesses troubleshoot SAP SD issues, support users and maintain day-to-day sales, delivery and billing processes.',
  },
  {
    title: 'SAP Sales & Distribution Specialist',
    text: 'Combine sales process knowledge with SAP skills to support customer operations, order management and distribution activities.',
  },
  {
    title: 'SAP Functional Consultant',
    text: 'Develop functional SAP expertise and work across business requirements, configuration, testing, implementation and project support.',
  },
]

const audience = [
  'Students and fresh graduates',
  'Sales professionals',
  'Business professionals',
  'Supply chain professionals',
  'Customer service professionals',
  'SAP end users',
  'Aspiring SAP SD consultants',
  'Existing SAP professionals',
]

const faqs = [
  {
    question: 'What is SAP SD?',
    answer:
      'SAP Sales and Distribution is an SAP module that supports customer-facing business processes including sales, pricing, delivery, shipping, billing and Order-to-Cash operations.',
  },
  {
    question: 'Who should learn SAP SD?',
    answer:
      'SAP SD is suitable for students, graduates, sales professionals, business professionals, SAP end users and anyone interested in building a career as an SAP SD consultant.',
  },
  {
    question: 'Do I need SAP experience before learning SD?',
    answer:
      'No. The learning journey can begin with SAP fundamentals before moving into SD business processes, sales transactions, configuration concepts and integration.',
  },
  {
    question: 'What is the Order-to-Cash process in SAP?',
    answer:
      'Order-to-Cash is the complete sales process that typically moves from customer requirement and sales order through delivery, goods issue, billing and financial accounting.',
  },
  {
    question: 'Will I learn only SAP transaction codes?',
    answer:
      'No. The focus is on understanding the business process behind each transaction, why the process exists, how SAP handles it and how different modules integrate.',
  },
]

export default function SalesDistributionPage() {
  return (
    <div className="relative bg-[#F3F3F3]">
      {/* Hero */}
      <section className="px-3 md:px-2.5 w-full">
        <div className="relative w-full h-[620px] overflow-hidden rounded-[20px] bg-[#111212]">
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'url(/sapsd.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="right-0 bottom-0 left-0 absolute mx-auto px-5 lg:px-9 py-8 lg:py-12 max-w-360">
            <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-8">
              <div>
                <span className="font-inter font-semibold text-[13px] text-white/50 uppercase tracking-[0.2em]">
                  SAP Learning / Sales & Distribution
                </span>

                <h1 className="mt-4 max-w-3xl font-mont font-semibold text-white text-[40px] md:text-[64px] leading-[0.95]">
                  SAP Sales & Distribution
                </h1>

                <p className="mt-5 font-mont font-medium text-white/80 text-[20px] md:text-[28px]">
                  Master Sales & Manage Customers 
                </p>
              </div>

              <p className="max-w-xl font-inter text-white/65 text-[15px] md:text-[17px] leading-7">
                Build practical SAP SD knowledge across sales orders, pricing,
                delivery, shipping, billing, Order-to-Cash and real-world
                customer-facing business processes.
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
                  What Is SAP SD?
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Understand How Sales Move Through a Business.
                </h2>
              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="space-y-5">
                <p className="font-inter text-[#555] text-[16px] leading-7">
                  SAP Sales and Distribution helps organizations manage
                  customer-facing sales processes including order management,
                  pricing, delivery, shipping and billing.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  Our SAP SD learning path takes you beyond transaction codes
                  and helps you understand how sales processes work from a
                  complete business perspective.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  You will learn how SAP SD connects customer requirements,
                  master data, sales transactions, logistics, financial
                  processes and integration across the SAP ecosystem.
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
                What Will You Learn in SAP SD?
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Develop a strong understanding of the core processes that make
                SAP SD essential for sales, distribution and customer
                operations.
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
                  SAP SD Topics
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Build Knowledge Across the Sales Lifecycle.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  From customer master data to sales orders, pricing, delivery,
                  billing and integration, understand the complete SAP SD
                  ecosystem.
                </p>
              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="grid sm:grid-cols-2 gap-3">
                {sdTopics.map((topic, i) => (
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
                understanding SAP SD concepts to applying them in realistic
                sales, distribution and Order-to-Cash scenarios.
              </p>
            </div>
          </Animate>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningJourney.map((step, i) => (
              <Animate
                key={i}
                variant="scale-in"
                delay={i * 60}
              >
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
                  Practical SAP SD
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Learn SAP SD by Understanding How Sales Work.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  Practical SAP knowledge is more than remembering transaction
                  codes. You need to understand what happens before, during and
                  after a sales transaction.
                </p>

                <div className="mt-8 p-7 rounded-[20px] bg-[#111212]">
                  <BookOpen size={34} className="text-white/40" />

                  <h3 className="mt-5 font-mont font-semibold text-white text-[21px]">
                    Learn Beyond T-Codes
                  </h3>

                  <p className="mt-3 font-inter text-white/50 text-[14px] leading-6">
                    Understand the customer requirement, master data, sales
                    process, pricing, delivery, billing and integration behind
                    every SAP SD transaction.
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
                Where Can SAP SD Take Your Career?
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                SAP SD skills can support careers across consulting, sales
                operations, customer management, distribution and SAP support.
              </p>
            </div>
          </Animate>

          <div className="grid md:grid-cols-2 gap-5">
            {careerRoles.map((role, i) => (
              <Animate
                key={i}
                variant="scale-in"
                delay={i * 70}
              >
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
                Is SAP SD Right for You?
              </h2>
            </div>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audience.map((item, i) => (
              <Animate
                key={i}
                variant="scale-in"
                delay={i * 60}
              >
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
                Why Learn SAP SD With Us?
              </span>

              <h2 className="mt-4 max-w-4xl font-mont font-bold text-white text-[34px] md:text-[48px] leading-[1.05]">
                Learn the Process, Understand the System & Build Your Career.
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
                  Understand sales, customer management and distribution from
                  the perspective of real business operations.
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
                  Connect concepts with sales scenarios, transactions,
                  pricing, delivery, billing, testing and troubleshooting.
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
                  Build knowledge relevant to SAP SD consulting, support
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
                SAP SD FAQ
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Common Questions About SAP SD
              </h2>
            </div>
          </Animate>

          <div className="max-w-4xl">
            {faqs.map((faq, i) => (
              <Animate
                key={i}
                variant="fade-up"
                delay={i * 60}
              >
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
                  Start Your SAP SD Journey
                </span>

                <h2 className="mt-5 font-mont font-bold text-white text-[34px] md:text-[52px] leading-[1.05]">
                  Ready to Build Your SAP SD Skills?
                </h2>

                <p className="mt-5 max-w-2xl mx-auto font-inter text-white/55 text-[16px] md:text-[18px] leading-7">
                  Learn sales, pricing, delivery, shipping, billing and
                  real-world SAP SD processes through a structured, practical
                  and career-focused learning journey.
                </p>

                <p className="mt-5 font-mont font-medium text-white/80 text-[19px] md:text-[22px]">
                  Learn SAP SD - Understand Business - Build Your Career.
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
            Thrill Edge Technologies — SAP SD | Sales & Distribution |
            Professional Development
          </p>
        </div>
      </section>
    </div>
  )
}