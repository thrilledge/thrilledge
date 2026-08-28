
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  FileText,
  Landmark,
  Layers,
  Settings,
  Wallet,
  Users,
} from 'lucide-react'
import { Animate } from '@/components/common/animate'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'SAP FI Training | Financial Accounting | Thrill Edge Technologies',
  description:
    'Learn SAP Financial Accounting with practical, structured and career-focused training covering General Ledger, Accounts Payable, Accounts Receivable, Asset Accounting, Bank Accounting and SAP FI integration.',
  alternates: {
    canonical: `${SITE_URL}/services/sap-learning/financial-accounting`,
  },
  openGraph: {
    title: 'SAP FI Training | Financial Accounting | Thrill Edge Technologies',
    description:
      'Build practical SAP FI skills through structured learning covering General Ledger, Accounts Payable, Accounts Receivable, Asset Accounting, Banking and financial integration.',
    type: 'website',
    url: `${SITE_URL}/services/sap-learning/financial-accounting`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAP FI Training | Financial Accounting',
    description:
      'Learn SAP Financial Accounting through practical business processes, financial reporting, accounting and real-world scenarios.',
  },
}

const learningAreas = [
  {
    icon: Landmark,
    title: 'General Ledger',
    text: 'Understand General Ledger accounting, chart of accounts, journal entries, postings and financial reporting processes.',
  },
  {
    icon: Wallet,
    title: 'Accounts Payable',
    text: 'Learn how organizations manage vendor invoices, payments, outstanding liabilities and the complete procure-to-pay accounting cycle.',
  },
  {
    icon: Users,
    title: 'Accounts Receivable',
    text: 'Understand customer accounting, incoming payments, receivables, credit processes and the order-to-cash accounting cycle.',
  },
  {
    icon: Layers,
    title: 'Asset Accounting',
    text: 'Learn how fixed assets are managed throughout their lifecycle including acquisition, depreciation, transfers and retirement.',
  },
  {
    icon: BarChart3,
    title: 'Bank Accounting',
    text: 'Understand bank transactions, bank accounts, incoming and outgoing payments and reconciliation processes.',
  },
  {
    icon: Settings,
    title: 'FI Configuration',
    text: 'Develop an understanding of the configuration settings that control financial accounting processes within SAP.',
  },
]

const fiTopics = [
  'SAP FI Fundamentals',
  'Enterprise Structure',
  'Company & Company Code',
  'Chart of Accounts',
  'General Ledger',
  'Journal Entries',
  'Document Types',
  'Posting Keys',
  'Accounts Payable',
  'Vendor Accounting',
  'Accounts Receivable',
  'Customer Accounting',
  'Asset Accounting',
  'Depreciation',
  'Bank Accounting',
  'Incoming & Outgoing Payments',
  'Tax Configuration Concepts',
  'Financial Statements',
  'Period-End Closing',
  'SAP FI Integration',
]

const learningJourney = [
  {
    number: '01',
    title: 'SAP & FI Fundamentals',
    text: 'Understand SAP navigation, terminology, organizational structures and the role of Financial Accounting within an organization.',
  },
  {
    number: '02',
    title: 'Enterprise Structure',
    text: 'Learn how company structures are represented in SAP through company codes, charts of accounts and financial organizational units.',
  },
  {
    number: '03',
    title: 'General Ledger',
    text: 'Understand ledger accounting, journal entries, account postings, document types and financial transactions.',
  },
  {
    number: '04',
    title: 'Accounts Payable',
    text: 'Learn vendor accounting, invoice processing, payment processes and liabilities management.',
  },
  {
    number: '05',
    title: 'Accounts Receivable',
    text: 'Understand customer accounting, incoming payments, receivables and collection-related processes.',
  },
  {
    number: '06',
    title: 'Asset Accounting',
    text: 'Learn how fixed assets are acquired, depreciated, transferred and retired throughout their lifecycle.',
  },
  {
    number: '07',
    title: 'Bank Accounting',
    text: 'Understand bank transactions, payment processing, reconciliation and cash-related accounting processes.',
  },
  {
    number: '08',
    title: 'Financial Reporting',
    text: 'Learn how SAP FI supports financial statements, reporting and period-end accounting activities.',
  },
  {
    number: '09',
    title: 'Integration & Support',
    text: 'Understand how FI integrates with MM, SD and other SAP processes and develop an understanding of implementation and support scenarios.',
  },
]

