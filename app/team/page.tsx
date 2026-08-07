import { getTeamMembers } from "@/lib/wordpress";
import type { TeamMember } from "@/lib/wordpress";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Animate } from "@/components/common/animate";

export const metadata: Metadata = {
  title: "Our Team | Thrill Edge Technologies",
  description: "Meet the team behind Thrill Edge Technologies — the engineers, designers, and strategists building world-class digital products.",
  alternates: { canonical: "https://www.thrilledge.com/team" },
};

const PLACEHOLDER_IMAGE = "/placeholder-user.jpg";

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const name = member.title.rendered;
  const role = member.acf?.role?.trim();
  const bio = member.acf?.bio?.trim();
  const imgSrc =
    member._embedded?.["wp:featuredmedia"]?.[0]?.source_url || PLACEHOLDER_IMAGE;
  const imgAlt =
    member._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
    `${name}'s photo`;

  return (
    <Animate variant="fade-up" delay={(index % 3) * 100}>
      <div className="group flex flex-col h-full bg-white hover:shadow-lg border border-[#e5e5e5] hover:border-[#111212] rounded-[20px] overflow-hidden transition-all duration-300">
        <div className="relative aspect-[4/5] w-full bg-[#f3f3f3] overflow-hidden">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col gap-1.5 p-6">
          <h3 className="font-mont font-semibold text-[#111212] text-[20px] leading-none">
            {name}
          </h3>

          {role && (
            <p className="font-inter font-medium text-[#929296] text-[13px] uppercase tracking-[0.12em]">
              {role}
            </p>
          )}

          {bio && (
            <p className="mt-1 font-inter text-[#555] text-[14px] leading-[1.7]">
              {bio}
            </p>
          )}
        </div>
      </div>
    </Animate>
  );
}

export default async function TeamPage() {
  const members = await getTeamMembers(100).catch(() => []);

  return (
    <div className="relative bg-white">
      {/* Hero */}
      <section className={cn("mx-auto", "p-2", "w-full")}>
        <div
          className={cn(
            "relative",
            "rounded-[20px]",
            "w-full",
            "h-75",
            "lg:h-120",
            "overflow-hidden"
          )}
        >
          <Image
            src="/about-banner.avif"
            alt="Our Team"
            fill
            className={cn("object-center", "object-cover")}
            sizes="100vw"
            priority
          />
          <div
            className={cn("absolute", "inset-0", "rounded-[20px]")}
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.6), rgba(0,0,0,0))",
            }}
          />
          <div
            className={cn(
              "absolute",
              "bottom-0",
              "left-0",
              "max-w-360",
              "right-0",
              "flex",
              "lg:flex-row",
              "flex-col",
              "justify-between",
              "lg:items-end",
              "gap-4",
              "lg:px-9",
              "px-5",
              "lg:py-8",
              "py-6",
              "mx-auto"
            )}
          >
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className={cn("text-sm", "font-inter", "text-white/70")}>
                Our Team
              </span>
              <h1
                className={cn(
                  "text-[32px]",
                  "lg:text-[56px]",
                  "lg:leading-15",
                  "leading-9",
                  "font-mont",
                  "font-semibold",
                  "text-white"
                )}
              >
                The People Behind Thrill Edge
              </h1>
            </div>
            <p className="lg:text-[18px] text-[15px] font-inter text-white/70 lg:max-w-1/2 leading-7">
              A senior team of engineers, designers, and strategists building
              production-grade software across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="mx-auto px-4 md:px-9 py-12 md:py-20 w-full max-w-360">
        {members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {members.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="font-mont font-semibold text-[#111212] text-[24px]">
              Team members coming soon
            </p>
            <p className="font-inter text-[#929296] text-[15px] max-w-md">
              We're adding our team to the site. Check back soon or reach out
              to learn more about who we are.
            </p>
            <Link
              href="/contact"
              className="mt-4 bg-black text-white px-8 py-4 rounded-full font-mont font-semibold text-[15px] hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
