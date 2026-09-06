import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireUser } from '@/lib/auth'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    const { id } = await params
    const registration = await db.registration.findUnique({ where: { id }, include: { scrim: true } })
    if (!registration || registration.userId !== user.id) return NextResponse.json({ error: 'Registration not found.' }, { status: 404 })
    if (!registration.scrim.credentialsPublishedAt || !registration.scrim.roomId || !registration.scrim.roomPassword) return NextResponse.json({ error: 'Credentials have not been published yet.' }, { status: 404 })
    return NextResponse.json({ roomId: registration.scrim.roomId, roomPassword: registration.scrim.roomPassword })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    return NextResponse.json({ error: message === 'UNAUTHORIZED' ? 'Login required.' : 'Unable to load credentials.' }, { status: message === 'UNAUTHORIZED' ? 401 : 500 })
  }
}
