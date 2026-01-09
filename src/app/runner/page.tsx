"use client";

import dynamic from "next/dynamic";
import * as Phaser from "phaser";
import RunnerScene from "@/games/runner/RunnerScene";

const GameCanvas = dynamic(() => import("@/components/GameCanvas"), { ssr: false });

export default function RunnerPage() {
  const makeConfig = (width: number, height: number): Phaser.Types.Core.GameConfig => ({
    type: Phaser.AUTO,
    width,
    height,
    backgroundColor: "#0b1220",
    scene: [RunnerScene],
    physics: { default: "arcade" },
    scale: { mode: Phaser.Scale.NONE }
  });

  return (
    <div className="card canvasWrap">
      <h2>Runner</h2>
      <GameCanvas makeConfig={makeConfig} />
    </div>
  );
}
