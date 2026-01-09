import * as Phaser from "phaser";

/**
 * Placeholder endless runner scene:
 * - 3 lanes
 * - left/right to switch lanes
 * - up/space to jump, down to slide
 * - simple obstacles + coin pickups
 */
export default class RunnerScene extends Phaser.Scene {
  private laneX: number[] = [];
  private laneIndex = 1;

  private player!: Phaser.GameObjects.Rectangle;
  private velocityY = 0;
  private isJumping = false;
  private isSliding = false;

  private groundY = 0;
  private speed = 260;

  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;

  private obstacles!: Phaser.GameObjects.Group;
  private coins!: Phaser.GameObjects.Group;

  constructor() {
    super("RunnerScene");
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;

    this.groundY = Math.floor(h * 0.78);
    this.laneX = [Math.floor(w * 0.35), Math.floor(w * 0.5), Math.floor(w * 0.65)];

    // Background
    this.add.rectangle(w / 2, h / 2, w, h, 0x0b1220).setAlpha(0.0001);
    this.add.text(18, 16, "Runner (placeholder)", { fontSize: "14px", color: "#ffffff" }).setAlpha(0.85);

    // Lanes
    for (const x of this.laneX) {
      this.add.line(0, 0, x, 0, x, h, 0xffffff, 0.08).setOrigin(0, 0);
    }

    // Ground
    this.add.rectangle(w / 2, this.groundY + 22, w, 100, 0x000000, 0.25);

    // Player
    this.player = this.add.rectangle(this.laneX[this.laneIndex], this.groundY, 40, 60, 0xffd700, 0.9);
    this.player.setOrigin(0.5, 1);

    // Groups
    this.obstacles = this.add.group();
    this.coins = this.add.group();

    // HUD
    this.scoreText = this.add.text(18, 40, "Score: 0", { fontSize: "16px", color: "#ffffff" });

    // Input
    this.input.keyboard?.on("keydown-LEFT", () => this.moveLane(-1));
    this.input.keyboard?.on("keydown-RIGHT", () => this.moveLane(1));
    this.input.keyboard?.on("keydown-UP", () => this.jump());
    this.input.keyboard?.on("keydown-SPACE", () => this.jump());
    this.input.keyboard?.on("keydown-DOWN", () => this.slide(true));
    this.input.keyboard?.on("keyup-DOWN", () => this.slide(false));

    // Touch: left/right half screen, swipe-like simple
    this.input.on("pointerdown", (p: Phaser.Input.Pointer) => {
      if (p.x < w * 0.33) this.moveLane(-1);
      else if (p.x > w * 0.66) this.moveLane(1);
      else this.jump();
    });

    // Spawn loop
    this.time.addEvent({
      delay: 900,
      loop: true,
      callback: () => this.spawn(),
    });

    // Speed ramp
    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        this.speed += 18;
      },
    });
  }

  private moveLane(delta: -1 | 1) {
    this.laneIndex = Phaser.Math.Clamp(this.laneIndex + delta, 0, 2);
    this.tweens.add({
      targets: this.player,
      x: this.laneX[this.laneIndex],
      duration: 120,
      ease: "Sine.easeOut",
    });
  }

  private jump() {
    if (this.isJumping) return;
    this.isJumping = true;
    this.velocityY = -540;
  }

  private slide(on: boolean) {
    if (!this.isJumping) {
      this.isSliding = on;
      this.player.setSize(40, on ? 36 : 60);
    }
  }

  private spawn() {
    const w = this.scale.width;
    const lane = Phaser.Math.Between(0, 2);

    // 70% obstacle, 30% coin
    if (Math.random() < 0.7) {
      const obs = this.add.rectangle(w + 60, this.groundY, 44, 44, 0xffffff, 0.15);
      obs.setOrigin(0.5, 1);
      (obs as any).lane = lane;
      (obs as any).type = "obstacle";
      (obs as any).x = w + 60;
      (obs as any).y = this.groundY;
      this.obstacles.add(obs);
      obs.x = w + 60;
      obs.y = this.groundY;
      obs.setPosition(w + 60, this.groundY);
      obs.x = w + 60;
      obs.y = this.groundY;
      obs.setPosition(w + 60, this.groundY);
      obs.x = w + 60;
      obs.y = this.groundY;
      obs.setPosition(w + 60, this.groundY);
      obs.x = w + 60;
      obs.y = this.groundY;
      obs.setPosition(w + 60, this.groundY);
      // place in lane
      obs.x = this.laneX[lane];
      obs.y = this.groundY;
      (obs as any).worldX = w + 60; // separate logical x
    } else {
      const coin = this.add.circle(w + 60, this.groundY - 70, 12, 0x00a0ff, 0.9);
      (coin as any).lane = lane;
      (coin as any).type = "coin";
      (coin as any).worldX = w + 60;
      coin.x = this.laneX[lane];
      coin.y = this.groundY - 70;
      this.coins.add(coin);
    }
  }

  update(_: number, dtMs: number) {
    const dt = dtMs / 1000;

    // Gravity / jump
    if (this.isJumping) {
      this.velocityY += 1400 * dt;
      this.player.y += this.velocityY * dt;

      if (this.player.y >= this.groundY) {
        this.player.y = this.groundY;
        this.isJumping = false;
        this.velocityY = 0;
      }
    }

    // Move objects left (logical worldX), keep lane x fixed
    const moveGroup = (g: Phaser.GameObjects.Group) => {
      g.getChildren().forEach((obj: any) => {
        obj.worldX -= this.speed * dt;
        // Render x position based on worldX offset from right edge, but lane is fixed visually
        // We'll just slide their x visually a bit to sell motion:
        obj.x = obj.x - this.speed * dt;
        if (obj.x < -80) {
          g.remove(obj, true, true);
        }
      });
    };

    moveGroup(this.obstacles);
    moveGroup(this.coins);

    // Score
    this.score += Math.floor(this.speed * dt * 0.06);
    this.scoreText.setText(`Score: ${this.score}`);

    // Collision checks (simple AABB)
    const px = this.player.x;
    const pyTop = this.player.y - (this.isSliding ? 36 : 60);
    const pyBottom = this.player.y;

    this.obstacles.getChildren().forEach((o: any) => {
      const ox = o.x;
      const oy = o.y;
      const hit =
        Math.abs(px - ox) < 34 &&
        pyBottom > oy - 44 &&
        pyTop < oy;
      if (hit) this.gameOver();
    });

    this.coins.getChildren().forEach((c: any) => {
      const cx = c.x;
      const cy = c.y;
      const hit = Math.abs(px - cx) < 30 && Math.abs((pyBottom - 30) - cy) < 40;
      if (hit) {
        this.score += 250;
        this.coins.remove(c, true, true);
      }
    });
  }

  private gameOver() {
    this.scene.pause();

    const w = this.scale.width;
    const h = this.scale.height;
    const panel = this.add.rectangle(w / 2, h / 2, Math.min(520, w * 0.86), 220, 0x000000, 0.55);
    panel.setStrokeStyle(1, 0xffffff, 0.15);

    this.add.text(w / 2, h / 2 - 56, "Game Over", { fontSize: "28px", color: "#ffffff" }).setOrigin(0.5);
    this.add.text(w / 2, h / 2 - 16, `Score: ${this.score}`, { fontSize: "18px", color: "#ffffff" }).setOrigin(0.5);
    this.add.text(w / 2, h / 2 + 36, "Tap or press R to restart", { fontSize: "14px", color: "#ffffff" })
      .setOrigin(0.5)
      .setAlpha(0.8);

    this.input.once("pointerdown", () => this.scene.restart());
    this.input.keyboard?.once("keydown-R", () => this.scene.restart());
  }
}
