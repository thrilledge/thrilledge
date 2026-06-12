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
  async redirects() {
    return [
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
        destination: '/work-pending',
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
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/deepseek-vs-gpt-5-which-ai-model-performs-better',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/best-ai-tool-for-mobile-app-development-a-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/top-benefits-of-whatsapp-status-feature',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/whatsapp-username-feature-release-date',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/a-complete-guide-about-web-1-web-2-and-web-3',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
