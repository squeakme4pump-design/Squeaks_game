"use client";

import dynamic from "next/dynamic";
import type Phaser from "phaser";
import BubblesScene from "@/games/bubbles/BubblesScene";

const GameCanvas = dynamic(() => import("@/components/GameCanvas"), { ssr: false });

export default function BubblesPage() {
  const makeConfig = (width: number, height: number): Phaser.Types.Core.GameConfig => ({
    type: Phaser.AUTO,
    width,
    height,
    backgroundColor: "#0b1220",
    scene: [BubblesScene],
    physics: { default: "arcade" },
    scale: { mode: Phaser.Scale.NONE },
  });

  return (
    <div className="card canvasWrap">
      <h2 style={{ marginTop: 0, marginBottom: 8 }}>Bubbles</h2>
      <p className="muted small" style={{ marginTop: 0 }}>
        Placeholder bubble pop. If you want Bubble Shooter (aim + match colors), we’ll replace this with a grid + launcher.
      </p>
      <GameCanvas makeConfig={makeConfig} />
    </div>
  );
}
