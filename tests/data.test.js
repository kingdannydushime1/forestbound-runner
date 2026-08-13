import assert from "node:assert/strict";
import { CHAPTERS, calculateReward, chooseObjective } from "../src/game/data.js";

assert.equal(CHAPTERS.length, 5);
assert.notEqual(chooseObjective(1, 0).id, chooseObjective(1, 1).id);
assert.equal(chooseObjective(1, 1).target, 850);
assert.equal(chooseObjective(2, 2).target, 970);
assert.equal(chooseObjective(1, 1).readout({ distance: 120, coins: 0, dodges: 0, perfectJumps: 0 }), "120 / 850 m");
assert.equal(chooseObjective(1, 2).readout({ distance: 0, coins: 14, dodges: 0, perfectJumps: 0 }), "14 / 14");
assert.equal(calculateReward("victory", { distance: 900, collision: false }, 1), 150);
assert.equal(calculateReward("defeat", { distance: 499, collision: true }, 1), 14);
console.log("data tests passed");
