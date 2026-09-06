'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type User={name:string;email:string;phone:string;role:string;ign:string|null;gameUid:string|null}
export default function Profile(){
 const router=useRouter(); const [user,setUser]=useState<User|null>(null); const [form,setForm]=useState({name:'',phone:'',ign:'',gameUid:''}); const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [message,setMessage]=useState(''); const [error,setError]=useState('')
 useEffect(()=>{fetch('/api/me').then(async r=>{const d=await r.json();if(!r.ok||!d.user){router.push('/login?next=/profile');return}setUser(d.user);setForm({name:d.user.name,phone:d.user.phone,ign:d.user.ign||'',gameUid:d.user.gameUid||''});setLoading(false)})},[router])
 const set=(key:string,value:string)=>setForm(f=>({...f,[key]:value}))
 async function save(e:FormEvent){e.preventDefault();setSaving(true);setError('');setMessage('');const r=await fetch('/api/profile',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const d=await r.json();if(!r.ok){setError(d.error||'Unable to save profile.');setSaving(false);return}setUser(d.user);setMessage('Profile updated successfully.');setSaving(false)}
 if(loading)return <main><nav className="nav"><Link href="/" className="brand"><span>K</span> KRAVYADA <b>ESPORTS</b></Link></nav><section className="admin"><p className="muted">Loading profile...</p></section></main>
 return <main><nav className="nav"><Link href="/" className="brand"><span>K</span> KRAVYADA <b>ESPORTS</b></Link><div className="navlinks"><Link href="/dashboard">My Matches</Link><Link href="/">Home</Link></div></nav><section className="admin"><p className="eyebrow">PLAYER ACCOUNT</p><h1>Profile</h1><p className="muted">Keep your player identity and game details ready for registration.</p><div className="authbox wide" style={{marginTop:30}}><div className="metrics" style={{margin:'0 0 20px'}}><div><small>ROLE</small><strong style={{fontSize:18}}>{user?.role}</strong></div><div><small>EMAIL</small><strong style={{fontSize:15,wordBreak:'break-word'}}>{user?.email}</strong></div></div><form className="gridform" onSubmit={save}><label>Full name<input value={form.name} onChange={e=>set('name',e.target.value)} required/></label><label>Phone<input value={form.phone} onChange={e=>set('phone',e.target.value)} required/></label><label>In-game name<input value={form.ign} onChange={e=>set('ign',e.target.value)} placeholder="Your IGN"/></label><label>Game UID<input value={form.gameUid} onChange={e=>set('gameUid',e.target.value)} placeholder="Free Fire UID"/></label>{error&&<p className="error full">{error}</p>}{message&&<p className="full">{message}</p>}<button className="btn primary full" disabled={saving}>{saving?'SAVING...':'SAVE PROFILE →'}</button></form></div></section></main>
}
