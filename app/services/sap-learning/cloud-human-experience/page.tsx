import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Users,
  UserPlus,
  GraduationCap,
  Target,
  BarChart3,
  HeartHandshake,
} from 'lucide-react'
import { Animate } from '@/components/common/animate'

export const metadata: Metadata = {
  title: 'SAP SuccessFactors | Cloud Human Experience | Thrill Edge Technologies',
  description:
    'Learn SAP SuccessFactors and understand modern HR, talent management and employee experience processes through practical, structured SAP learning.',
  alternates: {
    canonical: '/services/sap-learning/cloud-human-experience',
  },
  openGraph: {
    title: 'SAP SuccessFactors | Cloud Human Experience | Thrill Edge Technologies',
    description:
      'Build practical knowledge of SAP SuccessFactors, modern HR, talent management and employee experience processes.',
    type: 'website',
    url: '/services/sap-learning/cloud-human-experience',
  },
}

const learningAreas = [
  {
    title: 'Employee Experience',
    text: 'Understand how modern HR platforms support employees throughout their journey and create connected digital experiences.',
    icon: HeartHandshake,
  },
  {
    title: 'Employee Central',
    text: 'Learn the fundamentals of employee information management, organizational structures and core HR data.',
    icon: Users,
  },
  {
    title: 'Talent Management',
    text: 'Explore how organizations manage employee development, performance, goals and career growth.',
    icon: Target,
  },
  {
    title: 'Recruiting',
    text: 'Understand how cloud HR solutions support recruitment processes from attracting candidates to hiring.',
    icon: UserPlus,
  },
  {
    title: 'Learning & Development',
    text: 'Learn how organizations support employee learning, development programs and continuous professional growth.',
    icon: GraduationCap,
  },
  {
    title: 'HR Analytics',
    text: 'Understand how HR data and analytics can provide insights into workforce performance and business decisions.',
    icon: BarChart3,
  },
]

const learningPath = [
  'SAP & Cloud HR Fundamentals',
  'SAP SuccessFactors Overview',
  'Employee Central',
  'Core HR Processes',
  'Organizational Management',
  'Recruiting',
  'Onboarding',
  'Performance & Goals',
  'Learning & Development',
  'Talent Management',
  'Employee Experience',
  'HR Analytics',
  'Integration',
  'Implementation & Support',
]

const practicalSkills = [
  'Employee Central fundamentals',
  'Employee information management',
  'Organizational structures',
  'Cloud HR processes',
  'Recruitment workflows',
  'Candidate management',
  'Onboarding processes',
  'Performance management',
  'Goal management',
  'Learning management',
  'Talent processes',
  'HR analytics',
]

const careerOutcomes = [
  'Understand modern cloud-based HR processes',
  'Build foundational SAP SuccessFactors knowledge',
  'Understand Employee Central and core HR processes',
  'Explore talent management and employee experience',
  'Understand HR technology transformation',
  'Prepare for SAP SuccessFactors consulting opportunities',
]

const journey = [
  {
    number: '01',
    title: 'Core HR',
    text: 'Understand employee information, organizational structures and fundamental HR processes.',
  },
  {
    number: '02',
    title: 'Employee Central',
    text: 'Learn how SuccessFactors manages core employee and organizational information.',
  },
  {
    number: '03',
    title: 'Talent',
    text: 'Explore performance, goals, learning and talent management processes.',
  },
  {
    number: '04',
    title: 'Experience',
    text: 'Understand how cloud HR technologies create connected employee experiences.',
  },
]

