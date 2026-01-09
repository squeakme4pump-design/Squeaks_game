"use client";

import { useEffect, useRef } from "react";

type Props = {
  createGame: (container: HTMLDivElement, width: number, height: number) => any;
};

export default function GameCanvas({ createGame }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let game: any = null;

    const start = async () => {
      const rect = el.getBoundingClientRect();
      const width = Math.max(320, Math.floor(rect.width || 900));
      const height = Math.max(320, Math.floor((width * 9) / 16));

      game = await Promise.resolve(createGame(el, width, height));
    };

    start();

    return () => {
      try {
        game?.destroy?.(true);
      } catch {}
      game = null;
      el.innerHTML = "";
    };
  }, [createGame]);

  return <div ref={ref} className="canvas" />;
}
