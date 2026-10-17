import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import AppNav from './components/AppNav'
import PwaBoot from './components/PwaBoot'
import Footer from './components/Footer'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, LOGO_URL, SOCIAL } from './site'

// One family, used at two widths: extended + heavy for display, normal for text.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
})

const DEFAULT_TITLE = 'KRAVYADA ESPORTS | Free Fire esports organisation, scrims and team trials'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | KRAVYADA ESPORTS',
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'CzR2A3kpKbxqIJEPCPMkjla0Uo0cm6eWWi5Lw7MKEJ0',
  },
  applicationName: 'KRAVYADA ESPORTS',
  keywords: ['KRAVYADA ESPORTS', 'Kravyada Esports', 'kravyadaesports', 'Kravyada Free Fire', 'Free Fire scrims', 'Free Fire esports organisation India'],
  appleWebApp: { capable: true, title: 'KRAVYADA', statusBarStyle: 'black-translucent' },
  icons: { apple: '/icons/apple-touch-icon.png' },
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: LOGO_URL, width: 1254, height: 1254, alt: 'KRAVYADA ESPORTS wolf logo' }],
  },
  twitter: {
    card: 'summary',
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    images: [LOGO_URL],
  },
}

export const viewport: Viewport = {
  themeColor: '#08080a',
  viewportFit: 'cover',
}

// Structured data (invisible to visitors, read by search engines).
// Declares KRAVYADA ESPORTS as an independent, solo-founded organization.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ['KRAVYADA', 'Kravyada Esports', 'kravyadaesports', 'Kravyada Free Fire'],
      url: `${SITE_URL}/`,
      logo: LOGO_URL,
      description:
        'KRAVYADA ESPORTS is an independent Free Fire esports organisation founded and led by Ayush Maurya.',
      founder: { '@id': `${SITE_URL}/#ayush-maurya` },
      employee: [{ '@id': `${SITE_URL}/#dinesh-maurya` }],
      sameAs: [
        SOCIAL.instagram,
        SOCIAL.paidScrims,
        'https://youtube.com/@kravyadaesports',
        SOCIAL.discord,
        SOCIAL.whatsapp,
        'https://github.com/thelifemaurya/KRAVYADA-ESPORTS',
      ],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#ayush-maurya`,
      name: 'Ayush Maurya',
      jobTitle: 'Founder & CEO',
      worksFor: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#dinesh-maurya`,
      name: 'Dinesh Maurya',
      alternateName: 'Ghost',
      jobTitle: 'Management',
      worksFor: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  return (
    <html lang="en-IN" className={archivo.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        {adsenseClient && (
          <meta name="google-adsense-account" content={adsenseClient.replace(/^ca-/, '')} />
        )}
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <AppNav />
        <main id="main">{children}</main>
        <Footer />
        <PwaBoot />
        {adsenseClient && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
