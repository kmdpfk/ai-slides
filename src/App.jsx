import { useEffect, useState } from 'react'
import './App.css'
import LandingPage from './LandingPage.jsx'
import { getDeck } from './decks/registry.js'

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '')
  if (!raw) return { route: 'home' }
  const [section, slug] = raw.split('/')
  if (section === 'deck' && slug) return { route: 'deck', slug }
  return { route: 'home' }
}

function App() {
  const [location, setLocation] = useState(parseHash)

  useEffect(() => {
    const onHashChange = () => setLocation(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const title =
      location.route === 'deck'
        ? (getDeck(location.slug)?.title ?? 'Deck not found')
        : 'AI Slides'
    document.title = title
  }, [location])

  if (location.route === 'deck') {
    const deck = getDeck(location.slug)
    if (!deck) {
      return (
        <main className="not-found">
          <h1>Deck not found</h1>
          <p>Der findes ingen deck med id «{location.slug}».</p>
          <a href="#/">← Tilbage til oversigten</a>
        </main>
      )
    }
    const { Component } = deck
    return (
      <div className="app-shell">
        <a href="#/" className="back-link" aria-label="Tilbage til oversigten">
          ← Decks
        </a>
        <Component />
      </div>
    )
  }

  return <LandingPage />
}

export default App
