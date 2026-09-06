import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStaff } from '@/lib/auth'

export async function GET() {
  try {
    await requireStaff()
    const start=new Date(); start.setHours(0,0,0,0)
    const [activeScrims, todayRegistrations, paid, pendingPayments, registrations, scrims] = await Promise.all([
      db.scrim.count({ where: { status: { in: ['OPEN', 'FULL', 'LIVE'] } } }),
      db.registration.count({ where: { createdAt: { gte: start } } }),
      db.registration.aggregate({ _sum: { amount: true }, where: { paymentStatus: 'PAID' } }),
      db.registration.count({ where: { paymentStatus: 'PENDING' } }),
      db.registration.count(),
      db.scrim.findMany({ include: { _count: { select: { registrations: true } } }, orderBy: { startTime: 'asc' }, take: 50 }),
    ])
    return NextResponse.json({ metrics: { activeScrims, todayRegistrations, registrations, confirmedPayments: paid._sum.amount || 0, pendingPayments }, scrims })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    return NextResponse.json({ error: message === 'FORBIDDEN' ? 'Staff access required.' : 'Login required.' }, { status: message === 'FORBIDDEN' ? 403 : 401 })
  }
}
