'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams,useRouter } from 'next/navigation'

type Scrim={id:string;title:string;game:string;category:string;description:string|null;rules:string|null;bannerUrl:string|null;date:string;startTime:string;registrationDeadline:string;entryFee:number;prizePool:number;totalSlots:number;status:string;remainingSlots:number}
const teamMode=(c:string)=>/4v4/i.test(c), duoMode=(c:string)=>/DUO/i.test(c)
export default function ScrimDetail(){
 const {id}=useParams<{id:string}>(); const router=useRouter(); const [scrim,setScrim]=useState<Scrim|null>(null); const [team,setTeam]=useState(''); const [players,setPlayers]=useState(['','','','']); const [busy,setBusy]=useState(false); const [error,setError]=useState(''); const [ok,setOk]=useState('')
 useEffect(()=>{fetch(`/api/scrims/${id}`).then(async r=>{const d=await r.json();if(r.ok)setScrim(d.scrim);else setError(d.error||'Scrim not found.')})},[id])
 const register=async()=>{
  setBusy(true);setError('');setOk('')
  const roster=players.slice(0,teamMode(scrim?.category||'')?4:duoMode(scrim?.category||'')?2:1).join('\n')
  const r=await fetch('/api/registrations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({scrimId:id,teamName:team||undefined,players:roster})})
  const d=await r.json()
  if(r.status===401){router.push(`/login?next=/scrims/${id}`);return}
  if(!r.ok){setError(d.error||'Registration failed.');setBusy(false);return}
  setOk(`Registration ${d.registration.code} created successfully. You are registered for this scrim.`)
  setBusy(false)
 }
 if(!scrim)return <main><nav className="nav"><Link href="/" className="brand"><span>K</span> KRAVYADA <b>ESPORTS</b></Link></nav><section className="admin"><p className="muted">{error||'Loading scrim...'}</p></section></main>
 const isTeam=teamMode(scrim.category), isDuo=duoMode(scrim.category), count=isTeam?4:isDuo?2:1
 return <main><nav className="nav"><Link href="/" className="brand"><span>K</span> KRAVYADA <b>ESPORTS</b></Link><Link href="/" className="login">← ALL SCRIMS</Link></nav><section className="admin"><p className="eyebrow">{scrim.game} • {scrim.category}</p>{scrim.bannerUrl&&<img className="scrimBanner" src={scrim.bannerUrl} alt=""/>}<h1>{scrim.title}</h1><p className="muted">{scrim.description||'Official KRAVYADA ESPORTS scrim.'}</p><div className="metrics"><div><small>ENTRY</small><strong>₹{scrim.entryFee}</strong></div><div><small>PRIZE POOL</small><strong>₹{scrim.prizePool}</strong></div><div><small>SLOTS LEFT</small><strong>{scrim.remainingSlots}/{scrim.totalSlots}</strong></div><div><small>START</small><strong>{new Date(scrim.startTime).toLocaleString()}</strong></div></div>{scrim.status==='OPEN'&&scrim.remainingSlots>0?<div className="adminpanel"><h2>Register for this scrim</h2><p className="muted">{isTeam?'Enter all 4 player details.':isDuo?'Enter both player details.':'Enter your player details.'}</p>{(isTeam||isDuo)&&<label>Team name<input value={team} onChange={e=>setTeam(e.target.value)} required placeholder="Your team name"/></label>}{Array.from({length:count}).map((_,i)=><label key={i}>Player {i+1}<input value={players[i]} onChange={e=>{const n=[...players];n[i]=e.target.value;setPlayers(n)}} required placeholder="IGN + UID"/></label>)}{error&&<p className="error">{error}</p>}{ok&&<p>{ok}</p>}<button className="btn primary full" onClick={register} disabled={busy}>{busy?'REGISTERING...':'REGISTER NOW →'}</button><p className="muted">Payment is currently not connected. Your registration is recorded first; payment will be added later.</p></div>:<div className="adminpanel"><h2>Registration closed</h2><p className="muted">This scrim is currently {scrim.status.toLowerCase()} or full.</p></div>}{scrim.rules&&<div className="adminpanel"><h2>Rules</h2><p className="rulesText">{scrim.rules}</p></div>}<div className="adminpanel"><h3>MATCH ACCESS</h3><p className="muted">Room ID and password stay private and can be published by KRAVYADA staff when the match is ready.</p></div></section></main>
}
