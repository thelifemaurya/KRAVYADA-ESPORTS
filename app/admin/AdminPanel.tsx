'use client'

import { useCallback, useEffect, useState } from 'react'
import { AUTH, REST, SUPABASE_KEY } from '../lib/supabase'

type Session = { access_token: string; refresh_token: string; expires_at: number; email: string }
type Val = string | number | boolean | null
type Row = Record<string, Val> & { id: string }
type Kind = 'scrims' | 'tournaments'

type Field = {
  name: string
  label: string
  type: 'text' | 'number' | 'datetime' | 'select' | 'url' | 'textarea' | 'checkbox'
  required?: boolean
  options?: string[]
  help?: string
}

const FIELDS: Record<Kind, Field[]> = {
  scrims: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'starts_at', label: 'Starts (IST)', type: 'datetime', required: true },
    { name: 'format', label: 'Format', type: 'text', help: 'e.g. Squad, Duo, Solo' },
    { name: 'map', label: 'Map', type: 'text', help: 'e.g. Bermuda, Purgatory' },
    { name: 'slots', label: 'Slots', type: 'number' },
    { name: 'entry_fee', label: 'Entry fee (₹)', type: 'number', help: '0 for free' },
    { name: 'status', label: 'Status', type: 'select', options: ['upcoming', 'live', 'completed', 'cancelled'] },
    { name: 'registration_open', label: 'Registration open', type: 'checkbox', help: 'Players can register while this is on.' },
    { name: 'notes', label: 'Notes', type: 'textarea', help: 'Shown to the public. Do not put room ID or password here.' },
  ],
  tournaments: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'starts_at', label: 'Starts (IST)', type: 'datetime', required: true },
    { name: 'ends_at', label: 'Ends (IST)', type: 'datetime' },
    { name: 'format', label: 'Format', type: 'text' },
    { name: 'slots', label: 'Slots', type: 'number' },
    { name: 'entry_fee', label: 'Entry fee (₹)', type: 'number', help: '0 for free' },
    { name: 'prize_pool', label: 'Prize pool', type: 'text', help: 'e.g. ₹5,000' },
    { name: 'registration_url', label: 'Registration link', type: 'url' },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: ['upcoming', 'registration_open', 'live', 'completed', 'cancelled'],
    },
    { name: 'registration_open', label: 'Registration open', type: 'checkbox', help: 'Players can register while this is on.' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
}

const STORE_KEY = 'kravyada-admin-session'
const IST_OFFSET_MS = 330 * 60 * 1000

function toInput(iso: Val) {
  if (!iso) return ''
  return new Date(new Date(String(iso)).getTime() + IST_OFFSET_MS).toISOString().slice(0, 16)
}

function fromInput(value: string) {
  return value ? new Date(`${value}:00+05:30`).toISOString() : null
}

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

function saveSession(session: Session | null) {
  try {
    if (session) localStorage.setItem(STORE_KEY, JSON.stringify(session))
    else localStorage.removeItem(STORE_KEY)
  } catch {
    /* storage unavailable: the session just lasts until the tab closes */
  }
}

