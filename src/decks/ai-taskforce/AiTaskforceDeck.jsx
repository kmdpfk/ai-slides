import './AiTaskforceDeck.css'
import qrKickoff from './assets/qr-ai-kickoff.png'

function AiTaskforceDeck() {
  return (
    <main className="deck" aria-label="Slide deck">
      <article className="slide" aria-label="Slide 1">
        <header className="slide-eyebrow">Education • AI Taskforce</header>

        <h1>AI Taskforce er etableret</h1>

        <p className="subtitle">
          Vi samler en tværgående erfaringsgruppe i Education, så vi struktureret,
          konkret og kritisk kan skabe mere værdi med AI i vores daglige arbejde.
        </p>

        <div className="slide-layout">
          <section className="content-block">
            <h2>Formål og fokus</h2>
            <ul className="purpose-list">
              <li>
                Opbygge erfaringer med AI som værktøj i udvikling, samarbejde og
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
              Del datoønsker, ideer, spørgsmål og forslag til use cases via
              QR-koden.
            </p>

            <div className="qr-box">
              <img src={qrKickoff} alt="QR-kode til input om kickoff" className="qr-image" />
            </div>

            <p className="deadline">Svar gerne senest 9. juni</p>
          </aside>
        </div>

        <footer className="slide-footer">
          <span>Kickoff workshop</span>
          <span>AI taskforce / erfaringsgruppe</span>
        </footer>
      </article>
    </main>
  )
}

export default AiTaskforceDeck
