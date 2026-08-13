const memory = new Map();
const PREFIX = "forestbound:";

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return memory.has(key) ? memory.get(key) : fallback;
  }
}

function write(key, value) {
  memory.set(key, value);
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // The memory fallback keeps the game playable in privacy-restricted frames.
  }
}

export const storage = {
  getUnlockedChapter() { return read("unlockedChapter", 1); },
  setUnlockedChapter(value) { write("unlockedChapter", Math.max(1, Math.min(5, value))); },
  getCoins() { return read("coins", 0); },
  setCoins(value) { write("coins", Math.max(0, Math.floor(value))); },
  getHighScore() { return read("highScore", 0); },
  setHighScore(value) { write("highScore", Math.max(0, Math.floor(value))); },
  getRunNumber() { return read("runNumber", 0); },
  nextRun() {
    const next = this.getRunNumber() + 1;
    write("runNumber", next);
    return next;
  },
  isMuted() { return read("muted", false); },
  setMuted(value) { write("muted", Boolean(value)); },
};
