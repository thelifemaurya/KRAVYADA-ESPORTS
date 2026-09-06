import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const allowed=['DRAFT','OPEN','FULL','CLOSED','LIVE','COMPLETED','CANCELLED'] as const

export async function GET(req:Request) {
  const status=new URL(req.url).searchParams.get('status')
  const requested=status&&allowed.includes(status as typeof allowed[number]) ? status as typeof allowed[number] : null
  const where=requested?{status:requested}:{status:{in:['OPEN','FULL','LIVE'] as const}}
  const scrims=await db.scrim.findMany({where,orderBy:{startTime:requested==='COMPLETED'?'desc':'asc'},take:100,select:{id:true,title:true,game:true,category:true,description:true,rules:true,bannerUrl:true,date:true,startTime:true,registrationDeadline:true,entryFee:true,prizePool:true,totalSlots:true,status:true,_count:{select:{registrations:{where:{paymentStatus:{not:'REFUNDED'}}}}}}})
  return NextResponse.json({scrims})
}
