import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireUser } from '@/lib/auth'

function code(){return `KRV-${new Date().getFullYear()}-${Math.floor(100000+Math.random()*900000)}`}

function rosterSize(category:string){
  const value=category.toUpperCase()
  if(value.includes('4V4')) return 4
  if(value.includes('DUO')) return 2
  return 1
}

function cleanPlayers(value:unknown, expected:number){
  if(typeof value!=='string') return null
  const players=value.split(/\n+/).map(x=>x.replace(/^Player\s*\d+\s*:\s*/i,'').trim()).filter(Boolean)
  if(players.length!==expected || players.some(x=>x.length<2 || x.length>80)) return null
  return players
}

export async function POST(req: Request) {
 try {
  const user=await requireUser()
  const body=await req.json()
  const scrimId=String(body.scrimId??'').trim()
  if(!scrimId)return NextResponse.json({error:'Scrim is required.'},{status:400})

  const scrim=await db.scrim.findUnique({where:{id:scrimId}})
  if(!scrim||scrim.status!=='OPEN')return NextResponse.json({error:'Registration is closed.'},{status:400})
  if(new Date()>scrim.registrationDeadline)return NextResponse.json({error:'Registration deadline has passed.'},{status:400})

  const expectedPlayers=rosterSize(scrim.category)
  const players=cleanPlayers(body.players,expectedPlayers)
  const teamName=String(body.teamName??'').trim()
  if(!players)return NextResponse.json({error:`Please enter exactly ${expectedPlayers} valid player detail${expectedPlayers===1?'':'s'} (IGN + UID).`},{status:400})
  if(expectedPlayers>1 && (teamName.length<2 || teamName.length>60))return NextResponse.json({error:'A valid team name is required.'},{status:400})

  const existing=await db.registration.findFirst({where:{userId:user.id,scrimId,paymentStatus:{not:'REFUNDED'}}})
  if(existing)return NextResponse.json({error:'You are already registered for this scrim.',registration:existing},{status:409})

  for(let attempt=0;attempt<5;attempt++){
   const active=await db.registration.findMany({where:{scrimId,paymentStatus:{in:['PENDING','PAID']}},select:{slotNumber:true},orderBy:{slotNumber:'desc'},take:1})
   const highest=active[0]?.slotNumber??0
   if(highest>=scrim.totalSlots)return NextResponse.json({error:'No slots available.'},{status:409})
   const slotNumber=highest+1

   try{
    const registration=await db.registration.create({data:{
      code:code(),
      userId:user.id,
      scrimId,
      slotNumber,
      amount:scrim.entryFee,
      playerData:JSON.stringify({ign:body.ign||user.ign,gameUid:body.gameUid||user.gameUid,teamName:teamName||null,players})
    }})

    const remaining=await db.registration.count({where:{scrimId,paymentStatus:{in:['PENDING','PAID']}}})
    if(remaining>=scrim.totalSlots){
      await db.scrim.updateMany({where:{id:scrimId,status:'OPEN'},data:{status:'FULL'}})
    }
    return NextResponse.json({registration},{status:201})
   }catch(error){
    if(attempt===4)throw error
   }
  }
  return NextResponse.json({error:'Unable to reserve a slot.'},{status:409})
 }catch(error){
  const message=error instanceof Error?error.message:''
  return NextResponse.json({error:message==='UNAUTHORIZED'?'Login required.':'Unable to register.'},{status:message==='UNAUTHORIZED'?401:500})
 }
}

export async function GET(){
 try{
  const user=await requireUser()
  const registrations=await db.registration.findMany({where:{userId:user.id},include:{scrim:true},orderBy:{createdAt:'desc'}})
  return NextResponse.json({registrations})
 }catch{return NextResponse.json({error:'Login required.'},{status:401})}
}
