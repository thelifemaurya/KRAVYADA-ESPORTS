'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { EXTERNAL, SOCIAL } from '../site'
import Icon, { type IconName } from './Icon'
import InstallApp from './InstallApp'

const TABS: { href: string; label: string; icon: IconName }[] = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/scrims', label: 'Scrims', icon: 'crosshair' },
  { href: '/join', label: 'Apply', icon: 'join' },
  { href: '/about', label: 'About', icon: 'info' },
]

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')
}

// Top bar for desktop and phones, plus a bottom tab bar on phones (like a native app).
export default function AppNav() {
  const pathname = usePathname()

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <Link href="/" className="nav-brand" aria-label="KRAVYADA ESPORTS home">
            <Image src="/kravyada-logo.jpg" alt="" width={44} height={44} priority />
            <span>KRAVYADA</span>
          </Link>
          <nav aria-label="Main" className="nav-links">
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="nav-link"
                aria-current={isActive(pathname, tab.href) ? 'page' : undefined}
              >
                {tab.label}
              </Link>
            ))}
            <InstallApp className="btn btn-sm nav-install" />
            <a className="btn btn-sm nav-discord" href={SOCIAL.discord} {...EXTERNAL}>
              Discord
            </a>
          </nav>
        </div>
      </header>

      <nav aria-label="App" className="tabbar">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.href)
          return (
            <Link key={tab.href} href={tab.href} className="tab" aria-current={active ? 'page' : undefined}>
              <Icon name={tab.icon} size={22} />
              <span>{tab.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
