import './App.css'

function App() {
  return (
    <main className="deck" aria-label="Slide deck">
      <article className="slide" aria-label="Slide 1">
        <header className="slide-eyebrow">AI Slides • Slide 01</header>

        <h1>Pitch Without PowerPoint</h1>

        <p className="subtitle">
          A React + Vite presentation canvas where each component can become a
          reusable, data-driven slide.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h2>Code-Native</h2>
            <p>Design, version, and review slides using the same Git workflow.</p>
          </div>
          <div className="feature-card">
            <h2>Composable</h2>
            <p>Build layouts with reusable React blocks and shared design tokens.</p>
          </div>
          <div className="feature-card">
            <h2>Automatable</h2>
            <p>Generate decks from prompts, JSON data, or pipeline outputs.</p>
          </div>
        </div>

        <footer className="slide-footer">
          <span>v0.1 starter</span>
          <span>16:9 optimized</span>
        </footer>
      </article>
    </main>
  )
}

export default App