async function tokenRequest(body: Record<string, string>, grant: string): Promise<Session> {
  const res = await fetch(`${AUTH}/token?grant_type=${grant}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok || !json.access_token) throw new Error(json.error_description || json.msg || 'Login failed')
  return {
    access_token: json.access_token,
    refresh_token: json.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + (json.expires_in ?? 3600),
    email: json.user?.email ?? '',
  }
}

export default function AdminPanel() {
  const [session, setSession] = useState<Session | null>(null)
  const [ready, setReady] = useState(false)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [error, setError] = useState('')

  const getToken = useCallback(async (current: Session): Promise<string> => {
    if (current.expires_at - 60 > Math.floor(Date.now() / 1000)) return current.access_token
    const next = await tokenRequest({ refresh_token: current.refresh_token }, 'refresh_token')
    saveSession(next)
    setSession(next)
    return next.access_token
  }, [])

  const authed = useCallback(
    async (current: Session, path: string, init: RequestInit = {}) => {
      const token = await getToken(current)
      const res = await fetch(`${REST}/${path}`, {
        ...init,
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
          ...(init.headers ?? {}),
        },
      })
      if (!res.ok) {
        let message = `Request failed (${res.status})`
        try {
          const body = await res.json()
          message = body.message || message
        } catch {
          /* keep default message */
        }
        throw new Error(message)
      }
      return res.status === 204 ? null : res.json()
    },
    [getToken],
  )

  useEffect(() => {
    const stored = readSession()
    setSession(stored)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!session) {
      setIsAdmin(null)
      return
    }
    let cancelled = false
    authed(session, 'rpc/is_admin', { method: 'POST', body: '{}' })
      .then((value) => !cancelled && setIsAdmin(value === true))
      .catch(() => {
        if (cancelled) return
        saveSession(null)
        setSession(null)
        setError('Your session expired. Please sign in again.')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.email])

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const data = new FormData(event.currentTarget)
    try {
      const next = await tokenRequest(
        { email: String(data.get('email')).trim(), password: String(data.get('password')) },
        'password',
      )
      saveSession(next)
      setSession(next)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed')
    }
  }

  function signOut() {
    saveSession(null)
    setSession(null)
    setIsAdmin(null)
  }

  if (!ready) return null

  if (!session) {
    return (
      <form className="form admin-login" onSubmit={signIn}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="username" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        <button className="btn btn-red" type="submit">
          Sign in
        </button>
        {error && <p className="form-status" role="alert">{error}</p>}
      </form>
    )
  }

  if (isAdmin === null) return <p className="note">Checking access…</p>

  if (!isAdmin) {
    return (
      <div className="empty">
        <strong>This account is not an admin.</strong>
        {session.email} is signed in, but it is not on the admin list.
        <div className="hero-actions">
          <button className="btn" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return (
    <Dashboard
      email={session.email}
      signOut={signOut}
      api={(path, init) => authed(session, path, init)}
    />
  )
}

type Api = (path: string, init?: RequestInit) => Promise<unknown>

function Dashboard({ email, signOut, api }: { email: string; signOut: () => void; api: Api }) {
  const [kind, setKind] = useState<Kind>('scrims')
  const [view, setView] = useState<'events' | 'registrations'>('events')
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Row | 'new' | null>(null)
  const [message, setMessage] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setRows((await api(`${kind}?select=*&order=starts_at.desc`)) as Row[])
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not load')
    }
    setLoading(false)
  }, [api, kind])

  useEffect(() => {
    setEditing(null)
    setMessage('')
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind])

  async function save(values: Record<string, Val>, id?: string) {
    setMessage('')
    try {
      if (id) await api(`${kind}?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(values) })
      else await api(kind, { method: 'POST', body: JSON.stringify(values) })
      setEditing(null)
      await load()
      setMessage('Saved.')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not save')
    }
  }

  async function remove(row: Row) {
    if (!window.confirm(`Delete "${row.title}" along with its registrations and room details? This cannot be undone.`)) return
    try {
      const type = kind === 'scrims' ? 'scrim' : 'tournament'
      await api(`registrations?event_type=eq.${type}&event_id=eq.${row.id}`, { method: 'DELETE' })
      await api(`room_details?event_type=eq.${type}&event_id=eq.${row.id}`, { method: 'DELETE' })
      await api(`${kind}?id=eq.${row.id}`, { method: 'DELETE' })
      await load()
      setMessage('Deleted.')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not delete')
    }
  }

  async function setStatus(row: Row, status: string) {
    await save({ status }, row.id)
  }

  const statusField = FIELDS[kind].find((f) => f.name === 'status')

  return (
    <div className="admin">
      <div className="admin-bar">
        <div className="admin-tabs" role="tablist">
          {(['scrims', 'tournaments'] as Kind[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={view === 'events' && kind === k}
              className={`admin-tab${view === 'events' && kind === k ? ' is-on' : ''}`}
              onClick={() => {
                setView('events')
                setKind(k)
              }}
            >
              {k === 'scrims' ? 'Scrims' : 'Tournaments'}
            </button>
          ))}
          <button
            role="tab"
            aria-selected={view === 'registrations'}
            className={`admin-tab${view === 'registrations' ? ' is-on' : ''}`}
            onClick={() => setView('registrations')}
          >
            Registrations
          </button>
        </div>
        <div className="admin-who">
          <span>{email}</span>
          <button className="btn btn-sm" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>

      {message && <p className="form-status" role="status">{message}</p>}

      {view === 'registrations' ? (
        <RegistrationsTab api={api} />
      ) : editing ? (
        <EditForm
          key={editing === 'new' ? 'new' : editing.id}
          fields={FIELDS[kind]}
          row={editing === 'new' ? null : editing}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      ) : (
        <>
          <div className="hero-actions">
            <button className="btn btn-red" onClick={() => setEditing('new')}>
              Add {kind === 'scrims' ? 'scrim' : 'tournament'}
            </button>
          </div>
          {loading ? (
            <p className="note">Loading…</p>
          ) : rows.length === 0 ? (
            <div className="empty">
              <strong>Nothing here yet.</strong>
              Add your first {kind === 'scrims' ? 'scrim' : 'tournament'}.
            </div>
          ) : (
            <ul className="rows admin-list">
              {rows.map((row) => (
                <li className="row" key={row.id}>
                  <h3>{row.title}</h3>
                  <p>
                    {new Date(String(row.starts_at)).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}{' '}
                    IST · {Number(row.entry_fee) > 0 ? `₹${row.entry_fee}` : 'Free'}
                    {row.slots ? ` · ${row.slots} slots` : ''}
                  </p>
                  <div className="admin-actions">
                    <select
                      aria-label={`Status of ${row.title}`}
                      value={String(row.status)}
                      onChange={(e) => setStatus(row, e.target.value)}
                    >
                      {statusField?.options?.map((o) => (
                        <option key={o} value={o}>
                          {o.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                    <button className="btn btn-sm" onClick={() => setEditing(row)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-ghost" onClick={() => remove(row)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

function EditForm({
  fields,
  row,
  onCancel,
  onSave,
}: {
  fields: Field[]
  row: Row | null
  onCancel: () => void
  onSave: (values: Record<string, Val>, id?: string) => Promise<void>
}) {
  const [busy, setBusy] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    const data = new FormData(event.currentTarget)
    const values: Record<string, Val> = {}
    for (const f of fields) {
      const raw = String(data.get(f.name) ?? '').trim()
      if (f.type === 'checkbox') values[f.name] = data.has(f.name)
      else if (f.type === 'datetime') values[f.name] = fromInput(raw)
      else if (f.type === 'number') values[f.name] = raw === '' ? (f.name === 'entry_fee' ? 0 : null) : Number(raw)
      else values[f.name] = raw === '' && !f.required && f.type !== 'select' ? null : raw
    }
    await onSave(values, row?.id)
    setBusy(false)
  }

  return (
    <form className="form" onSubmit={submit}>
      {fields.map((f) => {
        const initial = row ? row[f.name] : f.name === 'status' ? 'upcoming' : f.name === 'entry_fee' ? 0 : ''
        const common = { id: `f-${f.name}`, name: f.name, required: f.required }
        return (
          <div className="field" key={f.name}>
            <label htmlFor={common.id}>{f.label}</label>
            {f.type === 'checkbox' ? (
              <input
                id={common.id}
                name={f.name}
                type="checkbox"
                defaultChecked={row ? Boolean(row[f.name]) : true}
              />
            ) : f.type === 'select' ? (
              <select {...common} defaultValue={String(initial ?? '')}>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o.replace('_', ' ')}
                  </option>
                ))}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea {...common} rows={3} defaultValue={String(initial ?? '')} />
            ) : f.type === 'datetime' ? (
              <input {...common} type="datetime-local" defaultValue={toInput(initial)} />
            ) : (
              <input
                {...common}
                type={f.type === 'number' ? 'number' : f.type === 'url' ? 'url' : 'text'}
                min={f.type === 'number' ? 0 : undefined}
                defaultValue={String(initial ?? '')}
              />
            )}
            {f.help && <small>{f.help}</small>}
          </div>
        )
      })}
      <div className="hero-actions">
        <button className="btn btn-red" type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Save'}
        </button>
        <button className="btn" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

type EventOption = { key: string; type: 'scrim' | 'tournament'; id: string; title: string; starts_at: string }
type Registration = {
  id: string
  team_name: string
  leader_ign: string
  leader_uid: string
  contact: string
  status: 'pending' | 'approved' | 'rejected'
  access_code: string
  created_at: string
}

function RegistrationsTab({ api }: { api: Api }) {
  const [events, setEvents] = useState<EventOption[]>([])
  const [selected, setSelected] = useState('')
  const [regs, setRegs] = useState<Registration[]>([])
  const [roomId, setRoomId] = useState('')
  const [roomPass, setRoomPass] = useState('')
  const [published, setPublished] = useState(false)
  const [note, setNote] = useState('')

  useEffect(() => {
    ;(async () => {
      const [s, t] = (await Promise.all([
        api('scrims?select=id,title,starts_at&order=starts_at.desc'),
        api('tournaments?select=id,title,starts_at&order=starts_at.desc'),
      ])) as [Row[], Row[]]
      const list: EventOption[] = [
        ...s.map((r) => ({ key: `scrim:${r.id}`, type: 'scrim' as const, id: r.id, title: String(r.title), starts_at: String(r.starts_at) })),
        ...t.map((r) => ({ key: `tournament:${r.id}`, type: 'tournament' as const, id: r.id, title: String(r.title), starts_at: String(r.starts_at) })),
      ].sort((a, b) => b.starts_at.localeCompare(a.starts_at))
      setEvents(list)
      if (list[0]) setSelected(list[0].key)
    })().catch((e) => setNote(e instanceof Error ? e.message : 'Could not load events'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const current = events.find((e) => e.key === selected)

  const loadEvent = useCallback(async () => {
    if (!current) return
    setNote('')
    try {
      const filter = `event_type=eq.${current.type}&event_id=eq.${current.id}`
      setRegs((await api(`registrations?select=*&${filter}&order=created_at.asc`)) as Registration[])
      const room = (await api(`room_details?select=*&${filter}`)) as Row[]
      setRoomId(String(room[0]?.room_id ?? ''))
      setRoomPass(String(room[0]?.room_password ?? ''))
      setPublished(Boolean(room[0]?.published))
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not load')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, events])

  useEffect(() => {
    loadEvent()
  }, [loadEvent])

  async function setStatus(reg: Registration, status: Registration['status']) {
    try {
      await api(`registrations?id=eq.${reg.id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
      await loadEvent()
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not update')
    }
  }

  async function removeReg(reg: Registration) {
    if (!window.confirm(`Delete the registration of "${reg.team_name}"?`)) return
    try {
      await api(`registrations?id=eq.${reg.id}`, { method: 'DELETE' })
      await loadEvent()
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not delete')
    }
  }

  async function saveRoom(nextPublished: boolean) {
    if (!current) return
    try {
      await api('room_details', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify({
          event_type: current.type,
          event_id: current.id,
          room_id: roomId.trim() || null,
          room_password: roomPass.trim() || null,
          published: nextPublished,
          updated_at: new Date().toISOString(),
        }),
      })
      setPublished(nextPublished)
      setNote(nextPublished ? 'Room details published to approved squads.' : 'Room details saved and hidden.')
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not save room details')
    }
  }

  if (events.length === 0) {
    return (
      <div className="empty">
        <strong>No events yet.</strong>
        Add a scrim or tournament first, then its registrations show up here.
      </div>
    )
  }

  const approved = regs.filter((r) => r.status === 'approved').length

  return (
    <div className="admin">
      {note && <p className="form-status" role="status">{note}</p>}
      <div className="field">
        <label htmlFor="reg-event">Event</label>
        <select id="reg-event" value={selected} onChange={(e) => setSelected(e.target.value)}>
          {events.map((e) => (
            <option key={e.key} value={e.key}>
              {e.type === 'scrim' ? 'Scrim' : 'Tournament'}: {e.title}
            </option>
          ))}
        </select>
      </div>

      <div className="form">
        <h3>Room ID and password</h3>
        <p className="note">
          Approved squads see these in the "Get your ID and password" section once you publish. Hidden until then.
        </p>
        <div className="field-row">
          <div className="field">
            <label htmlFor="room-id">Room ID</label>
            <input id="room-id" value={roomId} onChange={(e) => setRoomId(e.target.value)} maxLength={40} autoComplete="off" />
          </div>
          <div className="field">
            <label htmlFor="room-pass">Password</label>
            <input id="room-pass" value={roomPass} onChange={(e) => setRoomPass(e.target.value)} maxLength={40} autoComplete="off" />
          </div>
        </div>
        <div className="hero-actions">
          <button className="btn btn-red" onClick={() => saveRoom(true)}>
            {published ? 'Update and keep published' : 'Save and publish'}
          </button>
          {published && (
            <button className="btn" onClick={() => saveRoom(false)}>
              Hide from players
            </button>
          )}
        </div>
        <p className="note">Status: {published ? 'Published' : 'Hidden'}</p>
      </div>

      <h3>
        Registrations ({regs.length}) · approved {approved}
      </h3>
      {regs.length === 0 ? (
        <div className="empty">
          <strong>No registrations yet.</strong>
        </div>
      ) : (
        <ul className="rows admin-list">
          {regs.map((r) => (
            <li className="row" key={r.id}>
              <h3>{r.team_name}</h3>
              <p>
                {r.leader_ign} · UID {r.leader_uid} · {r.contact} · {r.status}
              </p>
              <div className="admin-actions">
                {r.status !== 'approved' && (
                  <button className="btn btn-sm btn-red" onClick={() => setStatus(r, 'approved')}>
                    Approve
                  </button>
                )}
                {r.status !== 'rejected' && (
                  <button className="btn btn-sm" onClick={() => setStatus(r, 'rejected')}>
                    Reject
                  </button>
                )}
                <button className="btn btn-sm btn-ghost" onClick={() => removeReg(r)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
