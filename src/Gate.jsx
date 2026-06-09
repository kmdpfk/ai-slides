import { useState } from 'react'
import './Gate.css'

const STORAGE_KEY = 'ai-slides-auth'
const EXPECTED_HASH = (import.meta.env.VITE_APP_PASSWORD_HASH ?? '')
  .trim()
  .toLowerCase()

async function sha256(text) {
  const data = new TextEncoder().encode(text)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function isUnlocked() {
  if (!EXPECTED_HASH) return true
  try {
    return sessionStorage.getItem(STORAGE_KEY) === EXPECTED_HASH
  } catch {
    return false
  }
}

function Gate({ children }) {
  const [unlocked, setUnlocked] = useState(isUnlocked)
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)

  if (unlocked) return children

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!pw || busy) return
    setBusy(true)
    setError(false)
    const hash = await sha256(pw)
    if (hash === EXPECTED_HASH) {
      try {
        sessionStorage.setItem(STORAGE_KEY, EXPECTED_HASH)
      } catch {
        // ignore storage errors (private mode etc.) – stays unlocked for this session
      }
      setUnlocked(true)
    } else {
      setError(true)
      setPw('')
    }
    setBusy(false)
  }

  return (
    <main className="gate">
      <form className="gate-card" onSubmit={onSubmit}>
        <p className="gate-eyebrow">AI Slides</p>
        <h1>Adgang kræves</h1>
        <p className="gate-lead">
          Denne side er beskyttet. Indtast adgangskoden for at fortsætte.
        </p>

        <label className="gate-field">
          <span>Adgangskode</span>
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            disabled={busy}
            aria-invalid={error || undefined}
          />
        </label>

        {error && (
          <p className="gate-error" role="alert">
            Forkert adgangskode – prøv igen.
          </p>
        )}

        <button type="submit" className="gate-submit" disabled={busy || !pw}>
          {busy ? 'Tjekker…' : 'Lås op'}
        </button>

        <p className="gate-note">
          Adgang gemmes kun i denne browser-session.
        </p>
      </form>
    </main>
  )
}

export default Gate
