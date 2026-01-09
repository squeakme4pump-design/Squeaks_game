"use client";

export const dynamic = "force-dynamic";

import dynamicImport from "next/dynamic";

const GameCanvas = dynamicImport(() => import("@/components/GameCanvas"), { ssr: false });

export default function BubblesPage() {
  const createGame = async (container: HTMLDivElement, width: number, height: number) => {
    const Phaser = await import("phaser");
    const SceneMod = await import("@/games/bubbles/BubblesScene");
    const BubblesScene = SceneMod.default;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: container,
      width,
      height,
      backgroundColor: "#0b1220",
      scene: [BubblesScene],
      physics: { default: "arcade" },
      scale: { mode: Phaser.Scale.NONE }
    });

    return game;
  };

  return (
    <div className="card canvasWrap">
      <h2>Bubbles</h2>
      <GameCanvas createGame={createGame} />
    </div>
  );
}
