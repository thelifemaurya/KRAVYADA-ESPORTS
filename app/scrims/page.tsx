import type { Metadata } from 'next'
import Link from 'next/link'
import { EXTERNAL, SOCIAL } from '../site'
import { schedule } from '../data/schedule'

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

export default function ScrimsPage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1 className="page-title">Join scrims</h1>
        <p className="lead">
          Scrims are practice matches against other squads, and you do not need to be on the KRAVYADA team to play
          them. Upcoming scrims and tournaments are listed here as they are confirmed.
        </p>
      </header>

      <section className="section" aria-labelledby="upcoming-title">
        <div className="section-head">
          <h2 id="upcoming-title">Upcoming</h2>
        </div>
        {schedule.length > 0 ? (
          <ul className="rows">
            {schedule.map((item) => (
              <li className="row" key={`${item.when}-${item.title}`}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <span className="row-when">{item.when}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <strong>Nothing is scheduled on this page yet.</strong>
            Timings and lobby details are posted on the channels below first.
          </div>
        )}
      </section>

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
