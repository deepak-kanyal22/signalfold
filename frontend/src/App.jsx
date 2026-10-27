import { useState } from 'react'
import './App.css'

/**
 * App — top-level component for SignalFold.
 *
 * Current state: scaffold only.
 * The investigation form, results panel, and API calls will be
 * implemented in subsequent iterations.
 */
function App() {
  const [backendStatus, setBackendStatus] = useState(null)
  const [checking, setChecking] = useState(false)

  async function checkBackend() {
    setChecking(true)
    setBackendStatus(null)
    try {
      const res = await fetch('/api/health')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setBackendStatus({ ok: true, message: data.message ?? 'Backend reachable' })
    } catch (err) {
      setBackendStatus({ ok: false, message: String(err) })
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="sf-root">
      <header className="sf-header">
        <h1 className="sf-logo">
          <span className="sf-logo-signal">Signal</span>
          <span className="sf-logo-fold">Fold</span>
        </h1>
        <p className="sf-tagline">Evidence-first AI investigation agent</p>
      </header>

      <main className="sf-main">
        <section className="sf-card sf-scaffold-notice">
          <h2>🚧 Scaffold — not yet functional</h2>
          <p>
            The investigation agent is not yet implemented. Use the button below
            to verify that the frontend can reach the FastAPI backend.
          </p>

          <button
            className="sf-btn"
            onClick={checkBackend}
            disabled={checking}
            id="btn-health-check"
          >
            {checking ? 'Checking…' : 'Ping backend health'}
          </button>

          {backendStatus && (
            <p
              className={`sf-status ${backendStatus.ok ? 'sf-status--ok' : 'sf-status--error'}`}
              role="status"
            >
              {backendStatus.ok ? '✅' : '❌'} {backendStatus.message}
            </p>
          )}
        </section>
      </main>

      <footer className="sf-footer">
        <p>
          SignalFold · Nebius Global AI Hackathon ·{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
