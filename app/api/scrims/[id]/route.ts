import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){
  const {id}=await params
  const scrim=await db.scrim.findUnique({
    where:{id},
    select:{
      id:true,title:true,game:true,category:true,description:true,rules:true,bannerUrl:true,date:true,startTime:true,
      registrationDeadline:true,entryFee:true,prizePool:true,totalSlots:true,status:true,createdAt:true,
      _count:{select:{registrations:{where:{paymentStatus:{not:'REFUNDED'}}}}},
    },
  })
  if(!scrim)return NextResponse.json({error:'Scrim not found.'},{status:404})
  return NextResponse.json({scrim:{...scrim,remainingSlots:Math.max(0,scrim.totalSlots-scrim._count.registrations)}})
}
