import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter } from 'next/font/google'
import { SITE_URL } from '@/lib/site'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { ChatWidget } from '@/components/chat/chat-widget'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  /**
   * Base for every relative URL in metadata (canonicals, OG/Twitter images,
   * alternates). Without it Next falls back to localhost/undefined and pages
   * can end up self-canonicalising to the wrong host.
   */
  metadataBase: new URL(SITE_URL),
  title: 'Thrill Edge Technologies | Innovation Redefined',
  description: 'Cutting-edge technology solutions for modern enterprises. Experience innovation with Thrill Edge Technologies.',
  applicationName: 'Thrill Edge Technologies',
  keywords: ['technology', 'innovation', 'enterprise solutions', 'digital transformation'],
  authors: [{ name: 'Thrill Edge Technologies' }],
  creator: 'Thrill Edge Technologies',
  publisher: 'Thrill Edge Technologies',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}`,
    siteName: 'Thrill Edge Technologies',
    title: 'Thrill Edge Technologies | Innovation Redefined',
    description: 'Cutting-edge technology solutions for modern enterprises.',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Thrill Edge Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thrilledge',
    title: 'Thrill Edge Technologies | Innovation Redefined',
    description: 'Cutting-edge technology solutions for modern enterprises.',
    images: [`${SITE_URL}/twitter-image.jpg`],
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#111212',
  initialScale: 1,
  width: 'device-width',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <Providers>
          <div style={{ overflowX: 'clip' }}>
            <Header />
            {children}
            <Footer />
          </div>
          <ChatWidget />
        </Providers>
        <Analytics />
        <SpeedInsights />
        {GA_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
