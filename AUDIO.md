# Audio Map

- `time_for_adventure.mp3`: looping gameplay music at 0.22 volume.
- `jump.wav`: jump and air-hop at 0.48.
- `coin.wav`: relic collect at 0.55.
- `hurt.wav`: collision at 0.62.
- `power_up.wav`: objective completion and chapter unlock at 0.60.
- `tap.wav`: menu, pause and button interaction at 0.38.

Mute state is persisted in localStorage and checked before every sound call. The first user interaction unlocks audio in browsers. Pause silences gameplay playback without losing the mute preference.
