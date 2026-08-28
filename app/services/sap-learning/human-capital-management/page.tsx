import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Settings,
  UserCog,
  Users,
  WalletCards,
  Building2,
} from 'lucide-react'
import { Animate } from '@/components/common/animate'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'SAP HCM Training | Human Capital Management | Thrill Edge Technologies',
  description:
    'Learn SAP Human Capital Management with practical, structured and career-focused training covering organizational management, personnel administration, employee master data, time management, payroll and HR processes.',
  alternates: {
    canonical: `${SITE_URL}/services/sap-learning/human-capital-management`,
  },
  openGraph: {
    title:
      'SAP HCM Training | Human Capital Management | Thrill Edge Technologies',
    description:
      'Build practical SAP HCM skills through structured learning covering organizational management, personnel administration, time management, payroll and core HR processes.',
    type: 'website',
    url: `${SITE_URL}/services/sap-learning/human-capital-management`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAP HCM Training | Human Capital Management',
    description:
      'Learn SAP HCM through practical HR processes, organizational management, personnel administration, time management and payroll.',
  },
}

const learningAreas = [
  {
    icon: Building2,
    title: 'Organizational Management',
    text: 'Understand organizational structures, organizational units, positions, jobs and reporting relationships within SAP HCM.',
  },
  {
    icon: Users,
    title: 'Personnel Administration',
    text: 'Learn how employee master data and personnel information are created, maintained and managed throughout the employee lifecycle.',
  },
  {
    icon: Clock3,
    title: 'Time Management',
    text: 'Understand employee attendance, working time, absences, leave and other time-related HR processes.',
  },
  {
    icon: WalletCards,
    title: 'Payroll',
    text: 'Learn the fundamentals of payroll processing and understand how employee information flows into payroll activities.',
  },
  {
    icon: UserCog,
    title: 'Core HR Processes',
    text: 'Explore the key HR processes organizations use to manage employees, personnel information and workforce operations.',
  },
  {
    icon: FileText,
    title: 'HR Data & Integration',
    text: 'Understand how HR information connects with other SAP processes and supports broader business operations.',
  },
]

const hcmTopics = [
  'SAP HCM Fundamentals',
  'HR Fundamentals',
  'Organizational Management',
  'Organizational Units',
  'Jobs & Positions',
  'Personnel Administration',
  'Employee Master Data',
  'Employee Lifecycle',
  'Personnel Actions',
  'Time Management',
  'Attendance Management',
  'Absence & Leave Management',
  'Payroll Fundamentals',
  'HR Reporting',
  'SAP HCM Integration',
  'HR Business Processes',
  'Implementation Concepts',
  'Support & Troubleshooting',
]

const learningJourney = [
  {
    number: '01',
    title: 'HR Fundamentals',
    text: 'Understand core human resource concepts, employee lifecycle processes and the role HR plays within an organization.',
  },
  {
    number: '02',
    title: 'SAP HCM Fundamentals',
    text: 'Learn SAP HCM terminology, navigation, organizational concepts and how SAP supports human capital processes.',
  },
  {
    number: '03',
    title: 'Organizational Management',
    text: 'Understand organizational units, jobs, positions and reporting structures used to represent an organization in SAP.',
  },
  {
    number: '04',
    title: 'Personnel Administration',
    text: 'Learn how employee information is created, maintained and managed through core personnel administration processes.',
  },
  {
    number: '05',
    title: 'Employee Master Data',
    text: 'Understand employee-related master data and how personnel information supports different HR business processes.',
  },
  {
    number: '06',
    title: 'Time Management',
    text: 'Explore working time, attendance, absences, leave and other employee time management processes.',
  },
  {
    number: '07',
    title: 'Payroll Fundamentals',
    text: 'Understand the fundamentals of payroll processing and how employee information supports payroll activities.',
  },
  {
    number: '08',
    title: 'Integration',
    text: 'Understand how SAP HCM connects HR information with other SAP business processes and organizational operations.',
  },
  {
    number: '09',
    title: 'Implementation & Support',
    text: 'Develop an understanding of requirements, testing, documentation, troubleshooting and SAP HCM project support.',
  },
]

const practicalSkills = [
  'Understand organizational structures',
  'Work with organizational units',
  'Understand jobs and positions',
  'Manage employee master data concepts',
  'Understand personnel administration',
  'Follow employee lifecycle processes',
  'Understand personnel actions',
  'Work with time management concepts',
  'Understand attendance processes',
  'Understand leave and absence management',
  'Learn payroll fundamentals',
  'Understand HR reporting and integration',
]

