const LINKS = {
  discord: 'https://discord.gg/sNdGHm9hEa',
  youtube: 'https://youtube.com/@kravyadaesports?si=0J9RophFfs9_hM1l',
  instagram: 'https://www.instagram.com/kravyadaesports',
  paidScrims: 'https://www.instagram.com/kravyadapaidscrims',
  whatsapp: 'https://whatsapp.com/channel/0029VbDsg3BAjPXJnFUMKA0M',
}

const LOGO = 'https://raw.githubusercontent.com/thelifemaurya/KRAVYADA-ESPORTS/main/kravyada-logo.png'
const external = { target: '_blank', rel: 'noopener noreferrer' as const }

export default function Home() {
  return (
    <main id="top">
      <div className="ambient ambientOne" aria-hidden="true" />
      <div className="ambient ambientTwo" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="KRAVYADA home">
          <span className="brandMark"><img src={LOGO} alt="KRAVYADA logo" /></span>
          <span>KRAVYADA <small>ESPORTS</small></span>
        </a>
        <div className="links">
          <a href="#about">About</a>
          <a href="#events">Arena</a>
          <a href="#community">Community</a>
          <a className="navButton" href={LINKS.discord} {...external}>Join Us ↗</a>
        </div>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="heroGrid" aria-hidden="true" />
        <div className="heroGlow" aria-hidden="true" />
        <div className="heroContent">
          <div className="heroBadge"><span /> Independent Esports Organization <b>·</b> Est. 2026</div>
          <p className="eyebrow">NO SHORTCUTS. JUST THE GRIND.</p>
          <h1 id="hero-title">BUILT TO<br /><span>CONQUER.</span></h1>
          <p className="heroText">Competitive gaming, real opportunities and a community built for people who refuse to play small.</p>
          <div className="actions">
            <a className="primary" href={LINKS.discord} {...external}>JOIN KRAVYADA <span>↗</span></a>
            <a className="secondary" href="#about">EXPLORE <span>↓</span></a>
          </div>
        </div>
        <div className="heroMeta">
          <span>01 / 04</span>
          <span>SCROLL TO EXPLORE ↓</span>
          <span>MUMBAI · INDIA</span>
        </div>
      </section>

      <section className="ticker" aria-label="KRAVYADA values">
        <span>COMPETE</span><b>✦</b><span>CONQUER</span><b>✦</b><span>CREATE</span><b>✦</b><span>EVOLVE</span><b>✦</b><span>KRAVYADA</span><b>✦</b>
      </section>

      <section id="about" className="section split reveal">
        <div>
          <p className="eyebrow">01 — WHO WE ARE</p>
          <h2>MORE THAN<br /><em>A TEAM.</em></h2>
        </div>
        <div className="copy">
          <p className="lead">KRAVYADA is an independent esports organization focused on competitive gaming, tournaments and a strong player-first community.</p>
          <p>We create spaces where players can compete, practice, improve and make their mark. From scrims to community events, every part of the grind matters.</p>
          <div className="miniStats">
            <div><strong>01</strong><span>PLAYER<br />FIRST</span></div>
            <div><strong>24/7</strong><span>COMMUNITY<br />ENERGY</span></div>
            <div><strong>∞</strong><span>ROOM TO<br />RISE</span></div>
          </div>
          <a className="textLink" href={LINKS.discord} {...external}>ENTER THE COMMUNITY ↗</a>
        </div>
      </section>

      <section id="events" className="section dark reveal">
        <div className="sectionHead">
          <div><p className="eyebrow">02 — WHAT WE DO</p><h2>THE <em>ARENA.</em></h2></div>
          <span className="counter">03 / 03 — BUILT FOR THE GRIND</span>
        </div>
        <div className="cards">
          <article className="card">
            <div className="cardTop"><small>01</small><span>01</span></div>
            <div className="cardIcon">⌁</div>
            <h3>COMPETITIVE<br />TEAMS</h3>
            <p>Build a roster, sharpen your game sense and compete with players who take the game seriously.</p>
            <a className="cardLink" href={LINKS.discord} {...external}>TALK TO US ↗</a>
          </article>
          <article className="card featured">
            <div className="cardTop"><small>02</small><span>02</span></div>
            <div className="cardIcon">◈</div>
            <h3>DAILY<br />SCRIMS</h3>
            <p>Regular practice, leagues and paid lobbies designed to keep competitors active and improving.</p>
            <a className="cardLink" href={LINKS.paidScrims} {...external}>PAID SCRIMS ↗</a>
          </article>
          <article className="card">
            <div className="cardTop"><small>03</small><span>03</span></div>
            <div className="cardIcon">✦</div>
            <h3>COMMUNITY<br />EVENTS</h3>
            <p>Tournaments, watch parties and community experiences that bring gamers together.</p>
            <a className="cardLink" href={LINKS.whatsapp} {...external}>WHATSAPP COMMUNITY ↗</a>
          </article>
        </div>
      </section>

      <section id="mindset" className="mindset reveal">
        <div className="mindsetLine" />
        <p className="eyebrow">03 — THE MINDSET</p>
        <blockquote>THE NAME IS NOT<br />GIVEN. <em>IT IS EARNED.</em></blockquote>
        <p className="quoteSub">Every match. Every loss. Every comeback. That's how you become KRAVYADA.</p>
        <div className="quoteRule"><span /> KRAVYADA STANDARD <span /></div>
      </section>

      <section id="community" className="community reveal">
        <div className="communityIntro">
          <p className="eyebrow">COMMUNITY // 04</p>
          <h2>STAY<br /><em>CONNECTED.</em></h2>
          <p>Follow the organization, find the next scrim and stay close to everything KRAVYADA.</p>
        </div>
        <div className="socialGrid">
          <a href={LINKS.discord} {...external}><span>01</span><strong>DISCORD</strong><b>↗</b></a>
          <a href={LINKS.youtube} {...external}><span>02</span><strong>YOUTUBE</strong><b>↗</b></a>
          <a href={LINKS.instagram} {...external}><span>03</span><strong>INSTAGRAM</strong><b>↗</b></a>
          <a href={LINKS.paidScrims} {...external}><span>04</span><strong>PAID SCRIMS</strong><b>↗</b></a>
          <a href={LINKS.whatsapp} {...external}><span>05</span><strong>WHATSAPP</strong><b>↗</b></a>
        </div>
      </section>

      <section id="join" className="join reveal">
        <div className="joinInner">
          <div>
            <p className="eyebrow">FINAL CALL // YOUR MOVE</p>
            <h2>READY TO<br /><em>RISE?</em></h2>
          </div>
          <div className="joinCopy">
            <p>Whether you're a player, creator or someone who simply loves the game — there is a place for you here.</p>
            <div className="joinActions">
              <a className="joinDark" href={LINKS.discord} {...external}>JOIN OUR DISCORD ↗</a>
              <a className="joinOutline" href={LINKS.paidScrims} {...external}>PAID TOURNAMENTS ↗</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footerTop">
          <a className="footerBrand" href="#top">
            <span className="footerLogo"><img src={LOGO} alt="" /></span>
            <strong>KRAVYADA</strong>
            <small>ESPORTS</small>
          </a>
          <p>BUILT FOR COMPETITORS.<br />POWERED BY COMMUNITY.</p>
        </div>
        <div className="footerBottom">
          <div className="footerLinks">
            <a href="#about">ABOUT</a><a href="#events">ARENA</a><a href="#mindset">MINDSET</a><a href={LINKS.discord} {...external}>DISCORD</a><a href={LINKS.instagram} {...external}>INSTAGRAM</a><a href={LINKS.youtube} {...external}>YOUTUBE</a>
          </div>
          <p>© {new Date().getFullYear()} KRAVYADA ESPORTS. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </main>
  )
}
