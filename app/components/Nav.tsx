import Image from 'next/image'
import Link from 'next/link'
import { EXTERNAL, SOCIAL } from '../site'

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="nav-brand" aria-label="KRAVYADA ESPORTS home">
          <Image src="/kravyada-logo.jpg" alt="" width={44} height={44} priority />
          <span>KRAVYADA</span>
        </Link>
        <nav aria-label="Main" className="nav-links">
          <Link href="/scrims">Scrims</Link>
          <Link href="/about">About</Link>
          <Link href="/join">Apply</Link>
          <a className="btn btn-sm nav-discord" href={SOCIAL.discord} {...EXTERNAL}>
            Discord
          </a>
        </nav>
      </div>
    </header>
  )
}
