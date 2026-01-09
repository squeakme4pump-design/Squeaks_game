"use client";

export const dynamic = "force-dynamic";

import dynamicImport from "next/dynamic";

const GameCanvas = dynamicImport(() => import("@/components/GameCanvas"), { ssr: false });

export default function RunnerPage() {
  const createGame = async (container: HTMLDivElement, width: number, height: number) => {
    const Phaser = await import("phaser");
    const SceneMod = await import("@/games/runner/RunnerScene");
    const RunnerScene = SceneMod.default;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      width,
      height,
      backgroundColor: "#0b1220",
      scene: [RunnerScene],
      physics: { default: "arcade" },
      scale: { mode: Phaser.Scale.NONE }
    });

    return game;
  };

  return (
    <div className="card canvasWrap">
      <h2>Runner</h2>
      <GameCanvas createGame={createGame} />
    </div>
  );
}
