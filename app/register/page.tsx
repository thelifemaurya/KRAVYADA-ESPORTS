import type { Metadata } from 'next'
import { getOpenEvents } from '../lib/events'
import RegisterClient from './RegisterClient'

export const revalidate = 60

const DESCRIPTION =
  'Register your squad for KRAVYADA ESPORTS Free Fire scrims and tournaments, then use your code to get the room ID and password once you are approved.'

export const metadata: Metadata = {
  title: 'Register for scrims and tournaments',
  description: DESCRIPTION,
  alternates: { canonical: '/register' },
  openGraph: { url: '/register', title: 'Register for scrims and tournaments | KRAVYADA ESPORTS', description: DESCRIPTION },
}

export default async function RegisterPage() {
  const events = await getOpenEvents()
  return (
    <div className="wrap">
      <header className="page-head">
        <h1 className="page-title">Register</h1>
        <p className="lead">
          Pick a scrim or tournament and register your squad. You get an access code. Once we approve your slot, use that
          code in the second section to get the room ID and password.
        </p>
      </header>
      <RegisterClient events={events} />
    </div>
  )
}
