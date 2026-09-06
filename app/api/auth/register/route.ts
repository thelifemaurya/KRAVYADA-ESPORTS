import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim().toLowerCase()
    const phone = String(body.phone ?? '').trim()
    const password = String(body.password ?? '')
    const ign = String(body.ign ?? '').trim() || null
    const gameUid = String(body.gameUid ?? '').trim() || null

    if (!name || !email || !phone || password.length < 8) {
      return NextResponse.json({ error: 'Name, email, phone and an 8+ character password are required.' }, { status: 400 })
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 })

    const exists = await db.user.findUnique({ where: { email } })
    if (exists) return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })

    const user = await db.user.create({
      data: { name, email, phone, passwordHash: hashPassword(password), ign, gameUid },
      select: { id: true, name: true, email: true, role: true },
    })
    return NextResponse.json({ user }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Unable to create account.' }, { status: 500 })
  }
}
