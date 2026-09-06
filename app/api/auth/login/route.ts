import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { COOKIE, makeSession, verifyPassword } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = String(body.email ?? '').trim().toLowerCase()
    const password = String(body.password ?? '')
    if (!email || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })

    const user = await db.user.findUnique({ where: { email } })
    if (!user || !verifyPassword(password, user.passwordHash)) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })

    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } })
    response.cookies.set(COOKIE, makeSession(user.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Unable to login.' }, { status: 500 })
  }
}
