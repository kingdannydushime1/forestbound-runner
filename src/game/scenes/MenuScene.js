import Phaser from "phaser";
import { levelFor } from "../data.js";
import { storage } from "../storage.js";
import { layout } from "../layout.js";
import { AudioService } from "../audio.js";
import { button, label, panel } from "../ui.js";

export class MenuScene extends Phaser.Scene {
  constructor() { super("MenuScene"); }

  create() {
    const l = layout(this.scale.width, this.scale.height);
    this.audio = new AudioService(this);
    this.audio.startMusic();
    this.drawWorld();
    const level = levelFor(storage.getUnlockedLevel());

    this.add.sprite(l.centerX, 118, "trees", 0).setScale(2.1).setAlpha(0.9).setDepth(3);
    label(this, l.centerX, 115, "PATH", 58, "#f4e6b5");
    label(this, l.centerX, 174, "DRAWER", 42, "#75e5d2");
    label(this, l.centerX, 220, "Draw the route. Dodge the dangers. Reach the beacon.", 17, "#c1bfd9");

    const info = panel(this, l.centerX, 350, 540, 148, 0.92);
    info.setStrokeStyle(2, 0x75e5d2, 0.8);
    this.add.sprite(l.centerX - 220, 350, "uiPanels", 0).setScale(1.8).setDepth(21);
    label(this, l.centerX, 312, `NEXT BEACON  ·  LEVEL ${level.id}`, 16, "#eab866");
    label(this, l.centerX, 356, level.name, 25, "#f4e6b5");
    label(this, l.centerX, 398, `${level.subtitle}   ·   BEST ${storage.getHighScore()}`, 15, "#c1bfd9");
    label(this, l.centerX, 428, `SHARDS ${storage.getCoins()}   ·   ${storage.getUnlockedLevel()} / 5 BEACONS`, 14, "#75e5d2");

    button(this, l.primaryButton.x, 520, l.primaryButton.width, l.primaryButton.height, "DRAW A PATH", () => {
      this.audio.play("lockSfx", 0.4);
      this.scene.start("GameScene", { level: storage.getUnlockedLevel() });
    }, { fill: 0x3d6f5e, hoverFill: 0x568d74, fontSize: 22, stroke: 0x75e5d2 });
    const sound = button(this, l.secondaryButton.x, 606, l.secondaryButton.width, 46, this.audio.muted ? "SOUND OFF" : "SOUND ON", () => {
      const muted = this.audio.toggle();
      sound.caption.setText(muted ? "SOUND OFF" : "SOUND ON");
      this.audio.play("drawSfx", 0.28);
    }, { fontSize: 16, stroke: 0x75e5d2 });
    label(this, l.centerX, 680, "POINTER / TOUCH DRAG   ·   P OR ESC TO PAUSE", 13, "#8b89ad");
    this.tweens.add({ targets: [info, sound.box], alpha: { from: 0, to: 1 }, y: "-=8", duration: 650, ease: "Cubic.easeOut" });
  }

  drawWorld() {
    this.add.tileSprite(640, 380, 1280, 520, "ground", 0).setTileScale(1.75).setDepth(0);
    this.add.rectangle(640, 360, 1280, 720, 0x2b2752, 0.18).setDepth(1);
    this.add.tileSprite(640, 650, 1280, 72, "ground", 1).setTileScale(1.75).setTint(0x54734b).setDepth(4);
    const details = this.add.tileSprite(640, 370, 1280, 420, "details", 0).setTileScale(1.4).setAlpha(0.27).setDepth(2);
    this.tweens.add({ targets: details, tilePositionX: 384, duration: 26000, repeat: -1 });
  }

  shutdown() { this.audio?.destroy(); }
}
