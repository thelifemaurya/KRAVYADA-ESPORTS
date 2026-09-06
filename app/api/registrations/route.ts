import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireUser } from '@/lib/auth'

function code(){return `KRV-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}`}

export async function POST(req: Request) {
 try {
  const user=await requireUser(); const body=await req.json(); const scrimId=String(body.scrimId??'')
  if(!scrimId)return NextResponse.json({error:'Scrim is required.'},{status:400})
  const scrim=await db.scrim.findUnique({where:{id:scrimId}})
  if(!scrim||scrim.status!=='OPEN')return NextResponse.json({error:'Registration is closed.'},{status:400})
  if(new Date()>scrim.registrationDeadline)return NextResponse.json({error:'Registration deadline has passed.'},{status:400})
  const existing=await db.registration.findFirst({where:{userId:user.id,scrimId,paymentStatus:{not:'REFUNDED'}}})
  if(existing)return NextResponse.json({error:'You are already registered for this scrim.',registration:existing},{status:409})
  for(let attempt=0;attempt<3;attempt++){
   const count=await db.registration.count({where:{scrimId,paymentStatus:{in:['PENDING','PAID']}}})
   if(count>=scrim.totalSlots)return NextResponse.json({error:'No slots available.'},{status:409})
   try{
    const registration=await db.registration.create({data:{code:code(),userId:user.id,scrimId,slotNumber:count+1,amount:scrim.entryFee,playerData:JSON.stringify({ign:body.ign||user.ign,gameUid:body.gameUid||user.gameUid,teamName:body.teamName||null,players:body.players||null})}})
    return NextResponse.json({registration},{status:201})
   }catch(error){if(attempt===2)throw error}
  }
  return NextResponse.json({error:'Unable to reserve a slot.'},{status:409})
 }catch(error){const message=error instanceof Error?error.message:'';return NextResponse.json({error:message==='UNAUTHORIZED'?'Login required.':'Unable to register.'},{status:message==='UNAUTHORIZED'?401:500})}
}

export async function GET(){try{const user=await requireUser();const registrations=await db.registration.findMany({where:{userId:user.id},include:{scrim:true},orderBy:{createdAt:'desc'}});return NextResponse.json({registrations})}catch{return NextResponse.json({error:'Login required.'},{status:401})}}
