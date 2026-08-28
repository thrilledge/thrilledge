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
  LockKeyhole,
  MonitorCog,
  Network,
  Server,
  Settings2,
  ShieldCheck,
  Terminal,
  Users,
} from 'lucide-react'

import { Animate } from '@/components/common/animate'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'SAP Basis Training | SAP System Administration | Thrill Edge Technologies',
  description:
    'Learn SAP Basis through practical, structured and career-focused training covering system architecture, user management, monitoring, transports, databases, security and troubleshooting.',
  alternates: {
    canonical: `${SITE_URL}/services/sap-learning/basis`,
  },
  openGraph: {
    title: 'SAP Basis Training | SAP System Administration | Thrill Edge Technologies',
    description:
      'Build practical SAP Basis skills through structured learning covering system administration, monitoring, users, transports, databases, security and troubleshooting.',
    type: 'website',
    url: `${SITE_URL}/services/sap-learning/basis`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAP Basis Training | SAP System Administration',
    description:
      'Learn SAP Basis through practical system administration, monitoring, security and troubleshooting.',
  },
}

const learningAreas = [
  {
    icon: Server,
    title: 'SAP System Architecture',
    text: 'Understand SAP system architecture, application servers, instances, databases and the components that work together to support SAP environments.',
  },
  {
    icon: Users,
    title: 'User Management',
    text: 'Learn how SAP users, roles and authorizations are created and managed to provide secure and appropriate system access.',
  },
  {
    icon: MonitorCog,
    title: 'System Monitoring',
    text: 'Understand system monitoring, performance checks, logs, work processes and the administration activities used to keep SAP systems healthy.',
  },
  {
    icon: Network,
    title: 'Transport Management',
    text: 'Learn how SAP changes move between development, quality and production systems using transport management concepts.',
  },
  {
    icon: Database,
    title: 'Database Management',
    text: 'Understand how SAP application systems interact with databases and learn the fundamentals of database administration.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Authorizations',
    text: 'Explore SAP security concepts, authorization objects, roles and access controls used to protect SAP systems and business data.',
  },
]

const basisTopics = [
  'SAP Basis Fundamentals',
  'SAP System Architecture',
  'Application Server Concepts',
  'SAP Instances',
  'System Landscape',
  'User Administration',
  'Roles & Authorizations',
  'System Monitoring',
  'Work Processes',
  'Background Jobs',
  'Transport Management',
  'Database Fundamentals',
  'SAP System Security',
  'System Logs',
  'Performance Monitoring',
  'Troubleshooting',
  'SAP Kernel Fundamentals',
  'Implementation & Support',
]

const learningJourney = [
  {
    number: '01',
    title: 'SAP Fundamentals',
    text: 'Understand SAP terminology, navigation, system components and the role of Basis within an SAP environment.',
  },
  {
    number: '02',
    title: 'System Architecture',
    text: 'Learn application servers, instances, databases, work processes and how SAP components communicate.',
  },
  {
    number: '03',
    title: 'User Administration',
    text: 'Understand users, roles, profiles and authorization concepts used to control SAP system access.',
  },
  {
    number: '04',
    title: 'System Monitoring',
    text: 'Learn how to monitor system health, work processes, performance, logs and important system activities.',
  },
  {
    number: '05',
    title: 'Background Jobs',
    text: 'Understand background processing, job scheduling, monitoring and common administration activities.',
  },
  {
    number: '06',
    title: 'Transport Management',
    text: 'Learn how configuration and development changes move between SAP development, quality and production systems.',
  },
  {
    number: '07',
    title: 'Database Management',
    text: 'Explore database concepts, SAP database relationships and the fundamentals of database administration.',
  },
  {
    number: '08',
    title: 'Security & Performance',
    text: 'Understand SAP security, authorization management and the fundamentals of performance analysis.',
  },
  {
    number: '09',
    title: 'Troubleshooting & Support',
    text: 'Develop the ability to analyze system issues, logs and common problems while supporting SAP environments.',
  },
]

const practicalSkills = [
  'Understand SAP system architecture',
  'Work with SAP instances',
  'Understand application servers',
  'Manage SAP users',
  'Understand roles and authorizations',
  'Monitor SAP systems',
  'Monitor work processes',
  'Manage background jobs',
  'Understand transport requests',
  'Understand database concepts',
  'Analyze SAP system logs',
  'Understand SAP security',
]

const careerRoles = [
  {
    title: 'SAP Basis Consultant',
    text: 'Work with organizations to administer SAP environments, support implementations and maintain system availability.',
  },
  {
    title: 'SAP Basis Support Consultant',
    text: 'Help businesses monitor SAP systems, troubleshoot issues, support users and maintain day-to-day system operations.',
  },
  {
    title: 'SAP System Administrator',
    text: 'Manage SAP infrastructure, users, system monitoring, transports, jobs and other administration activities.',
  },
  {
    title: 'SAP Technical Consultant',
    text: 'Build technical SAP expertise across system architecture, security, performance, databases and implementation support.',
  },
]

const audience = [
  'Students and fresh graduates',
  'IT professionals',
  'System administrators',
  'Database professionals',
  'SAP end users',
  'Aspiring SAP Basis consultants',
  'Technical professionals',
  'Existing SAP professionals',
]

const faqs = [
  {
    question: 'What is SAP Basis?',
    answer:
      'SAP Basis is the technical administration foundation that supports SAP systems. It covers system architecture, users, monitoring, databases, transports, security and technical system operations.',
  },
  {
    question: 'Who should learn SAP Basis?',
    answer:
      'SAP Basis is suitable for students, graduates, IT professionals, system administrators, technical professionals and anyone interested in SAP system administration.',
  },
  {
    question: 'Do I need SAP experience before learning Basis?',
    answer:
      'No. The learning journey can begin with SAP fundamentals and system architecture before progressing into administration, monitoring, security and troubleshooting.',
  },
  {
    question: 'Will I only learn SAP transaction codes?',
    answer:
      'No. The focus is on understanding how SAP systems work, why administration tasks are performed and how technical activities support business-critical SAP environments.',
  },
]

