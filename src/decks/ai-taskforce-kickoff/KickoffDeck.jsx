import { useCallback, useEffect, useRef, useState } from 'react'
import './KickoffDeck.css'

const PRESETS = [
  { label: 'Demo', seconds: 4 * 60 },
  { label: 'Spørgsmål', seconds: 2 * 60 },
]

function formatTime(total) {
  const safe = Math.max(0, total)
  const m = Math.floor(safe / 60)
  const s = safe % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function ShowTellTimer() {
  const [presetIndex, setPresetIndex] = useState(0)
  const [remaining, setRemaining] = useState(PRESETS[0].seconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running) return undefined
    intervalRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => window.clearInterval(intervalRef.current)
  }, [running])

  const choosePreset = (idx) => {
    setPresetIndex(idx)
    setRemaining(PRESETS[idx].seconds)
    setRunning(false)
  }

  const toggle = () => {
    if (remaining === 0) {
      setRemaining(PRESETS[presetIndex].seconds)
      setRunning(true)
      return
    }
    setRunning((r) => !r)
  }

  const reset = () => {
    setRunning(false)
    setRemaining(PRESETS[presetIndex].seconds)
  }

  const total = PRESETS[presetIndex].seconds
  const progress = total > 0 ? ((total - remaining) / total) * 100 : 0
  const finished = remaining === 0
  const warning = !finished && remaining <= 30

  return (
    <div
      className={`kickoff-timer${finished ? ' kickoff-timer-done' : ''}${warning ? ' kickoff-timer-warn' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="kickoff-timer-presets" role="group" aria-label="Vælg timer">
        {PRESETS.map((p, idx) => (
          <button
            key={p.label}
            type="button"
            className={`kickoff-timer-preset${idx === presetIndex ? ' is-active' : ''}`}
            onClick={() => choosePreset(idx)}
          >
            {p.label} · {p.seconds / 60} min
          </button>
        ))}
      </div>

      <div className="kickoff-timer-display" aria-live="polite">
        {formatTime(remaining)}
      </div>

      <div className="kickoff-timer-bar" aria-hidden="true">
        <div className="kickoff-timer-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="kickoff-timer-controls">
        <button
          type="button"
          className="kickoff-timer-btn kickoff-timer-btn-primary"
          onClick={toggle}
        >
          {running ? 'Stop' : finished ? 'Genstart' : 'Start'}
        </button>
        <button
          type="button"
          className="kickoff-timer-btn"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

const slides = [
  {
    id: 'intro',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Education • AI Taskforce</header>
        <h1 className="kickoff-title">AI Taskforce – Kickoff</h1>
        <p className="kickoff-subtitle">
          Vi samler en tværgående erfaringsgruppe i Education, så vi struktureret,
          konkret og kritisk kan skabe mere værdi med AI i hverdagen.
        </p>
        <div className="kickoff-meta">
          <span>2 timer</span>
          <span>Show &amp; Tell · brainstorm · prioritering</span>
        </div>
      </>
    ),
  },
  {
    id: 'purpose',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Hvorfor er vi her?</header>
        <h2 className="kickoff-heading">Formål med taskforcen</h2>
        <ul className="kickoff-list">
          <li>
            Opbygge erfaringer og drive anvendelsen af AI i vores daglige arbejde –
            <strong> struktureret, konkret og kritisk</strong>.
          </li>
          <li>
            Skabe <strong>reel værdi og effektivitet</strong> i måden vi udvikler
            og samarbejder på.
          </li>
          <li>
            Fokus er <strong>ikke</strong> AI i produkterne, men AI som
            <strong> værktøj</strong> omkring produkterne og i hverdagen.
          </li>
          <li>
            Udbrede værdiskabende brug af AI til alle kollegaer i Education – især
            dem der ikke har taget springet endnu.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'kickoff-goal',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Mål for i dag</header>
        <h2 className="kickoff-heading">Hvad skal kickoff’en levere?</h2>
        <div className="kickoff-pillars">
          <div className="kickoff-pillar">
            <span className="kickoff-pillar-num">1</span>
            <h3>Fælles retning</h3>
            <p>Etablere fælles formål og arbejdsform for gruppen.</p>
          </div>
          <div className="kickoff-pillar">
            <span className="kickoff-pillar-num">2</span>
            <h3>Konkrete erfaringer</h3>
            <p>Dele hvad der virker i praksis – og hvad der ikke gør.</p>
          </div>
          <div className="kickoff-pillar">
            <span className="kickoff-pillar-num">3</span>
            <h3>Første use cases</h3>
            <p>Identificere og prioritere de første emner vi arbejder videre med.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'agenda',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Sådan kører vi det</header>
        <h2 className="kickoff-heading">Agenda – ca. 2 timer</h2>
        <ol className="kickoff-agenda">
          <li><span>1</span><div><strong>Velkomst &amp; formål</strong><em>~10 min</em></div></li>
          <li><span>2</span><div><strong>Kort runde: forventninger</strong><em>~15 min</em></div></li>
          <li><span>3</span><div><strong>Show &amp; Tell</strong> – hovedpunkt<em>~60 min</em></div></li>
          <li><span>4</span><div><strong>Opsamling på erfaringer</strong> (post-it)<em>~10 min</em></div></li>
          <li><span>5</span><div><strong>Use cases / emner</strong> (post-it)<em>~10 min</em></div></li>
          <li><span>6</span><div><strong>Prioritering</strong> + ejerskab<em>~10 min</em></div></li>
          <li><span>7</span><div><strong>Arbejdsmode &amp; næste skridt</strong><em>~5 min</em></div></li>
        </ol>
      </>
    ),
  },
  {
    id: 'agenda-1',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Agendapunkt 1 · ~10 min</header>
        <h2 className="kickoff-heading">Velkomst &amp; formål</h2>
        <ul className="kickoff-list">
          <li>Hvorfor en AI taskforce – og hvorfor nu?</li>
          <li>
            Værdi i praksis: udvikling, review, test, dokumentation, processer,
            samarbejde, workflows.
          </li>
          <li>
            Plads til både entusiaster og kritikere – det vigtige er nysgerrighed,
            faglighed og lysten til at bidrage.
          </li>
          <li>Vi arbejder praksisnært, eksplorativt og iterativt.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'agenda-2',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Agendapunkt 2 · ~15 min</header>
        <h2 className="kickoff-heading">Kort runde: forventninger</h2>
        <p className="kickoff-lead">Hver person svarer kort (1–2 min):</p>
        <ul className="kickoff-questions">
          <li>
            <span className="kickoff-questions-badge">?</span>
            <p>
              Hvad vil du gerne blive <strong>bedre til</strong> med AI i dit
              arbejde?
            </p>
          </li>
          <li>
            <span className="kickoff-questions-badge">?</span>
            <p>
              Hvad <strong>forventer</strong> du at få ud af at deltage?
            </p>
          </li>
          <li>
            <span className="kickoff-questions-badge">?</span>
            <p>
              Hvordan vil du <strong>bidrage</strong> i denne gruppe?
            </p>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'agenda-3-tips',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Agendapunkt 3 · ~60 min · hovedpunkt</header>
        <h2 className="kickoff-heading">Show &amp; Tell</h2>
        <p className="kickoff-lead">Tænk over hver demo – mens vi lytter:</p>
        <ul className="kickoff-list">
          <li>Hvad <strong>sparer det tid på</strong> eller forbedrer?</li>
          <li>Hvad var <strong>“tricket”</strong> der gjorde det godt?</li>
          <li>Hvad <strong>virker ikke</strong> – hvor er faldgruberne?</li>
          <li>Kunne det her bruges i <strong>mit team</strong>?</li>
        </ul>
        <p className="kickoff-foot kickoff-foot-soft">
          Tag noter – vi bruger dem i næste punkt.
        </p>
      </>
    ),
  },
  {
    id: 'agenda-3',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Agendapunkt 3 · ~60 min · hovedpunkt</header>
        <h2 className="kickoff-heading">Show &amp; Tell</h2>
        <p className="kickoff-lead">
          Alle viser en konkret demo af <em>den AI-ting de har haft mest glæde af</em>.
        </p>
        <div className="kickoff-timer-stage">
          <ShowTellTimer />
        </div>
        <p className="kickoff-foot">
          Fokus: konkret anvendelse – kode, test, review, dokumentation, workflows,
          processer. Simpelt og uperfekt er fint – bare det er værdiskabende.
        </p>
      </>
    ),
  },
  {
    id: 'agenda-4',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Agendapunkt 4 · ~10 min · post-it</header>
        <h2 className="kickoff-heading">Opsamling på erfaringer</h2>
        <div className="kickoff-columns">
          <section className="kickoff-column">
            <h3 className="kickoff-column-title">Hvad virker godt?</h3>
            <div className="kickoff-column-notes">
              <span className="kickoff-sticky">Konkrete mønstre</span>
              <span className="kickoff-sticky">Tools</span>
              <span className="kickoff-sticky">Prompts</span>
              <span className="kickoff-sticky">Workflows</span>
              <span className="kickoff-sticky">Vaner der giver værdi</span>
            </div>
          </section>
          <section className="kickoff-column">
            <h3 className="kickoff-column-title">Hvad er faldgruber / risici?</h3>
            <div className="kickoff-column-notes">
              <span className="kickoff-sticky">Kvalitet</span>
              <span className="kickoff-sticky">Sikkerhed</span>
              <span className="kickoff-sticky">Tillid</span>
              <span className="kickoff-sticky">Compliance</span>
              <span className="kickoff-sticky">Spildtid</span>
              <span className="kickoff-sticky">Hype</span>
            </div>
          </section>
        </div>
      </>
    ),
  },
  {
    id: 'agenda-5',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Agendapunkt 5 · ~10 min · post-it</header>
        <h2 className="kickoff-heading">Use cases &amp; emner</h2>
        <ul className="kickoff-list">
          <li>
            Hvilke områder giver <strong>mest værdi</strong> at arbejde videre med?
          </li>
          <li>
            Hvilke emner skal <strong>afmystificeres</strong> for at få udbredt AI?
          </li>
          <li>
            Hvor kan vi trække på <strong>erfaringer fra andre afdelinger</strong>?
          </li>
        </ul>
        <div className="kickoff-postit-wall" aria-label="Mulige emner">
          <span className="kickoff-sticky">Udvikling</span>
          <span className="kickoff-sticky">Review &amp; test</span>
          <span className="kickoff-sticky">Dokumentation</span>
          <span className="kickoff-sticky">Processer</span>
          <span className="kickoff-sticky">Værktøjer / MCP</span>
          <span className="kickoff-sticky">Agents &amp; workflows</span>
          <span className="kickoff-sticky">Azure DevOps</span>
          <span className="kickoff-sticky">Figma</span>
        </div>
      </>
    ),
  },
  {
    id: 'agenda-6',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Agendapunkt 6 · ~10 min</header>
        <h2 className="kickoff-heading">Prioritering</h2>
        <ul className="kickoff-list">
          <li>
            Vi udvælger <strong>3–5 konkrete emner / use cases / erfaringer</strong>
            at arbejde videre med.
          </li>
          <li>
            Vurderingskriterier: <em>værdi</em>, <em>modenhed</em>,
            <em> realiserbarhed</em>, <em>spredningseffekt</em>.
          </li>
          <li>
            Aftale <strong>ejerskab</strong> – hvem driver hvert emne?
          </li>
        </ul>
        <p className="kickoff-foot">
          Bedre med få emner der bliver til noget, end mange der ender på en liste.
        </p>
      </>
    ),
  },
  {
    id: 'agenda-7',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Agendapunkt 7 · ~5 min</header>
        <h2 className="kickoff-heading">Arbejdsmode &amp; næste skridt</h2>
        <ul className="kickoff-list">
          <li>
            <strong>Cadence</strong> – hvor ofte mødes vi, og i hvilket format?
          </li>
          <li>
            <strong>Artefakter</strong> – hvor deler vi erfaringer, demos og
            prompts?
          </li>
          <li>
            <strong>Bro til resten af Education</strong> – hvordan løfter vi
            kollegaerne med?
          </li>
          <li>
            <strong>Næste møde</strong> – dato, ejer, agenda.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'outro',
    render: () => (
      <>
        <header className="kickoff-eyebrow">Tak for i dag</header>
        <h1 className="kickoff-title">Lad os komme i gang.</h1>
        <p className="kickoff-subtitle">
          Nysgerrighed, faglighed og lysten til at bidrage – det er det vi bygger
          videre på.
        </p>
        <div className="kickoff-meta">
          <span>AI Taskforce</span>
          <span>Education</span>
        </div>
      </>
    ),
  },
]

function KickoffDeck() {
  const [index, setIndex] = useState(0)

  const goTo = useCallback((next) => {
    setIndex((i) => {
      const target = typeof next === 'function' ? next(i) : next
      return Math.max(0, Math.min(slides.length - 1, target))
    })
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        goTo((i) => i + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        goTo((i) => i - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(slides.length - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo])

  const slide = slides[index]
  const progress = ((index + 1) / slides.length) * 100

  return (
    <main className="kickoff-deck" aria-label="AI Taskforce kickoff deck">
      <article
        key={slide.id}
        className="kickoff-slide"
        aria-label={`Slide ${index + 1} af ${slides.length}`}
        onClick={() => goTo((i) => i + 1)}
      >
        {slide.render()}
      </article>

      <div className="kickoff-progress" aria-hidden="true">
        <div className="kickoff-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <nav className="kickoff-nav" aria-label="Slidenavigation">
        <button
          type="button"
          className="kickoff-nav-btn"
          onClick={(e) => { e.stopPropagation(); goTo((i) => i - 1) }}
          disabled={index === 0}
          aria-label="Forrige slide"
        >
          ←
        </button>
        <span className="kickoff-counter">
          {index + 1} / {slides.length}
        </span>
        <button
          type="button"
          className="kickoff-nav-btn"
          onClick={(e) => { e.stopPropagation(); goTo((i) => i + 1) }}
          disabled={index === slides.length - 1}
          aria-label="Næste slide"
        >
          →
        </button>
      </nav>
    </main>
  )
}

export default KickoffDeck
