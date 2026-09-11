
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Gamepad2,
  Layers,
  Smartphone,
  Monitor,
  Palette,
  Box,
  Coins,
  Bug,
  Wrench,
  TrendingUp,
  Code2,
  Rocket,
  Users,
  MonitorSmartphone
} from 'lucide-react'

import { Animate } from '@/components/common/animate'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Game Development Services | 2D, 3D & Mobile Games | Thrill Edge Technologies',
  description:
    'Build engaging 2D, 3D and mobile games with Thrill Edge Technologies. Our game development services cover Unity development, UI/UX, game assets, monetization, QA, maintenance and App Store Optimization.',
  alternates: {
    canonical: `${SITE_URL}/services/game-development`,
  },
  openGraph: {
    title: 'Game Development Services | Thrill Edge Technologies',
    description:
      'Professional 2D, 3D, mobile and Unity game development services covering design, development, monetization, QA, maintenance and ASO.',
    type: 'website',
    url: `${SITE_URL}/services/game-development`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game Development Services | Thrill Edge Technologies',
    description:
      'Build engaging games for mobile, desktop and other platforms with our complete game development services.',
  },
}

const services = [

  {
    icon: Gamepad2,
    title: "2D Game Development",
    text: "Create engaging 2D games with polished gameplay, responsive controls, immersive visuals and smooth performance across supported platforms.",
  },
  {
    icon: Box,
    title: "3D Game Development",
    text: "Build immersive 3D gaming experiences with detailed environments, characters, animations, physics and interactive gameplay systems.",
  },
  {
    icon: Smartphone,
    title: "Mobile Game Development",
    text: "Develop mobile games for iOS and Android with responsive gameplay, optimized performance and platform-ready experiences.",
  },
  {
    icon: Code2,
    title: "Unity Game Development",
    text: "Build scalable games and interactive experiences using Unity with gameplay systems, physics, animations, integrations and platform deployment.",
  },
  {
    icon: Palette,
    title: "Game UI/UX Design",
    text: "Design intuitive game interfaces, menus, HUDs, onboarding flows and player experiences that make gameplay easy and enjoyable.",
  },
  {
    icon: Layers,
    title: "Character & Asset Development",
    text: "Create game-ready characters, environments, props, visual assets and other elements needed to bring your game world to life.",
  },
  {
    icon: Coins,
    title: "Monetization & In-App Purchases",
    text: "Implement monetization strategies including in-app purchases, rewarded experiences and other revenue-focused game features.",
  },
  {
    icon: Bug,
    title: "Game Testing & QA",
    text: "Test gameplay, controls, performance, compatibility and user experience to identify bugs and improve overall game quality.",
  },
  {
    icon: Wrench,
    title: "Game Maintenance & Updates",
    text: "Keep your game stable and competitive with bug fixes, feature updates, performance improvements and ongoing technical support.",
  },
  {
    icon: TrendingUp,
    title: "ASO — App Store Optimization",
    text: "Improve game visibility on app stores through optimized metadata, descriptions, keywords, visuals and store positioning.",
  },
  {
    icon: Users,
    title: "Multiplayer Game Development",
    text: "Create engaging multiplayer experiences with real-time gameplay features, player interactions, matchmaking systems and connected game environments.",
  },
  {
    icon: MonitorSmartphone,
    title: "Game Porting & Cross-Platform Development",
    text: "Adapt and optimize existing games for different platforms and devices while maintaining consistent gameplay, controls and overall player experience.",
  },
]

const gameTypes = [
  'Casual Games',
  'Hyper-Casual Games',
  'Puzzle Games',
  'Arcade Games',
  'Adventure Games',
  'Simulation Games',
  'Strategy Games',
  'Educational Games',
  'Multiplayer Experiences',
  'Interactive Experiences',
  'Mobile Games',
  '3D Games',
]

const platforms = [
  {
    title: 'iOS',
    text: 'Build optimized gaming experiences for iPhone and iPad users.',
    icon: Smartphone,
  },
  {
    title: 'Android',
    text: 'Develop mobile games optimized for a wide range of Android devices.',
    icon: Smartphone,
  },
  {
    title: 'PC & Desktop',
    text: 'Create engaging desktop gaming experiences with optimized controls and performance.',
    icon: Monitor,
  },
  {
    title: 'Cross-Platform',
    text: 'Build games that can reach multiple platforms while maintaining a consistent experience.',
    icon: Gamepad2,
  },
]

