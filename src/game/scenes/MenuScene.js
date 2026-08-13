import Phaser from "phaser";
import { CHAPTERS, chapterFor } from "../data.js";
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
    const chapter = chapterFor(storage.getUnlockedChapter());

    label(this, l.centerX, 116, "FORESTBOUND", 64, "#fff6cf");
    label(this, l.centerX, 177, "RUNNER", 32, "#e1b85a");
    label(this, l.centerX, 228, "A new path. A new objective.", 20, "#c1d1d7");

    const info = panel(this, l.centerX, 360, 430, 132, 0.88);
    info.setStrokeStyle(2, 0x9bc268, 0.75);
    label(this, l.centerX, 326, `CHAPTER ${chapter.id}  ·  ${chapter.name.toUpperCase()}`, 17, "#f4d982");
    label(this, l.centerX, 366, chapter.subtitle, 25, "#fff6cf");
    label(this, l.centerX, 407, `BEST ${storage.getHighScore()}     RELICS ${storage.getCoins()}`, 16, "#a9bfd1");

    button(this, l.primaryButton.x, 520, l.primaryButton.width, l.primaryButton.height, "START RUN", () => {
      this.audio.play("tap", 0.4);
      this.scene.start("GameScene", { chapter: storage.getUnlockedChapter() });
    }, { fill: 0x4f8b58, hoverFill: 0x6ba86d, fontSize: 24 });
    const soundText = this.audio.muted ? "SOUND OFF" : "SOUND ON";
    const sound = button(this, l.secondaryButton.x, 608, l.secondaryButton.width, 46, soundText, () => {
      const muted = this.audio.toggle();
      sound.caption.setText(muted ? "SOUND OFF" : "SOUND ON");
      this.audio.play("tap", 0.35);
    }, { fontSize: 16, stroke: 0x5f7a84 });
    label(this, l.centerX, 680, "SPACE / TAP TO JUMP   ·   P OR ESC TO PAUSE", 14, "#89a5b2");

    this.tweens.add({ targets: [info, sound.box], alpha: { from: 0, to: 1 }, y: "-=8", duration: 650, ease: "Cubic.easeOut" });
  }

  drawWorld() {
    const bg = this.add.image(640, 360, "forestBg").setDisplaySize(1280, 720).setTint(0xc5e1ce).setDepth(0);
    const trees = this.add.tileSprite(640, 380, 1280, 480, "treeBg").setTileScale(1.42).setAlpha(0.78).setDepth(1);
    this.add.rectangle(640, 360, 1280, 720, 0x101827, 0.25).setDepth(2);
    const heroTree = this.add.image(1055, 450, "treeGreen").setScale(0.34).setAlpha(0.82).setDepth(3);
    this.tweens.add({ targets: trees, tilePositionX: 896, duration: 26000, repeat: -1 });
    this.tweens.add({ targets: heroTree, y: 442, duration: 2600, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
    this.add.image(640, 654, "platforms").setDisplaySize(1280, 90).setDepth(4).setAlpha(0.95);
    bg.setData("decor", true);
  }

  shutdown() { this.audio?.destroy(); }
}
