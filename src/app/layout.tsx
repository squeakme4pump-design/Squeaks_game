import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Squeaks Arcade",
  description: "Runner and Bubble games"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/runner">Runner</Link>
            <Link href="/bubbles">Bubbles</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
