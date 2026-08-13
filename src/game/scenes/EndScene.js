import Phaser from "phaser";
import { chapterFor } from "../data.js";
import { storage } from "../storage.js";
import { layout } from "../layout.js";
import { AudioService } from "../audio.js";
import { button, label, panel } from "../ui.js";

export class EndScene extends Phaser.Scene {
  constructor() { super("EndScene"); }

  init(data) { this.result = data; }

  create() {
    const l = layout(this.scale.width, this.scale.height);
    this.audio = new AudioService(this);
    this.drawWorld();
    const victory = this.result.outcome === "victory";
    if (victory) this.audio.play("powerUp", 0.6); else this.audio.play("hurt", 0.6);

    const card = panel(this, l.card.x, l.card.y, 620, 430, 0.98);
    card.setStrokeStyle(4, victory ? 0xe1b85a : 0xd8665d, 1);
    label(this, l.centerX, 188, victory ? "SHRINE REACHED" : "THE FOREST BIT BACK", 38, victory ? "#fff6cf" : "#ffd2c7");
    label(this, l.centerX, 244, victory ? "Your objective is complete." : "One more run is already waiting.", 18, "#a9bfd1");
    label(this, l.centerX, 304, this.result.objectiveTitle, 18, "#f4d982");
    label(this, l.centerX, 350, this.result.objectiveReadout, 30, "#fff6cf");
    label(this, l.centerX, 400, `DISTANCE  ${Math.floor(this.result.metrics.distance)} m`, 18, "#a9bfd1");
    label(this, l.centerX, 432, `+${this.result.reward} RELICS`, 22, victory ? "#9bc268" : "#e1b85a");
    button(this, l.centerX, 504, 340, 62, "RUN AGAIN", () => {
      this.audio.play("tap", 0.4);
      this.scene.start("GameScene", { chapter: this.result.chapter });
    }, { fill: victory ? 0x4f8b58 : 0x8d514e, hoverFill: victory ? 0x6ba86d : 0xb76558, fontSize: 22 });
    button(this, l.centerX, 580, 280, 48, "FOREST MAP", () => {
      this.audio.play("tap", 0.3);
      this.scene.start("MenuScene");
    }, { fontSize: 16, stroke: 0x5f7a84 });

    if (victory) this.confetti();
    this.tweens.add({ targets: card, scaleX: { from: 0.88, to: 1 }, scaleY: { from: 0.88, to: 1 }, alpha: { from: 0, to: 1 }, duration: 620, ease: "Back.easeOut" });
    this.tweens.add({ targets: card, y: { from: card.y + 12, to: card.y }, duration: 620, ease: "Cubic.easeOut" });
  }

  drawWorld() {
    this.add.image(640, 360, "forestBg").setDisplaySize(1280, 720).setTint(this.result.outcome === "victory" ? 0xdde9c8 : 0xb9a8b8).setDepth(0);
    this.add.tileSprite(640, 380, 1280, 480, "treeBg").setTileScale(1.42).setAlpha(0.65).setDepth(1);
    this.add.rectangle(640, 360, 1280, 720, 0x101827, 0.52).setDepth(2);
    this.add.image(640, 654, "platforms").setDisplaySize(1280, 90).setDepth(3);
  }

  confetti() {
    try {
      const particles = this.add.particles(0, 0, "coin", {
        frame: [0, 4, 8], quantity: 28, lifespan: 1600, speedX: { min: -360, max: 360 }, speedY: { min: -460, max: -160 }, gravityY: 620,
        scale: { start: 1.6, end: 0.5 }, rotate: { min: 0, max: 360 }, emitting: false,
      }).setDepth(35);
      particles.explode(28, 640, 330);
    } catch { /* visual flourish is optional on older browsers */ }
  }

  shutdown() { this.audio?.destroy(); }
}
