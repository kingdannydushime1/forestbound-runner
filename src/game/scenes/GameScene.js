import Phaser from "phaser";
import { WORLD, levelFor, pathLength, calculateReward, scoreFor } from "../data.js";
import { storage } from "../storage.js";
import { layout } from "../layout.js";
import { AudioService } from "../audio.js";
import { button, label, panel, progressBar } from "../ui.js";

const DRAW_COLOR = 0xf4e6b5;
const DRAW_SHADOW = 0x17152b;

export class GameScene extends Phaser.Scene {
  constructor() { super("GameScene"); }

  init(data) {
    this.levelId = data.level || data.resume?.level || storage.getUnlockedLevel();
    this.level = levelFor(this.levelId);
    this.resumeData = data.resume || null;
    this.revived = Boolean(data.revived);
  }

  create() {
    this.registry.set("activeLevel", this.levelId);
    this.audio = new AudioService(this);
    this.audio.startMusic();
    this.ended = false;
    this.drawing = false;
    this.simulating = false;
    this.pathPoints = [];
    this.routeIndex = 0;
    this.obstacles = [];
    this.gems = [];
    this.metrics = { pathLength: 0, gems: 0, clean: true, collision: false, collectedGems: [] };
    if (this.resumeData?.metrics) this.metrics = { ...this.metrics, ...this.resumeData.metrics };
    this.lastSafePosition = { x: this.resumeData?.x || WORLD.start.x, y: this.resumeData?.y || WORLD.start.y };
    this.drawWorld();
    this.createAnimations();
    this.createBoard();
    this.createHud();
    this.setupInput();
    if (this.revived) this.showHint("REVIVE READY — DRAW A NEW ROUTE", "#75e5d2");
  }

  drawWorld() {
    this.add.tileSprite(640, 380, 1280, 480, "ground", 0).setTileScale(1.7).setDepth(0);
    this.add.rectangle(640, 382, 1280, 480, 0x2b2752, 0.11).setDepth(1);
    this.add.tileSprite(640, 652, 1280, 70, "ground", 1).setTileScale(1.7).setTint(0x54734b).setDepth(5);
    this.treeLayer = this.add.tileSprite(640, 340, 1280, 390, "details", 0).setTileScale(1.5).setAlpha(0.32).setDepth(2);
    const decor = [[215, 215, "trees", 0], [445, 570, "bushes", 0], [640, 190, "trees", 1], [890, 570, "bushes", 1], [1080, 260, "details", 1], [1000, 560, "trees", 2]];
    for (const [x, y, key, frame] of decor) this.add.sprite(x, y, key, frame).setScale(2.2).setAlpha(0.82).setDepth(3);
  }

