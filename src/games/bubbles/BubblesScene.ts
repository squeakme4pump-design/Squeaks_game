import * as Phaser from "phaser";

/**
 * Bubble game placeholder:
 * For now: "bubble popper" sandbox you can later evolve into Bubble Shooter.
 * - bubbles spawn and float up
 * - tap/click to pop for points
 */
export default class BubblesScene extends Phaser.Scene {
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private bubbles!: Phaser.GameObjects.Group;

  constructor() {
    super("BubblesScene");
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    this.add.text(18, 16, "Bubbles (placeholder)", { fontSize: "14px", color: "#ffffff" }).setAlpha(0.85);
    this.scoreText = this.add.text(18, 40, "Score: 0", { fontSize: "16px", color: "#ffffff" });

    this.bubbles = this.add.group();

    this.time.addEvent({
      delay: 280,
      loop: true,
      callback: () => this.spawnBubble(),
    });

    this.input.on("pointerdown", (p: Phaser.Input.Pointer) => {
      // pop the nearest bubble within radius
      const nearest = this.findNearestBubble(p.x, p.y, 42);
      if (nearest) {
        this.pop(nearest as any);
      }
    });
  }

  private spawnBubble() {
    const w = this.scale.width;
    const h = this.scale.height;

    const r = Phaser.Math.Between(14, 26);
    const x = Phaser.Math.Between(r + 10, w - (r + 10));
    const y = h + r + 10;

    // random pastel-ish tint via alpha overlay (simple)
    const bubble = this.add.circle(x, y, r, 0x00a0ff, 0.55);
    bubble.setStrokeStyle(2, 0xffffff, 0.22);

    (bubble as any).vy = Phaser.Math.Between(90, 170);
    (bubble as any).drift = Phaser.Math.FloatBetween(-22, 22);
    (bubble as any).r = r;

    this.bubbles.add(bubble);
  }

  private findNearestBubble(x: number, y: number, maxDist: number) {
    let best: Phaser.GameObjects.GameObject | null = null;
    let bestD = maxDist;

    this.bubbles.getChildren().forEach((b: any) => {
      const dx = b.x - x;
      const dy = b.y - y;
      const d = Math.sqrt(dx * dx + dy * dy) - b.r;
      if (d < bestD) {
        bestD = d;
        best = b;
      }
    });

    return best;
  }

  private pop(b: Phaser.GameObjects.Arc) {
    // simple pop animation
    this.tweens.add({
      targets: b,
      scale: 1.35,
      alpha: 0,
      duration: 140,
      onComplete: () => {
        this.bubbles.remove(b, true, true);
      },
    });

    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  update(_: number, dtMs: number) {
    const dt = dtMs / 1000;

    this.bubbles.getChildren().forEach((b: any) => {
      b.y -= b.vy * dt;
      b.x += b.drift * dt;
      b.drift *= 0.995;

      // wrap x softly
      const w = this.scale.width;
      if (b.x < -30) b.x = w + 30;
      if (b.x > w + 30) b.x = -30;

      if (b.y < -60) {
        this.bubbles.remove(b, true, true);
      }
    });
  }
}
