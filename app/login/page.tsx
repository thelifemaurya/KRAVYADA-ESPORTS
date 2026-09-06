'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login(){
  const router=useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false)
  async function submit(e:FormEvent){
    e.preventDefault(); setLoading(true); setError('')
    const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})})
    const d=await r.json()
    if(!r.ok){setError(d.error||'Login failed.');setLoading(false);return}
    router.push(['ADMIN','HOST','MODERATOR'].includes(d.user.role)?'/admin':'/dashboard'); router.refresh()
  }
  return <main className="auth"><div className="authbox"><Link href="/" className="brand"><span>K</span> KRAVYADA <b>ESPORTS</b></Link><p className="eyebrow">PLAYER ACCESS</p><h1>Welcome back.</h1><p className="muted">Login to manage registrations and access your confirmed matches.</p><form onSubmit={submit}><label>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com" required/></label><label>Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••" required/></label>{error&&<p className="error">{error}</p>}<button className="btn primary" disabled={loading}>{loading?'LOGGING IN...':'LOGIN →'}</button></form><p className="switch">New player? <Link href="/register">Create an account</Link></p></div></main>
}
