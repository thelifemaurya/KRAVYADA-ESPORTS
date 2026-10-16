import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME, LOGO_URL } from '../site'

const TITLE = 'About KRAVYADA ESPORTS'
const DESCRIPTION =
  'KRAVYADA ESPORTS is an independent esports organization founded and led by Ayush Maurya. Competitive teams, daily scrims, tournaments and a player-first community.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: '/about',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: LOGO_URL, alt: SITE_NAME }],
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION, images: [LOGO_URL] },
}

const LINKS = [
  { label: 'DISCORD', href: 'https://discord.gg/sNdGHm9hEa' },
  { label: 'YOUTUBE', href: 'https://youtube.com/@kravyadaesports?si=0J9RophFfs9_hM1l' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/kravyadaesports' },
  { label: 'PAID SCRIMS', href: 'https://www.instagram.com/kravyadapaidscrims' },
  { label: 'WHATSAPP', href: 'https://whatsapp.com/channel/0029VbDsg3BAjPXJnFUMKA0M' },
]

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

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
.ab{min-height:100vh;background:#050505;color:#f2f0eb;font-family:Inter,Arial,sans-serif;--acid:#d9ff00;--line:#242424}
.ab a{text-decoration:none;color:inherit}
.ab-nav{display:flex;align-items:center;justify-content:space-between;padding:22px 6vw;border-bottom:1px solid #ffffff0c}
.ab-brand{display:flex;align-items:center;gap:11px;font-size:13px;font-weight:800;letter-spacing:.16em}
.ab-brand img{width:38px;height:38px;object-fit:contain}
.ab-back{font-size:9px;letter-spacing:.18em;color:#999;text-transform:uppercase}
.ab-back:hover{color:var(--acid)}
.ab-wrap{max-width:980px;margin:0 auto;padding:90px 8vw 70px}
.ab-eyebrow{font-size:9px;letter-spacing:.28em;color:var(--acid);font-weight:800}
.ab h1{font:900 clamp(64px,11vw,130px)/.82 'Barlow Condensed',Arial,sans-serif;letter-spacing:-.045em;margin:18px 0 28px;text-transform:uppercase}
.ab h1 em{color:var(--acid);font-style:normal}
.ab-lead{font-size:20px;line-height:1.55;color:#d3d0c9;max-width:720px;margin:0 0 20px}
.ab p{font-size:14px;line-height:1.85;color:#8a8a8a;max-width:720px}
.ab section{padding:46px 0;border-top:1px solid var(--line)}
.ab h2{font:900 clamp(34px,5vw,54px)/.9 'Barlow Condensed',Arial,sans-serif;letter-spacing:-.02em;margin:10px 0 18px;text-transform:uppercase}
.ab-people{display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid var(--line)}
.ab-person{padding:28px;border-right:1px solid var(--line)}
.ab-person:last-child{border-right:0}
.ab-role{font-size:9px;letter-spacing:.22em;color:var(--acid);font-weight:800}
.ab-person h3{font:900 38px/.95 'Barlow Condensed',Arial,sans-serif;margin:14px 0 4px;text-transform:uppercase}
.ab-person small{display:block;color:#666;font-size:11px;letter-spacing:.12em;margin-bottom:14px}
.ab-person p{font-size:13px;margin:0}
.ab-list{list-style:none;margin:0;padding:0;max-width:720px}
.ab-list li{padding:16px 0;border-bottom:1px solid var(--line);font-size:14px;line-height:1.7;color:#8a8a8a}
.ab-list b{display:block;color:#f2f0eb;font:800 20px 'Barlow Condensed',Arial,sans-serif;letter-spacing:.08em;margin-bottom:2px}
.ab-social{display:flex;flex-wrap:wrap;gap:12px;margin-top:10px}
.ab-social a{padding:14px 20px;font-size:9px;font-weight:900;letter-spacing:.14em;border:1px solid #444;transition:.3s}
.ab-social a:hover{border-color:var(--acid);color:var(--acid)}
.ab-foot{padding:28px 6vw;border-top:1px solid var(--line);font-size:8px;letter-spacing:.2em;color:#444;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px}
@media(max-width:700px){.ab-wrap{padding:60px 7vw 50px}.ab-people{grid-template-columns:1fr}.ab-person{border-right:0;border-bottom:1px solid var(--line)}.ab-person:last-child{border-bottom:0}.ab-lead{font-size:17px}}
`

export default function AboutPage() {
  return (
    <div className="ab">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd).replace(/</g, '\\u003c') }}
      />

      <nav className="ab-nav">
        <Link href="/" className="ab-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_URL} alt="KRAVYADA ESPORTS logo" />
          <span>KRAVYADA</span>
        </Link>
        <Link href="/" className="ab-back">
          ← Back to home
        </Link>
      </nav>

      <main className="ab-wrap">
        <div className="ab-eyebrow">ABOUT — WHO WE ARE</div>
        <h1>
          ABOUT <em>KRAVYADA.</em>
        </h1>
        <p className="ab-lead">
          KRAVYADA ESPORTS is an independent esports organization built around competitive gaming, tournaments and a
          player-first community.
        </p>
        <p>
          We create places to practice, compete, improve and connect. KRAVYADA is a solo-founded organization. It is not
          part of, or affiliated with, any other esports organization. The goal is simple: give serious players room to
          rise.
        </p>

        <section>
          <div className="ab-eyebrow">LEADERSHIP</div>
          <h2>The people behind it</h2>
          <div className="ab-people">
            <div className="ab-person">
              <div className="ab-role">FOUNDER &amp; CEO</div>
              <h3>Ayush Maurya</h3>
              <small>FOUNDER OF KRAVYADA ESPORTS</small>
              <p>
                Ayush Maurya founded KRAVYADA ESPORTS and leads the organization, from competitive teams and scrims to
                tournaments and the community.
              </p>
            </div>
            <div className="ab-person">
              <div className="ab-role">MANAGEMENT</div>
              <h3>Dinesh Maurya</h3>
              <small>ALSO KNOWN AS “GHOST”</small>
              <p>Dinesh Maurya, known as Ghost, supports KRAVYADA ESPORTS on the management side.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="ab-eyebrow">WHAT WE DO</div>
          <h2>The Arena</h2>
          <ul className="ab-list">
            <li>
              <b>COMPETITIVE TEAMS</b>
              Build a roster, sharpen your game sense and compete with players who take the game seriously.
            </li>
            <li>
              <b>DAILY SCRIMS</b>
              Regular scrims, leagues and paid lobbies designed to keep competitors active and improving.
            </li>
            <li>
              <b>COMMUNITY EVENTS</b>
              Tournaments and community experiences that bring gamers together beyond the match.
            </li>
          </ul>
        </section>

        <section>
          <div className="ab-eyebrow">FIND US</div>
          <h2>Stay connected</h2>
          <p>Find the next scrim, follow the org and stay close to everything KRAVYADA.</p>
          <div className="ab-social">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="ab-foot">
        <span>© {new Date().getFullYear()} KRAVYADA ESPORTS · FOUNDED BY AYUSH MAURYA</span>
        <Link href="/">HOME</Link>
      </footer>
    </div>
  )
}
