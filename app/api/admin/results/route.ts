import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStaff } from '@/lib/auth'

export async function GET(){
  try {
    await requireStaff()
    const results=await db.result.findMany({
      include:{registration:{include:{user:{select:{id:true,name:true,email:true,phone:true,role:true,ign:true,gameUid:true,createdAt:true}}}},scrim:true},
      orderBy:[{scrim:{startTime:'desc'}},{rank:'asc'}],take:500,
    })
    return NextResponse.json({results})
  } catch { return NextResponse.json({error:'Staff access required.'},{status:401}) }
}

export async function POST(req:Request){
  try {
    const actor=await requireStaff(); const b=await req.json()
    const registrationId=String(b.registrationId||'')
    const rank=b.rank===''||b.rank==null?null:Number(b.rank)
    const kills=Number(b.kills||0), points=Number(b.points||0), prizeAmount=Number(b.prizeAmount||0)
    if(!registrationId||[kills,points,prizeAmount].some(x=>!Number.isInteger(x)||x<0)||(rank!==null&&(!Number.isInteger(rank)||rank<1))) return NextResponse.json({error:'Invalid result data.'},{status:400})
    const reg=await db.registration.findUnique({where:{id:registrationId}})
    if(!reg)return NextResponse.json({error:'Registration not found.'},{status:404})
    const result=await db.result.upsert({where:{registrationId},create:{registrationId,scrimId:reg.scrimId,rank,kills,points,prizeAmount,notes:String(b.notes||'')},update:{rank,kills,points,prizeAmount,notes:String(b.notes||'')}})
    await db.auditLog.create({data:{actorId:actor.id,action:'UPSERT_RESULT',entity:'Result',entityId:result.id,metadata:JSON.stringify({registrationId,rank,kills,points,prizeAmount})}})
    return NextResponse.json({result})
  } catch { return NextResponse.json({error:'Unable to save result.'},{status:500}) }
}
