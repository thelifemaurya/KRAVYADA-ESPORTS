'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register(){
  const router=useRouter(); const [form,setForm]=useState({name:'',phone:'',email:'',password:'',ign:'',gameUid:''}); const [error,setError]=useState(''); const [loading,setLoading]=useState(false)
  const set=(key:string,value:string)=>setForm({...form,[key]:value})
  async function submit(e:FormEvent){
    e.preventDefault(); setLoading(true); setError('')
    const r=await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    const d=await r.json()
    if(!r.ok){setError(d.error||'Registration failed.');setLoading(false);return}
    router.push('/login?registered=1')
  }
  return <main className="auth"><div className="authbox wide"><Link href="/" className="brand"><span>K</span> KRAVYADA <b>ESPORTS</b></Link><p className="eyebrow">PLAYER REGISTRATION</p><h1>Create your account.</h1><p className="muted">One account for all KRAVYADA scrims and tournaments.</p><form className="gridform" onSubmit={submit}><label>Full name<input value={form.name} onChange={e=>set('name',e.target.value)} required placeholder="Your name"/></label><label>Phone number<input value={form.phone} onChange={e=>set('phone',e.target.value)} required type="tel" placeholder="10-digit number"/></label><label>Email<input value={form.email} onChange={e=>set('email',e.target.value)} required type="email" placeholder="you@example.com"/></label><label>Password<input value={form.password} onChange={e=>set('password',e.target.value)} required type="password" minLength={8} placeholder="Create a strong password"/></label><label>In-game name<input value={form.ign} onChange={e=>set('ign',e.target.value)} placeholder="Your IGN"/></label><label>Game UID<input value={form.gameUid} onChange={e=>set('gameUid',e.target.value)} placeholder="Free Fire UID"/></label>{error&&<p className="error full">{error}</p>}<button className="btn primary full" disabled={loading}>{loading?'CREATING ACCOUNT...':'CREATE ACCOUNT →'}</button></form><p className="switch">Already registered? <Link href="/login">Login</Link></p></div></main>
}
