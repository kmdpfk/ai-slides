import './App.css'

function App() {
  return (
    <main className="deck" aria-label="Slide deck">
      <article className="slide" aria-label="Slide 1">
        <header className="slide-eyebrow">Education • AI Taskforce</header>

        <h1>AI Taskforce er etableret</h1>

        <p className="subtitle">
          Vi samler en tvargaende erfaringsgruppe i Education, sa vi struktureret,
          konkret og kritisk kan skabe mere vaerdi med AI i vores daglige arbejde.
        </p>

        <div className="slide-layout">
          <section className="content-block">
            <h2>Formal og fokus</h2>
            <ul className="purpose-list">
              <li>
                Opbygge erfaringer med AI som vaerktoj i udvikling, samarbejde og
                processer.
              </li>
              <li>
                Dele hvad der virker i praksis, og hvad der ikke virker.
              </li>
              <li>
                Fokus er ikke AI i produkterne, men hvordan vi anvender AI i
                hverdagen.
              </li>
            </ul>
          </section>

          <aside className="qr-panel" aria-label="Kickoff input via QR">
            <h2>Input til kickoff</h2>
            <p>
              Del datoonsker, ideer, spørgsmål og forslag til use cases via
              QR-koden.
            </p>

            <div className="qr-box" role="img" aria-label="QR-kode til kickoff input">
              <div className="qr-grid" aria-hidden="true" />
              <span>Scan QR her</span>
            </div>

            <p className="deadline">Svar gerne senest 4. juni</p>
          </aside>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h2>Retning</h2>
            <p>Faelles retning, arbejdsform og prioriterede emner for taskforcen.</p>
          </div>
          <div className="feature-card">
            <h2>Praksis</h2>
            <p>Show and tell med konkrete erfaringer fra kode, test og workflows.</p>
          </div>
          <div className="feature-card">
            <h2>Vaerdi</h2>
            <p>Udvaelg 3-5 use cases med ejerskab og reel effekt i hverdagen.</p>
          </div>
        </div>

        <footer className="slide-footer">
          <span>Kickoff workshop</span>
          <span>AI taskforce / erfaringsgruppe</span>
        </footer>
      </article>
    </main>
  )
}

export default App
