const memory = new Map();
const PREFIX = "path-drawer:";

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch { return memory.has(key) ? memory.get(key) : fallback; }
}

function write(key, value) {
  memory.set(key, value);
  try { window.localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch { /* privacy mode fallback */ }
}

export const storage = {
  getUnlockedLevel() { return read("unlockedLevel", 1); },
  setUnlockedLevel(value) { write("unlockedLevel", Math.max(1, Math.min(5, Math.floor(value)))); },
  getCoins() { return read("coins", 0); },
  setCoins(value) { write("coins", Math.max(0, Math.floor(value))); },
  getHighScore() { return read("highScore", 0); },
  setHighScore(value) { write("highScore", Math.max(0, Math.floor(value))); },
  getRunNumber() { return read("runNumber", 0); },
  nextRun() { const next = this.getRunNumber() + 1; write("runNumber", next); return next; },
  isMuted() { return read("muted", false); },
  setMuted(value) { write("muted", Boolean(value)); },
  recordOutcome(outcome) {
    const previous = read("lastOutcome", null);
    const streak = previous === outcome ? read("outcomeStreak", 0) + 1 : 1;
    write("lastOutcome", outcome); write("outcomeStreak", streak);
    return streak >= 2;
  },
};
