'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const LINKS = {
  discord: 'https://discord.gg/sNdGHm9hEa',
  youtube: 'https://youtube.com/@kravyadaesports?si=0J9RophFfs9_hM1l',
  instagram: 'https://www.instagram.com/kravyadaesports',
  paidScrims: 'https://www.instagram.com/kravyadapaidscrims',
  whatsapp: 'https://whatsapp.com/channel/0029VbDsg3BAjPXJnFUMKA0M',
}
const LOGO = 'https://raw.githubusercontent.com/thelifemaurya/KRAVYADA-ESPORTS/main/kravyada-logo.png'
const external = { target: '_blank', rel: 'noopener noreferrer' as const }

type RevealProps = { children: ReactNode; className?: string; delay?: number }
function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { node.classList.add('is-visible'); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add('is-visible'); observer.unobserve(node) }
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`kr-reveal ${className}`} style={{ '--kr-reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}

function Intro() {
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)
  useEffect(() => {
    const a = window.setTimeout(() => setLeaving(true), 1250)
    const b = window.setTimeout(() => setDone(true), 1950)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [])
  if (done) return null
  return <div className={`kr-intro${leaving ? ' kr-intro--leaving' : ''}`} aria-hidden="true"><img className="kr-intro__logo" src={LOGO} alt="" width={110} height={110} /></div>
}

function ScrollingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update(); window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <nav className={`nav kr-navbar kr-navbar--enter${scrolled ? ' kr-navbar--scrolled' : ''}`} aria-label="Main navigation">
    <a className="brand kr-nav-link" href="#top"><span className="brandMark"><img src={LOGO} alt="KRAVYADA logo" /></span><span>KRAVYADA <small>ESPORTS</small></span></a>
    <div className="links"><a className="kr-nav-link" href="#about">About</a><a className="kr-nav-link" href="#events">Arena</a><a className="kr-nav-link" href="#community">Community</a><a className="navButton kr-button" href={LINKS.discord} {...external}>Join Us <span className="kr-button__arrow">↗</span></a></div>
  </nav>
}

function MouseParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia('(hover: none), (pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const move = (e: PointerEvent) => {
      const r = node.getBoundingClientRect(); const x = ((e.clientX-r.left)/r.width-.5)*2; const y = ((e.clientY-r.top)/r.height-.5)*2
      if (!frame) frame = requestAnimationFrame(() => { node.style.setProperty('--kr-mouse-x', String(x)); node.style.setProperty('--kr-mouse-y', String(y)); frame=0 })
    }
    const reset = () => { node.style.setProperty('--kr-mouse-x','0'); node.style.setProperty('--kr-mouse-y','0') }
    node.addEventListener('pointermove', move); node.addEventListener('pointerleave', reset)
    return () => { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', reset); if(frame) cancelAnimationFrame(frame) }
  }, [])
  return <div ref={ref} className="kr-parallax" style={{ '--kr-parallax-strength':'10px' } as CSSProperties}>{children}</div>
}

function PremiumButton({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} {...external} className={`kr-button ${className}`}><span>{children}</span><span className="kr-button__arrow">→</span></a>
}

