import { cookies } from 'next/headers'
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import { db } from './db'

const COOKIE = 'kravyada_session'

function getSecret() {
  const value = process.env.SESSION_SECRET
  if (!value && process.env.NODE_ENV === 'production') throw new Error('SESSION_SECRET is not configured')
  return value || 'development-only-secret'
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `scrypt$${salt}$${hash}`
}

export function verifyPassword(password: string, stored: string) {
  try {
    const [, salt, expected] = stored.split('$')
    if (!salt || !expected) return false
    const actual = scryptSync(password, salt, 64)
    const target = Buffer.from(expected, 'hex')
    return target.length === actual.length && timingSafeEqual(target, actual)
  } catch { return false }
}

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(value).digest('base64url')
}

export function makeSession(userId: string) {
  const payload = Buffer.from(JSON.stringify({ sub: userId, exp: Date.now() + 1000 * 60 * 60 * 24 * 30 })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function readSession(value?: string) {
  if (!value) return null
  const [payload, signature] = value.split('.')
  if (!payload || !signature) return null
  try {
    const expected = Buffer.from(sign(payload))
    const received = Buffer.from(signature)
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (!data.sub || typeof data.exp !== 'number' || data.exp < Date.now()) return null
    return data.sub as string
  } catch { return null }
}

export async function getCurrentUser() {
  const store = await cookies()
  const id = readSession(store.get(COOKIE)?.value)
  if (!id) return null
  return db.user.findUnique({ where: { id } })
}

export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) throw new Error('UNAUTHORIZED')
  return user
}

export async function requireStaff() {
  const user = await requireUser()
  if (!['ADMIN', 'HOST', 'MODERATOR'].includes(user.role)) throw new Error('FORBIDDEN')
  return user
}

export { COOKIE }
