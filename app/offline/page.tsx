import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Offline',
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1 className="page-title">You are offline</h1>
        <p className="lead">
          This page has not been saved on your phone yet. Reconnect to the internet and try again.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-red" href="/">
            Back to home
          </Link>
        </div>
      </header>
    </div>
  )
}
