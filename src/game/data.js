export const WORLD = Object.freeze({ width: 1280, height: 720, groundY: 610, playerX: 270 });

export const CHAPTERS = Object.freeze([
  { id: 1, name: "Verdant Canopy", subtitle: "Mosslight Trail", speed: 320, tint: 0xffffff, objectiveDistance: 850 },
  { id: 2, name: "Amber Ruins", subtitle: "The Old Goldroad", speed: 348, tint: 0xffead0, objectiveDistance: 970 },
  { id: 3, name: "Moonlit Hollow", subtitle: "Whispers Underleaf", speed: 376, tint: 0xc8d7ff, objectiveDistance: 1090 },
  { id: 4, name: "Ember Grove", subtitle: "Redleaf Run", speed: 404, tint: 0xffd0c3, objectiveDistance: 1210 },
  { id: 5, name: "Crown of Leaves", subtitle: "The Last Shrine", speed: 432, tint: 0xfff1b7, objectiveDistance: 1330 },
]);

export const OBJECTIVE_DEFS = Object.freeze([
  {
    id: "trailblazer",
    title: "REACH THE SHRINE",
    short: "Trailblazer",
    description: "Keep your footing until the shrine appears.",
    icon: "DISTANCE",
    target: (chapter) => chapter.objectiveDistance,
    value: (metrics) => Math.floor(metrics.distance),
    format: (value, target) => `${value} / ${target} m`,
  },
  {
    id: "relic-run",
    title: "GATHER THE RELICS",
    short: "Relic Run",
    description: "Collect the gold relics hidden in the canopy.",
    icon: "RELICS",
    target: (chapter) => 12 + chapter.id * 2,
    value: (metrics) => metrics.coins,
    format: (value, target) => `${value} / ${target}`,
  },
  {
    id: "clean-path",
    title: "KEEP THE PATH CLEAN",
    short: "Clean Path",
    description: "Thread the route without touching a threat.",
    icon: "DODGES",
    target: (chapter) => 9 + chapter.id * 2,
    value: (metrics) => metrics.dodges,
    format: (value, target) => `${value} / ${target}`,
  },
  {
    id: "skybound",
    title: "CHAIN PERFECT JUMPS",
    short: "Skybound",
    description: "Time your jumps close to danger, then soar.",
    icon: "PERFECT",
    target: (chapter) => 6 + chapter.id,
    value: (metrics) => metrics.perfectJumps,
    format: (value, target) => `${value} / ${target}`,
  },
]);

export function chooseObjective(chapterId, runNumber = 0) {
  const chapter = CHAPTERS[chapterId - 1] || CHAPTERS[0];
  const index = Math.abs((runNumber + chapterId * 3) % OBJECTIVE_DEFS.length);
  const definition = OBJECTIVE_DEFS[index];
  const target = definition.target(chapter);
  return {
    ...definition,
    target,
    progress(metrics) {
      return Math.min(1, definition.value(metrics) / target);
    },
    isComplete(metrics) {
      return definition.value(metrics) >= target;
    },
    readout(metrics) {
      return definition.format(definition.value(metrics), target);
    },
  };
}

export function chapterFor(unlockedChapter) {
  return CHAPTERS[Math.max(1, Math.min(CHAPTERS.length, unlockedChapter)) - 1];
}

export function calculateReward(outcome, metrics, chapterId) {
  const chapterBonus = Math.max(0, chapterId - 1) * 40;
  if (outcome === "victory") {
    return 100 + chapterBonus + (metrics.collision ? 0 : 50);
  }
  return 10 + Math.floor(metrics.distance / 100);
}

export function formatDistance(value) {
  return `${Math.max(0, Math.floor(value)).toString().padStart(3, "0")} m`;
}
