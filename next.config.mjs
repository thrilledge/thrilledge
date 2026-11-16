/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thrilledge.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.thrilledge.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.thrilledge.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  reactStrictMode: true,
  compress: true,
  // Never silently serve /path and /path/ as two URLs.
  trailingSlash: false,
  async redirects() {
    return [
      // Canonical host: everything must live on https://www.thrilledge.com.
      // Works when both hosts reach this app; keep the nginx 301 as well.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'thrilledge.com' }],
        destination: 'https://www.thrilledge.com/:path*',
        permanent: true,
      },
      {
        source: '/app-development',
        destination: '/services/mobile-app-development',
        permanent: true,
      },
      {
        source: '/app-development/ios-app-development',
        destination: '/services/mobile-app-development',
        permanent: true,
      },
      {
        source: '/app-development/cross-platform-app-development',
        destination: '/services/mobile-app-development',
        permanent: true,
      },
      {
        source: '/digital-marketing',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/digital-marketing/search-engine-marketing',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/digital-marketing/social-media-marketing',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/web-development',
        destination: '/services/custom-web-development',
        permanent: true,
      },
      {
        source: '/web-development/ecommerce-website-development',
        destination: '/services/shopify-plus-agency',
        permanent: true,
      },
      {
        source: '/web-development/web-portal-development',
        destination: '/services/custom-web-development',
        permanent: true,
      },
      {
        source: '/artificial-intelligence',
        destination: '/services/ai-ml-solutions',
        permanent: true,
      },
      {
        source: '/artificial-intelligence/ai-agent-development',
        destination: '/services/ai-ml-solutions',
        permanent: true,
      },
      {
        source: '/artificial-intelligence/generative-ai',
        destination: '/services/ai-ml-solutions',
        permanent: true,
      },
      {
        source: '/artificial-intelligence/natural-language-processing',
        destination: '/services/ai-ml-solutions',
        permanent: true,
      },
      {
        source: '/blockchain-development',
        destination: '/industries/blockchain',
        permanent: true,
      },
      {
        source: '/blockchain-development/metaverse-development',
        destination: '/industries/blockchain',
        permanent: true,
      },
      {
        source: '/blockchain-development/nft-development',
        destination: '/industries/blockchain',
        permanent: true,
      },
      {
        source: '/cloud-services',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/cloud-services/cloud-migration',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/cloud-services/cloud-support-maintenance',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/cloud-services/cloud-application-development',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/custom-software-development',
        destination: '/services/custom-web-development',
        permanent: true,
      },
      {
        source: '/custom-software-development/cms-solution',
        destination: '/services/custom-web-development',
        permanent: true,
      },
      {
        source: '/custom-software-development/crm-solution',
        destination: '/services/custom-web-development',
        permanent: true,
      },
      {
        source: '/custom-software-development/erp-solution',
        destination: '/services/custom-web-development',
        permanent: true,
      },
      {
        source: '/game-development',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/game-development/2d-game-development',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/game-development/3d-game-development',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/our-projects',
        destination: '/casestudy',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/our-team',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/our-services',
        destination: '/services',
        permanent: true,
      },

      // ---------------------------------------------------------------------
      // WordPress-era blog posts that are still requested at the root path.
      // They all exist in WordPress under /blog/<same-slug>, so 301 to the
      // real article instead of dropping the traffic on /blog (Search Console
      // "Not found (404)" report, Jun–Oct 2026).
      // ---------------------------------------------------------------------
      {
        source: '/why-thrill-edge-technologies-is-the-no-1-choice-for-digital-solutions-in-the-usa-uk',
        destination: '/blog/why-thrill-edge-technologies-is-the-no-1-choice-for-digital-solutions-in-the-usa-uk',
        permanent: true,
      },
      {
        source: '/deepseek-vs-gpt-5-which-ai-model-performs-better',
        destination: '/blog/deepseek-vs-gpt-5-which-ai-model-performs-better',
        permanent: true,
      },
      {
        source: '/best-ai-tool-for-mobile-app-development-a-complete-guide',
        destination: '/blog/best-ai-tool-for-mobile-app-development-a-complete-guide',
        permanent: true,
      },
      {
        source: '/top-benefits-of-whatsapp-status-feature',
        destination: '/blog/top-benefits-of-whatsapp-status-feature',
        permanent: true,
      },
      {
        source: '/whatsapp-username-feature-release-date',
        destination: '/blog/whatsapp-username-feature-release-date',
        permanent: true,
      },
      {
        source: '/a-complete-guide-about-web-1-web-2-and-web-3',
        destination: '/blog/a-complete-guide-about-web-1-web-2-and-web-3',
        permanent: true,
      },
      {
        source: '/web-development-services-small-business-wordpress-vs-custom',
        destination: '/blog/web-development-services-small-business-wordpress-vs-custom',
        permanent: true,
      },
      {
        source: '/amazon-ppc-advertising',
        destination: '/blog/amazon-ppc-campaign-strategy-a-complete-guide-to-boost-your-sales-in-2025',
        permanent: true,
      },
      {
        source: '/what-is-an-erp-consultant-a-complete-guide-for-beginners',
        destination: '/blog/what-is-an-erp-consultant-a-complete-guide-for-beginners',
        permanent: true,
      },
      {
        source: '/top-reasons-why-pakgpt-is-pakistans-biggest-tech-milestone-yet',
        destination: '/blog/top-reasons-why-pakgpt-is-pakistans-biggest-tech-milestone-yet',
        permanent: true,
      },
      {
        source: '/how-to-import-markdown-into-elementor-wordpress',
        destination: '/blog/how-to-import-markdown-into-elementor-wordpress',
        permanent: true,
      },
      {
        source: '/why-secure-app-development-practices-are-essential-in-2025',
        destination: '/blog/why-secure-app-development-practices-are-essential-in-2025',
        permanent: true,
      },
      {
        source: '/how-marketing-strategies-can-be-improved-by-blockchain',
        destination: '/blog/how-marketing-strategies-can-be-improved-by-blockchain',
        permanent: true,
      },
      {
        source: '/why-are-seo-friendly-web-development-services-key-in-2025',
        destination: '/blog/why-are-seo-friendly-web-development-services-key-in-2025',
        permanent: true,
      },
      {
        source: '/choosing-between-freelancers-and-agencies-for-web-projects',
        destination: '/blog/choosing-between-freelancers-and-agencies-for-web-projects',
        permanent: true,
      },
      {
        source: '/how-to-add-separator-to-wordpress-admin-submenu',
        destination: '/blog/how-to-add-separator-to-wordpress-admin-submenu',
        permanent: true,
      },
      {
        source: '/website-design-uk-cost-guide-2025-prices-packages-what-you-get',
        destination: '/blog/website-design-uk-cost-guide-2025-prices-packages-what-you-get',
        permanent: true,
      },
      {
        source: '/professional-app-development-features',
        destination: '/blog/professional-app-development-features',
        permanent: true,
      },
      {
        source: '/how-to-choose-the-right-web-development-agency-in-europe',
        destination: '/blog/how-to-choose-the-right-web-development-agency-in-europe',
        permanent: true,
      },
      {
        source: '/tcs-ui-ux-designer-salary-in-usa-2025-average-pay-factors-career-insights',
        destination: '/blog/tcs-ui-ux-designer-salary-in-usa-2025-average-pay-factors-career-insights',
        permanent: true,
      },
      {
        source: '/ai-is-changing-ui-ux-design-in-2025-what-designers-need-to-know',
        destination: '/blog/ai-is-changing-ui-ux-design-in-2025-what-designers-need-to-know',
        permanent: true,
      },
      {
        source: '/web-development-services-that-drive-business-growth',
        destination: '/blog/web-development-services-that-drive-business-growth',
        permanent: true,
      },

      // ---------------------------------------------------------------------
      // WordPress-era URLs still being requested by Google (Search Console
      // 404 / redirect reports, Jun–Oct 2026). 301 them to the closest live
      // page instead of leaving them to 404.
      // ---------------------------------------------------------------------
      // Industry pages renamed to /industries/*
      { source: '/healthcare-development', destination: '/industries/healthcare', permanent: true },
      { source: '/education-development', destination: '/industries/education', permanent: true },
      { source: '/real-estate-development', destination: '/industries/real-estate', permanent: true },
      { source: '/fintech-development', destination: '/industries/fintech', permanent: true },
      { source: '/hvac-web-development', destination: '/industries', permanent: true },
      { source: '/automotive-development', destination: '/industries', permanent: true },
      { source: '/music-development', destination: '/industries', permanent: true },
      { source: '/ecommerce-development', destination: '/industries', permanent: true },
      { source: '/on-demand-development', destination: '/industries', permanent: true },
      // Service pages renamed to /services/*
      { source: '/ui-ux-design', destination: '/services/ui-ux-design', permanent: true },
      { source: '/erp-services', destination: '/services/custom-web-development', permanent: true },
      { source: '/a-deep-dive-into-sap-solutions', destination: '/services/custom-web-development', permanent: true },
      // Company pages
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/certifications', destination: '/about', permanent: true },
      { source: '/featured-partner', destination: '/about', permanent: true },
      // Legacy portfolio / case-study URLs
      { source: '/our-projects/:path*', destination: '/casestudy', permanent: true },
      { source: '/work', destination: '/casestudy', permanent: true },
      { source: '/work/:slug', destination: '/casestudy/:slug', permanent: true },
      { source: '/work-pending', destination: '/casestudy', permanent: true },
      { source: '/work-pending/:slug', destination: '/casestudy/:slug', permanent: true },
      // WordPress categories now live under /categories/<slug>. This must come
      // before the generic rule below so the old typo lands on a live page.
      { source: '/category/web-developement', destination: '/categories/web-development', permanent: true },
      { source: '/category/:path*', destination: '/categories/:path*', permanent: true },
      // Date archives have no modern equivalent; send them to the blog index.
      { source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})', destination: '/blog', permanent: true },
      { source: '/:year(\\d{4})/:month(\\d{2})', destination: '/blog', permanent: true },
      // NOTE: WordPress short links (/?p=123) are handled in middleware.ts,
      // because a config-level redirect would keep the query and loop.
      // NOTE: /tag/<slug> URLs are intentionally left as 404/410 — they have no
      // modern equivalent, and mass-redirecting them to /blog creates soft-404
      // noise rather than helping.
    ]
  },
}

export default nextConfig