function Card({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const move = (e: React.PointerEvent<HTMLDivElement>) => { const n=ref.current; if(!n)return; const r=n.getBoundingClientRect(); n.style.setProperty('--kr-card-x',`${((e.clientX-r.left)/r.width)*100}%`); n.style.setProperty('--kr-card-y',`${((e.clientY-r.top)/r.height)*100}%`) }
  return <div ref={ref} className="card kr-card" onPointerMove={move}>{children}</div>
}

const marquee = ['COMPETE','CONQUER','CREATE','EVOLVE','KRAVYADA']
function Marquee() { return <div className="ticker kr-marquee" aria-label="KRAVYADA values"><div className="kr-marquee__track"><div className="kr-marquee__group">{marquee.map(x=><span className="kr-marquee__item" key={`a-${x}`}><span>{x}</span><b>✦</b></span>)}</div><div className="kr-marquee__group">{marquee.map(x=><span className="kr-marquee__item" key={`b-${x}`}><span>{x}</span><b>✦</b></span>)}</div></div></div> }

export default function Home() {
  return <main id="top">
    <Intro />
    <div className="ambient ambientOne" aria-hidden="true" /><div className="ambient ambientTwo" aria-hidden="true" /><div className="noise" aria-hidden="true" />
    <ScrollingNavbar />

    <section className="hero kr-hero-atmosphere" aria-labelledby="hero-title">
      <div className="heroGrid" aria-hidden="true" /><div className="heroGlow" aria-hidden="true" />
      <MouseParallax><div className="heroContent">
        <div className="heroBadge"><span /> Independent Esports Organization <b>·</b> Est. 2026</div>
        <p className="eyebrow kr-hero-copy">NO SHORTCUTS. JUST THE GRIND.</p>
        <h1 id="hero-title" className="kr-hero-title"><span className="kr-hero-title__line" style={{ '--kr-line-index':0 } as CSSProperties}><span>BUILT TO</span></span><span className="kr-hero-title__line" style={{ '--kr-line-index':1 } as CSSProperties}><span>CONQUER.</span></span></h1>
        <p className="heroText kr-hero-copy">Competitive gaming, real opportunities and a community built for people who refuse to play small.</p>
        <div className="actions"><PremiumButton href={LINKS.discord} className="primary">JOIN KRAVYADA ↗</PremiumButton><a className="secondary kr-button" href="#about">EXPLORE <span className="kr-button__arrow">↓</span></a></div>
      </div></MouseParallax>
      <div className="heroMeta"><span>01 / 04</span><span>SCROLL TO EXPLORE ↓</span><span>MUMBAI · INDIA</span></div>
    </section>

    <Marquee />

    <Reveal><section id="about" className="section split">
      <div><p className="eyebrow">01 — WHO WE ARE</p><h2 className="kr-display-reveal"><span>MORE THAN<br /><em>A TEAM.</em></span></h2></div>
      <div className="copy"><p className="lead">KRAVYADA is an independent esports organization focused on competitive gaming, tournaments and a strong player-first community.</p><p>We create spaces where players can compete, practice, improve and make their mark. From scrims to community events, every part of the grind matters.</p><div className="miniStats"><div><strong>01</strong><span>PLAYER<br />FIRST</span></div><div><strong>24/7</strong><span>COMMUNITY<br />ENERGY</span></div><div><strong>∞</strong><span>ROOM TO<br />RISE</span></div></div><a className="textLink kr-arrow-link" href={LINKS.discord} {...external}>ENTER THE COMMUNITY <span className="kr-arrow-link__icon">↗</span></a></div>
    </section></Reveal>

    <Reveal><section id="events" className="section dark">
      <div className="sectionHead"><div><p className="eyebrow">02 — WHAT WE DO</p><h2>THE <em>ARENA.</em></h2></div><span className="counter">03 / 03 — BUILT FOR THE GRIND</span></div>
      <div className="cards kr-card-grid">
        <Card><div className="cardTop"><small>01</small><span>01</span></div><div className="cardIcon">⌁</div><h3>COMPETITIVE<br />TEAMS</h3><p>Build a roster, sharpen your game sense and compete with players who take the game seriously.</p><a className="cardLink kr-arrow-link" href={LINKS.discord} {...external}>TALK TO US <span className="kr-arrow-link__icon">↗</span></a></Card>
        <Card><div className="cardTop"><small>02</small><span>02</span></div><div className="cardIcon">◈</div><h3>DAILY<br />SCRIMS</h3><p>Regular practice, leagues and paid lobbies designed to keep competitors active and improving.</p><a className="cardLink kr-arrow-link" href={LINKS.paidScrims} {...external}>PAID SCRIMS <span className="kr-arrow-link__icon">↗</span></a></Card>
        <Card><div className="cardTop"><small>03</small><span>03</span></div><div className="cardIcon">✦</div><h3>COMMUNITY<br />EVENTS</h3><p>Tournaments, watch parties and community experiences that bring gamers together.</p><a className="cardLink kr-arrow-link" href={LINKS.whatsapp} {...external}>WHATSAPP COMMUNITY <span className="kr-arrow-link__icon">↗</span></a></Card>
      </div>
    </section></Reveal>

    <Reveal><section id="mindset" className="mindset"><div className="mindsetLine" /><p className="eyebrow">03 — THE MINDSET</p><blockquote className="kr-display-reveal"><span>THE NAME IS NOT<br />GIVEN. <em>IT IS EARNED.</em></span></blockquote><p className="quoteSub">Every match. Every loss. Every comeback. That's how you become KRAVYADA.</p><div className="quoteRule"><span /> KRAVYADA STANDARD <span /></div></section></Reveal>

    <Reveal><section id="community" className="community">
      <div className="communityIntro"><p className="eyebrow">COMMUNITY // 04</p><h2>STAY<br /><em>CONNECTED.</em></h2><p>Follow the organization, find the next scrim and stay close to everything KRAVYADA.</p></div>
      <div className="socialGrid">{[[LINKS.discord,'DISCORD'],[LINKS.youtube,'YOUTUBE'],[LINKS.instagram,'INSTAGRAM'],[LINKS.paidScrims,'PAID SCRIMS'],[LINKS.whatsapp,'WHATSAPP']].map(([href,label],i)=><a className="kr-arrow-link" key={label} href={href} {...external}><span>{String(i+1).padStart(2,'0')}</span><strong>{label}</strong><b className="kr-arrow-link__icon">↗</b></a>)}</div>
    </section></Reveal>

    <Reveal><section id="join" className="join kr-final-cta"><div className="joinInner"><div><p className="eyebrow">FINAL CALL // YOUR MOVE</p><h2>READY TO<br /><em>RISE?</em></h2></div><div className="joinCopy"><p>Whether you're a player, creator or someone who simply loves the game — there is a place for you here.</p><div className="joinActions"><PremiumButton href={LINKS.discord} className="joinDark">JOIN OUR DISCORD</PremiumButton><PremiumButton href={LINKS.paidScrims} className="joinOutline">PAID TOURNAMENTS</PremiumButton></div></div></div></section></Reveal>

    <footer><div className="footerTop"><a className="footerBrand" href="#top"><span className="footerLogo"><img src={LOGO} alt="" /></span><strong>KRAVYADA</strong><small>ESPORTS</small></a><p>BUILT FOR COMPETITORS.<br />POWERED BY COMMUNITY.</p></div><div className="footerBottom"><div className="footerLinks"><a href="#about">ABOUT</a><a href="#events">ARENA</a><a href="#mindset">MINDSET</a><a href={LINKS.discord} {...external}>DISCORD</a><a href={LINKS.instagram} {...external}>INSTAGRAM</a><a href={LINKS.youtube} {...external}>YOUTUBE</a></div><p>© {new Date().getFullYear()} KRAVYADA ESPORTS. ALL RIGHTS RESERVED.</p></div></footer>
  </main>
}
