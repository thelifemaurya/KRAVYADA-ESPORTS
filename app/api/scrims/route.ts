import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const scrims = await db.scrim.findMany({ where: { status: { in: ['OPEN', 'FULL', 'LIVE'] } }, orderBy: { startTime: 'asc' } })
  return NextResponse.json({ scrims })
}
