import type { Metadata } from 'next'
import JoinForm from './JoinForm'

const DESCRIPTION =
  'Apply to play Free Fire with KRAVYADA ESPORTS. Share your in-game name, UID, role and device and send it to our Instagram DMs.'

export const metadata: Metadata = {
  title: 'Apply to play Free Fire',
  description: DESCRIPTION,
  alternates: { canonical: '/join' },
  openGraph: { url: '/join', title: 'Apply to play Free Fire | KRAVYADA ESPORTS', description: DESCRIPTION },
}

export default function JoinPage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1 className="page-title">Apply to play</h1>
        <p className="lead">
          Fill this in and we will write your application for you. It is copied to your clipboard and Instagram opens
          so you can paste it into a DM to KRAVYADA.
        </p>
      </header>
      <section className="section" aria-label="Application form">
        <JoinForm />
      </section>
    </div>
  )
}