const careerRoles = [
  {
    title: 'SAP HCM Consultant',
    text: 'Work with organizations to analyze HR requirements and support SAP HCM implementations, processes and business solutions.',
  },
  {
    title: 'SAP HCM Support Consultant',
    text: 'Help organizations troubleshoot HR system issues, support users and maintain day-to-day SAP HCM processes.',
  },
  {
    title: 'SAP HR Functional Consultant',
    text: 'Combine HR process knowledge with SAP expertise to work across requirements, configuration, testing and implementation.',
  },
  {
    title: 'HR Systems Specialist',
    text: 'Support HR teams by working with employee data, HR processes, reporting and enterprise HR systems.',
  },
]

const audience = [
  'Students and fresh graduates',
  'HR professionals',
  'Payroll professionals',
  'Recruitment professionals',
  'Business professionals',
  'SAP end users',
  'Aspiring SAP HCM consultants',
  'Existing SAP professionals',
]

const faqs = [
  {
    question: 'What is SAP HCM?',
    answer:
      'SAP Human Capital Management is an SAP solution that supports organizations in managing employee information, organizational structures, personnel administration, time management, payroll and other core HR processes.',
  },
  {
    question: 'Who should learn SAP HCM?',
    answer:
      'SAP HCM is suitable for students, graduates, HR professionals, payroll professionals, SAP end users and anyone interested in building a career in SAP HR and Human Capital Management.',
  },
  {
    question: 'Do I need HR experience before learning SAP HCM?',
    answer:
      'No. The learning journey can begin with HR and SAP fundamentals before progressing into organizational management, personnel administration, time management, payroll and integration concepts.',
  },
  {
    question: 'Will I only learn SAP transaction codes?',
    answer:
      'No. The focus is on understanding the HR business process behind the transaction, how employee information flows through SAP and how different HR processes work together.',
  },
]

