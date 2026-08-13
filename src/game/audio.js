import { storage } from "./storage.js";

export class AudioService {
  constructor(scene) {
    this.scene = scene;
    this.muted = storage.isMuted();
    this.music = null;
  }

  startMusic() {
    if (this.music?.isPlaying) return;
    try {
      this.music = this.scene.sound.add("music", { loop: true, volume: 0.22 });
      if (!this.muted) this.music.play();
    } catch {
      this.music = null;
    }
  }

  play(key, volume = 0.5) {
    if (this.muted) return;
    try { this.scene.sound.play(key, { volume }); } catch { /* audio is optional */ }
  }

  toggle() {
    this.muted = !this.muted;
    storage.setMuted(this.muted);
    try {
      if (this.music) this.muted ? this.music.pause() : this.music.resume();
    } catch { /* browser audio can reject until a gesture */ }
    return this.muted;
  }

  setMuted(value) {
    this.muted = Boolean(value);
    storage.setMuted(this.muted);
    try {
      if (this.music) this.muted ? this.music.pause() : this.music.resume();
    } catch { /* no-op */ }
  }

  destroy() {
    try { this.music?.stop(); this.music?.destroy(); } catch { /* no-op */ }
    this.music = null;
  }
}
