import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireUser } from '@/lib/auth'

export async function PATCH(req: Request) {
  try {
    const user = await requireUser()
    const body = await req.json()
    const name = String(body.name ?? '').trim()
    const phone = String(body.phone ?? '').trim()
    const ign = String(body.ign ?? '').trim() || null
    const gameUid = String(body.gameUid ?? '').trim() || null
    if (!name || name.length > 80 || !phone || phone.length > 30) return NextResponse.json({ error: 'Enter a valid name and phone number.' }, { status: 400 })
    if (ign && ign.length > 40) return NextResponse.json({ error: 'IGN is too long.' }, { status: 400 })
    if (gameUid && gameUid.length > 40) return NextResponse.json({ error: 'Game UID is too long.' }, { status: 400 })
    const updated = await db.user.update({ where: { id: user.id }, data: { name, phone, ign, gameUid }, select: { id: true, name: true, email: true, phone: true, role: true, ign: true, gameUid: true } })
    return NextResponse.json({ user: updated })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    return NextResponse.json({ error: message === 'UNAUTHORIZED' ? 'Login required.' : 'Unable to update profile.' }, { status: message === 'UNAUTHORIZED' ? 401 : 500 })
  }
}
