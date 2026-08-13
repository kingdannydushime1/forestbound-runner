import Phaser from "phaser";
import { WORLD, chapterFor, chooseObjective, calculateReward, formatDistance } from "../data.js";
import { storage } from "../storage.js";
import { layout } from "../layout.js";
import { AudioService } from "../audio.js";
import { button, label, progressBar } from "../ui.js";

export class GameScene extends Phaser.Scene {
  constructor() { super("GameScene"); }

  init(data) {
    this.chapterId = data.chapter || storage.getUnlockedChapter();
    this.runNumber = storage.nextRun();
    this.chapter = chapterFor(this.chapterId);
    this.objective = chooseObjective(this.chapterId, this.runNumber);
  }

  create() {
    this.registry.set("activeChapter", this.chapterId);
    this.audio = new AudioService(this);
    this.audio.startMusic();
    this.obstacles = [];
    this.coins = [];
    this.decor = [];
    this.metrics = { distance: 0, coins: 0, dodges: 0, perfectJumps: 0, collision: false };
    this.speed = this.chapter.speed;
    this.spawnClock = 650;
    this.spawnIndex = 0;
    this.elapsed = 0;
    this.ended = false;
    this.wasAirborne = false;
    this.airHopAvailable = false;
    this.jumpIsPerfect = false;
    this.drawWorld();
    this.createAnimations();
    this.createPlayer();
    this.createHud();
    this.setupInput();
    this.spawnPattern(0);
  }

