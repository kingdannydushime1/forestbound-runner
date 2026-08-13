# Path Drawer — Release

## Build gate

- [x] Gameplay and art bible locked before asset search.
- [x] New sources selected and licenses recorded.
- [x] New archives downloaded and measured.
- [x] `npm test`
- [x] `npm run typecheck`
- [ ] `npm run build` after old assets are removed.
- [ ] `npm run preview` and manually check menu → draw → pause → end screen.
- [ ] Capture portrait and landscape screens and visually review them.
- [ ] Confirm no `VISUAL_PENDING`, old asset path or reference-game asset remains.

## GitHub Pages

The Vite config uses `base: "./"`; the GitHub Actions workflow builds and uploads `dist/` with the Pages artifact action.

Expected URL: `https://kingdannydushime1.github.io/path-drawer/`

## Delivery contents

- Phaser source under `src/`
- Only newly approved Path Drawer assets under `public/assets/path-drawer/selected/`
- Local license copies and source hashes
- Playgama Bridge v2 wrapper with offline fallback
- Credits, game design, art bible, asset research and audit documents
