'use client'

import { useEffect, useState } from 'react'
import { REST, SUPABASE_KEY } from '../lib/supabase'
import type { OpenEvent } from '../lib/events'

type Lookup = {
  found: boolean
  status?: 'pending' | 'approved' | 'rejected'
  team_name?: string
  event_title?: string
  starts_at?: string
  event_status?: string
  room_id?: string | null
  room_password?: string | null
}

const CODE_KEY = 'kravyada-last-code'

async function rpc<T>(name: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${REST}/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Something went wrong. Please try again.')
  return (await res.json()) as T
}

function when(iso: string) {
  return (
    new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) + ' IST'
  )
}

export default function RegisterClient({ events }: { events: OpenEvent[] }) {
  return (
    <>
      <section className="section" id="register" aria-labelledby="reg-title">
        <div className="section-head">
          <h2 id="reg-title">1. Register your squad</h2>
        </div>
        <RegisterForm events={events} />
      </section>
      <section className="section" id="room" aria-labelledby="room-title">
        <div className="section-head">
          <h2 id="room-title">2. Get your ID and password</h2>
          <p>Only squads whose registration is approved can see the room details.</p>
        </div>
        <RoomLookup />
      </section>
    </>
  )
}

function RegisterForm({ events }: { events: OpenEvent[] }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const [approved, setApproved] = useState(false)
  const [preselect, setPreselect] = useState('')

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('event')
    if (wanted && events.some((e) => `${e.type}:${e.id}` === wanted)) setPreselect(wanted)
  }, [events])

  if (events.length === 0) {
    return (
      <div className="empty">
        <strong>No registrations are open right now.</strong>
        New scrims and tournaments open here first, so check back soon or follow our Discord and Instagram.
      </div>
    )
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setBusy(true)
    const form = event.currentTarget
    const data = new FormData(form)
    const [type, id] = String(data.get('event')).split(':')
    try {
      const out = await rpc<{ ok: boolean; code?: string; status?: string; error?: string }>('register_for_event', {
        p_event_type: type,
        p_event_id: id,
        p_team_name: String(data.get('team')),
        p_leader_ign: String(data.get('ign')),
        p_leader_uid: String(data.get('uid')),
        p_contact: String(data.get('contact')),
      })
      if (!out.ok || !out.code) {
        setError(out.error || 'Could not register.')
      } else {
        setCode(out.code)
        setApproved(out.status === 'approved')
        try {
          localStorage.setItem(CODE_KEY, out.code)
        } catch {
          /* storage unavailable */
        }
        form.reset()
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not register.')
    }
    setBusy(false)
  }

  if (code) {
    return (
      <div className="band">
        <h3>{approved ? 'Slot confirmed' : 'Registration received'}</h3>
        <p className="lead">
          {approved
            ? 'You got a slot. Save your access code below. Use it to get the room ID and password once they are published.'
            : 'We will approve your registration after checking it. Save your access code below. Use it to see your status and, once approved, the room ID and password.'}
        </p>
        <p className="reg-code" aria-label="Access code">{code}</p>
        <div className="hero-actions">
          <button className="btn btn-red" onClick={() => navigator.clipboard?.writeText(code)}>
            Copy code
          </button>
          <a className="btn" href="#room">
            Go to ID and password
          </a>
          <button className="btn btn-ghost" onClick={() => setCode('')}>
            Register another squad
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="event">Event</label>
        <select id="event" name="event" required key={preselect} defaultValue={preselect}>
          <option value="" disabled>
            Choose a scrim or tournament
          </option>
          {events.map((e) => (
            <option key={`${e.type}:${e.id}`} value={`${e.type}:${e.id}`}>
              {e.type === 'scrim' ? 'Scrim' : 'Tournament'}: {e.title} · {when(e.starts_at)}
              {e.entry_fee > 0 ? ` · ₹${e.entry_fee}` : ' · Free'}
            </option>
          ))}
        </select>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="team">Team name</label>
          <input id="team" name="team" required maxLength={60} autoComplete="off" />
        </div>
        <div className="field">
          <label htmlFor="ign">Leader in-game name</label>
          <input id="ign" name="ign" required maxLength={40} autoComplete="off" />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="uid">Leader Free Fire UID</label>
          <input id="uid" name="uid" required inputMode="numeric" pattern="[0-9]{5,15}" maxLength={15} autoComplete="off" />
        </div>
        <div className="field">
          <label htmlFor="contact">WhatsApp number or Discord</label>
          <input id="contact" name="contact" required maxLength={80} autoComplete="off" />
          <small>We only use this to reach you about this event.</small>
        </div>
      </div>
      <div className="hero-actions">
        <button className="btn btn-red" type="submit" disabled={busy}>
          {busy ? 'Registering…' : 'Register'}
        </button>
      </div>
      {error && <p className="form-status" role="alert">{error}</p>}
    </form>
  )
}

function RoomLookup() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState<Lookup | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CODE_KEY)
      if (saved) setCode(saved)
    } catch {
      /* storage unavailable */
    }
  }, [])

  async function check(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setResult(null)
    setBusy(true)
    try {
      const out = await rpc<Lookup>('lookup_registration', { p_code: code })
      if (!out.found) setError('No registration found for this code. Check it and try again.')
      else setResult(out)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not check.')
    }
    setBusy(false)
  }

  return (
    <div className="room">
      <form className="form" onSubmit={check}>
        <div className="field">
          <label htmlFor="code">Access code</label>
          <input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            maxLength={20}
            autoComplete="off"
            autoCapitalize="characters"
          />
        </div>
        <div className="hero-actions">
          <button className="btn btn-red" type="submit" disabled={busy}>
            {busy ? 'Checking…' : 'Check status'}
          </button>
        </div>
        {error && <p className="form-status" role="alert">{error}</p>}
      </form>

      {result && (
        <div className="band room-result" role="status">
          <h3>{result.event_title}</h3>
          <p>
            {result.team_name}
            {result.starts_at ? ` · ${when(result.starts_at)}` : ''}
          </p>
          {result.status === 'pending' && (
            <p className="lead">Your registration is received and waiting for approval. Check again later.</p>
          )}
          {result.status === 'rejected' && (
            <p className="lead">This registration was not approved. Contact us on Discord or Instagram if you think this is a mistake.</p>
          )}
          {result.status === 'approved' &&
            (result.room_id ? (
              <dl className="room-ids">
                <div>
                  <dt>Room ID</dt>
                  <dd>{result.room_id}</dd>
                </div>
                <div>
                  <dt>Password</dt>
                  <dd>{result.room_password}</dd>
                </div>
              </dl>
            ) : (
              <p className="lead">
                You are approved. The room ID and password are not published yet. They appear here shortly before the match.
              </p>
            ))}
        </div>
      )}
    </div>
  )
}
