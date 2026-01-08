export default function Home() {
  return (
    <div className="grid">
      <section className="card col-7" style={{ padding: 18 }}>
        <h1 style={{ margin: 0, fontSize: 28, letterSpacing: 0.2 }}>Build Squeaks Games</h1>
        <p className="muted" style={{ marginTop: 10, lineHeight: 1.5 }}>
          This repo is a clean starter you can push to GitHub, deploy on Vercel, and develop inside Codespaces.
          It includes two playable placeholders using Phaser:
          <b> Runner</b> (Subway Surfers style) and <b>Bubbles</b> (bubble game).
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <a className="btn" href="/runner">▶️ Open Runner</a>
          <a className="btn" href="/bubbles">🫧 Open Bubbles</a>
        </div>

        <div style={{ marginTop: 18 }} className="small muted">
          Controls:
          <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span className="kbd">Runner: ← →</span>
            <span className="kbd">Jump: ↑ / Space</span>
            <span className="kbd">Slide: ↓</span>
            <span className="kbd">Bubbles: Click/Tap</span>
          </div>
        </div>
      </section>

      <aside className="card col-5" style={{ padding: 18 }}>
        <h2 style={{ marginTop: 0, marginBottom: 10 }}>Deploy steps</h2>
        <ol className="muted" style={{ lineHeight: 1.7, marginTop: 0 }}>
          <li>Upload this repo to GitHub</li>
          <li>Open in Codespaces → run <span className="kbd">npm install</span></li>
          <li>Test locally: <span className="kbd">npm run dev</span></li>
          <li>Import repo in Vercel → Deploy</li>
        </ol>
        <p className="muted small">
          After deploy, every push updates your live site automatically.
        </p>
      </aside>
    </div>
  );
}
