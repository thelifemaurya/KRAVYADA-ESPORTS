import Link from 'next/link'
import { EXTERNAL } from '../site'
import { formatWhen, isAutoApproval, scrimDetail, tournamentDetail, type Scrim, type Tournament } from '../lib/events'

type Item =
  | { kind: 'scrim'; data: Scrim }
  | { kind: 'tournament'; data: Tournament }

// Cards with an optional banner. Used for scrims and tournaments on the home and scrims pages.
export default function EventCards({ items }: { items: Item[] }) {
  return (
    <ul className="event-cards">
      {items.map(({ kind, data }) => (
        <li className="event-card" key={`${kind}:${data.id}`}>
          {data.banner_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="event-banner" src={data.banner_url} alt="" loading="lazy" width={960} height={540} />
          )}
          <div className="event-body">
            <span className="row-when">{formatWhen(data.starts_at)}</span>
            <h3>{data.title}</h3>
            <p>{kind === 'scrim' ? scrimDetail(data as Scrim) : tournamentDetail(data as Tournament)}</p>
            <div className="hero-actions">
              {data.registration_open ? (
                <Link className="btn btn-red btn-sm" href={`/register?event=${kind}:${data.id}#register`}>
                  {isAutoApproval(data) ? 'Register (instant slot)' : 'Register'}
                </Link>
              ) : (
                <span className="note">Registration closed</span>
              )}
              {kind === 'tournament' && (data as Tournament).registration_url && (
                <a className="btn btn-sm" href={(data as Tournament).registration_url!} {...EXTERNAL}>
                  More info
                </a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
