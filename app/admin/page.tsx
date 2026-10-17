import type { Metadata } from 'next'
import AdminPanel from './AdminPanel'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1 className="page-title">Admin</h1>
        <p className="lead">Manage scrims and tournaments. What you save here shows on the public site within a minute.</p>
      </header>
      <section className="section" aria-label="Admin panel">
        <AdminPanel />
      </section>
    </div>
  )
}
