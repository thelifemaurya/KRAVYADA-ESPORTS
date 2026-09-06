import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStaff } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const staff = await requireStaff()
    const body = await req.json()
    const title = String(body.title ?? '').trim()
    const game = String(body.game ?? '').trim()
    const category = String(body.category ?? '').trim()
    const date = new Date(body.date)
    const startTime = new Date(body.startTime)
    const deadlineRaw = String(body.registrationDeadline ?? '').trim()
    const registrationDeadline = deadlineRaw ? new Date(deadlineRaw) : new Date(startTime.getTime() - 10 * 60 * 1000)
    const entryFee = Number(body.entryFee)
    const prizePool = Number(body.prizePool)
    const totalSlots = Number(body.totalSlots)
    if (!title || !game || !category || [date, startTime, registrationDeadline].some(Number.isNaN) || registrationDeadline > startTime || !Number.isInteger(entryFee) || entryFee < 0 || !Number.isInteger(prizePool) || prizePool < 0 || !Number.isInteger(totalSlots) || totalSlots < 1) {
      return NextResponse.json({ error: 'Invalid scrim data. Check dates, deadline and numeric fields.' }, { status: 400 })
    }
    const scrim = await db.scrim.create({ data: { title, game, category, description: body.description || null, rules: body.rules || null, bannerUrl: body.bannerUrl || null, date, startTime, registrationDeadline, entryFee, prizePool, totalSlots, status: 'DRAFT' } })
    await db.auditLog.create({ data: { actorId: staff.id, action: 'CREATE', entity: 'Scrim', entityId: scrim.id, metadata: JSON.stringify({ title }) } })
    return NextResponse.json({ scrim }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error && ['UNAUTHORIZED', 'FORBIDDEN'].includes(error.message) ? error.message : 'Unable to create scrim.'
    return NextResponse.json({ error: message }, { status: message === 'FORBIDDEN' ? 403 : message === 'UNAUTHORIZED' ? 401 : 500 })
  }
}
