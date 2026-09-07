const stats = [
  ['01', 'ESPORTS ORG'],
  ['24/7', 'COMMUNITY'],
  ['∞', 'AMBITION'],
]

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top"><img src="/logo.png" alt="KRAVYADA" /> <span>KRAVYADA</span></a>
        <div className="links"><a href="#about">About</a><a href="#events">Events</a><a href="#community">Community</a><a className="navButton" href="#join">Join Us</a></div>
      </nav>

      <section id="top" className="hero">
        <div className="heroGlow" />
        <p className="eyebrow">KRAVYADA ESPORTS · EST. 2026</p>
        <h1>BUILT TO<br /><span>CONQUER.</span></h1>
        <p className="heroText">A competitive esports organization built around players, creators and a community that refuses to settle.</p>
        <div className="actions"><a className="primary" href="#join">ENTER THE BATTLE</a><a className="secondary" href="#about">EXPLORE KRAVYADA ↓</a></div>
        <div className="scroll">SCROLL TO EXPLORE <span>01 / 04</span></div>
      </section>

      <section className="ticker"><span>COMPETE</span><b>✦</b><span>CONQUER</span><b>✦</b><span>CREATE</span><b>✦</b><span>KRAVYADA</span><b>✦</b><span>COMPETE</span></section>

      <section id="about" className="section split">
        <div><p className="eyebrow">01 — WHO WE ARE</p><h2>MORE THAN<br /><em>A TEAM.</em></h2></div>
        <div className="copy"><p>KRAVYADA is an independent esports organization focused on competitive gaming, tournaments and a strong player-first community.</p><p>We build opportunities for players to compete, improve and make their mark. No shortcuts. No empty promises. Just the grind and the people behind it.</p><a className="textLink" href="#join">OUR MISSION ↗</a></div>
      </section>

      <section id="events" className="section dark"><div className="sectionHead"><div><p className="eyebrow">02 — WHAT WE DO</p><h2>THE <em>ARENA</em></h2></div><span className="counter">03 / 03</span></div><div className="cards"><article><small>01</small><h3>COMPETITIVE<br />TEAMS</h3><p>Serious players. Serious competition. Built for the next level.</p></article><article><small>02</small><h3>DAILY<br />SCRIMS</h3><p>Regular practice, leagues and paid lobbies for hungry competitors.</p></article><article><small>03</small><h3>COMMUNITY<br />EVENTS</h3><p>Tournaments and experiences that bring the whole community together.</p></article></div></section>

      <section id="community" className="quote"><p className="eyebrow">03 — THE MINDSET</p><blockquote>“THE NAME IS NOT<br />GIVEN. <em>IT IS EARNED.</em>”</blockquote><p>Every match. Every loss. Every comeback. That's how you become KRAVYADA.</p></section>

      <section id="join" className="join"><div className="joinInner"><p className="eyebrow">04 — YOUR MOVE</p><h2>READY TO<br /><em>RISE?</em></h2><p>Whether you're a player, creator or someone who simply loves the game — there's a place for you here.</p><a className="primary" href="https://discord.com" target="_blank" rel="noreferrer">JOIN THE COMMUNITY ↗</a></div></section>

      <footer><div className="footerBrand"><img src="/logo.png" alt="" /><strong>KRAVYADA</strong><span>ESPORTS</span></div><div className="footerLinks"><a href="#about">ABOUT</a><a href="#events">EVENTS</a><a href="#community">COMMUNITY</a></div><p>© 2026 KRAVYADA ESPORTS. ALL RIGHTS RESERVED.</p></footer>
    </main>
  )
}