const LINKS = {
  discord: 'https://discord.gg/sNdGHm9hEa',
  youtube: 'https://youtube.com/@kravyadaesports?si=0J9RophFfs9_hM1l',
  instagram: 'https://www.instagram.com/kravyadaesports',
  paidScrims: 'https://www.instagram.com/kravyadapaidscrims',
  whatsapp: 'https://whatsapp.com/channel/0029VbDsg3BAjPXJnFUMKA0M',
}

const external = { target: '_blank', rel: 'noopener noreferrer' as const }

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top"><img src="/logo.png" alt="KRAVYADA" /><span>KRAVYADA</span></a>
        <div className="links"><a href="#about">About</a><a href="#events">Events</a><a href="#community">Community</a><a className="navButton" href={LINKS.discord} {...external}>JOIN KRAVYADA</a></div>
      </nav>

      <section id="top" className="hero">
        <div className="heroGlow" />
        <p className="eyebrow">KRAVYADA ESPORTS · EST. 2026</p>
        <h1>BUILT TO<br /><span>CONQUER.</span></h1>
        <p className="heroText">A competitive esports organization built around players, creators and a community that refuses to settle.</p>
        <div className="actions"><a className="primary" href={LINKS.discord} {...external}>JOIN KRAVYADA ↗</a><a className="secondary" href="#about">EXPLORE KRAVYADA ↓</a></div>
        <div className="scroll">SCROLL TO EXPLORE <span>01 / 04</span></div>
      </section>

      <section className="ticker"><span>COMPETE</span><b>✦</b><span>CONQUER</span><b>✦</b><span>CREATE</span><b>✦</b><span>KRAVYADA</span><b>✦</b><span>COMPETE</span></section>

      <section id="about" className="section split">
        <div><p className="eyebrow">01 — WHO WE ARE</p><h2>MORE THAN<br /><em>A TEAM.</em></h2></div>
        <div className="copy"><p>KRAVYADA is an independent esports organization focused on competitive gaming, tournaments and a strong player-first community.</p><p>We build opportunities for players to compete, improve and make their mark. No shortcuts. No empty promises. Just the grind and the people behind it.</p><a className="textLink" href={LINKS.discord} {...external}>JOIN OUR DISCORD ↗</a></div>
      </section>

      <section id="events" className="section dark"><div className="sectionHead"><div><p className="eyebrow">02 — WHAT WE DO</p><h2>THE <em>ARENA</em></h2></div><span className="counter">03 / 03</span></div><div className="cards"><article><small>01</small><h3>COMPETITIVE<br />TEAMS</h3><p>Serious players. Serious competition. Built for the next level.</p></article><article><small>02</small><h3>DAILY<br />SCRIMS</h3><p>Regular practice, leagues and paid lobbies for hungry competitors.</p><a className="cardLink" href={LINKS.paidScrims} {...external}>PAID SCRIMS ↗</a></article><article><small>03</small><h3>COMMUNITY<br />EVENTS</h3><p>Tournaments and experiences that bring the whole community together.</p><a className="cardLink" href={LINKS.whatsapp} {...external}>WHATSAPP COMMUNITY ↗</a></article></div></section>

      <section id="community" className="quote"><p className="eyebrow">03 — THE MINDSET</p><blockquote>“THE NAME IS NOT<br />GIVEN. <em>IT IS EARNED.</em>”</blockquote><p>Every match. Every loss. Every comeback. That's how you become KRAVYADA.</p><div className="socials"><a href={LINKS.discord} {...external} aria-label="Discord">DISCORD</a><a href={LINKS.youtube} {...external} aria-label="YouTube">YOUTUBE</a><a href={LINKS.instagram} {...external} aria-label="Instagram">INSTAGRAM</a><a href={LINKS.paidScrims} {...external} aria-label="Paid Scrims">PAID SCRIMS</a><a href={LINKS.whatsapp} {...external} aria-label="WhatsApp">WHATSAPP</a></div></section>

      <section id="join" className="join"><div className="joinInner"><p className="eyebrow">04 — YOUR MOVE</p><h2>READY TO<br /><em>RISE?</em></h2><p>Whether you're a player, creator or someone who simply loves the game — there's a place for you here.</p><div className="joinActions"><a className="primary" href={LINKS.discord} {...external}>JOIN OUR DISCORD ↗</a><a className="darkButton" href={LINKS.paidScrims} {...external}>PAID TOURNAMENTS ↗</a><a className="darkButton" href={LINKS.whatsapp} {...external}>WHATSAPP COMMUNITY ↗</a></div></div></section>

      <footer><div className="footerBrand"><img src="/logo.png" alt="" /><strong>KRAVYADA</strong><span>ESPORTS</span></div><div className="footerLinks"><a href="#about">ABOUT</a><a href="#events">EVENTS</a><a href={LINKS.discord} {...external}>DISCORD</a><a href={LINKS.youtube} {...external}>YOUTUBE</a><a href={LINKS.instagram} {...external}>INSTAGRAM</a><a href={LINKS.paidScrims} {...external}>PAID SCRIMS</a><a href={LINKS.whatsapp} {...external}>WHATSAPP</a></div><p>© 2026 KRAVYADA ESPORTS. ALL RIGHTS RESERVED.</p></footer>
    </main>
  )
}