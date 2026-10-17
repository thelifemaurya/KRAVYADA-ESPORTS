import { REST, SUPABASE_KEY } from './supabase'

export type Scrim = {
  id: string
  title: string
  starts_at: string
  map: string | null
  format: string | null
  slots: number | null
  entry_fee: number
  status: 'upcoming' | 'live' | 'completed' | 'cancelled'
  notes: string | null
}

export type Tournament = {
  id: string
  title: string
  starts_at: string
  ends_at: string | null
  format: string | null
  slots: number | null
  entry_fee: number
  prize_pool: string | null
  registration_url: string | null
  status: 'upcoming' | 'registration_open' | 'live' | 'completed' | 'cancelled'
  description: string | null
}

async function load<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${REST}/${path}`, {
      headers: { apikey: SUPABASE_KEY },
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    return (await res.json()) as T[]
  } catch {
    return []
  }
}

export function getUpcomingScrims() {
  return load<Scrim>('scrims?select=*&status=in.(upcoming,live)&order=starts_at.asc')
}

export function getUpcomingTournaments() {
  return load<Tournament>('tournaments?select=*&status=in.(upcoming,registration_open,live)&order=starts_at.asc')
}

const dateFmt = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: '2-digit',
})

export function formatWhen(iso: string) {
  return `${dateFmt.format(new Date(iso))} IST`
}

export function feeLabel(fee: number) {
  return fee > 0 ? `Entry ₹${fee}` : 'Free entry'
}

export function scrimDetail(s: Scrim) {
  return [s.format, s.map, s.slots ? `${s.slots} slots` : null, feeLabel(s.entry_fee), s.status === 'live' ? 'Live now' : null, s.notes]
    .filter(Boolean)
    .join(' · ')
}

export function tournamentDetail(t: Tournament) {
  return [
    t.prize_pool ? `Prize ${t.prize_pool}` : null,
    t.format,
    t.slots ? `${t.slots} slots` : null,
    feeLabel(t.entry_fee),
    t.status === 'registration_open' ? 'Registration open' : t.status === 'live' ? 'Live now' : null,
    t.description,
  ]
    .filter(Boolean)
    .join(' · ')
}
