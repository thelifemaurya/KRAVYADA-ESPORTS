import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KRAVYADA ESPORTS — Competitive Scrims',
  description: 'Official KRAVYADA ESPORTS tournament and paid scrim platform.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}