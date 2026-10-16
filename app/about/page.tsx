import type { Metadata } from 'next'
import Link from 'next/link'
import { EXTERNAL, SITE_URL, SOCIAL } from '../site'

const TITLE = 'About KRAVYADA ESPORTS'
const DESCRIPTION =
  'KRAVYADA ESPORTS is an independent Free Fire esports organisation founded and led by Ayush Maurya. Scrims, tournaments and a player-first community.'

export const metadata: Metadata = {
  title: 'About',
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { url: '/about', title: `${TITLE} | Independent Free Fire organisation`, description: DESCRIPTION },
}

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: TITLE,
  description: DESCRIPTION,
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
}

export default function AboutPage() {
  return (
    <div className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd).replace(/</g, '\\u003c') }}
      />

      <header className="page-head">
        <h1 className="page-title">About KRAVYADA</h1>
        <p className="lead">
          KRAVYADA ESPORTS is an independent Free Fire esports organisation. It was founded by Ayush Maurya and is not
          part of, or affiliated with, any other esports organisation.
        </p>
      </header>

      <section className="section" aria-labelledby="people-title">
        <div className="section-head">
          <h2 id="people-title">The people</h2>
        </div>
        <div className="people">
          <div className="person">
            <p className="person-role">Founder and CEO</p>
            <h3>Ayush Maurya</h3>
            <p>
              Ayush founded KRAVYADA ESPORTS and leads the organisation, from scrims and tournaments to the community.
            </p>
          </div>
          <div className="person">
            <p className="person-role">Management</p>
            <h3>Dinesh Maurya</h3>
            <p>Known as Ghost. Dinesh helps run the management side of KRAVYADA ESPORTS.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="do-title">
        <div className="section-head">
          <h2 id="do-title">What we do</h2>
        </div>
        <ul className="rows">
          <li className="row">
            <h3>Scrims</h3>
            <p>Regular Free Fire scrims, including paid lobbies, so squads get real match practice.</p>
            <Link className="link" href="/scrims">
              See scrims
            </Link>
          </li>
          <li className="row">
            <h3>Tournaments</h3>
            <p>Community tournaments organised by KRAVYADA and announced on Discord and Instagram.</p>
            <a className="link" href={SOCIAL.instagram} {...EXTERNAL}>
              Instagram
            </a>
          </li>
          <li className="row">
            <h3>Community</h3>
            <p>A Discord server and a WhatsApp channel where players and squads find each other.</p>
            <a className="link" href={SOCIAL.discord} {...EXTERNAL}>
              Discord
            </a>
          </li>
        </ul>
      </section>

      <section className="section" aria-labelledby="join-title">
        <div className="band">
          <h2 id="join-title">Want to play for KRAVYADA?</h2>
          <p className="lead">Send your Free Fire ID, role and device. It goes to our Instagram DMs.</p>
          <div className="hero-actions">
            <Link className="btn btn-red" href="/join">
              Apply to play
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
