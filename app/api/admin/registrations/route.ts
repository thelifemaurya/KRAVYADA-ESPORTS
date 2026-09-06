import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStaff } from '@/lib/auth'

export async function GET() {
  try {
    await requireStaff()
    const registrations = await db.registration.findMany({
      select: {
        id:true,code:true,slotNumber:true,teamName:true,playerData:true,amount:true,paymentStatus:true,paymentRef:true,createdAt:true,
        user:{select:{id:true,name:true,email:true,phone:true,ign:true,gameUid:true}},
        scrim:{select:{id:true,title:true,game:true,category:true,startTime:true}},
      },
      orderBy:{createdAt:'desc'},take:500,
    })
    return NextResponse.json({ registrations })
  } catch (error) {
    const message=error instanceof Error?error.message:''
    return NextResponse.json({error:message==='FORBIDDEN'?'Staff access required.':'Login required.'},{status:message==='FORBIDDEN'?403:401})
  }
}
