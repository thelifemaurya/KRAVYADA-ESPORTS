import Link from 'next/link'

const scrims = [
  { title:'KRV CS PAID #018', game:'FREE FIRE', mode:'4v4', fee:'₹25', prize:'₹500', slots:'32/48', time:'Today • 8:00 PM' },
  { title:'KRV LW SOLO #011', game:'FREE FIRE', mode:'LONE WOLF', fee:'₹15', prize:'₹250', slots:'18/24', time:'Today • 6:00 PM' },
  { title:'KRV BR SCRIMS #027', game:'FREE FIRE', mode:'BR 4v4', fee:'₹35', prize:'₹700', slots:'9/12', time:'Tomorrow • 7:00 PM' },
]

export default function Home() {
  return <main>
    <nav className="nav"><Link href="/" className="brand"><span>K</span> KRAVYADA <b>ESPORTS</b></Link><div className="navlinks"><Link href="#scrims">Scrims</Link><Link href="#games">Games</Link><Link href="/login" className="login">Login</Link></div></nav>
    <section className="hero"><div className="glow"/><p className="eyebrow">OFFICIAL KRAVYADA ESPORTS PLATFORM</p><h1>COMPETE.<br/><em>CONQUER.</em><br/>CLAIM YOUR PLACE.</h1><p className="sub">Official paid scrims, competitive rooms and tournament access — built for players who take every match seriously.</p><div className="actions"><Link href="#scrims" className="btn primary">EXPLORE SCRIMS →</Link><Link href="/register" className="btn ghost">CREATE ACCOUNT</Link></div></section>
    <section id="games" className="section"><div className="sectionhead"><div><p className="eyebrow">CHOOSE YOUR BATTLE</p><h2>Games & Categories</h2></div></div><div className="games"><div className="game active"><small>01</small><h3>FREE FIRE</h3><p>LW Solo • CS 4v4 • BR 4v4 • Duo • Solo</p></div><div className="game"><small>02</small><h3>BGMI</h3><p>Coming soon</p></div><div className="game"><small>03</small><h3>CHESS</h3><p>Coming soon</p></div></div></section>
    <section id="scrims" className="section scrimsection"><div className="sectionhead"><div><p className="eyebrow">OPEN REGISTRATIONS</p><h2>Upcoming Scrims</h2></div><span className="live">● LIVE REGISTRATION</span></div><div className="cards">{scrims.map(s=><article className="card" key={s.title}><div className="banner"><span>{s.game}</span><strong>{s.mode}</strong></div><div className="cardbody"><div className="row"><h3>{s.title}</h3><span className="open">OPEN</span></div><p className="time">◷ {s.time}</p><div className="stats"><div><small>ENTRY</small><b>{s.fee}</b></div><div><small>PRIZE POOL</small><b>{s.prize}</b></div><div><small>SLOTS</small><b>{s.slots}</b></div></div><Link href="/login" className="cardbtn">REGISTER / VIEW DETAILS →</Link></div></article>)}</div></section>
    <footer><div className="brand"><span>K</span> KRAVYADA <b>ESPORTS</b></div><p>COMPETE WITH PURPOSE.</p></footer>
  </main>
}