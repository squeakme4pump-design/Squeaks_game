"use client";

import dynamic from "next/dynamic";
import * as Phaser from "phaser";
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
    scale: { mode: Phaser.Scale.NONE }
  });

  return (
    <div className="card canvasWrap">
      <h2>Bubbles</h2>
      <GameCanvas makeConfig={makeConfig} />
    </div>
  );
}