  drawWorld() {
    this.background = this.add.image(640, 360, "forestBg").setDisplaySize(1280, 720).setTint(this.chapter.tint).setDepth(0);
    this.treeLayer = this.add.tileSprite(640, 395, 1280, 500, "treeBg").setTileScale(1.43).setAlpha(0.77).setDepth(1);
    this.add.rectangle(640, 360, 1280, 720, 0x101827, 0.13).setDepth(2);
    for (const [x, y] of [[430, 170], [700, 250], [1010, 140], [1170, 300]]) {
      const firefly = this.add.sprite(x, y, "coin", 2).setScale(0.8).setAlpha(0.45).setDepth(3);
      this.tweens.add({ targets: firefly, y: y - 18, alpha: { from: 0.25, to: 0.8 }, duration: 1200 + (x % 3) * 280, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
      this.decor.push(firefly);
    }
    this.groundArt = this.add.tileSprite(640, 654, 1280, 96, "platforms").setTileScale(2, 1.5).setDepth(5);
    this.groundArt.setTint(0xffffff);
    this.groundBody = this.add.rectangle(640, WORLD.groundY + 36, 1280, 48, 0x000000, 0).setVisible(false);
    this.physics.add.existing(this.groundBody, true);
    this.add.rectangle(640, 592, 1280, 6, 0x9bc268, 0.32).setDepth(6);
  }

  createAnimations() {
    if (!this.anims.exists("knightRun")) {
      // The source sheet is 8×8, but cells 6–7 in row 0 are empty padding.
      // Keep the animation on the four verified non-empty running cells.
      this.anims.create({ key: "knightRun", frames: this.anims.generateFrameNumbers("knight", { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
      this.anims.create({ key: "knightJump", frames: [{ key: "knight", frame: 16 }, { key: "knight", frame: 17 }], frameRate: 6, repeat: -1 });
      this.anims.create({ key: "slimeIdle", frames: this.anims.generateFrameNumbers("slime", { start: 0, end: 2 }), frameRate: 5, repeat: -1 });
      this.anims.create({ key: "coinSpin", frames: this.anims.generateFrameNumbers("coin", { start: 0, end: 11 }), frameRate: 14, repeat: -1 });
    }
  }

  createPlayer() {
    this.player = this.physics.add.sprite(WORLD.playerX, WORLD.groundY - 48, "knight", 0).setScale(1.9).setDepth(12);
    this.player.body.setSize(18, 27).setOffset(7, 5);
    this.player.body.setGravityY(2050);
    this.player.play("knightRun");
    this.physics.add.collider(this.player, this.groundBody);
  }

  createHud() {
    const l = layout(this.scale.width, this.scale.height);
    this.add.rectangle(640, 59, 1280, 118, 0x101827, 0.73).setDepth(15);
    this.distanceText = label(this, l.hud.left, 32, "000 m", 24, "#fff6cf", 0);
    this.chapterText = label(this, l.hud.left, 66, `CHAPTER ${this.chapter.id} · ${this.chapter.name.toUpperCase()}`, 14, "#a9bfd1", 0);
    this.coinText = label(this, l.hud.right - 74, 32, "0", 23, "#f4d982", 1);
    this.add.sprite(l.hud.right - 32, 32, "coin", 3).setScale(1.8).setDepth(25);
    this.pauseButton = button(this, l.hud.right - 34, 91, 74, 38, "II", () => this.pauseRun(), { fontSize: 18, stroke: 0x5f7a84 });
    label(this, l.objective.x - l.objective.width / 2, 79, `${this.objective.icon}  ·  ${this.objective.title}`, 15, "#fff6cf", 0);
    this.objectiveReadout = label(this, l.objective.x + l.objective.width / 2, 79, this.objective.readout(this.metrics), 14, "#f4d982", 1);
    this.objectiveBar = progressBar(this, l.objective.x, 103, l.objective.width, 0, { fill: 0xe1b85a, stroke: 0x8ba75f });
    this.hint = label(this, 640, 684, "SPACE / TAP TO JUMP", 14, "#c1d1d7");
    this.tweens.add({ targets: this.hint, alpha: { from: 1, to: 0.35 }, duration: 800, yoyo: true, repeat: 3 });
  }

  setupInput() {
    this.input.keyboard.on("keydown-SPACE", () => this.jump());
    this.input.keyboard.on("keydown-UP", () => this.jump());
    this.input.keyboard.on("keydown-W", () => this.jump());
    this.input.keyboard.on("keydown-P", () => this.pauseRun());
    this.input.keyboard.on("keydown-ESC", () => this.pauseRun());
    this.input.on("pointerdown", (pointer) => {
      if (pointer.y > 145) this.jump();
    });
  }

  jump() {
    if (this.ended || !this.player?.body) return;
    const grounded = this.player.body.blocked.down;
    if (grounded) {
      this.player.setVelocityY(-780);
      this.wasAirborne = true;
      this.airHopAvailable = true;
      this.jumpIsPerfect = this.isNearThreat(280, 640);
      this.player.play("knightJump", true);
      this.audio.play("jump", 0.48);
      this.bounceFeedback();
    } else if (this.airHopAvailable) {
      this.player.setVelocityY(-650);
      this.airHopAvailable = false;
      this.jumpIsPerfect = this.jumpIsPerfect || this.isNearThreat(250, 600);
      this.audio.play("jump", 0.38);
      this.bounceFeedback();
    }
  }

  isNearThreat(minX, maxX) {
    return this.obstacles.some((obstacle) => obstacle.active && obstacle.x > minX && obstacle.x < maxX);
  }

  bounceFeedback() {
    this.tweens.add({ targets: this.player, scaleX: 2.15, scaleY: 1.65, duration: 90, yoyo: true, ease: "Quad.easeOut" });
  }

  spawnPattern(index) {
    const x = 1350;
    const type = index % 5;
    if (type === 0) {
      this.spawnObstacle(x, WORLD.groundY - 30, "ground");
      this.spawnCoinArc(x + 105, WORLD.groundY - 140, 3);
    } else if (type === 1) {
      this.spawnObstacle(x, WORLD.groundY - 30, "ground");
      this.spawnObstacle(x + 185, WORLD.groundY - 120, "air");
      this.spawnCoinArc(x + 70, WORLD.groundY - 155, 4);
    } else if (type === 2) {
      this.spawnObstacle(x, WORLD.groundY - 120, "air");
      this.spawnCoinArc(x + 85, WORLD.groundY - 35, 5);
    } else if (type === 3) {
      this.spawnObstacle(x, WORLD.groundY - 30, "ground");
      this.spawnObstacle(x + 245, WORLD.groundY - 30, "ground");
      this.spawnCoinArc(x + 120, WORLD.groundY - 155, 4);
    } else {
      this.spawnObstacle(x, WORLD.groundY - 30, "ground");
      this.spawnCoinArc(x + 100, WORLD.groundY - 100, 6);
    }
  }

  spawnObstacle(x, y, kind) {
    const obstacle = this.physics.add.sprite(x, y, "slime", kind === "air" ? 1 : 0).setScale(kind === "air" ? 2 : 2.15).setDepth(10);
    obstacle.kind = kind;
    obstacle.passed = false;
    obstacle.play("slimeIdle");
    obstacle.body.setAllowGravity(false);
    obstacle.body.setSize(24, 18).setOffset(4, 5);
    this.obstacles.push(obstacle);
  }

  spawnCoinArc(startX, startY, count) {
    for (let i = 0; i < count; i += 1) {
      const coin = this.physics.add.sprite(startX + i * 42, startY - Math.sin((i / Math.max(1, count - 1)) * Math.PI) * 52, "coin", i % 12).setScale(1.8).setDepth(9);
      coin.play("coinSpin");
      coin.body.setAllowGravity(false);
      coin.body.setSize(10, 12).setOffset(3, 2);
      this.coins.push(coin);
    }
  }

  update(_time, delta) {
    if (this.ended) return;
    const dt = Math.min(40, delta) / 1000;
    this.elapsed += delta;
    this.metrics.distance += (this.speed * dt) / 10;
    this.treeLayer.tilePositionX += this.speed * dt * 0.08;
    this.spawnClock -= delta;
    if (this.spawnClock <= 0) {
      this.spawnPattern(this.spawnIndex);
      this.spawnIndex += 1;
      this.spawnClock = Math.max(470, 720 - this.chapterId * 25 - (this.spawnIndex % 3) * 35);
    }

    const playerBounds = this.player.getBounds();
    for (const obstacle of this.obstacles) {
      if (!obstacle.active) continue;
      obstacle.x -= this.speed * dt;
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, obstacle.getBounds())) {
        this.endRun("defeat");
        return;
      }
      if (!obstacle.passed && obstacle.x < WORLD.playerX - 42) {
        obstacle.passed = true;
        this.metrics.dodges += 1;
        if (obstacle.x > WORLD.playerX - 95) this.nearMiss();
        this.addScoreTick("DODGE +25", obstacle.x, obstacle.y - 30, "#9bc268");
      }
      if (obstacle.x < -100) obstacle.destroy();
    }
    for (const coin of this.coins) {
      if (!coin.active) continue;
      coin.x -= this.speed * dt;
      if (Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, coin.getBounds())) {
        this.collectCoin(coin);
      } else if (coin.x < -80) coin.destroy();
    }
    this.obstacles = this.obstacles.filter((item) => item.active);
    this.coins = this.coins.filter((item) => item.active);

    const airborne = !this.player.body.blocked.down;
    if (this.wasAirborne && !airborne) {
      if (this.jumpIsPerfect) {
        this.metrics.perfectJumps += 1;
        this.addScoreTick("PERFECT +125", this.player.x, this.player.y - 65, "#f4d982");
        this.comboBurst();
      }
      this.jumpIsPerfect = false;
      this.airHopAvailable = false;
      this.player.play("knightRun", true);
    }
    this.wasAirborne = airborne;
    if (this.player.y > 760) {
      this.endRun("defeat");
      return;
    }
    this.updateHud();
    if (this.objective.isComplete(this.metrics)) this.endRun("victory");
  }

  updateHud() {
    this.distanceText.setText(formatDistance(this.metrics.distance));
    this.coinText.setText(String(this.metrics.coins));
    this.objectiveReadout.setText(this.objective.readout(this.metrics));
    this.objectiveBar.setRatio(this.objective.progress(this.metrics));
  }

  collectCoin(coin) {
    if (!coin.active) return;
    this.metrics.coins += 1;
    this.audio.play("coinSfx", 0.52);
    this.tweens.add({ targets: coin, y: coin.y - 38, alpha: 0, scale: 2.7, duration: 220, onComplete: () => coin.destroy() });
    this.addScoreTick("+1 RELIC", coin.x, coin.y - 30, "#f4d982");
    try {
      const burst = this.add.particles(coin.x, coin.y, "coin", { frame: [0, 4, 8], quantity: 8, lifespan: 350, speed: { min: 50, max: 130 }, scale: { start: 0.8, end: 0 }, emitting: false }).setDepth(18);
      burst.explode(8, coin.x, coin.y);
      this.time.delayedCall(450, () => burst.destroy());
    } catch { /* optional flourish */ }
  }

  nearMiss() {
    this.cameras.main.flash(90, 225, 184, 90, false);
    this.addScoreTick("CLOSE!", WORLD.playerX + 38, this.player.y - 90, "#f4d982");
  }

  comboBurst() {
    this.cameras.main.shake(90, 0.002);
    this.tweens.add({ targets: this.player, angle: -5, duration: 70, yoyo: true });
  }

  addScoreTick(text, x, y, color) {
    const tick = label(this, x, y, text, 15, color);
    this.tweens.add({ targets: tick, y: y - 38, alpha: 0, duration: 650, ease: "Cubic.easeOut", onComplete: () => tick.destroy() });
  }

  pauseRun() {
    if (this.ended || this.scene.isActive("PauseScene")) return;
    this.registry.set("activeChapter", this.chapterId);
    this.scene.pause();
    this.scene.launch("PauseScene");
  }

  endRun(outcome) {
    if (this.ended) return;
    this.ended = true;
    this.metrics.collision = outcome === "defeat";
    const reward = calculateReward(outcome, this.metrics, this.chapterId);
    storage.setCoins(storage.getCoins() + reward);
    const score = Math.floor(this.metrics.distance) + this.metrics.coins * 50 + this.metrics.perfectJumps * 125;
    storage.setHighScore(Math.max(storage.getHighScore(), score));
    if (outcome === "victory" && this.chapterId < 5) storage.setUnlockedChapter(this.chapterId + 1);
    this.audio.play(outcome === "victory" ? "powerUp" : "hurt", 0.62);
    const readout = this.objective.readout(this.metrics);
    this.audio.destroy();
    this.scene.start("EndScene", {
      outcome,
      chapter: this.chapterId,
      objectiveTitle: this.objective.title,
      objectiveReadout: readout,
      metrics: { ...this.metrics },
      reward,
    });
  }

  shutdown() {
    this.audio?.destroy();
    this.input?.keyboard?.removeAllListeners();
    for (const item of [...this.obstacles, ...this.coins, ...this.decor]) item?.destroy?.();
  }
}
