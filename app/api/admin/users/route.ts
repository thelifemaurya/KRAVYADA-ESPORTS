import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireStaff } from '@/lib/auth'

const ROLES = ['USER', 'ADMIN', 'HOST', 'MODERATOR'] as const

type Role = (typeof ROLES)[number]

export async function GET(){
  try {
    await requireStaff()
    const users = await db.user.findMany({
      select: { id:true, name:true, email:true, phone:true, role:true, ign:true, gameUid:true, createdAt:true, _count:{select:{registrations:true}} },
      orderBy:{createdAt:'desc'}, take:300,
    })
    return NextResponse.json({users})
  } catch(e) {
    const m=e instanceof Error?e.message:''
    return NextResponse.json({error:m==='FORBIDDEN'?'Staff access required.':'Login required.'},{status:m==='FORBIDDEN'?403:401})
  }
}

export async function PATCH(req:Request){
  try {
    const actor=await requireStaff()
    const body=await req.json()
    const id=String(body.id||'')
    const role=String(body.role||'') as Role
    if(!id || !ROLES.includes(role)) return NextResponse.json({error:'Invalid user or role.'},{status:400})
    if(id===actor.id && role!=='ADMIN') return NextResponse.json({error:'You cannot remove your own admin access.'},{status:400})
    if(role==='ADMIN' && actor.role!=='ADMIN') return NextResponse.json({error:'Only an admin can grant admin access.'},{status:403})
    const target=await db.user.findUnique({where:{id},select:{id:true,role:true}})
    if(!target) return NextResponse.json({error:'User not found.'},{status:404})
    if(target.role==='ADMIN' && role!=='ADMIN' && actor.role!=='ADMIN') return NextResponse.json({error:'Only an admin can change admin access.'},{status:403})
    const user=await db.user.update({where:{id},data:{role}})
    await db.auditLog.create({data:{actorId:actor.id,action:'UPDATE_ROLE',entity:'User',entityId:id,metadata:JSON.stringify({from:target.role,to:role})}})
    return NextResponse.json({user:{id:user.id,role:user.role}})
  } catch(e) {
    const m=e instanceof Error?e.message:''
    return NextResponse.json({error:m==='FORBIDDEN'?'Staff access required.':'Unable to update user.'},{status:m==='FORBIDDEN'?403:500})
  }
}
