# Path Drawer — Architecture

## Stack

- Phaser 3.90 for rendering, input, scenes, animation, tweens and particles.
- Vite 7 for local development and relative GitHub Pages builds.
- Vanilla ES modules; no framework overhead.

## Modules

- `src/main.js`: Phaser config, FIT scaling and scene registration.
- `src/game/data.js`: five hand-authored top-down layouts, world bounds, path math and rewards.
- `src/game/layout.js`: one logical responsive layout contract.
- `src/game/scenes/BootScene.js`: new Path Drawer asset manifest and loading progress.
- `src/game/scenes/MenuScene.js`: title, progression and sound controls.
- `src/game/scenes/GameScene.js`: drawing input, route simulation, explicit obstacle zones, sentinels and shards.
- `src/game/scenes/PauseScene.js`: manual/platform pause overlay and resume.
- `src/game/scenes/EndScene.js`: victory/game-over feedback and optional ads.
- `src/game/sdk.js`: defensive Playgama Bridge v2 wrapper.
- `src/game/storage.js`: local fallback progress, streak and mute state.
- `src/game/audio.js` and `src/game/ui.js`: defensive audio and shared controls.

## Asset contract

All production files are under `public/assets/path-drawer/selected/` and come from the newly researched Path Drawer manifest. The Mixel pack defines the 32×32 top-down camera and pixel density; unTied supplies licensed pixel VFX; Tallbeard and JDWasabi supply licensed audio. Old `public/assets/source/` content and all reference-game assets are forbidden and removed before release.

Selected atlas facts are measured in `tests/assets.test.mjs`: Mixel ground 384×384 (12×12 cells), rocks/roots 384×96 (12×3), ruins 384×512 (12×16), items 384×64 (12×2), player idle 288×33 (9×1 frames), player walk 128×33 (4×1), effects 32×32 and 140×50 frames. Code loads only those measured grids.

## Coordinate and collision contract

The world is 1280×720. `Phaser.Scale.FIT` centers the complete world on any viewport. Input is clamped to board `y=168..602`. Visible sprites and gameplay zones are separate: obstacle zones are hand-authored level data with an 18 px safety margin; transparent atlas padding cannot create invisible collisions. Sentinels update their explicit zone before each route segment test.

The player follows a sampled polyline at delta-time speed. Each movement segment is sampled every 8 px against obstacle rectangles, so hand-drawn paths cannot tunnel through a blocker.

## Platform contract

`index.html` loads Playgama Bridge v2 before the module. `sdk.js` initializes once, sends `game_ready`, forwards loading progress, subscribes once to pause/audio, and guards interstitial/rewarded calls. End screens expose revive and double reward only when Bridge reports support. Local storage remains the fallback.

## Verification

- `npm test`: path/reward math plus the new PNG/audio manifest.
- `npm run typecheck`: syntax-check all source modules.
- `npm run build`: production bundle and selected asset copy.
- Browser matrix: menu, drawing, clear, route success/failure, pause/resume, ad-disabled end screen, portrait and landscape viewport captures.