  createAnimations() {
    if (!this.anims.exists("playerIdle")) {
      this.anims.create({ key: "playerIdle", frames: this.anims.generateFrameNumbers("playerIdle", { start: 0, end: 8 }), frameRate: 5, repeat: -1 });
      this.anims.create({ key: "playerWalk", frames: this.anims.generateFrameNumbers("playerWalk", { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "vfxExplosion", frames: this.anims.generateFrameNumbers("vfxExplosion", { start: 0, end: 10 }), frameRate: 18, repeat: 0 });
      this.anims.create({ key: "vfxImpact", frames: this.anims.generateFrameNumbers("vfxImpact", { start: 0, end: 6 }), frameRate: 16, repeat: 0 });
    }
  }

  createBoard() {
    this.pathShadow = this.add.graphics().setDepth(7);
    this.pathGraphic = this.add.graphics().setDepth(8);
    this.playerShadow = this.add.image(this.lastSafePosition.x, this.lastSafePosition.y + 15, "playerShadow").setScale(1.8).setDepth(12);
    this.player = this.physics.add.sprite(this.lastSafePosition.x, this.lastSafePosition.y, "playerIdle", 0).setScale(1.8).setDepth(14);
    this.player.body.setAllowGravity(false);
    this.player.body.setSize(19, 20).setOffset(6, 9);
    this.player.play("playerIdle");

    this.goal = this.add.sprite(WORLD.goal.x, WORLD.goal.y, "items", 1).setScale(2.8).setDepth(12);
    this.goalRing = this.add.graphics().setDepth(11);
    label(this, WORLD.goal.x, WORLD.goal.y + 47, "EXIT", 14, "#75e5d2");

    for (const obstacleData of [...this.level.obstacles, ...(this.level.sentinels || [])]) this.addObstacle(obstacleData);
    for (const [index, gemData] of this.level.gems.entries()) {
      const gem = this.physics.add.sprite(gemData.x, gemData.y, "items", index % 4).setScale(1.55).setDepth(9);
      gem.body.setAllowGravity(false);
      gem.collected = this.resumeData?.metrics?.collectedGems?.includes(index) || false;
      gem.gemIndex = index;
      if (gem.collected) { gem.setVisible(false); gem.body.enable = false; }
      this.gems.push(gem);
    }

    this.startBadge = panel(this, WORLD.start.x, WORLD.start.y + 47, 190, 34, 0.9);
    this.startBadge.setStrokeStyle(2, 0x75e5d2, 0.9);
    label(this, WORLD.start.x, WORLD.start.y + 47, "START HERE", 13, "#f4e6b5");
    this.redrawPath();
  }

  addObstacle(data) {
    const key = data.kind === "root" ? "roots" : data.kind === "ruin" ? "ruins" : data.kind === "sentinel" ? "items" : "rocks";
    const obstacle = this.physics.add.sprite(data.x, data.y, key, data.frame).setScale(data.kind === "sentinel" ? 1.7 : 2.1).setDepth(10);
    obstacle.body.setAllowGravity(false);
    obstacle.body.setSize(data.w * 0.7, data.h * 0.55).setOffset(5, 8);
    obstacle.zone = { ...data, baseY: data.y };
    obstacle.isSentinel = data.kind === "sentinel";
    this.obstacles.push(obstacle);
    if (obstacle.isSentinel) this.tweens.add({ targets: obstacle, angle: 360, duration: data.period, repeat: -1 });
  }

  createHud() {
    const l = layout(this.scale.width, this.scale.height);
    this.add.rectangle(640, 61, 1280, 122, 0x17152b, 0.82).setDepth(20);
    this.add.sprite(l.hud.left + 16, 28, "uiPanels", 0).setScale(1.3).setDepth(21);
    label(this, l.hud.left + 42, 28, `LEVEL ${this.level.id} · ${this.level.name}`, 17, "#f4e6b5", 0);
    label(this, l.hud.left, 57, this.level.subtitle, 13, "#c1bfd9", 0);
    this.relicText = label(this, l.hud.right - 178, 28, `${this.metrics.gems} SHARDS`, 16, "#eab866", 1);
    this.hint = label(this, 640, 95, "DRAW FROM START TO EXIT", 15, "#f4e6b5");
    this.progress = progressBar(this, 640, 122, 360, 0, { fill: 0x75e5d2, stroke: 0x54734b });
    this.pauseButton = button(this, l.hud.right - 36, 89, 72, 36, "II", () => this.pauseRun(), { fontSize: 17, stroke: 0x75e5d2 });
    this.clearButton = button(this, l.hud.right - 126, 89, 96, 36, "CLEAR", () => this.clearPath(), { fontSize: 13, stroke: 0x75e5d2 });
  }

  setupInput() {
    this.onPointerDown = (pointer) => {
      if (this.ended || this.simulating || pointer.y < WORLD.boardTop || pointer.y > WORLD.boardBottom) return;
      if (Math.hypot(pointer.x - this.player.x, pointer.y - this.player.y) > 105) {
        this.showHint("START ON THE CHARACTER", "#d85d72");
        return;
      }
      this.drawing = true;
      this.pathPoints = [{ x: this.player.x, y: this.player.y }];
      this.addPoint(pointer);
      this.audio.play("drawSfx", 0.32);
    };
    this.onPointerMove = (pointer) => { if (this.drawing) this.addPoint(pointer); };
    this.onPointerUp = () => { if (this.drawing) this.finishDrawing(); };
    this.input.on("pointerdown", this.onPointerDown);
    this.input.on("pointermove", this.onPointerMove);
    this.input.on("pointerup", this.onPointerUp);
    this.input.keyboard.on("keydown-C", () => this.clearPath());
    this.input.keyboard.on("keydown-P", () => this.pauseRun());
    this.input.keyboard.on("keydown-ESC", () => this.pauseRun());
  }

  addPoint(pointer) {
    const point = { x: Phaser.Math.Clamp(pointer.x, 35, 1245), y: Phaser.Math.Clamp(pointer.y, WORLD.boardTop + 18, WORLD.boardBottom - 18) };
    const last = this.pathPoints[this.pathPoints.length - 1];
    if (!last || Math.hypot(point.x - last.x, point.y - last.y) >= 10) {
      this.pathPoints.push(point);
      this.redrawPath();
    }
  }

  finishDrawing() {
    this.drawing = false;
    if (this.pathPoints.length < 2 || pathLength(this.pathPoints) < 140) {
      this.clearPath();
      this.showHint("DRAW A LONGER ROUTE", "#d85d72");
      return;
    }
    const last = this.pathPoints[this.pathPoints.length - 1];
    if (Math.hypot(last.x - WORLD.goal.x, last.y - WORLD.goal.y) > 125) {
      this.showHint("FINISH ON THE EXIT BEACON", "#d85d72");
      this.tweens.add({ targets: this.pathGraphic, alpha: 0.35, duration: 180, yoyo: true, repeat: 1 });
      return;
    }
    this.metrics.pathLength = Math.round(pathLength(this.pathPoints));
    this.routeIndex = 1;
    this.simulating = true;
    this.player.play("playerWalk");
    this.hint.setText("ROUTE LOCKED — WATCH THE MAP").setColor("#75e5d2");
    this.audio.play("lockSfx", 0.42);
  }

  redrawPath() {
    this.pathShadow.clear();
    this.pathGraphic.clear();
    if (this.pathPoints.length < 1) return;
    for (const [graphic, width, color, alpha] of [[this.pathShadow, 25, DRAW_SHADOW, 0.92], [this.pathGraphic, 13, DRAW_COLOR, 1]]) {
      graphic.lineStyle(width, color, alpha);
      graphic.beginPath();
      graphic.moveTo(this.pathPoints[0].x, this.pathPoints[0].y);
      for (let i = 1; i < this.pathPoints.length; i += 1) graphic.lineTo(this.pathPoints[i].x, this.pathPoints[i].y);
      graphic.strokePath();
    }
  }

  clearPath() {
    if (this.ended || this.simulating) return;
    this.pathPoints = [];
    this.redrawPath();
    this.showHint("DRAW FROM START TO EXIT", "#f4e6b5");
  }

  update(_time, delta) {
    if (this.ended) return;
    const dt = Math.min(delta, 40) / 1000;
    this.treeLayer.tilePositionX += 4 * dt;
    this.goalRing.clear();
    this.goalRing.lineStyle(3, 0x75e5d2, 0.65 + Math.sin(this.time.now / 280) * 0.12);
    this.goalRing.strokeCircle(WORLD.goal.x, WORLD.goal.y, 44 + Math.sin(this.time.now / 280) * 4);
    for (const obstacle of this.obstacles) {
      if (obstacle.isSentinel) {
        obstacle.y = obstacle.zone.baseY + Math.sin(this.time.now / obstacle.zone.period * Math.PI * 2) * obstacle.zone.range;
        obstacle.zone.y = obstacle.y;
      }
    }
    if (this.playerShadow) this.playerShadow.setPosition(this.player.x, this.player.y + 15);
    if (!this.simulating) return;

    const target = this.pathPoints[this.routeIndex];
    if (!target) { this.endRun("defeat", "PATH ENDED"); return; }
    const dx = target.x - this.player.x;
    const dy = target.y - this.player.y;
    const distance = Math.hypot(dx, dy);
    const step = 360 * dt;
    const ratio = distance <= step ? 1 : step / distance;
    const next = { x: this.player.x + dx * ratio, y: this.player.y + dy * ratio };
    this.lastSafePosition = { x: this.player.x, y: this.player.y };
    if (this.segmentHitsObstacle(this.lastSafePosition, next)) {
      this.metrics.clean = false;
      this.metrics.collision = true;
      this.cameras.main.shake(180, 0.012);
      this.playVfx("vfxImpact", this.player.x, this.player.y, 1.1);
      this.audio.play("hitSfx", 0.65);
      this.endRun("defeat", "PATH BLOCKED");
      return;
    }
    this.player.setPosition(next.x, next.y);
    this.player.angle = Math.atan2(dy, dx) * 180 / Math.PI * 0.05;
    this.collectNearbyGems();
    if (distance <= step) this.routeIndex += 1;
    this.progress.setRatio(this.routeIndex / Math.max(1, this.pathPoints.length - 1));
    if (this.routeIndex >= this.pathPoints.length && Math.hypot(this.player.x - WORLD.goal.x, this.player.y - WORLD.goal.y) < 70) {
      this.playVfx("vfxExplosion", WORLD.goal.x, WORLD.goal.y, 1.8);
      this.endRun("victory", "BEACON REACHED");
    }
  }

  segmentHitsObstacle(a, b) {
    for (const obstacle of this.obstacles) {
      if (!obstacle.active) continue;
      const zone = obstacle.zone;
      const distance = Math.hypot(b.x - a.x, b.y - a.y);
      const steps = Math.max(1, Math.ceil(distance / 8));
      for (let i = 0; i <= steps; i += 1) {
        const t = i / steps;
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        if (x >= zone.x - zone.w / 2 - 18 && x <= zone.x + zone.w / 2 + 18 && y >= zone.y - zone.h / 2 - 18 && y <= zone.y + zone.h / 2 + 18) return true;
      }
    }
    return false;
  }

  collectNearbyGems() {
    for (const gem of this.gems) {
      if (!gem.active || gem.collected || Math.hypot(gem.x - this.player.x, gem.y - this.player.y) > 38) continue;
      gem.collected = true;
      this.metrics.gems += 1;
      this.metrics.collectedGems.push(gem.gemIndex);
      this.relicText.setText(`${this.metrics.gems} SHARDS`);
      this.audio.play("shardSfx", 0.52);
      this.tweens.add({ targets: gem, y: gem.y - 34, alpha: 0, scale: 2.5, duration: 240, onComplete: () => gem.destroy() });
      this.addScoreTick("+1 SHARD", gem.x, gem.y - 30, "#eab866");
      this.playVfx("vfxExplosion", gem.x, gem.y, 0.65);
    }
  }

  playVfx(key, x, y, scale) {
    const fx = this.add.sprite(x, y, key, 0).setScale(scale).setDepth(18);
    fx.once("animationcomplete", () => fx.destroy());
    fx.play(key === "vfxImpact" ? "vfxImpact" : "vfxExplosion");
  }

  addScoreTick(text, x, y, color) {
    const tick = label(this, x, y, text, 15, color);
    this.tweens.add({ targets: tick, y: y - 36, alpha: 0, duration: 650, ease: "Cubic.easeOut", onComplete: () => tick.destroy() });
  }

  showHint(text, color) {
    if (this.hint) {
      this.hint.setText(text).setColor(color);
      this.tweens.killTweensOf(this.hint);
      this.tweens.add({ targets: this.hint, alpha: { from: 1, to: 0.55 }, duration: 700, yoyo: true, repeat: 1 });
    }
  }

  pauseRun(reason = "manual") {
    if (this.ended || this.scene.isActive("PauseScene")) return;
    this.pauseReason = reason;
    this.scene.pause();
    this.scene.launch("PauseScene", { platform: reason === "platform" });
  }

  pauseFromPlatform() { if (this.scene.isActive() && !this.scene.isActive("PauseScene")) this.pauseRun("platform"); }

  resumeFromPlatform() {
    if (this.pauseReason === "platform" && this.scene.isPaused()) {
      this.scene.resume();
      if (this.scene.isActive("PauseScene")) this.scene.stop("PauseScene");
    }
  }

  endRun(outcome, message) {
    if (this.ended) return;
    this.ended = true;
    const reward = calculateReward(outcome, this.metrics, this.levelId);
    const score = scoreFor(this.metrics);
    storage.setCoins(storage.getCoins() + reward);
    storage.setHighScore(Math.max(storage.getHighScore(), score));
    if (outcome === "victory" && this.levelId < 5) storage.setUnlockedLevel(this.levelId + 1);
    this.audio.play(outcome === "victory" ? "successSfx" : "hitSfx", 0.62);
    const snapshot = { level: this.levelId, x: this.lastSafePosition.x, y: this.lastSafePosition.y, metrics: { ...this.metrics } };
    this.audio.destroy();
    this.scene.start("EndScene", { outcome, level: this.levelId, message, metrics: { ...this.metrics }, reward, score, snapshot });
  }

  shutdown() {
    this.audio?.destroy();
    this.input?.removeListener("pointerdown", this.onPointerDown);
    this.input?.removeListener("pointermove", this.onPointerMove);
    this.input?.removeListener("pointerup", this.onPointerUp);
    this.input?.keyboard?.removeAllListeners();
  }
}
