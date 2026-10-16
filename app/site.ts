// Single source of truth for the site's public URL.
// When a custom domain is connected, set NEXT_PUBLIC_SITE_URL in Vercel
// (e.g. https://kravyadaesports.com) and redeploy: canonical, sitemap and
// robots.txt will all follow automatically.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://kravyadaesports.vercel.app'
).replace(/\/+$/, '')

export const SITE_NAME = 'KRAVYADA ESPORTS'
export const SITE_DESCRIPTION = 'Compete. Conquer. Become KRAVYADA.'
export const LOGO_URL =
  'https://raw.githubusercontent.com/thelifemaurya/KRAVYADA-ESPORTS/main/kravyada-logo.png'
