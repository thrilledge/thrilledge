/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thrilledge.com',
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
      { source: '/amazon-ppc-advertising', destination: '/services', permanent: true },
      // Company pages
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/certifications', destination: '/about', permanent: true },
      { source: '/featured-partner', destination: '/about', permanent: true },
      // Legacy portfolio/case-study URLs
      { source: '/our-projects/:slug', destination: '/casestudy', permanent: true },
      { source: '/work', destination: '/casestudy', permanent: true },
      { source: '/work/:slug', destination: '/casestudy/:slug', permanent: true },
      { source: '/work-pending', destination: '/casestudy', permanent: true },
      { source: '/work-pending/:slug', destination: '/casestudy/:slug', permanent: true },
      // Legacy WordPress taxonomies and date archives
      { source: '/tag/:slug', destination: '/blog', permanent: true },
      { source: '/category/:slug', destination: '/categories', permanent: true },
      { source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})', destination: '/blog', permanent: true },
      { source: '/:year(\\d{4})/:month(\\d{2})', destination: '/blog', permanent: true },
      // NOTE: WordPress short links (/?p=123) are handled in middleware.ts,
      // because a config-level redirect would keep the query and loop.
    ]
  },
}

export default nextConfig
