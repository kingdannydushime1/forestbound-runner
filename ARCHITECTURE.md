# Forestbound Runner — Architecture

## Stack

- Phaser 3.90.x for rendering, input, scenes, animation, tweens and particles.
- Vite 7 for development and production builds.
- Vanilla JavaScript modules; no framework overhead.
- Browser localStorage through a defensive storage service.

## Modules

- `src/main.js`: boot, asset manifest and Phaser config.
- `src/game/data.js`: chapter and objective data; pure functions are testable.
- `src/game/storage.js`: safe persistence with memory fallback.
- `src/game/audio.js`: defensive audio facade and mute persistence.
- `src/game/layout.js`: one responsive logical layout contract.
- `src/game/ui.js`: reusable text/button/panel construction.
- `src/game/scenes/`: Boot, Menu, Gameplay, Pause, End scenes.

Scenes orchestrate state and transitions. Data and persistence never depend on a scene. All asset paths are centralized in `main.js` and point to files in `public/assets/source/`.

## Asset loading

All final assets are local files downloaded from itch.io. The source packs remain in `public/assets/source/` with their original licenses and credits. Phaser loads PNG, MP3, WAV and TTF files directly from the public directory.

## Testing

- `npm test`: objective rotation, chapter scaling, reward calculations and storage fallback.
- `npm run typecheck`: syntax-check every JavaScript module.
- `npm run build`: production output.
- Manual QA: menu → start → jump/air-hop → pause/resume → victory/game over → replay, plus resize at 320×480, 768×1024 and desktop widths.
