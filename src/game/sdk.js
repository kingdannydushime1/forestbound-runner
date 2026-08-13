const bridgePromise = (async () => {
  const candidate = globalThis.window?.bridge;
  if (!candidate || typeof candidate.initialize !== "function") return null;
  try { return await candidate.initialize(); } catch { return null; }
})();

let bridge = null;
let lastRewardedAt = 0;
const ready = bridgePromise.then((value) => { bridge = value; return value; });

function eventName(name) { return bridge?.EVENT_NAME?.[name] || name; }

export const sdk = {
  ready,
  async init() { return ready; },
  async gameReady() {
    const b = await ready;
    try { b?.platform?.sendMessage?.("game_ready"); } catch { /* Bridge is optional. */ }
  },
  async loadingProgress(progress) {
    const b = await ready;
    try { b?.setLoadingProgress?.(Math.max(0, Math.min(1, progress))); } catch { /* optional */ }
  },
  isAvailable() { return Boolean(bridge); },
  isRewardedSupported() { return Boolean(bridge?.advertisement?.isRewardedSupported); },
  isInterstitialSupported() { return Boolean(bridge?.advertisement?.isInterstitialSupported); },
  onPlatformPause(callback) {
    ready.then((b) => {
      try { b?.platform?.on?.(eventName("PAUSE_STATE_CHANGED"), callback); } catch { /* optional */ }
    });
  },
  onAudioChanged(callback) {
    ready.then((b) => {
      try { b?.platform?.on?.(eventName("AUDIO_STATE_CHANGED"), callback); } catch { /* optional */ }
    });
  },
  async showInterstitial() {
    const b = await ready;
    if (!b?.advertisement?.isInterstitialSupported || Date.now() - lastRewardedAt < 4000) return false;
    try { await b.advertisement.showInterstitial(); return true; } catch { return false; }
  },
  async showRewarded() {
    const b = await ready;
    if (!b?.advertisement?.isRewardedSupported) return false;
    return new Promise((resolve) => {
      let settled = false;
      const finish = (value) => {
        if (settled) return;
        settled = true;
        if (value) lastRewardedAt = Date.now();
        resolve(value);
      };
      const onState = (state) => {
        const normalized = String(state?.state || state || "").toLowerCase();
        if (normalized === "rewarded") finish(true);
        else if (["closed", "failed", "error"].includes(normalized)) finish(false);
      };
      try {
        b.advertisement.on?.(eventName("REWARDED_STATE_CHANGED"), onState);
        const result = b.advertisement.showRewarded?.();
        if (result?.then) result.then((value) => { if (typeof value === "boolean") finish(value); }).catch(() => finish(false));
      } catch { finish(false); }
      setTimeout(() => finish(false), 120000);
    });
  },
};
