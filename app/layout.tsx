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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  return (
    <html lang="en">
      <head>
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
