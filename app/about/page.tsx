import type { Metadata } from 'next'
import Link from 'next/link'
import { EXTERNAL, SITE_URL, SOCIAL } from '../site'
import { milestones } from '../data/about'

const TITLE = 'About KRAVYADA ESPORTS'
const DESCRIPTION =
  'The story of KRAVYADA ESPORTS: a Free Fire scrim team that grew into a lineup and then an independent esports organisation running scrims, tournaments and team trials. Not part of any other organisation.'

export const metadata: Metadata = {
  title: 'About',
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { url: '/about', title: `${TITLE} | Independent Free Fire organisation`, description: DESCRIPTION },
}

const FAQ = [
  {
    q: 'What is KRAVYADA ESPORTS?',
    a: 'KRAVYADA ESPORTS (also written Kravyada Esports or kravyadaesports) is an independent Free Fire esports organisation. It runs scrims, community tournaments and team trials, and keeps a player community on Discord, Instagram, YouTube and WhatsApp.',
  },
  {
    q: 'Is KRAVYADA part of another esports organisation?',
    a: 'No. KRAVYADA is a solo, independent organisation. It is not affiliated with, owned by or a branch of any other esports organisation.',
  },
  {
    q: 'Who runs KRAVYADA ESPORTS?',
    a: 'KRAVYADA ESPORTS grew out of a Free Fire scrim team that became a full lineup and then an organisation. It was founded by Ayush Maurya, who leads it under the KRAVYADA name.',
  },
  {
    q: 'How do I join a KRAVYADA scrim?',
    a: 'You do not have to be on the KRAVYADA team. Join the Discord and follow the Instagram pages for timings and lobby details, or check the Scrims page for what is coming up.',
  },
  {
    q: 'How do I try out for the KRAVYADA team?',
    a: 'Use the Team trials page. Fill in your in-game name, Free Fire UID, role and device, and the application is sent to our Instagram DMs.',
  },
  {
    q: 'Which game does KRAVYADA play?',
    a: 'KRAVYADA ESPORTS is a Free Fire organisation.',
  },
]

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/about#faq`,
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
}

const PRINCIPLES = [
  { name: 'Compete', text: 'Real matches against players who want to win. Scrims and tournaments are the point of everything else.' },
  { name: 'Conquer', text: 'The name is not given. It is earned, one match, one loss and one comeback at a time.' },
  { name: 'Create', text: 'A community needs somewhere to meet, so KRAVYADA builds the servers, channels and events itself.' },
  { name: 'Evolve', text: 'Players should leave each scrim a little better than they arrived, and the organisation should too.' },
]

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
          KRAVYADA ESPORTS is an independent Free Fire esports organisation built around regular practice, honest
          competition and a community that stays active between matches.
        </p>
      </header>

      <section className="section" aria-labelledby="story-title">
        <div className="split">
          <h2 id="story-title">The story</h2>
          <div className="prose">
            <p>
              KRAVYADA did not begin as an organisation. It began as an ordinary Free Fire team that played scrims,
              the same way thousands of squads do, with Ayush Maurya playing alongside everyone else. Nobody planned a
              brand. The team just kept showing up, kept playing and kept getting better.
            </p>
            <p>
              Slowly that team became a proper lineup, with set roles, regular practice and a standard people
              held each other to. Once the lineup was real, it made sense to build something around it, and the team
              grew into the organisation that is now KRAVYADA ESPORTS.
            </p>
            <p>
              Because it grew from the inside, KRAVYADA is independent. There is no parent company, no umbrella brand
              and no partner team behind the name. Everything is run directly: the scrims, the paid lobbies, the
              community tournaments and the team trials. The Discord server is where players meet, Instagram and
              WhatsApp carry announcements, and YouTube holds the content around it.
            </p>
            <p>
              The standard is the same as it was on day one: show up, play properly and improve. The goal is simple, to
              give serious players room to rise.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="do-title">
        <div className="section-head">
          <h2 id="do-title">What KRAVYADA runs</h2>
        </div>
        <ul className="rows">
          <li className="row">
            <h3>Scrims</h3>
            <p>Practice matches against other squads, including paid lobbies. Anyone can play, you do not need to be on the team.</p>
            <Link className="link" href="/scrims">
              Join scrims
            </Link>
          </li>
          <li className="row">
            <h3>Tournaments</h3>
            <p>Community tournaments organised by KRAVYADA and announced on Discord and Instagram.</p>
            <a className="link" href={SOCIAL.instagram} {...EXTERNAL}>
              Follow on Instagram
            </a>
          </li>
          <li className="row">
            <h3>Team trials</h3>
            <p>A route into the KRAVYADA roster. Send your Free Fire ID, role and device and we get back to you.</p>
            <Link className="link" href="/trials">
              Try out
            </Link>
          </li>
          <li className="row">
            <h3>Community</h3>
            <p>A Discord server, a WhatsApp channel, Instagram and YouTube for players, squads and fans.</p>
            <a className="link" href={SOCIAL.discord} {...EXTERNAL}>
              Join the Discord
            </a>
          </li>
        </ul>
      </section>

      <section className="section" aria-labelledby="stand-title">
        <div className="section-head">
          <h2 id="stand-title">What we stand for</h2>
          <p>Four words from the KRAVYADA standard.</p>
        </div>
        <div className="principles">
          {PRINCIPLES.map((item) => (
            <div className="principle" key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {milestones.length > 0 && (
        <section className="section" aria-labelledby="miles-title">
          <div className="section-head">
            <h2 id="miles-title">Milestones</h2>
          </div>
          <ul className="rows">
            {milestones.map((item) => (
              <li className="row" key={`${item.date}-${item.title}`}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <span className="row-when">{item.date}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section" aria-labelledby="find-title">
        <div className="section-head">
          <h2 id="find-title">Find KRAVYADA</h2>
        </div>
        <ul className="channels">
          <li>
            <h3>Discord</h3>
            <p>The main server. Scrim talk, announcements and other players.</p>
            <a className="link" href={SOCIAL.discord} {...EXTERNAL}>
              Join
            </a>
          </li>
          <li>
            <h3>Instagram</h3>
            <p>@kravyadaesports for news, and @kravyadapaidscrims for paid lobbies.</p>
            <a className="link" href={SOCIAL.instagram} {...EXTERNAL}>
              Follow
            </a>
          </li>
          <li>
            <h3>YouTube</h3>
            <p>Videos and content from KRAVYADA ESPORTS.</p>
            <a className="link" href={SOCIAL.youtube} {...EXTERNAL}>
              Watch
            </a>
          </li>
          <li>
            <h3>WhatsApp channel</h3>
            <p>Updates sent straight to your phone.</p>
            <a className="link" href={SOCIAL.whatsapp} {...EXTERNAL}>
              Join
            </a>
          </li>
        </ul>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="section-head">
          <h2 id="faq-title">Questions</h2>
        </div>
        <div className="faq">
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="join-title">
        <div className="paths">
          <div className="path path-steel">
            <h3 id="join-title">Join scrims</h3>
            <p>Play practice matches against other squads. Open to everyone.</p>
            <Link className="btn" href="/scrims">
              See scrims
            </Link>
          </div>
          <div className="path path-red">
            <h3>Team trials</h3>
            <p>Try out for the KRAVYADA roster.</p>
            <Link className="btn btn-red" href="/trials">
              Apply for trials
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