export default function BasisPage() {
  return (
    <div className="relative bg-[#F3F3F3]">

      {/* Hero */}
      <section className="px-3 md:px-2.5 w-full">
        <div className="relative w-full h-[620px] overflow-hidden rounded-[20px] bg-[#111212]">
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'url(/sapbasis.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="right-0 bottom-0 left-0 absolute mx-auto px-5 lg:px-9 py-8 lg:py-12 max-w-360">
            <Animate variant="fade-up">
              <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-8">

                <div>
                  <span className="font-inter font-semibold text-[13px] text-white/50 uppercase tracking-[0.2em]">
                    SAP Learning / SAP Basis
                  </span>

                  <h1 className="mt-4 max-w-3xl font-mont font-semibold text-white text-[40px] md:text-[64px] leading-[0.95]">
                    SAP System Administration
                  </h1>

                  <p className="mt-5 font-mont font-medium text-white/80 text-[20px] md:text-[28px]">
                    Manage Systems - Secure Environments - Build SAP Expertise.
                  </p>
                </div>

                <p className="max-w-xl font-inter text-white/65 text-[15px] md:text-[17px] leading-7">
                  Build practical SAP Basis knowledge across system
                  administration, architecture, monitoring, users,
                  transports, databases, security and troubleshooting.
                </p>

              </div>
            </Animate>
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
                  What Is SAP Basis?
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Understand How SAP Systems Work Behind the Business.
                </h2>
              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="space-y-5">

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  SAP Basis is the technical foundation that supports SAP
                  applications and system environments. It focuses on keeping
                  SAP systems available, secure, monitored and properly
                  configured.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  Our SAP Basis learning path takes you beyond individual
                  transactions and helps you understand how SAP architecture,
                  users, databases, security and system administration work
                  together.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  You will learn how Basis professionals monitor systems,
                  manage users, handle transports, analyze logs and support
                  reliable SAP environments.
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
                What Will You Learn in SAP Basis?
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Develop a strong technical foundation for understanding,
                administering and supporting SAP system environments.
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

      {/* Topics */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12">

            <Animate variant="fade-up">
              <div className="lg:sticky lg:top-25">

                <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                  SAP Basis Topics
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Build Knowledge Across the SAP System Lifecycle.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  From system architecture and users to monitoring,
                  transports, security and troubleshooting, understand the
                  complete SAP Basis environment.
                </p>

              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="grid sm:grid-cols-2 gap-3">

                {basisTopics.map((topic, i) => (
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
                From SAP Fundamentals to System Administration.
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-white/50 text-[16px] leading-7">
                Follow a structured path that takes you from understanding
                SAP architecture to managing systems, monitoring performance,
                securing environments and troubleshooting technical issues.
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
                  Practical SAP Basis
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Learn SAP Basis by Understanding How the System Works.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  Practical SAP Basis knowledge is more than remembering
                  transactions. You need to understand system architecture,
                  administration tasks, monitoring, security and the technical
                  processes behind SAP operations.
                </p>

                <div className="mt-8 p-7 rounded-[20px] bg-[#111212]">

                  <Server
                    size={34}
                    className="text-white/40"
                  />

                  <h3 className="mt-5 font-mont font-semibold text-white text-[21px]">
                    Learn Beyond T-Codes
                  </h3>

                  <p className="mt-3 font-inter text-white/50 text-[14px] leading-6">
                    Understand the system architecture, administration
                    requirement, monitoring process, security controls and
                    troubleshooting approach behind SAP Basis activities.
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

      {/* Career Opportunities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">

              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Career Opportunities
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Where Can SAP Basis Take Your Career?
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                SAP Basis skills can support careers across technical
                consulting, system administration, infrastructure, security
                and SAP support.
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
                    <Users
                      size={18}
                      className="text-white"
                    />
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
                Is SAP Basis Right for You?
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
                Why Learn SAP Basis With Us?
              </span>

              <h2 className="mt-4 max-w-4xl font-mont font-bold text-white text-[34px] md:text-[48px] leading-[1.05]">
                Understand the System, Build Technical Skills & Prepare for Your Career.
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
                  Technical-Focused
                </h3>

                <p className="mt-3 font-inter text-white/50 text-[15px] leading-7">
                  Understand SAP architecture, administration and technical
                  processes from a practical perspective.
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
                  Connect concepts with monitoring, user administration,
                  transports, troubleshooting and real SAP scenarios.
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
                  Build knowledge relevant to SAP Basis consulting, system
                  administration, technical support and professional growth.
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
                SAP Basis FAQ
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Common Questions About SAP Basis
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
                  Start Your SAP Basis Journey
                </span>

                <h2 className="mt-5 font-mont font-bold text-white text-[34px] md:text-[52px] leading-[1.05]">
                  Ready to Build Your SAP Basis Skills?
                </h2>

                <p className="mt-5 max-w-2xl mx-auto font-inter text-white/55 text-[16px] md:text-[18px] leading-7">
                  Learn SAP system administration, architecture, monitoring,
                  security and troubleshooting through a structured,
                  practical and career-focused learning journey.
                </p>

                <p className="mt-5 font-mont font-medium text-white/80 text-[19px] md:text-[22px]">
                  Learn SAP Basis - Understand Systems - Build Your Career.
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
            Thrill Edge Technologies — SAP Basis | System Administration | Professional Development
          </p>

        </div>
      </section>

    </div>
  )
}