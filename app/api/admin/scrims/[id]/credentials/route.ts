import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStaff } from '@/lib/auth'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const staff = await requireStaff()
    const { id } = await params
    const body = await req.json()
    const roomId = String(body.roomId ?? '').trim()
    const roomPassword = String(body.roomPassword ?? '').trim()
    if (!roomId || !roomPassword) return NextResponse.json({ error: 'Room ID and password are required.' }, { status: 400 })
    const scrim = await db.scrim.update({ where: { id }, data: { roomId, roomPassword, credentialsPublishedAt: new Date() } })
    await db.auditLog.create({ data: { actorId: staff.id, action: 'PUBLISH_CREDENTIALS', entity: 'Scrim', entityId: id } })
    return NextResponse.json({ ok: true, scrim: { id: scrim.id, credentialsPublishedAt: scrim.credentialsPublishedAt } })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    return NextResponse.json({ error: message === 'UNAUTHORIZED' ? 'Login required.' : message === 'FORBIDDEN' ? 'Staff access required.' : 'Unable to publish credentials.' }, { status: message === 'UNAUTHORIZED' ? 401 : message === 'FORBIDDEN' ? 403 : 500 })
  }
}
