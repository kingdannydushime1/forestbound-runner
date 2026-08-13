import Phaser from "phaser";
import { storage } from "../storage.js";
import { levelFor } from "../data.js";
import { layout } from "../layout.js";
import { sdk } from "../sdk.js";
import { AudioService } from "../audio.js";
import { button, label, panel } from "../ui.js";

export class EndScene extends Phaser.Scene {
  constructor() { super("EndScene"); }

  init(data) { this.result = data; this.adBusy = false; this.bonusClaimed = false; }

  create() {
    const l = layout(this.scale.width, this.scale.height);
    this.audio = new AudioService(this);
    this.drawWorld();
    const victory = this.result.outcome === "victory";
    this.audio.play(victory ? "successSfx" : "hitSfx", 0.6);
    this.shouldShowInterstitial = storage.recordOutcome(this.result.outcome);

    const card = panel(this, l.card.x, l.card.y, 650, 450, 0.98);
    card.setStrokeStyle(4, victory ? 0x75e5d2 : 0xd85d72, 1);
    label(this, l.centerX, 168, victory ? "BEACON REACHED" : "PATH BLOCKED", 37, victory ? "#f4e6b5" : "#ffd2df");
    label(this, l.centerX, 218, victory ? "A clean line through the enchanted map." : "The obstacle caught your route.", 18, "#c1bfd9");
    label(this, l.centerX, 268, `LEVEL ${this.result.level} · ${levelFor(this.result.level).name}`, 16, "#eab866");
    label(this, l.centerX, 314, this.result.message, 27, "#f4e6b5");
    label(this, l.centerX, 356, `${this.result.metrics.gems} SHARDS   ·   PATH ${this.result.metrics.pathLength} PX`, 16, "#c1bfd9");
    label(this, l.centerX, 396, `+${this.result.reward} RELICS`, 22, victory ? "#75e5d2" : "#eab866");

    button(this, l.centerX, 466, 330, 58, "DRAW AGAIN", () => {
      this.audio.play("lockSfx", 0.35);
      this.scene.start("GameScene", { level: this.result.level });
    }, { fill: victory ? 0x3d6f5e : 0x7f3d55, hoverFill: victory ? 0x568d74 : 0x9c4b68, fontSize: 21, stroke: victory ? 0x75e5d2 : 0xd85d72 });
    button(this, l.centerX, 534, 270, 46, "FOREST MAP", () => {
      this.audio.play("drawSfx", 0.28);
      this.scene.start("MenuScene");
    }, { fontSize: 15, stroke: 0x75e5d2 });

    this.adButton = null;
    sdk.ready.then(() => this.setupAdButton(victory, l));
    if (victory) this.confetti();
    this.tweens.add({ targets: card, scaleX: { from: 0.88, to: 1 }, scaleY: { from: 0.88, to: 1 }, alpha: { from: 0, to: 1 }, duration: 620, ease: "Back.easeOut" });
    this.tweens.add({ targets: card, y: { from: card.y + 12, to: card.y }, duration: 620, ease: "Cubic.easeOut" });
    if (this.shouldShowInterstitial) this.time.delayedCall(900, () => sdk.showInterstitial());
  }

  setupAdButton(victory, l) {
    if (this.adButton || !sdk.isRewardedSupported()) return;
    if (victory) {
      this.adButton = button(this, l.centerX, 592, 350, 42, `WATCH AD · DOUBLE +${this.result.reward}`, () => this.claimBonus(), { fontSize: 13, stroke: 0xeab866, fill: 0x30345c, hoverFill: 0x454a79 });
    } else {
      this.adButton = button(this, l.centerX, 592, 220, 42, "REVIVE · WATCH AD", () => this.claimRevive(), { fontSize: 12, stroke: 0x75e5d2, fill: 0x30345c, hoverFill: 0x454a79 });
    }
  }

  async claimBonus() {
    if (this.adBusy || this.bonusClaimed) return;
    this.adBusy = true;
    this.adButton.caption.setText("WATCHING AD…");
    const rewarded = await sdk.showRewarded();
    if (rewarded) {
      this.bonusClaimed = true;
      storage.setCoins(storage.getCoins() + this.result.reward);
      this.adButton.caption.setText("BONUS CLAIMED ✓");
      this.audio.play("successSfx", 0.55);
    } else {
      this.adButton.caption.setText(`WATCH AD · DOUBLE +${this.result.reward}`);
    }
    this.adBusy = false;
  }

  async claimRevive() {
    if (this.adBusy) return;
    this.adBusy = true;
    this.adButton.caption.setText("WATCHING AD…");
    const rewarded = await sdk.showRewarded();
    if (rewarded) {
      this.audio.play("successSfx", 0.55);
      this.scene.start("GameScene", { level: this.result.level, resume: this.result.snapshot, revived: true });
      return;
    }
    this.adButton.caption.setText("REVIVE · WATCH AD");
    this.adBusy = false;
  }

  drawWorld() {
    this.add.tileSprite(640, 380, 1280, 520, "ground", 0).setTileScale(1.75).setDepth(0);
    this.add.rectangle(640, 360, 1280, 720, this.result.outcome === "victory" ? 0x2b6d63 : 0x4f203e, 0.42).setDepth(1);
    this.add.tileSprite(640, 650, 1280, 72, "ground", 1).setTileScale(1.75).setTint(0x54734b).setDepth(3);
  }

  confetti() {
    const sparks = this.add.sprite(640, 330, "vfxExplosion", 0).setScale(2.2).setDepth(35);
    sparks.once("animationcomplete", () => sparks.destroy());
    sparks.play("vfxExplosion");
  }

  shutdown() { this.audio?.destroy(); }
}
