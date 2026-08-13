import Phaser from "phaser";
import { WORLD } from "./game/data.js";
import { BootScene } from "./game/scenes/BootScene.js";
import { MenuScene } from "./game/scenes/MenuScene.js";
import { GameScene } from "./game/scenes/GameScene.js";
import { PauseScene } from "./game/scenes/PauseScene.js";
import { EndScene } from "./game/scenes/EndScene.js";
import "./styles.css";

const captureMode = new URLSearchParams(window.location.search).has("capture");

const config = {
  type: captureMode ? Phaser.CANVAS : Phaser.AUTO,
  parent: "game",
  width: WORLD.width,
  height: WORLD.height,
  backgroundColor: "#101827",
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  physics: { default: "arcade", arcade: { gravity: { y: 0 }, debug: false } },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: WORLD.width, height: WORLD.height },
  scene: [BootScene, MenuScene, GameScene, PauseScene, EndScene],
};

window.__forestboundGame = new Phaser.Game(config);
