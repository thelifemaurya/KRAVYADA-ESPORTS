import Image from 'next/image'
import Link from 'next/link'
import { EXTERNAL, SOCIAL } from './site'
import { roster } from './data/roster'
import { results } from './data/results'
import { formatWhen, getUpcomingScrims, scrimDetail } from './lib/events'
import Icon, { type IconName } from './components/Icon'
import InstallApp from './components/InstallApp'
import Reveal from './components/Reveal'

type Tile = { title: string; note: string; icon: IconName; href: string }

const TILES: Tile[] = [
  { title: 'Discord', note: 'Main community server', icon: 'chat', href: SOCIAL.discord },
  { title: 'Instagram', note: 'News and highlights', icon: 'instagram', href: SOCIAL.instagram },
  { title: 'YouTube', note: 'Watch KRAVYADA', icon: 'youtube', href: SOCIAL.youtube },
  { title: 'WhatsApp', note: 'Channel updates', icon: 'bell', href: SOCIAL.whatsapp },
]

export const revalidate = 60

export default async function Home() {
  const nextUp = (await getUpcomingScrims()).slice(0, 3)

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-art" aria-hidden="true">
            <Image
              src="/kravyada-logo.jpg"
              alt=""
              width={1254}
              height={1254}
              priority
              sizes="(max-width: 900px) 70vw, 480px"
            />
          </div>

          <div className="hero-copy">
            <h1 id="hero-title" className="wordmark">
              <span className="wm-line">Compete.</span>
              <span className="wm-line">Conquer.</span>
              <span className="wm-line wm-soft">Become</span>
              <span className="wm-line">
                <span className="wm-a">KRAV</span>
                <span className="wm-b">YADA</span>
              </span>
            </h1>
            <p className="hero-kicker">Independent Free Fire esports organisation</p>
            <p className="hero-lede">
              Regular scrims, community tournaments and a place for serious players to get better.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-red" href="/scrims">
                Join scrims
              </Link>
              <Link className="btn" href="/trials">
                Team trials
              </Link>
              <InstallApp className="btn btn-ghost" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="paths-title">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <h2 id="paths-title">Choose your path</h2>
              <p>Two different things. Pick the one you came for.</p>
            </div>
            <div className="paths">
              <Link className="path path-steel" href="/scrims">
                <span className="path-icon">
                  <Icon name="crosshair" size={26} />
                </span>
                <h3>Join scrims</h3>
                <p>Practice matches against other squads, including paid lobbies. Open to everyone, no team needed.</p>
                <span className="path-link">See scrims</span>
              </Link>
              <Link className="path path-red" href="/trials">
                <span className="path-icon">
                  <Icon name="join" size={26} />
                </span>
                <h3>Team trials</h3>
                <p>Want to play for KRAVYADA? Send your Free Fire ID, role and device to try out for the roster.</p>
                <span className="path-link">Apply for trials</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="scrims-title">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <h2 id="scrims-title">Next scrims</h2>
              <Link className="link" href="/scrims">
                All scrims
              </Link>
            </div>
            {nextUp.length > 0 ? (
              <ul className="rows">
                {nextUp.map((item) => (
                  <li className="row" key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{scrimDetail(item)}</p>
                    <span className="row-when">{formatWhen(item.starts_at)}</span>
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
                    Paid scrims
                  </a>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {roster.length > 0 && (
        <section className="section" aria-labelledby="roster-title">
          <div className="wrap">
            <Reveal>
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
            </Reveal>
          </div>
        </section>
      )}

      {results.length > 0 && (
        <section className="section" aria-labelledby="results-title">
          <div className="wrap">
            <Reveal>
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
            </Reveal>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="follow-title">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <h2 id="follow-title">Stay connected</h2>
            </div>
            <div className="tiles">
              {TILES.map((tile) => (
                <a key={tile.title} className="tile" href={tile.href} {...EXTERNAL}>
                  <span className="tile-icon">
                    <Icon name={tile.icon} size={22} />
                  </span>
                  <span className="tile-text">
                    <strong>{tile.title}</strong>
                    <small>{tile.note}</small>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="indie-title">
        <div className="wrap">
          <Reveal>
            <div className="band">
              <h2 id="indie-title">Independent by design</h2>
              <p className="lead">
                KRAVYADA is a solo organisation and is not part of any other esports organisation. Read how it started and
                what it runs.
              </p>
              <div className="hero-actions">
                <Link className="btn" href="/about">
                  About KRAVYADA
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
