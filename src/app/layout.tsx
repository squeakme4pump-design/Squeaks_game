import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Squeaks Arcade",
  description: "Runner + Bubble game starter",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="header">
            <div className="brand">
              <div className="logo">🐭</div>
              <div>
                <div className="title">Squeaks Arcade</div>
                <div className="subtitle">Runner + Bubble starter (Next.js + Phaser)</div>
              </div>
            </div>
            <nav className="nav">
              <a href="/" className="link">Home</a>
              <a href="/runner" className="link">Runner</a>
              <a href="/bubbles" className="link">Bubbles</a>
            </nav>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">
            Built for Cardic • Deploy on Vercel • Code in GitHub Codespaces
          </footer>
        </div>
      </body>
    </html>
  );
}
