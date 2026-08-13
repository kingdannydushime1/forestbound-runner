import assert from "node:assert/strict";
import { LEVELS, WORLD, calculateReward, pathLength, scoreFor } from "../src/game/data.js";

assert.equal(LEVELS.length, 5);
assert.equal(WORLD.width, 1280);
assert.equal(WORLD.height, 720);
assert.equal(pathLength([{ x: 0, y: 0 }, { x: 3, y: 4 }]), 5);
assert.equal(calculateReward("victory", { gems: 4, clean: true }, 1), 170);
assert.equal(calculateReward("victory", { gems: 2, clean: true }, 3), 180);
assert.equal(calculateReward("defeat", { gems: 3 }, 1), 17);
assert.equal(scoreFor({ pathLength: 640, gems: 2, clean: true }), 1090);
console.log("Path Drawer data tests passed");
