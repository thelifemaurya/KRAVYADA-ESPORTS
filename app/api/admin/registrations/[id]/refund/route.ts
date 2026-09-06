import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStaff } from '@/lib/auth'

export async function POST(_req: Request, { params }: { params: Promise<{ id:string }> }) {
  try {
    const staff = await requireStaff()
    const { id } = await params
    const registration = await db.registration.findUnique({ where:{id} })
    if (!registration) return NextResponse.json({error:'Registration not found.'},{status:404})
    if (registration.paymentStatus !== 'PAID') return NextResponse.json({error:'Only paid registrations can be marked refunded.'},{status:400})
    const updated = await db.registration.update({where:{id},data:{paymentStatus:'REFUNDED'}})
    await db.auditLog.create({data:{actorId:staff.id,action:'MANUAL_REFUND',entity:'Registration',entityId:id,metadata:JSON.stringify({amount:registration.amount,paymentRef:registration.paymentRef})}})
    return NextResponse.json({registration:updated,note:'Refund recorded manually. Process the actual payment refund through the payment provider.'})
  } catch(error) {
    const message=error instanceof Error?error.message:''
    return NextResponse.json({error:message==='FORBIDDEN'?'Staff access required.':'Login required.'},{status:message==='FORBIDDEN'?403:401})
  }
}
