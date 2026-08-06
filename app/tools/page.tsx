import type { Metadata } from 'next'
import { FreelancerToolsClient } from '@/components/tools/tools-page-client'

export const metadata: Metadata = {
  title: 'Tools | Thrill Edge Technologies',
  description: 'AI-powered freelancer toolkit — Upwork proposal writer, cold email generator, cold calling scripts, and more.',
  alternates: { canonical: 'https://www.thrilledge.com/tools' },
}

export default function FreelancerToolsPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <section className="px-3 md:px-2.5 w-full pt-6">
        <div className="relative rounded-[20px] w-full h-56 md:h-72 overflow-hidden bg-gradient-to-br from-[#111212] to-[#2a2a2a]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_70%)]" />
          <div className="max-w-360 mx-auto absolute bottom-0 left-0 right-0 flex flex-col justify-end gap-2 lg:px-9 px-5 lg:py-8 py-6">
            <span className="font-inter font-semibold text-[11px] text-white/30 uppercase tracking-[0.2em]">Freelancer Toolkit</span>
            <h1 className="text-[28px] lg:text-[48px] lg:leading-14 leading-9 font-mont font-semibold text-white max-w-2xl">
              AI-Powered Tools To Win More Clients
            </h1>
            <p className="lg:text-[16px] text-[14px] font-inter text-white/60 max-w-xl leading-6">
              Write Upwork proposals that get replies, cold emails that get opens, and scripts that book calls.
            </p>
          </div>
        </div>
      </section>
      <FreelancerToolsClient />
    </div>
  )
}
