import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!signature || !secret || !process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 400 })

  try {
    const event = stripe.webhooks.constructEvent(await req.text(), signature, secret)
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const registrationId = session.metadata?.registrationId
      if (registrationId) {
        await db.registration.updateMany({ where: { id: registrationId }, data: { paymentStatus: 'PAID', paymentRef: typeof session.payment_intent === 'string' ? session.payment_intent : session.id } })
      }
    }
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error', error)
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 })
  }
}
