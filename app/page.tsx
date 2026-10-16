import Image from 'next/image'
import Link from 'next/link'
import { EXTERNAL, SOCIAL } from './site'
import { roster } from './data/roster'
import { results } from './data/results'
import { schedule } from './data/schedule'

export default function Home() {
  const nextUp = schedule.slice(0, 3)

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true">
          <Image
            src="/kravyada-logo.jpg"
            alt=""
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 760px) 130vw, 72vw"
          />
        </div>

        <div className="wrap hero-body">
          <p className="hero-kicker">Independent Free Fire esports organisation</p>
          <p className="hero-lede">
            Regular scrims, community tournaments and a place for serious players to get better. Founded by Ayush
            Maurya.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-red" href="/join">
              Apply to play
            </Link>
            <a className="btn" href={SOCIAL.discord} {...EXTERNAL}>
              Join the Discord
            </a>
          </div>
          <h1 id="hero-title" className="wordmark" aria-label="KRAVYADA ESPORTS">
            <span className="wm-a">KRAV</span>
            <span className="wm-b">YADA</span>
          </h1>
        </div>
      </section>

      <section className="section" aria-labelledby="run-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="run-title">What we run</h2>
            <p>Everything is built around one thing: more match practice against players who take it seriously.</p>
          </div>
          <ul className="rows">
            <li className="row">
              <h3>Scrims</h3>
              <p>Regular Free Fire scrims for squads that want real practice, including paid lobbies.</p>
              <Link className="link" href="/scrims">
                See scrims
              </Link>
            </li>
            <li className="row">
              <h3>Tournaments</h3>
              <p>Community tournaments organised by KRAVYADA, announced on Discord and Instagram.</p>
              <a className="link" href={SOCIAL.instagram} {...EXTERNAL}>
                Follow on Instagram
              </a>
            </li>
            <li className="row">
              <h3>Community</h3>
              <p>A Discord server and a WhatsApp channel for players, squads and anyone who loves the game.</p>
              <a className="link" href={SOCIAL.discord} {...EXTERNAL}>
                Join the Discord
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="scrims-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="scrims-title">Next scrims</h2>
            <Link className="link" href="/scrims">
              All scrims and tournaments
            </Link>
          </div>
          {nextUp.length > 0 ? (
            <ul className="rows">
              {nextUp.map((item) => (
                <li className="row" key={`${item.when}-${item.title}`}>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <span className="row-when">{item.when}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty">
              <strong>No scrims are posted here right now.</strong>
              Timings and lobby details go out on Discord and Instagram first.
              <div className="hero-actions">
                <a className="btn btn-red" href={SOCIAL.discord} {...EXTERNAL}>
                  Open Discord
                </a>
                <a className="btn" href={SOCIAL.paidScrims} {...EXTERNAL}>
                  Paid scrims on Instagram
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {roster.length > 0 && (
        <section className="section" aria-labelledby="roster-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="roster-title">Roster</h2>
            </div>
            <div className="players">
              {roster.map((player) => (
                <article className="player" key={player.ign}>
                  <h3>{player.ign}</h3>
                  <p>{player.name}</p>
                  {player.role && <p className="player-role">{player.role}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {results.length > 0 && (
        <section className="section" aria-labelledby="results-title">
          <div className="wrap">
            <div className="section-head">
              <h2 id="results-title">Results</h2>
            </div>
            <ul className="rows">
              {results.map((result) => (
                <li className="row" key={`${result.event}-${result.placement}`}>
                  <h3>{result.placement}</h3>
                  <p>{result.event}</p>
                  <span className="row-when">{result.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="who-title">
        <div className="wrap split">
          <h2 id="who-title">Run independently</h2>
          <div>
            <p className="lead">
              KRAVYADA ESPORTS was founded by Ayush Maurya and is not part of any other esports organisation.
            </p>
            <p className="muted">
              The goal is simple: give players who are serious about Free Fire room to practise, compete and improve.
            </p>
            <p>
              <Link className="link" href="/about">
                More about KRAVYADA
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="apply-title">
        <div className="wrap">
          <div className="band">
            <h2 id="apply-title">Want to play for KRAVYADA?</h2>
            <p className="lead">
              Send your Free Fire ID, role and device. The application goes to our Instagram DMs.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-red" href="/join">
                Apply to play
              </Link>
              <a className="btn" href={SOCIAL.whatsapp} {...EXTERNAL}>
                WhatsApp channel
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