const practicalSkills = [
  'Understand SAP FI organizational structures',
  'Work with General Ledger concepts',
  'Understand journal entries and financial postings',
  'Understand document types and posting keys',
  'Process vendor accounting scenarios',
  'Understand Accounts Payable processes',
  'Process customer accounting scenarios',
  'Understand Accounts Receivable processes',
  'Understand fixed asset accounting',
  'Understand depreciation concepts',
  'Work with bank accounting processes',
  'Understand incoming and outgoing payments',
  'Understand financial reporting',
  'Understand period-end closing',
  'Analyze financial accounting scenarios',
  'Understand FI integration with MM and SD',
]

const careerRoles = [
  {
    title: 'SAP FI Consultant',
    text: 'Work with organizations to understand financial requirements and support SAP FI implementations, configuration and business processes.',
  },
  {
    title: 'SAP FI Support Consultant',
    text: 'Support users, troubleshoot financial accounting issues and help organizations maintain their SAP FI processes.',
  },
  {
    title: 'SAP Finance Specialist',
    text: 'Combine accounting knowledge with SAP skills to support financial operations, reporting and business processes.',
  },
  {
    title: 'SAP Functional Consultant',
    text: 'Develop functional expertise across requirements gathering, configuration, testing, implementation and project support.',
  },
]

const audience = [
  'Accounting professionals',
  'Finance professionals',
  'Commerce graduates',
  'Business students',
  'Students and fresh graduates',
  'SAP end users',
  'Aspiring SAP FI consultants',
  'Existing SAP professionals',
]

const faqs = [
  {
    question: 'What is SAP FI?',
    answer:
      'SAP Financial Accounting is an SAP module used to manage financial transactions, accounting processes, reporting and financial information across an organization.',
  },
  {
    question: 'Who should learn SAP FI?',
    answer:
      'SAP FI is suitable for accounting and finance professionals, commerce graduates, business students, SAP end users and anyone interested in building a career as an SAP FI consultant.',
  },
  {
    question: 'Do I need an accounting background to learn SAP FI?',
    answer:
      'An accounting or finance background can be helpful, but it is not mandatory. The learning journey starts with fundamentals before moving into SAP FI processes and concepts.',
  },
  {
    question: 'Will SAP FI training only focus on transaction codes?',
    answer:
      'No. The focus is on understanding accounting processes, business requirements, master data, transactions, configuration concepts, integration and real-world scenarios.',
  },
]

