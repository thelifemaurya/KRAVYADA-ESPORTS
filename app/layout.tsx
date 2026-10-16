import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, LOGO_URL } from './site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'CzR2A3kpKbxqIJEPCPMkjla0Uo0cm6eWWi5Lw7MKEJ0',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: LOGO_URL, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [LOGO_URL],
  },
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
      alternateName: ['KRAVYADA', 'Kravyada Esports'],
      url: `${SITE_URL}/`,
      logo: LOGO_URL,
      description: 'KRAVYADA ESPORTS is an independent esports organization founded and led by Ayush Maurya.',
      founder: { '@id': `${SITE_URL}/#ayush-maurya` },
      sameAs: [
        'https://www.instagram.com/kravyadaesports',
        'https://youtube.com/@kravyadaesports',
        'https://discord.gg/sNdGHm9hEa',
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
    <html lang="en">
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
        {children}
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
