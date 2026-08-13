export const WORLD = Object.freeze({
  width: 1280,
  height: 720,
  boardTop: 150,
  boardBottom: 620,
  start: Object.freeze({ x: 125, y: 525 }),
  goal: Object.freeze({ x: 1145, y: 205 }),
});

export const LEVELS = Object.freeze([
  { id: 1, name: "LANTERN CLEARING", subtitle: "A gentle first route", obstacles: [{ x: 410, y: 395, w: 112, h: 82, kind: "rock", frame: 0 }, { x: 700, y: 270, w: 112, h: 82, kind: "rock", frame: 1 }, { x: 940, y: 440, w: 112, h: 82, kind: "rock", frame: 2 }], gems: [{ x: 285, y: 450 }, { x: 555, y: 335 }, { x: 835, y: 375 }] },
  { id: 2, name: "ROOTBOUND CROSSING", subtitle: "Make two deliberate turns", obstacles: [{ x: 350, y: 300, w: 112, h: 82, kind: "root", frame: 0 }, { x: 560, y: 485, w: 112, h: 82, kind: "root", frame: 1 }, { x: 770, y: 300, w: 112, h: 82, kind: "root", frame: 2 }, { x: 985, y: 470, w: 112, h: 82, kind: "root", frame: 3 }], gems: [{ x: 245, y: 390 }, { x: 470, y: 235 }, { x: 680, y: 380 }, { x: 875, y: 220 }] },
  { id: 3, name: "MIRROR MARSH", subtitle: "Choose the safer corridor", obstacles: [{ x: 330, y: 455, w: 112, h: 82, kind: "ruin", frame: 0 }, { x: 530, y: 265, w: 112, h: 82, kind: "ruin", frame: 1 }, { x: 730, y: 455, w: 112, h: 82, kind: "ruin", frame: 2 }, { x: 930, y: 265, w: 112, h: 82, kind: "ruin", frame: 3 }], gems: [{ x: 230, y: 340 }, { x: 430, y: 235 }, { x: 630, y: 355 }, { x: 830, y: 215 }, { x: 1040, y: 350 }] },
  { id: 4, name: "CLOCKWORK GROVE", subtitle: "Time the moving sentinel", obstacles: [{ x: 355, y: 420, w: 112, h: 82, kind: "rock", frame: 4 }, { x: 620, y: 300, w: 112, h: 82, kind: "rock", frame: 5 }, { x: 875, y: 455, w: 112, h: 82, kind: "rock", frame: 6 }], sentinels: [{ x: 760, y: 390, w: 70, h: 70, kind: "sentinel", frame: 0, range: 125, period: 2200 }], gems: [{ x: 250, y: 450 }, { x: 490, y: 225 }, { x: 700, y: 470 }, { x: 930, y: 270 }, { x: 1060, y: 390 }] },
  { id: 5, name: "BEACON VAULT", subtitle: "Master the enchanted map", obstacles: [{ x: 320, y: 450, w: 112, h: 82, kind: "ruin", frame: 4 }, { x: 500, y: 270, w: 112, h: 82, kind: "root", frame: 4 }, { x: 680, y: 450, w: 112, h: 82, kind: "rock", frame: 7 }, { x: 860, y: 270, w: 112, h: 82, kind: "ruin", frame: 5 }, { x: 1040, y: 430, w: 112, h: 82, kind: "root", frame: 5 }], sentinels: [{ x: 760, y: 405, w: 70, h: 70, kind: "sentinel", frame: 1, range: 145, period: 1900 }], gems: [{ x: 225, y: 335 }, { x: 405, y: 230 }, { x: 590, y: 365 }, { x: 770, y: 215 }, { x: 950, y: 350 }, { x: 1090, y: 275 }] },
]);

export function levelFor(unlockedLevel) { return LEVELS[Math.max(1, Math.min(LEVELS.length, unlockedLevel)) - 1]; }

export function pathLength(points) {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  return total;
}

export function calculateReward(outcome, metrics, levelId) {
  if (outcome === "victory") return 80 + Math.max(0, levelId - 1) * 20 + metrics.gems * 15 + (metrics.clean ? 30 : 0);
  return 8 + metrics.gems * 3;
}

export function scoreFor(metrics) { return Math.floor(metrics.pathLength) + metrics.gems * 100 + (metrics.clean ? 250 : 0); }
