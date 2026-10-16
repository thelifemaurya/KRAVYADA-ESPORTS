import Link from 'next/link'
import { EXTERNAL, SOCIAL } from '../site'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <svg className="footer-word" viewBox="0 0 1000 170" aria-hidden="true" focusable="false">
          <text x="0" y="158" textLength="1000" lengthAdjust="spacingAndGlyphs">
            KRAVYADA
          </text>
        </svg>

        <div className="footer-grid">
          <p className="footer-about">
            An independent Free Fire esports organisation, founded by Ayush Maurya.
          </p>

          <nav aria-label="Footer" className="footer-cols">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/scrims">Scrims</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/join">Apply to play</Link>
              </li>
            </ul>
            <ul>
              <li>
                <a href={SOCIAL.discord} {...EXTERNAL}>
                  Discord
                </a>
              </li>
              <li>
                <a href={SOCIAL.instagram} {...EXTERNAL}>
                  Instagram
                </a>
              </li>
              <li>
                <a href={SOCIAL.youtube} {...EXTERNAL}>
                  YouTube
                </a>
              </li>
              <li>
                <a href={SOCIAL.whatsapp} {...EXTERNAL}>
                  WhatsApp channel
                </a>
              </li>
              <li>
                <a href={SOCIAL.paidScrims} {...EXTERNAL}>
                  Paid scrims
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="footer-legal">© {new Date().getFullYear()} KRAVYADA ESPORTS. Founded by Ayush Maurya.</p>
      </div>
    </footer>
  )
}
