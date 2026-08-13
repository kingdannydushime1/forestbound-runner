import Phaser from "phaser";

const A = "assets/source";
const FOREST = `${A}/forest/Legacy-Fantasy - High Forest 2.3`;
const BRACKEYS = `${A}/brackeys/brackeys_platformer_assets`;

export const ASSET_PATHS = Object.freeze({ FOREST, BRACKEYS });

export class BootScene extends Phaser.Scene {
  constructor() { super("BootScene"); }

  preload() {
    const bar = document.getElementById("loading-bar");
    const status = document.getElementById("loading-status");
    this.load.on("progress", (value) => {
      if (bar) bar.style.width = `${Math.round(value * 100)}%`;
      if (status) status.textContent = value < 0.35 ? "Waking the canopy" : value < 0.75 ? "Mapping the trail" : "Sharpening the relics";
    });
    this.load.on("complete", () => {
      document.getElementById("loading")?.classList.add("is-ready");
    });

    this.load.image("forestBg", `${FOREST}/Background/Background.png`);
    this.load.image("treeBg", `${FOREST}/Trees/Background.png`);
    this.load.image("treeGreen", `${FOREST}/Trees/Green-Tree.png`);
    this.load.image("tiles", `${FOREST}/Assets/Tiles.png`);
    this.load.image("platforms", `${BRACKEYS}/sprites/platforms.png`);
    this.load.spritesheet("knight", `${BRACKEYS}/sprites/knight.png`, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("slime", `${BRACKEYS}/sprites/slime_green.png`, { frameWidth: 32, frameHeight: 24 });
    this.load.spritesheet("coin", `${BRACKEYS}/sprites/coin.png`, { frameWidth: 16, frameHeight: 16 });
    this.load.audio("music", `${BRACKEYS}/music/time_for_adventure.mp3`);
    this.load.audio("jump", `${BRACKEYS}/sounds/jump.wav`);
    this.load.audio("coinSfx", `${BRACKEYS}/sounds/coin.wav`);
    this.load.audio("hurt", `${BRACKEYS}/sounds/hurt.wav`);
    this.load.audio("powerUp", `${BRACKEYS}/sounds/power_up.wav`);
    this.load.audio("tap", `${BRACKEYS}/sounds/tap.wav`);
  }

  create() {
    this.scene.start("MenuScene");
  }
}
