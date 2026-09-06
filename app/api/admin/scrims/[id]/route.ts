import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStaff } from '@/lib/auth'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const staff = await requireStaff()
    const { id } = await params
    const body = await req.json()
    const data: Record<string, unknown> = {}
    for (const key of ['title','game','category','description','rules','bannerUrl','entryFee','prizePool','totalSlots','status']) if (body[key] !== undefined) data[key] = body[key]
    for (const key of ['date','startTime','registrationDeadline']) if (body[key] !== undefined) data[key] = new Date(body[key])
    const scrim = await db.scrim.update({ where: { id }, data: data as never })
    await db.auditLog.create({ data: { actorId: staff.id, action: 'UPDATE', entity: 'Scrim', entityId: id, metadata: JSON.stringify(Object.keys(data)) } })
    return NextResponse.json({ scrim })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    return NextResponse.json({ error: message === 'UNAUTHORIZED' ? 'Login required.' : message === 'FORBIDDEN' ? 'Staff access required.' : 'Unable to update scrim.' }, { status: message === 'UNAUTHORIZED' ? 401 : message === 'FORBIDDEN' ? 403 : 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const staff = await requireStaff()
    const { id } = await params
    await db.scrim.update({ where: { id }, data: { status: 'CANCELLED' } })
    await db.auditLog.create({ data: { actorId: staff.id, action: 'CANCEL', entity: 'Scrim', entityId: id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    return NextResponse.json({ error: message === 'UNAUTHORIZED' ? 'Login required.' : message === 'FORBIDDEN' ? 'Staff access required.' : 'Unable to cancel scrim.' }, { status: message === 'UNAUTHORIZED' ? 401 : message === 'FORBIDDEN' ? 403 : 500 })
  }
}
