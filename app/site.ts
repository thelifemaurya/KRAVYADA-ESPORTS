// Single source of truth for the site's public URL and shared constants.
// When a custom domain is connected, set NEXT_PUBLIC_SITE_URL in Vercel
// (e.g. https://kravyadaesports.com) and redeploy: canonical, sitemap and
// robots.txt will all follow automatically.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://kravyadaesports.vercel.app'
).replace(/\/+$/, '')

export const SITE_NAME = 'KRAVYADA ESPORTS'
export const SITE_DESCRIPTION =
  'KRAVYADA ESPORTS (Kravyada Esports) is an independent Free Fire esports organisation founded by Ayush Maurya. Join scrims, try out for the team and follow tournaments.'
export const LOGO_URL = `${SITE_URL}/kravyada-logo.jpg`

export const SOCIAL = {
  discord: 'https://discord.gg/sNdGHm9hEa',
  youtube: 'https://youtube.com/@kravyadaesports?si=0J9RophFfs9_hM1l',
  instagram: 'https://www.instagram.com/kravyadaesports',
  paidScrims: 'https://www.instagram.com/kravyadapaidscrims',
  whatsapp: 'https://whatsapp.com/channel/0029VbDsg3BAjPXJnFUMKA0M',
  instagramDm: 'https://ig.me/m/kravyadaesports',
} as const

// Opens in a new tab safely.
export const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const