const developmentProcess = [
  {
    number: '01',
    title: 'Game Concept',
    text: 'Define the game idea, target audience, gameplay concept, platform requirements and overall project objectives.',
  },
  {
    number: '02',
    title: 'Game Design',
    text: 'Plan gameplay mechanics, user experience, game flow, visual direction, levels and core player interactions.',
  },
  {
    number: '03',
    title: 'Development',
    text: 'Develop gameplay systems, controls, environments, characters, animations, integrations and platform-specific functionality.',
  },
  {
    number: '04',
    title: 'Testing & QA',
    text: 'Test gameplay, functionality, compatibility and performance to identify and resolve issues before release.',
  },
  {
    number: '05',
    title: 'Launch',
    text: 'Prepare the game for deployment, store submission, release requirements and launch optimization.',
  },
  {
    number: '06',
    title: 'Maintenance',
    text: 'Continue improving the game through updates, new features, bug fixes, performance optimization and technical support.',
  },
]

const technologies = [
  'Unity',
  'C#',
  '2D Game Development',
  '3D Game Development',
  'Mobile Game Development',
  'Game UI/UX',
  'Animation',
  'Game Physics',
  'In-App Purchases',
  'Game Analytics',
  'Performance Optimization',
  'App Store Deployment',
]

const benefits = [
  {
    number: '01',
    title: 'Player-Focused',
    text: 'We focus on gameplay, usability and player experience to create games that are enjoyable and easy to interact with.',
  },
  {
    number: '02',
    title: 'Performance-Focused',
    text: 'Games are developed with performance, responsiveness and platform compatibility in mind.',
  },
  {
    number: '03',
    title: 'Scalable Development',
    text: 'Build a foundation that can support future features, content updates, additional platforms and long-term growth.',
  },
]

const faqs = [
  {
    question: 'What types of games can you develop?',
    answer:
      'We can develop 2D, 3D, mobile and Unity-based games across different genres including casual, puzzle, arcade, adventure, simulation and other interactive experiences.',
  },
  {
    question: 'Can you develop games for both iOS and Android?',
    answer:
      'Yes. We provide mobile game development for both iOS and Android and can help build cross-platform gaming experiences depending on project requirements.',
  },
  {
    question: 'Do you provide Unity game development?',
    answer:
      'Yes. Unity development can cover gameplay systems, controls, physics, animations, UI, integrations, optimization and platform deployment.',
  },
  {
    question: 'Can you design the game UI and assets?',
    answer:
      'Yes. Our services include game UI/UX design as well as character, environment, visual and other game asset development.',
  },
  {
    question: 'Do you provide game testing?',
    answer:
      'Yes. Game testing and QA can cover gameplay functionality, controls, compatibility, performance, bugs and overall user experience.',
  },
  {
    question: 'Can you maintain and update an existing game?',
    answer:
      'Yes. We can work on existing games for bug fixes, feature updates, optimization, maintenance and ongoing technical improvements.',
  },
  {
    question: 'Do you provide App Store Optimization?',
    answer:
      'Yes. Our ASO service focuses on improving the visibility and presentation of mobile games through optimized store metadata, descriptions, keywords and visual assets.',
  },
]

