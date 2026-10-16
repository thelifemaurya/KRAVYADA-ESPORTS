'use client'

import { useEffect, useState } from 'react'
import { getInstallPrompt, INSTALL_EVENT, isStandalone, setInstallPrompt } from './pwa'

// Shows an "Install app" button only when Chrome says the site can be installed.
export default function InstallApp({ className = 'btn' }: { className?: string }) {
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    const sync = () => setAvailable(!isStandalone() && getInstallPrompt() !== null)
    sync()
    window.addEventListener(INSTALL_EVENT, sync)
    return () => window.removeEventListener(INSTALL_EVENT, sync)
  }, [])

  if (!available) return null

  async function install() {
    const prompt = getInstallPrompt()
    if (!prompt) return
    await prompt.prompt()
    await prompt.userChoice
    setInstallPrompt(null)
  }

  return (
    <button type="button" className={className} onClick={install}>
      Install app
    </button>
  )
}
