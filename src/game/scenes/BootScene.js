import Phaser from "phaser";
import { sdk } from "../sdk.js";

const ROOT = "assets/path-drawer/selected";
const ART = `${ROOT}/art`;
const VFX = `${ROOT}/vfx`;
const AUDIO = `${ROOT}/audio`;

export const ASSET_PATHS = Object.freeze({ ROOT, ART, VFX, AUDIO });

export class BootScene extends Phaser.Scene {
  constructor() { super("BootScene"); }

  preload() {
    const bar = document.getElementById("loading-bar");
    const status = document.getElementById("loading-status");
    this.load.on("progress", (value) => {
      if (bar) bar.style.width = `${Math.round(value * 100)}%`;
      if (status) status.textContent = value < 0.3 ? "Unfolding the map" : value < 0.7 ? "Marking safe routes" : "Waking the beacon";
      sdk.loadingProgress(value);
    });
    this.load.on("complete", () => document.getElementById("loading")?.classList.add("is-ready"));
    this.load.on("loaderror", (file) => { if (status) status.textContent = `Could not load ${file.key}`; });

    this.load.spritesheet("ground", `${ART}/ground-tiles.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("rocks", `${ART}/rocks.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("roots", `${ART}/roots-logs.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("bushes", `${ART}/bushes.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("trees", `${ART}/trees.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("details", `${ART}/nature-details.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("ruins", `${ART}/ruins.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("items", `${ART}/items.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("playerIdle", `${ART}/player-idle-front.png`, { frameWidth: 32, frameHeight: 33 });
    this.load.spritesheet("playerWalk", `${ART}/player-walk-front.png`, { frameWidth: 32, frameHeight: 33 });
    this.load.image("playerShadow", `${ART}/player-shadow.png`);
    this.load.spritesheet("uiPanels", `${ART}/ui-panels-buttons.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("vfxExplosion", `${VFX}/explosion.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("vfxImpact", `${VFX}/impact-shock.png`, { frameWidth: 140, frameHeight: 50 });

    this.load.audio("music", `${AUDIO}/puzzle-pieces.ogg`);
    this.load.audio("drawSfx", `${AUDIO}/sfx/draw-select.wav`);
    this.load.audio("lockSfx", `${AUDIO}/sfx/route-confirm.wav`);
    this.load.audio("shardSfx", `${AUDIO}/sfx/shard-collect.wav`);
    this.load.audio("hitSfx", `${AUDIO}/sfx/collision.wav`);
    this.load.audio("successSfx", `${AUDIO}/sfx/beacon-success.wav`);
  }

  create() {
    sdk.init().then(() => {
      sdk.gameReady();
      sdk.onPlatformPause((paused) => {
        const gameScene = this.scene.get("GameScene");
        if (paused) gameScene?.pauseFromPlatform?.(); else gameScene?.resumeFromPlatform?.();
      });
      sdk.onAudioChanged((enabled) => { this.sound.mute = enabled === false; });
    });
    this.scene.start("MenuScene");
  }
}
