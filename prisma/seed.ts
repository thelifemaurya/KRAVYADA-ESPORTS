import { PrismaClient } from '@prisma/client'
import { randomBytes, scryptSync } from 'crypto'

const db = new PrismaClient()

function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `scrypt$${salt}$${hash}`
}

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required for seeding.')
  if (password.length < 8) throw new Error('ADMIN_PASSWORD must be at least 8 characters.')

  const user = await db.user.upsert({
    where: { email },
    update: { role: 'ADMIN', passwordHash: hashPassword(password) },
    create: { name: 'KRAVYADA Admin', email, phone: '0000000000', role: 'ADMIN', passwordHash: hashPassword(password) },
  })
  console.log(`Admin ready: ${user.email}`)
}

main().catch(error => { console.error(error); process.exit(1) }).finally(() => db.$disconnect())
