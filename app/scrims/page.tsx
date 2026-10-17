import type { Metadata } from 'next'
import Link from 'next/link'
import { EXTERNAL, SOCIAL } from '../site'
import { getUpcomingScrims, getUpcomingTournaments } from '../lib/events'
import EventCards from '../components/EventCards'

export const revalidate = 60

const DESCRIPTION =
  'Free Fire scrims and tournaments run by KRAVYADA ESPORTS. See what is coming up and where timings are announced.'

export const metadata: Metadata = {
  title: 'Join Free Fire scrims and tournaments',
  description: DESCRIPTION,
  alternates: { canonical: '/scrims' },
  openGraph: { url: '/scrims', title: 'Join Free Fire scrims and tournaments | KRAVYADA ESPORTS', description: DESCRIPTION },
}

const channels = [
  {
    name: 'Discord',
    text: 'The main community server. Join it to stay in the loop and talk to other players.',
    href: SOCIAL.discord,
    cta: 'Join the Discord',
  },
  {
    name: 'Paid scrims',
    text: 'Our Instagram page for paid scrim lobbies.',
    href: SOCIAL.paidScrims,
    cta: 'Open Instagram',
  },
  {
    name: 'Instagram',
    text: 'Announcements, tournament news and highlights from KRAVYADA.',
    href: SOCIAL.instagram,
    cta: 'Follow',
  },
  {
    name: 'WhatsApp channel',
    text: 'Updates sent straight to your phone.',
    href: SOCIAL.whatsapp,
    cta: 'Join the channel',
  },
]

export default async function ScrimsPage() {
  const [scrims, tournaments] = await Promise.all([getUpcomingScrims(), getUpcomingTournaments()])

  return (
    <div className="wrap">
      <header className="page-head">
        <h1 className="page-title">Join scrims</h1>
        <p className="lead">
          Scrims are practice matches against other squads, and you do not need to be on the KRAVYADA team to play
          them. Upcoming scrims and tournaments are listed here as they are confirmed.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-red" href="/register">
            Register for a scrim
          </Link>
          <Link className="btn" href="/register#room">
            Get ID and password
          </Link>
        </div>
      </header>

      <section className="section" aria-labelledby="upcoming-title">
        <div className="section-head">
          <h2 id="upcoming-title">Upcoming scrims</h2>
        </div>
        {scrims.length > 0 ? (
          <EventCards items={scrims.map((data) => ({ kind: 'scrim' as const, data }))} />
        ) : (
          <div className="empty">
            <strong>No scrims are scheduled right now.</strong>
            Timings and lobby details are posted on the channels below first.
          </div>
        )}
      </section>

      {tournaments.length > 0 && (
        <section className="section" aria-labelledby="tournaments-title">
          <div className="section-head">
            <h2 id="tournaments-title">Tournaments</h2>
          </div>
          <EventCards items={tournaments.map((data) => ({ kind: 'tournament' as const, data }))} />
        </section>
      )}

      <section className="section" aria-labelledby="where-title">
        <div className="section-head">
          <h2 id="where-title">Where we post</h2>
        </div>
        <ul className="channels">
          {channels.map((channel) => (
            <li key={channel.name}>
              <h3>{channel.name}</h3>
              <p>{channel.text}</p>
              <a className="link" href={channel.href} {...EXTERNAL}>
                {channel.cta}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="play-title">
        <div className="band">
          <h2 id="play-title">Want to join the KRAVYADA team instead?</h2>
          <p className="lead">Team trials are separate from scrims. Tell us your Free Fire ID, role and device.</p>
          <div className="hero-actions">
            <Link className="btn btn-red" href="/trials">
              Team trials
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
