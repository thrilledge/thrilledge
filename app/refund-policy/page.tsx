import { PageHero } from "@/components/common/page-hero";
import { Metadata } from "next";
import { Mail, Phone, MapPin, Shield, CreditCard, RotateCcw, Clock, AlertCircle, UserCheck, FileText, RefreshCw } from "lucide-react";
import { cn } from "../../lib/utils";
import { Animate } from "@/components/common/animate";

export const metadata: Metadata = {
  title: "Refund Policy | Thrill Edge Technologies",
  description: "Understand the refund policy for Thrill Edge Technologies tools subscription plans — Free and Unlimited plans.",
};

const sections = [
  { id: "overview", title: "Overview" },
  { id: "free-plan", title: "Free Plan" },
  { id: "unlimited-plan", title: "Unlimited Plan" },
  { id: "refund-eligibility", title: "Refund Eligibility" },
  { id: "how-to-request", title: "How To Request A Refund" },
  { id: "processing-time", title: "Processing Time" },
  { id: "exceptions", title: "Exceptions" },
  { id: "changes", title: "Changes To This Policy" },
  { id: "contact", title: "Contact Us" },
];

export default function RefundPolicy() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Refund Policy"
        subtitle="Last updated: June 22, 2026"
      />

      <div className={cn('bg-[#f5f5f5]', 'border-border', 'border-b')}>
        <div className={cn('mx-auto', 'px-4', 'md:px-9', 'py-8', 'max-w-[1440px]')}>
          <p className={cn('max-w-3xl', 'font-inter', 'text-[#444]', 'text-[15px]', 'leading-[1.8]')}>
            Thrill Edge Technologies is committed to fair and transparent billing. This refund policy outlines the terms for our tools subscription plans, including the Free Plan and the Unlimited Plan.
          </p>
        </div>
      </div>

      <div className={cn('flex', 'lg:flex-row', 'flex-col', 'gap-12', 'mx-auto', 'px-4', 'md:px-9', 'py-16', 'max-w-[1440px]')}>

        <aside className={cn('hidden', 'lg:block', 'w-64', 'shrink-0')}>
          <div className={cn('top-24', 'sticky')}>
            <p className={cn('mb-4', 'font-inter', 'font-semibold', 'text-[#999]', 'text-[11px]', 'uppercase', 'tracking-[0.2em]')}>On this page</p>
            <nav className={cn('flex', 'flex-col', 'gap-1')}>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={cn('py-1', 'pl-3', 'border-transparent', 'hover:border-foreground', 'border-l-2', 'font-inter', 'text-[#666]', 'text-[13px]', 'hover:text-foreground', 'transition-colors')}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <Animate variant="fade-up" className="flex-1 min-w-0">
          <main className={cn('flex-1', 'min-w-0')}>

          <PolicySection id="overview" icon={<FileText size={18} />} title="1. Overview">
            <p className={cn('mb-4', 'font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              Thrill Edge Technologies offers a freemium toolkit for freelancers. Our subscription model consists of two tiers:
            </p>
            <div className={cn('gap-4', 'grid', 'sm:grid-cols-2')}>
              {[
                { label: "Free Plan", desc: "Limited usage per tool at no cost. Users can access basic features with monthly usage caps." },
                { label: "Unlimited Plan", desc: "Full, unrestricted access to all tools with no usage limits. Available via paid subscription through Paddle." },
              ].map((item) => (
                <div key={item.label} className={cn('bg-[#fafafa]', 'p-5', 'border', 'border-border', 'rounded-xl')}>
                  <p className={cn('mb-2', 'font-mont', 'font-semibold', 'text-[13px]', 'text-foreground')}>{item.label}</p>
                  <p className={cn('font-inter', 'text-[#666]', 'text-[13px]', 'leading-[1.7]')}>{item.desc}</p>
                </div>
              ))}
            </div>
          </PolicySection>

          <PolicySection id="free-plan" icon={<Shield size={18} />} title="2. Free Plan">
            <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              The Free Plan is provided at no cost. Since there are no charges associated with this plan, refunds do not apply. You may use the free tier for as long as you like, subject to the usage limits defined in your account.
            </p>
          </PolicySection>

          <PolicySection id="unlimited-plan" icon={<CreditCard size={18} />} title="3. Unlimited Plan">
            <p className={cn('mb-4', 'font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              The Unlimited Plan is a paid subscription billed on a recurring basis through Paddle. By subscribing, you agree to the following refund terms:
            </p>
            <ul className="space-y-3">
              {[
                "Subscriptions are billed monthly or annually at the rate displayed at checkout.",
                "You may cancel your subscription at any time from your account settings.",
                "Upon cancellation, access to Unlimited features continues until the end of the current billing period.",
                "No partial refunds are issued for unused days after cancellation.",
              ].map((item) => (
                <li key={item} className={cn('flex', 'items-start', 'gap-3', 'font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.7]')}>
                  <span className={cn('bg-foreground', 'mt-[6px]', 'rounded-full', 'w-1.5', 'h-1.5', 'shrink-0')} />
                  {item}
                </li>
              ))}
            </ul>
          </PolicySection>

          <PolicySection id="refund-eligibility" icon={<RotateCcw size={18} />} title="4. Refund Eligibility">
            <p className={cn('mb-4', 'font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              Refunds are available within 14 days of the initial purchase under the following conditions:
            </p>
            <div className={cn('gap-3', 'grid', 'sm:grid-cols-2', 'mb-5')}>
              {[
                "First-time Unlimited Plan subscribers only.",
                "Refund request must be submitted within 14 days of the first payment.",
                "Refunds apply only to the initial subscription charge, not renewals.",
                "Abusive or fraudulent refund requests will be denied.",
              ].map((item) => (
                <div key={item} className={cn('flex', 'items-center', 'gap-3', 'bg-[#fafafa]', 'px-4', 'py-3', 'border', 'border-border', 'rounded-lg')}>
                  <span className={cn('bg-foreground', 'rounded-full', 'w-1.5', 'h-1.5', 'shrink-0')} />
                  <span className={cn('font-inter', 'text-[#555]', 'text-[13px]')}>{item}</span>
                </div>
              ))}
            </div>
          </PolicySection>

          <PolicySection id="how-to-request" icon={<AlertCircle size={18} />} title="5. How To Request A Refund">
            <p className={cn('mb-4', 'font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              To request a refund, please email us with your account details:
            </p>
            <div className={cn('bg-[#fafafa]', 'p-5', 'border', 'border-border', 'rounded-xl', 'mb-4')}>
              <p className={cn('font-inter', 'text-[#666]', 'text-[13px]', 'leading-[1.7]')}>
                Send an email to <a href="mailto:info@thrilledge.com" className={cn('text-foreground', 'underline', 'underline-offset-2')}>info@thrilledge.com</a> with the subject line &quot;Refund Request — Unlimited Plan&quot; and include your registered email address and a brief reason for the request.
              </p>
            </div>
            <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              All refund requests are reviewed within 3 business days. You will be notified of the outcome via email.
            </p>
          </PolicySection>

          <PolicySection id="processing-time" icon={<Clock size={18} />} title="6. Processing Time">
            <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              Approved refunds are processed within 5-10 business days. The funds will be returned to the original payment method used during checkout via Paddle. Your financial institution may take additional time to reflect the refund in your account.
            </p>
          </PolicySection>

          <PolicySection id="exceptions" icon={<UserCheck size={18} />} title="7. Exceptions">
            <p className={cn('mb-4', 'font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              The following situations are not eligible for refunds:
            </p>
            <ul className="space-y-3">
              {[
                "Subscription renewals charged after the initial 14-day refund window.",
                "Users who have exceeded the Free Plan usage limits and manually upgraded.",
                "Requests submitted more than 14 days after the initial purchase date.",
                "Accounts found in violation of our Terms of Service.",
              ].map((item) => (
                <li key={item} className={cn('flex', 'items-start', 'gap-3', 'font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.7]')}>
                  <span className={cn('bg-foreground', 'mt-[6px]', 'rounded-full', 'w-1.5', 'h-1.5', 'shrink-0')} />
                  {item}
                </li>
              ))}
            </ul>
          </PolicySection>

          <PolicySection id="changes" icon={<RefreshCw size={18} />} title="8. Changes To This Policy">
            <p className={cn('font-inter', 'text-[#555]', 'text-[15px]', 'leading-[1.8]')}>
              We reserve the right to update this Refund Policy at any time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </PolicySection>

          <div id="contact" className={cn('bg-[#111212]', 'mt-12', 'p-8', 'md:p-10', 'rounded-2xl')}>
            <p className={cn('mb-3', 'font-inter', 'font-semibold', 'text-[11px]', 'text-white/40', 'uppercase', 'tracking-[0.2em]')}>9. Contact Us</p>
            <h2 className={cn('mb-2', 'font-mont', 'font-bold', 'text-white', 'text-2xl')}>Have A Question About Refunds?</h2>
            <p className={cn('mb-8', 'font-inter', 'text-[14px]', 'text-white/50')}>We&apos;re here to help.</p>
            <div className={cn('gap-5', 'grid', 'sm:grid-cols-3')}>
              {[
                { icon: <Mail size={16} />, label: "Email", value: "info@thrilledge.com", href: "mailto:info@thrilledge.com" },
                { icon: <Phone size={16} />, label: "Phone", value: "+44 7576 532096", href: "tel:+44 7576 532096" },
                { icon: <MapPin size={16} />, label: "Address", value: "25 Luke Street, London EC2A 4DS, UK", href: null },
              ].map((item) => (
                <div key={item.label} className={cn('flex', 'flex-col', 'gap-2')}>
                  <div className={cn('flex', 'items-center', 'gap-2', 'text-white/40')}>
                    {item.icon}
                    <span className={cn('font-inter', 'text-[11px]', 'uppercase', 'tracking-widest')}>{item.label}</span>
                  </div>
                  {item.href ? (
                    <a href={item.href} className={cn('font-inter', 'text-[14px]', 'text-white', 'hover:text-white/70', 'transition-colors')}>{item.value}</a>
                  ) : (
                    <span className={cn('font-inter', 'text-[14px]', 'text-white')}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </main>
        </Animate>
      </div>
    </>
  );
}

function PolicySection({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn('py-8', 'border-border', 'last:border-0', 'border-b', 'scroll-mt-24')}>
      <div className={cn('flex', 'items-center', 'gap-3', 'mb-5')}>
        <div className={cn('flex', 'justify-center', 'items-center', 'bg-[#f0f0f0]', 'rounded-lg', 'w-8', 'h-8', 'text-foreground', 'shrink-0')}>
          {icon}
        </div>
        <h2 className={cn('font-mont', 'font-bold', 'text-[18px]', 'text-foreground')}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
