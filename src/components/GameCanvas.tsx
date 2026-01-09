"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import { mountPhaserGame } from "@/lib/phaserGame";

type Props = {
  makeConfig: (width: number, height: number) => Phaser.Types.Core.GameConfig;
};

export default function GameCanvas({ makeConfig }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = Math.max(320, Math.floor(rect.width));
    const height = Math.max(320, Math.floor((rect.width * 9) / 16));

    const { cleanup } = mountPhaserGame(el, makeConfig(width, height));
    return cleanup;
  }, [makeConfig]);

  return <div ref={containerRef} className="canvas" />;
}
