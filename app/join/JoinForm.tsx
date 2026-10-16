'use client'

import { useState } from 'react'
import { SOCIAL } from '../site'

const ROLES = ['Rusher', 'Support', 'Sniper', 'In-game leader', 'Flexible']

type Status = 'idle' | 'copied' | 'manual'

export default function JoinForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const get = (key: string) => String(data.get(key) ?? '').trim()

    const text = [
      'KRAVYADA ESPORTS application',
      `In-game name: ${get('ign')}`,
      `Free Fire UID: ${get('uid')}`,
      `Role: ${get('role')}`,
      `Device: ${get('device')}`,
      `Contact: ${get('contact')}`,
      get('about') ? `About me: ${get('about')}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    setMessage(text)

    try {
      await navigator.clipboard.writeText(text)
      setStatus('copied')
    } catch {
      setStatus('manual')
    }
    window.open(SOCIAL.instagramDm, '_blank', 'noopener,noreferrer')
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="ign">In-game name</label>
          <input id="ign" name="ign" required autoComplete="off" maxLength={40} />
        </div>
        <div className="field">
          <label htmlFor="uid">Free Fire UID</label>
          <input id="uid" name="uid" required inputMode="numeric" autoComplete="off" maxLength={20} />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="role">Role</label>
          <select id="role" name="role" required defaultValue="">
            <option value="" disabled>
              Choose your role
            </option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="device">Device</label>
          <input id="device" name="device" required placeholder="Phone model or emulator" maxLength={60} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="contact">Your Instagram or Discord</label>
        <input id="contact" name="contact" required autoComplete="off" maxLength={60} />
      </div>

      <div className="field">
        <label htmlFor="about">Anything else we should know</label>
        <textarea id="about" name="about" maxLength={500} />
        <small>Optional. Past teams, tournaments you have played, how often you can practise.</small>
      </div>

      <div>
        <button className="btn btn-red" type="submit">
          Copy application and open Instagram
        </button>
      </div>

      <div className="form-status" role="status" aria-live="polite">
        {status === 'copied' && 'Copied. Paste it into the Instagram DM that just opened.'}
        {status === 'manual' &&
          'Could not copy automatically. Copy the text below and paste it into the Instagram DM.'}
      </div>

      {status === 'manual' && <div className="form-preview">{message}</div>}
    </form>
  )
}
