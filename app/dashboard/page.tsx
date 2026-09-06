'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Registration = { id:string; code:string; amount:number; paymentStatus:string; slotNumber:number|null; scrim:{id:string; title:string; game:string; category:string; startTime:string; entryFee:number} }

export default function Dashboard(){
  const [items,setItems]=useState<Registration[]>([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState('')
  const [paying,setPaying]=useState('')
  const load=async()=>{const r=await fetch('/api/registrations'); const d=await r.json(); if(!r.ok){setError(d.error||'Login required.');setLoading(false);return} setItems(d.registrations);setLoading(false)}
  useEffect(()=>{load()},[])
  const pay=async(id:string)=>{setPaying(id); const r=await fetch('/api/payments/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({registrationId:id})}); const d=await r.json(); if(d.url) window.location.href=d.url; else {setError(d.error||'Payment failed.');setPaying('')} }
  return <main><nav className="nav"><Link href="/" className="brand"><span>K</span> KRAVYADA <b>ESPORTS</b></Link><Link href="/" className="login">← Home</Link></nav><section className="admin"><p className="eyebrow">PLAYER AREA</p><h1>My Registrations</h1><p className="muted">Track payments and access confirmed match credentials.</p>{loading?<p className="muted">Loading...</p>:error?<div className="adminpanel"><h2>{error}</h2><Link href="/login" className="btn primary">LOGIN →</Link></div>:<div className="cards">{items.length===0?<div className="adminpanel"><h2>No registrations yet.</h2><Link href="/" className="btn primary">BROWSE SCRIMS →</Link></div>:items.map(x=><article className="card" key={x.id}><div className="cardbody"><div className="row"><h3>{x.scrim.title}</h3><span className="open">{x.paymentStatus}</span></div><p className="time">{x.scrim.game} • {x.scrim.category} • Slot {x.slotNumber??'—'}</p><div className="stats"><div><small>REGISTRATION</small><b>{x.code}</b></div><div><small>ENTRY</small><b>₹{x.amount}</b></div></div>{x.paymentStatus==='PAID'?<Credentials id={x.id}/>:<button className="cardbtn" disabled={paying===x.id} onClick={()=>pay(x.id)}>{paying===x.id?'OPENING PAYMENT...':'PAY ₹'+x.amount+' →'}</button>}</div></article>)}</div>}</section></main>
}

function Credentials({id}:{id:string}){const [data,setData]=useState<{roomId:string;roomPassword:string}|null>(null);const [loading,setLoading]=useState(false);const load=async()=>{setLoading(true);const r=await fetch(`/api/registrations/${id}/credentials`);const d=await r.json();if(r.ok)setData(d);else alert(d.error||'Credentials unavailable');setLoading(false)};return data?<div className="adminpanel"><h3>MATCH CREDENTIALS</h3><p>ROOM ID: <b>{data.roomId}</b></p><p>PASSWORD: <b>{data.roomPassword}</b></p></div>:<button className="cardbtn" onClick={load}>{loading?'CHECKING...':'VIEW MATCH CREDENTIALS →'}</button>}
