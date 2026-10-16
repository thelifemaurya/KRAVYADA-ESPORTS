// Shared state for the "Install app" prompt. Chrome fires `beforeinstallprompt` once,
// so we keep the event here and let any component read it.
export type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferred: InstallPromptEvent | null = null

export const INSTALL_EVENT = 'kv-install-change'

export function getInstallPrompt() {
  return deferred
}

export function setInstallPrompt(event: InstallPromptEvent | null) {
  deferred = event
  window.dispatchEvent(new Event(INSTALL_EVENT))
}

export function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}
