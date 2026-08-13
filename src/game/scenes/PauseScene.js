import Phaser from "phaser";
import { layout } from "../layout.js";
import { button, label, panel } from "../ui.js";

export class PauseScene extends Phaser.Scene {
  constructor() { super("PauseScene"); }

  init(data) { this.platformPause = Boolean(data.platform); }

  create() {
    const l = layout(this.scale.width, this.scale.height);
    this.sound.pauseAll();
    this.add.rectangle(l.centerX, l.centerY, l.width, l.height, 0x101827, 0.74).setDepth(40);
    panel(this, l.card.x, l.card.y, 540, 330, 0.98);
    label(this, l.centerX, 255, "PAUSED", 42, "#fff6cf");
    label(this, l.centerX, 305, "Your route is safe.", 18, "#a9bfd1");
    button(this, l.centerX, 380, 300, 58, "RESUME", () => this.resume(), { fill: 0x4f8b58, hoverFill: 0x6ba86d });
    button(this, l.centerX, 452, 300, 52, "REDRAW", () => {
      this.sound.stopAll();
      this.scene.stop("GameScene");
      this.scene.stop();
      this.scene.start("GameScene", { level: this.registry.get("activeLevel") || 1 });
    }, { fontSize: 18 });
    button(this, l.centerX, 518, 300, 48, "FOREST MAP", () => {
      this.sound.stopAll();
      this.scene.stop("GameScene");
      this.scene.stop();
      this.scene.start("MenuScene");
    }, { fontSize: 16, stroke: 0x5f7a84 });
    this.input.keyboard.on("keydown-P", () => this.resume());
    this.input.keyboard.on("keydown-ESC", () => this.resume());
  }

  resume() {
    this.sound.resumeAll();
    this.scene.resume("GameScene");
    this.scene.stop();
  }

  shutdown() {
    this.input?.keyboard?.removeAllListeners();
    this.sound.resumeAll();
  }
}
