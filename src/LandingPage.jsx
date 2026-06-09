import './LandingPage.css'
import { decks } from './decks/registry.js'

function LandingPage() {
  return (
    <main className="landing">
      <header className="landing-hero">
        <p className="landing-eyebrow">Slide decks</p>
        <h1>AI Slides</h1>
        <p className="landing-subtitle">
          Vælg en præsentation. Hvert deck ligger i sin egen mappe under{' '}
          <code>src/decks/</code>.
        </p>
      </header>

      {decks.length === 0 ? (
        <p className="landing-empty">
          Ingen decks fundet endnu. Tilføj en mappe under <code>src/decks/</code>{' '}
          med et <code>index.js</code> der eksporterer deck-metadata.
        </p>
      ) : (
        <ul className="deck-grid">
          {decks.map((d) => (
            <li
              key={d.slug}
              className="deck-card"
              style={d.accent ? { '--deck-accent': d.accent } : undefined}
            >
              <a href={`#/deck/${d.slug}`} className="deck-card-link">
                {d.eyebrow && (
                  <span className="deck-card-eyebrow">{d.eyebrow}</span>
                )}
                <h2>{d.title}</h2>
                {d.description && <p>{d.description}</p>}
                <span className="deck-card-cta">Åbn deck →</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default LandingPage
