import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/db'
import { requireUser } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export async function POST(req: Request) {
  try {
    const user = await requireUser()
    if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'Payments are not configured yet.' }, { status: 503 })
    const { registrationId } = await req.json()
    const registration = await db.registration.findUnique({ where: { id: String(registrationId || '') }, include: { scrim: true, user: true } })
    if (!registration || registration.userId !== user.id) return NextResponse.json({ error: 'Registration not found.' }, { status: 404 })
    if (registration.paymentStatus === 'PAID') return NextResponse.json({ error: 'Registration is already paid.' }, { status: 409 })

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    if (!baseUrl) return NextResponse.json({ error: 'App URL is not configured.' }, { status: 503 })
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email,
      line_items: [{ price_data: { currency: 'inr', product_data: { name: registration.scrim.title, description: `${registration.scrim.game} • ${registration.scrim.category}` }, unit_amount: registration.amount * 100 }, quantity: 1 }],
      metadata: { registrationId: registration.id, scrimId: registration.scrimId, userId: user.id },
      success_url: `${baseUrl}/dashboard?payment=success&registration=${registration.id}`,
      cancel_url: `${baseUrl}/dashboard?payment=cancelled&registration=${registration.id}`,
    })
    await db.registration.update({ where: { id: registration.id }, data: { stripeSessionId: session.id, paymentRef: session.payment_intent ? String(session.payment_intent) : null } })
    return NextResponse.json({ url: session.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    return NextResponse.json({ error: message === 'UNAUTHORIZED' ? 'Login required.' : 'Unable to start payment.' }, { status: message === 'UNAUTHORIZED' ? 401 : 500 })
  }
}