export default function CloudHumanExperiencePage() {
  return (
    <div className="relative bg-[#F3F3F3]">

      {/* Hero */}
      <section className="px-3 md:px-2.5 w-full">
        <div className="relative w-full h-[620px] overflow-hidden rounded-[20px] bg-[#111212]">

          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'url(/che.jpg)',
              backgroundSize: 'cover',
              // backgroundPosition: 'center',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="right-0 bottom-0 left-0 absolute mx-auto px-5 lg:px-9 py-8 lg:py-12 max-w-360">
            <Animate variant="fade-up">
              <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-8">

                <div>
                  <span className="font-inter font-semibold text-[13px] text-white/50 uppercase tracking-[0.2em]">
                    SAP Learning / Cloud Human Experience
                  </span>

                  <h1 className="mt-4 max-w-3xl font-mont font-semibold text-white text-[40px] md:text-[64px] leading-[0.95]">
                    Cloud Human Experience
                  </h1>

                  <p className="mt-5 font-mont font-medium text-white/80 text-[20px] md:text-[28px]">
                    Transform HR. Connect People. Build Better Experiences.
                  </p>
                </div>

                <p className="max-w-xl font-inter text-white/65 text-[15px] md:text-[17px] leading-7">
                  Learn SAP SuccessFactors and understand how modern cloud
                  HR solutions support employee experience, talent management,
                  workforce processes and HR transformation.
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
                  SAP SuccessFactors
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Build Skills for Modern Cloud HR
                </h2>
              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="space-y-5">

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  SAP SuccessFactors provides cloud-based solutions that help
                  organizations manage people, talent and employee experiences.
                  It brings modern HR processes together in a connected digital
                  environment.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  Our learning path helps you understand the relationship
                  between traditional HR processes, cloud technology and modern
                  employee experiences. You will explore how organizations use
                  SuccessFactors to support their workforce and HR strategy.
                </p>

                <Link
                  href="#learning-areas"
                  className="inline-flex items-center gap-2 mt-3 bg-[#111212] text-white px-7 py-3.5 rounded-full font-mont font-semibold text-[14px] hover:scale-[1.02] transition-all"
                >
                  Explore SuccessFactors
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
                What You Will Learn
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Explore Cloud HR Capabilities
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Build knowledge across the core areas of SAP SuccessFactors
                and modern human experience management.
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

      {/* Learning Path / Topics */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12">

            <Animate variant="fade-up">
              <div className="lg:sticky lg:top-25">

                <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                  Learning Journey
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Your SuccessFactors Learning Path
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  Follow a structured journey from cloud HR fundamentals to
                  SuccessFactors modules, integration and implementation.
                </p>

              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="grid sm:grid-cols-2 gap-3">

                {learningPath.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white border border-[#E5E5E5] rounded-[14px] px-5 py-4 hover:border-[#111212] transition-colors"
                  >

                    <span className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-[#111212] text-white font-mont text-[10px] font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="font-inter text-[#111212] text-[14px]">
                      {step}
                    </span>

                  </div>
                ))}

              </div>
            </Animate>

          </div>
        </div>
      </section>

      {/* Cloud HR Journey */}
      <section className="py-16 md:py-24 bg-[#111212]">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-14">

              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.22em]">
                The Cloud HR Journey
              </span>

              <h2 className="mt-4 max-w-4xl font-mont font-bold text-white text-[34px] md:text-[48px] leading-[1.05]">
                From Core HR to Employee Experience
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-white/50 text-[16px] leading-7">
                Understand how modern HR platforms connect core employee
                information with talent, learning, performance and employee
                experience processes.
              </p>

            </div>
          </Animate>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

            {journey.map((step, i) => (
              <Animate
                key={i}
                variant="scale-in"
                delay={i * 80}
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

          <Animate variant="fade-up" delay={300}>
            <div className="mt-8 rounded-[20px] border border-white/10 bg-white/5 p-6 md:p-8">

              <div className="flex flex-wrap items-center justify-center gap-3">

                {[
                  'Core HR',
                  'Employee Central',
                  'Talent',
                  'Learning',
                  'Performance',
                  'Employee Experience',
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                  >

                    <span className="rounded-full bg-white/10 px-4 py-2 font-inter text-white/70 text-[13px]">
                      {step}
                    </span>

                    {i < 5 && (
                      <ArrowRight
                        size={15}
                        className="text-white/20"
                      />
                    )}

                  </div>
                ))}

              </div>

            </div>
          </Animate>

        </div>
      </section>

      {/* Practical Training */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            <Animate variant="fade-up">
              <div>

                <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                  Practical Training
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Learn Through Cloud HR Scenarios
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  Modern HR requires an understanding of both business
                  processes and technology. Our approach focuses on realistic
                  cloud HR scenarios so learners can understand how
                  SuccessFactors supports organizations.
                </p>

                <div className="mt-8 p-7 rounded-[20px] bg-[#111212]">

                  <Cloud
                    size={34}
                    className="text-white/40"
                  />

                  <h3 className="mt-5 font-mont font-semibold text-white text-[21px]">
                    Learn Through Cloud HR
                  </h3>

                  <p className="mt-3 font-inter text-white/50 text-[14px] leading-6">
                    Understand how SuccessFactors supports organizations
                    through modern cloud HR processes and employee
                    experiences.
                  </p>

                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-6 bg-[#111212] text-white px-7 py-3.5 rounded-full font-mont font-semibold text-[14px] hover:scale-[1.02] transition-all"
                >
                  Explore Practical Training
                  <ArrowRight size={16} />
                </Link>

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

      {/* Career Preparation */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">

              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Career Preparation
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Build Skills for Cloud HR Careers
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Develop a practical foundation for working with modern HR
                technology and SAP SuccessFactors.
              </p>

            </div>
          </Animate>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {careerOutcomes.map((item, i) => (
              <Animate
                key={i}
                variant="scale-in"
                delay={i * 70}
              >
                <div className="flex items-start gap-4 h-full bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-7 transition-all">

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

      {/* Cloud HR Capabilities */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-12">

              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Cloud HR Capabilities
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Understand Modern Employee Experiences.
              </h2>

            </div>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {[
              'Employee Experience',
              'Employee Central',
              'Talent Management',
              'Recruiting',
              'Learning & Development',
              'HR Analytics',
            ].map((item, i) => (
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

      {/* Why SuccessFactors */}
      <section className="py-16 md:py-24 bg-[#111212]">
        <div className="max-w-360 mx-auto px-4">

          <Animate variant="fade-up">
            <div className="mb-14">

              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.22em]">
                Career Preparation
              </span>

              <h2 className="mt-4 max-w-4xl font-mont font-bold text-white text-[34px] md:text-[48px] leading-[1.05]">
                Build Skills for Cloud HR Careers
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-white/50 text-[16px] leading-7">
                Develop a practical foundation for working with modern HR
                technology and SAP SuccessFactors.
              </p>

            </div>
          </Animate>

          <div className="grid md:grid-cols-3 gap-4">

            <Animate variant="scale-in">
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-8 h-full">

                <span className="font-mont font-bold text-white/15 text-[52px]">
                  01
                </span>

                <h3 className="mt-8 font-mont font-semibold text-white text-[21px]">
                  Employee Experience
                </h3>

                <p className="mt-3 font-inter text-white/50 text-[15px] leading-7">
                  Understand how modern HR platforms support employees
                  throughout their journey and create connected digital
                  experiences.
                </p>

              </div>
            </Animate>

            <Animate variant="scale-in" delay={80}>
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-8 h-full">

                <span className="font-mont font-bold text-white/15 text-[52px]">
                  02
                </span>

                <h3 className="mt-8 font-mont font-semibold text-white text-[21px]">
                  Talent Management
                </h3>

                <p className="mt-3 font-inter text-white/50 text-[15px] leading-7">
                  Explore how organizations manage employee development,
                  performance, goals and career growth.
                </p>

              </div>
            </Animate>

            <Animate variant="scale-in" delay={160}>
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-8 h-full">

                <span className="font-mont font-bold text-white/15 text-[52px]">
                  03
                </span>

                <h3 className="mt-8 font-mont font-semibold text-white text-[21px]">
                  HR Analytics
                </h3>

                <p className="mt-3 font-inter text-white/50 text-[15px] leading-7">
                  Understand how HR data and analytics can provide insights
                  into workforce performance and business decisions.
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

                <Cloud
                  size={42}
                  className="mx-auto mb-6 text-white/30"
                />

                <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.22em]">
                  SAP SuccessFactors
                </span>

                <h2 className="mt-5 font-mont font-bold text-white text-[34px] md:text-[52px] leading-[1.05]">
                  Start Your Cloud HR Journey
                </h2>

                <p className="mt-5 max-w-2xl mx-auto font-inter text-white/55 text-[16px] md:text-[18px] leading-7">
                  Learn how SAP SuccessFactors connects HR processes, talent
                  management and employee experience in a modern cloud
                  environment.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-10">

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-[#111212] px-8 py-3.5 rounded-full font-mont font-semibold text-[14px] hover:scale-[1.02] transition-all"
                  >
                    Start Learning
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/services/sap-learning"
                    className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-full font-mont font-semibold text-[14px] hover:bg-white hover:text-[#111212] transition-all"
                  >
                    Back to SAP Learning
                    <ChevronRight size={16} />
                  </Link>

                </div>

              </div>

            </div>
          </Animate>

        </div>
      </section>

    </div>
  )
}