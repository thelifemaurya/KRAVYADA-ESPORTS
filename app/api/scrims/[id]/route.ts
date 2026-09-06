import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){
  const {id}=await params
  const scrim=await db.scrim.findUnique({where:{id},include:{_count:{select:{registrations:true}}}})
  if(!scrim)return NextResponse.json({error:'Scrim not found.'},{status:404})
  return NextResponse.json({scrim:{...scrim,roomId:undefined,roomPassword:undefined,credentialsPublishedAt:undefined,remainingSlots:Math.max(0,scrim.totalSlots-scrim._count.registrations)}})
}
