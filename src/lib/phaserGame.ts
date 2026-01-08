import Phaser from "phaser";

export type GameCleanup = () => void;

/**
 * Create a Phaser game inside a container element.
 * This is client-only; use in a React useEffect hook.
 */
export function mountPhaserGame(
  container: HTMLDivElement,
  config: Phaser.Types.Core.GameConfig
): { game: Phaser.Game; cleanup: GameCleanup } {
  // Ensure container is empty
  container.innerHTML = "";

  const game = new Phaser.Game({
    ...config,
    parent: container,
  });

  const cleanup = () => {
    try {
      game.destroy(true);
    } catch {
      // ignore
    }
    container.innerHTML = "";
  };

  return { game, cleanup };
}