export default function GameDevelopmentPage() {
  return (
    <div className="relative bg-[#F3F3F3]">
      {/* Hero */}
      <section className="px-3 md:px-2.5 w-full">
        <div className="relative w-full h-[540px] overflow-hidden rounded-[20px] bg-[#111212]">
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage: 'url(/game2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#111212] via-[#111212]/55 to-transparent" />

          <div className="right-0 bottom-0 left-0 absolute mx-auto px-5 lg:px-9 py-8 lg:py-12 max-w-360">
            <Animate variant="fade-up">
              <div className="flex lg:flex-row flex-col justify-between lg:items-end gap-8">
                <div>
                  <span className="font-inter font-semibold text-[13px] text-white/50 uppercase tracking-[0.2em]">
                    Game Development Services
                  </span>

                  <h1 className="mt-4 max-w-4xl font-mont font-semibold text-white text-[40px] md:text-[68px] leading-[0.95]">
                    Game Development
                  </h1>

                  <p className="mt-5 font-mont font-medium text-white/80 text-[20px] md:text-[28px]">
                    Build Games. Create Experiences. Grow Players.
                  </p>
                </div>

                <p className="max-w-xl font-inter text-white/65 text-[15px] md:text-[17px] leading-7">
                  From 2D and 3D games to mobile experiences, Unity
                  development, game design, monetization, QA and ASO — we
                  build gaming experiences designed for performance,
                  engagement and growth.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-mont font-semibold text-[#111212] text-[14px] hover:scale-[1.02] transition-all"
                >
                  Explore Services
                  <ChevronRight size={16} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-mont font-semibold text-white text-[14px] hover:bg-white hover:text-[#111212] transition-all"
                >
                  Start Your Game
                  <ArrowRight size={16} />
                </Link>
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
                  Game Development
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Turn Your Game Idea Into a Playable Experience.
                </h2>
              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="space-y-5">
                <p className="font-inter text-[#555] text-[16px] leading-7">
                  Great games combine compelling gameplay, intuitive design,
                  engaging visuals and reliable technology. Our game
                  development services bring these elements together to build
                  experiences players want to play.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  Whether you are starting with a new game concept or need
                  help improving an existing title, we can support the journey
                  from game design and development through testing, launch and
                  ongoing updates.
                </p>

                <p className="font-inter text-[#555] text-[16px] leading-7">
                  We focus on creating scalable, responsive and
                  platform-ready games while keeping the player experience at
                  the center of development.
                </p>

                <Link
                  href="#development-process"
                  className="inline-flex items-center gap-2 mt-3 rounded-full bg-[#111212] px-7 py-3.5 font-mont font-semibold text-white text-[14px] hover:scale-[1.02] transition-all"
                >
                  See Our Process
                  <ArrowRight size={16} />
                </Link>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Our Game Development Services
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Everything You Need to Build a Game.
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                From the first concept to post-launch updates, our services
                cover the major stages of modern game development.
              </p>
            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((item, i) => {
              const Icon = item.icon

              return (
                <Animate
                  key={i}
                  variant="scale-in"
                  delay={i * 60}
                >
                  <div className="group flex flex-col h-full bg-[#F7F7F7] hover:bg-[#111212] border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-7 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center rounded-[12px] bg-[#111212] group-hover:bg-white w-11 h-11 transition-colors">
                        <Icon
                          size={20}
                          className="text-white group-hover:text-[#111212] transition-colors"
                        />
                      </div>

                      <span className="font-mont font-bold text-[#D5D5D5] group-hover:text-white/20 text-[42px] leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-7 font-mont font-semibold text-[#111212] group-hover:text-white text-[20px] md:text-[21px]">
                      {item.title}
                    </h3>

                    <p className="mt-3 font-inter text-[#555] group-hover:text-white/50 text-[15px] leading-7">
                      {item.text}
                    </p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* Game Types */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
            <Animate variant="fade-up">
              <div className="lg:sticky lg:top-25">
                <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                  Game Types
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Build Different Types of Gaming Experiences.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  Whether you are building a simple mobile game or a more
                  immersive interactive experience, we can adapt the
                  development approach around your concept and audience.
                </p>
              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="grid sm:grid-cols-2 gap-3">
                {gameTypes.map((type, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white border border-[#E5E5E5] rounded-[14px] px-5 py-4 hover:border-[#111212] transition-colors"
                  >
                    <span className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-[#111212] text-white font-mont text-[10px] font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="font-inter text-[#111212] text-[14px]">
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Platforms
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Reach Players Across Platforms.
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-[#555] text-[16px] leading-7">
                Choose the platform strategy that makes sense for your game,
                audience and business objectives.
              </p>
            </div>
          </Animate>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platforms.map((platform, i) => {
              const Icon = platform.icon

              return (
                <Animate
                  key={i}
                  variant="scale-in"
                  delay={i * 70}
                >
                  <div className="group bg-[#F7F7F7] border border-[#E5E5E5] hover:border-[#111212] rounded-[20px] p-7 h-full transition-all">
                    <div className="flex items-center justify-center w-11 h-11 rounded-[12px] bg-[#111212]">
                      <Icon size={19} className="text-white" />
                    </div>

                    <h3 className="mt-6 font-mont font-semibold text-[#111212] text-[20px]">
                      {platform.title}
                    </h3>

                    <p className="mt-3 font-inter text-[#555] text-[14px] leading-7">
                      {platform.text}
                    </p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section
        id="development-process"
        className="py-16 md:py-24 bg-[#111212]"
      >
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-14">
              <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.22em]">
                Game Development Process
              </span>

              <h2 className="mt-4 max-w-4xl font-mont font-bold text-white text-[34px] md:text-[48px] leading-[1.05]">
                From Game Idea to Launch and Beyond.
              </h2>

              <p className="mt-5 max-w-3xl font-inter text-white/50 text-[16px] leading-7">
                A structured development process helps transform an idea into
                a stable, engaging and launch-ready gaming experience.
              </p>
            </div>
          </Animate>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {developmentProcess.map((step, i) => (
              <Animate
                key={i}
                variant="scale-in"
                delay={i * 70}
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

      {/* Technologies */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <Animate variant="fade-up">
              <div>
                <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                  Game Technology
                </span>

                <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                  Technology That Supports Better Games.
                </h2>

                <p className="mt-5 font-inter text-[#555] text-[16px] leading-7">
                  We combine game development technologies, design,
                  performance optimization and platform capabilities to build
                  reliable gaming experiences.
                </p>

                <div className="mt-8 rounded-[20px] bg-[#111212] p-7">
                  <Rocket size={34} className="text-white/40" />

                  <h3 className="mt-5 font-mont font-semibold text-white text-[21px]">
                    Built for Growth
                  </h3>

                  <p className="mt-3 font-inter text-white/50 text-[14px] leading-6">
                    Whether your goal is to launch a new game, improve an
                    existing title or expand to new platforms, development can
                    be structured around your long-term product goals.
                  </p>
                </div>
              </div>
            </Animate>

            <Animate variant="fade-up" delay={100}>
              <div className="grid sm:grid-cols-2 gap-3">
                {technologies.map((technology, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white border border-[#E5E5E5] rounded-[14px] p-4"
                  >
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-[#111212]">
                      <Check size={13} className="text-white" />
                    </span>

                    <span className="font-inter text-[#111212] text-[14px] leading-6">
                      {technology}
                    </span>
                  </div>
                ))}
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-14">
              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Why Thrill Edge
              </span>

              <h2 className="mt-4 max-w-4xl font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Build Games That Players Want to Come Back To.
              </h2>
            </div>
          </Animate>

          <div className="grid md:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => (
              <Animate
                key={i}
                variant="scale-in"
                delay={i * 80}
              >
                <div className="bg-[#F7F7F7] border border-[#E5E5E5] rounded-[20px] p-8 h-full">
                  <span className="font-mont font-bold text-[#D5D5D5] text-[52px]">
                    {benefit.number}
                  </span>

                  <h3 className="mt-8 font-mont font-semibold text-[#111212] text-[21px]">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 font-inter text-[#555] text-[15px] leading-7">
                    {benefit.text}
                  </p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-360 mx-auto px-4">
          <Animate variant="fade-up">
            <div className="mb-12">
              <span className="font-inter font-semibold text-[11px] text-[#929296] uppercase tracking-[0.22em]">
                Game Development FAQ
              </span>

              <h2 className="mt-4 font-mont font-semibold text-[#111212] text-[34px] md:text-[48px] leading-[1.05]">
                Common Questions About Game Development
              </h2>
            </div>
          </Animate>

          <div className="max-w-4xl">
            {faqs.map((faq, i) => (
              <Animate
                key={i}
                variant="fade-up"
                delay={i * 50}
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
                <Gamepad2
                  size={42}
                  className="mx-auto mb-6 text-white/30"
                />

                <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.22em]">
                  Start Your Game Project
                </span>

                <h2 className="mt-5 font-mont font-bold text-white text-[34px] md:text-[52px] leading-[1.05]">
                  Ready to Build Your Next Game?
                </h2>

                <p className="mt-5 max-w-2xl mx-auto font-inter text-white/55 text-[16px] md:text-[18px] leading-7">
                  From game concept and development to testing, monetization,
                  launch and ongoing updates, build a gaming experience with a
                  team that understands the complete development journey.
                </p>

                <p className="mt-5 font-mont font-medium text-white/80 text-[19px] md:text-[22px]">
                  Build the Game. Grow the Experience. Reach More Players.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-10">
                   <Link
                                   href="/project-cost-estimation"
                                              className="inline-flex items-center gap-2 bg-white text-[#111212] px-8 py-3.5 rounded-full font-mont font-semibold text-[14px] hover:scale-[1.02] transition-all"
                 
                                 >
                                   Get Project Estimate
                                 </Link>

                  <Link
                    href="#services"
                    className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-full font-mont font-semibold text-[14px] hover:bg-white hover:text-[#111212] transition-all"
                  >
                    Explore Services
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </Animate>

          <p className="mt-8 text-center font-inter text-[#929296] text-[13px]">
            Thrill Edge Technologies — Game Development | 2D & 3D Games |
            Mobile Games | Unity | Game Design | QA | ASO
          </p>
        </div>
      </section>
    </div>
  )
}