export default function HumanCapitalManagementPage() {
  return (
    <div className="relative bg-[#F3F3F3]">

      {/* Hero */}
      <section className="px-3 md:px-2.5 w-full">
        <div className="relative w-full h-[520px] overflow-hidden rounded-[20px] bg-[#111212]">

          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'url(/hcm.jpg)',
              backgroundSize: 'cover',
              // backgroundPosition: 'center',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="right-0 bottom-0 left-0 absolute mx-auto px-5 lg:px-9 py-8 lg:py-12 max-w-360">

            <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-8">

              <div>

                <span className="font-inter font-semibold text-[13px] text-white/50 uppercase tracking-[0.2em]">
                  SAP Learning / Human Capital Management
                </span>

                <h1 className="mt-4 max-w-3xl font-mont font-semibold text-white text-[40px] md:text-[64px] leading-[0.95]">
                  SAP Human Capital Management
                </h1>

                <p className="mt-5 font-mont font-medium text-white/80 text-[20px] md:text-[28px]">
                  Manage People - Understand Processes - Build HR Expertise.
                </p>

              </div>

              <p className="max-w-xl font-inter text-white/65 text-[15px] md:text-[17px] leading-7">
                Build practical SAP HCM knowledge across organizational
                management, personnel administration, employee data,
                time management, payroll and real-world HR processes.
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
                  What Is SAP HCM?
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Understand How People and HR Processes Work Together.
                </h2>

              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="space-y-5">

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  SAP Human Capital Management helps organizations manage
                  their workforce, employee information, organizational
                  structures and core HR processes.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  Our SAP HCM learning path takes you beyond simply
                  remembering transactions and helps you understand how
                  HR processes work from a business perspective.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  You will learn how organizational data, employee
                  information, time management and payroll processes
                  connect across the SAP HCM environment.
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
                What Will You Learn in SAP HCM?
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Develop a strong understanding of the core HR processes
                that help organizations manage people, workforce data
                and employee activities through SAP.
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
                  SAP HCM Topics
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Build Knowledge Across the HR Lifecycle.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  From organizational structures and employee master data
                  to time management, payroll and integration, understand
                  the SAP HCM ecosystem.
                </p>

              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="grid sm:grid-cols-2 gap-3">

                {hcmTopics.map((topic, i) => (
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
                From HR Fundamentals to SAP HCM Expertise.
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-white/50 text-[16px] leading-7">
                Follow a structured path that takes you from understanding
                HR fundamentals to applying SAP HCM concepts in realistic
                business and project scenarios.
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

      {/* Employee Lifecycle */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-14">

              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Employee Lifecycle
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Understand How SAP Supports the Employee Journey.
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Learn how employee and HR information moves through
                organizational management, personnel administration,
                time management and payroll processes.
              </p>

            </div>
          </Animate>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

            {[
              {
                number: '01',
                icon: Building2,
                title: 'Organization',
                text: 'Understand organizational units, jobs, positions and reporting structures.',
              },
              {
                number: '02',
                icon: Users,
                title: 'Employee',
                text: 'Understand employee information and core personnel administration.',
              },
              {
                number: '03',
                icon: CalendarDays,
                title: 'Time',
                text: 'Learn attendance, working time, leave and absence-related processes.',
              },
              {
                number: '04',
                icon: WalletCards,
                title: 'Payroll',
                text: 'Understand payroll fundamentals and how employee information supports payroll.',
              },
            ].map((item, i) => {
              const Icon = item.icon

              return (
                <Animate
                  key={i}
                  variant="scale-in"
                  delay={i * 70}
                >
                  <div className="group h-full bg-white border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-7 transition-all duration-300">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center justify-center w-11 h-11 rounded-[12px] bg-[#111212]">
                        <Icon
                          size={19}
                          className="text-white"
                        />
                      </div>

                      <span className="font-mont font-bold text-[#D5D5D5] text-[42px] leading-none">
                        {item.number}
                      </span>

                    </div>

                    <h3 className="mt-8 font-mont font-semibold text-[#111212] text-[20px]">
                      {item.title}
                    </h3>

                    <p className="mt-3 font-inter text-[#555] text-[14px] leading-7">
                      {item.text}
                    </p>

                  </div>
                </Animate>
              )
            })}

          </div>

         

        </div>
      </section>

      {/* Practical Skills */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            <Animate variant="fade-up">
              <div>

                <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                  Practical SAP HCM
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Learn SAP HCM by Understanding How HR Works.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  Practical SAP HCM knowledge is more than remembering
                  transaction codes. You need to understand employee
                  information, HR requirements, process flows and how
                  different HR activities connect.
                </p>

                <div className="mt-8 p-7 rounded-[20px] bg-[#111212]">

                  <BookOpen
                    size={34}
                    className="text-white/40"
                  />

                  <h3 className="mt-5 font-mont font-semibold text-white text-[21px]">
                    Learn Beyond T-Codes
                  </h3>

                  <p className="mt-3 font-inter text-white/50 text-[14px] leading-6">
                    Understand the HR requirement, employee data, process
                    flow, system functionality and integration behind
                    SAP HCM processes.
                  </p>

                </div>

              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="grid sm:grid-cols-2 gap-3">

                {practicalSkills.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[14px] p-4"
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
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">

              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Career Opportunities
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Where Can SAP HCM Take Your Career?
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                SAP HCM knowledge can support careers across HR systems,
                consulting, personnel administration, payroll, HR operations
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
                <div className="flex gap-5 h-full bg-white border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-7 transition-all">

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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">

              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Who Is This For?
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Is SAP HCM Right for You?
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Whether you are starting your SAP journey or already working
                in HR, SAP HCM provides a structured way to understand
                enterprise HR processes and systems.
              </p>

            </div>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {audience.map((item, i) => (
              <Animate
                key={i}
                variant="scale-in"
                delay={i * 60}
              >
                <div className="flex items-center gap-4 bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#111212] rounded-[18px] p-5 transition-all">

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
                Why Learn SAP HCM With Us?
              </span>

              <h2 className="mt-4 max-w-4xl font-mont font-bold text-white text-[34px] md:text-[48px] leading-[1.05]">
                Understand People, Learn the Process & Build Your SAP Career.
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
                  HR-Focused
                </h3>

                <p className="mt-3 font-inter text-white/50 text-[15px] leading-7">
                  Understand HR and employee processes from the perspective
                  of real organizational operations.
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
                  Connect SAP HCM concepts with employee scenarios,
                  process flows, HR activities and practical exercises.
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
                  Build knowledge relevant to SAP HCM consulting, HR systems,
                  support projects and professional growth.
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
                SAP HCM FAQ
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Common Questions About SAP HCM
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
                  Start Your SAP HCM Journey
                </span>

                <h2 className="mt-5 font-mont font-bold text-white text-[34px] md:text-[52px] leading-[1.05]">
                  Ready to Build Your SAP HCM Skills?
                </h2>

                <p className="mt-5 max-w-2xl mx-auto font-inter text-white/55 text-[16px] md:text-[18px] leading-7">
                  Learn organizational management, personnel administration,
                  employee data, time management, payroll and real-world
                  SAP HCM processes through a structured and practical
                  learning journey.
                </p>

                <p className="mt-5 font-mont font-medium text-white/80 text-[19px] md:text-[22px]">
                  Learn SAP HCM - Understand People - Build Your Career.
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
            Thrill Edge Technologies — SAP HCM | Human Capital Management | Professional Development
          </p>

        </div>
      </section>

    </div>
  )
}