export default function FinancialAccountingPage() {
  return (
    <div className="relative bg-[#F3F3F3]">

      {/* Hero */}
      <section className="px-3 md:px-2.5 w-full">
        <div className="relative w-full h-[620px] overflow-hidden rounded-[20px] bg-[#111212]">

          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'url(/sapfi.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="right-0 bottom-0 left-0 absolute mx-auto px-5 lg:px-9 py-8 lg:py-12 max-w-360">

            <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-8">

              <div>
                <span className="font-inter font-semibold text-[13px] text-white/50 uppercase tracking-[0.2em]">
                  SAP Learning / Financial Accounting
                </span>

                <h1 className="mt-4 max-w-3xl font-mont font-semibold text-white text-[40px] md:text-[64px] leading-[0.95]">
                  SAP Financial Accounting
                </h1>

                <p className="mt-5 font-mont font-medium text-white/80 text-[20px] md:text-[28px]">
                  Understand Finance - Master SAP FI - Build Your Career.
                </p>
              </div>

              <p className="max-w-xl font-inter text-white/65 text-[15px] md:text-[17px] leading-7">
                Build practical SAP FI knowledge across General Ledger,
                Accounts Payable, Accounts Receivable, Asset Accounting,
                Banking and financial reporting.
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
                  What Is SAP FI?
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Turn Financial Transactions Into Meaningful Business Information.
                </h2>
              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="space-y-5">

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  SAP Financial Accounting helps organizations manage their
                  financial transactions, accounting processes and financial
                  reporting in a structured and integrated environment.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  Our SAP FI learning path helps you understand how financial
                  transactions are recorded, processed and connected across
                  different business processes.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  You will move beyond individual transactions and learn how
                  General Ledger, Payables, Receivables, Assets and Banking
                  work together within SAP.
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

      {/* Core Learning Areas */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">

              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Core Learning Areas
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                What Will You Learn in SAP FI?
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Build a strong foundation across the core financial
                accounting processes used by organizations to manage
                financial information.
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
                  SAP FI Topics
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Build Knowledge Across the Financial Accounting Lifecycle.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  From General Ledger and vendor accounting to customer
                  accounting, assets, banking and financial reporting,
                  understand the complete SAP FI ecosystem.
                </p>

              </div>

            </Animate>

            <Animate variant="fade-up" delay={100}>

              <div className="grid sm:grid-cols-2 gap-3">

                {fiTopics.map((topic, i) => (

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
                From Accounting Fundamentals to SAP FI Project Readiness.
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-white/50 text-[16px] leading-7">
                Follow a structured path that takes you from understanding
                SAP FI concepts to applying financial accounting knowledge
                in realistic business and project scenarios.
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
                  Practical SAP FI
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Learn Financial Accounting Through Real Business Processes.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  SAP FI is not just about entering accounting transactions.
                  You need to understand why the transaction is required,
                  what financial impact it creates and how SAP connects
                  it with other business processes.
                </p>

                <div className="mt-8 p-7 rounded-[20px] bg-[#111212]">

                  <BookOpen size={34} className="text-white/40" />

                  <h3 className="mt-5 font-mont font-semibold text-white text-[21px]">
                    Learn Beyond T-Codes
                  </h3>

                  <p className="mt-3 font-inter text-white/50 text-[14px] leading-6">
                    Understand the accounting requirement, financial impact,
                    document flow, configuration and integration behind
                    every SAP FI process.
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
                Where Can SAP FI Take Your Career?
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                SAP FI knowledge can support careers across financial
                accounting, SAP consulting, implementation, support and
                business finance operations.
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
                Is SAP FI Right for You?
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
                Why Learn SAP FI With Us?
              </span>

              <h2 className="mt-4 max-w-4xl font-mont font-bold text-white text-[34px] md:text-[48px] leading-[1.05]">
                Understand Finance - Learn SAP - Build Your Career.
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
                  Finance-Focused
                </h3>

                <p className="mt-3 font-inter text-white/50 text-[15px] leading-7">
                  Understand the accounting principles and financial
                  processes behind SAP FI.
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
                  Connect accounting concepts with SAP transactions,
                  scenarios, testing and troubleshooting.
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
                  Build knowledge relevant to SAP FI consulting,
                  implementation, support and professional growth.
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
                SAP FI FAQ
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Common Questions About SAP FI
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
                  Start Your SAP FI Journey
                </span>

                <h2 className="mt-5 font-mont font-bold text-white text-[34px] md:text-[52px] leading-[1.05]">
                  Ready to Build Your SAP FI Skills?
                </h2>

                <p className="mt-5 max-w-2xl mx-auto font-inter text-white/55 text-[16px] md:text-[18px] leading-7">
                  Learn General Ledger, Accounts Payable, Accounts
                  Receivable, Asset Accounting and Banking through a
                  structured and practical SAP FI learning journey.
                </p>

                <p className="mt-5 font-mont font-medium text-white/80 text-[19px] md:text-[22px]">
                  Learn SAP FI - Understand Finance - Build Your Career.
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
            Thrill Edge Technologies — SAP FI | Financial Accounting | Professional Development
          </p>

        </div>

      </section>

    </div>
  )
}

