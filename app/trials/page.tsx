import type { Metadata } from 'next'
import Link from 'next/link'
import JoinForm from './JoinForm'

const DESCRIPTION =
  'Try out for the KRAVYADA ESPORTS Free Fire roster. Share your in-game name, UID, role and device and send it to our Instagram DMs.'

export const metadata: Metadata = {
  title: 'Team trials',
  description: DESCRIPTION,
  alternates: { canonical: '/trials' },
  openGraph: { url: '/trials', title: 'Team trials | KRAVYADA ESPORTS', description: DESCRIPTION },
}

export default function TrialsPage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1 className="page-title">Team trials</h1>
        <p className="lead">
          This form is for trying out for the KRAVYADA roster. Fill it in and we write your application for you. It is
          copied to your clipboard and Instagram opens so you can paste it into a DM.
        </p>
        <p className="note">
          Only want to play scrims? You do not need to apply.{' '}
          <Link className="link" href="/scrims">
            Go to scrims
          </Link>
        </p>
      </header>
      <section className="section" aria-label="Team trial form">
        <JoinForm />
      </section>
    </div>
  )
}
