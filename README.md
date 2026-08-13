# Path Drawer

A responsive Phaser 3 top-down puzzle where the player draws a route through an enchanted map.

> **Draw the route. Dodge the dangers. Reach the beacon.**

## Play

- Drag from the character to the EXIT beacon.
- Release to lock the route and watch the character follow it.
- Avoid rocks, roots, ruins and moving sentinels.
- Cross map shards for bonus relics.
- `C` clears before release; `P` or `Escape` pauses.

## Development

```bash
npm install
npm test
npm run typecheck
npm run build
npm run dev
```

## Production rules

- The game is built around the user's Path Drawer mechanic; it is not a runner substitute.
- Logical world is 1280×720 with Phaser FIT/CENTER_BOTH; the full board is available in portrait and landscape.
- Path Drawer has its own art direction and newly downloaded asset intake under `public/assets/path-drawer/selected/`.
- Nothing from the supplied reference repositories, their live demos, Forestbound Runner or any other local game is used as an asset source.
- `ASSET_PLAN.md`, `ASSET_RESEARCH.md`, `ASSETS.md`, `ASSET_AUDIT.md` and `CREDITS.md` document roles, dimensions, licenses and hashes.
- The build contains no remote art/audio dependency.

## Playgama

`index.html` loads Playgama Bridge v2 before the module. `src/game/sdk.js` is defensive: the game works with Bridge, with no Bridge, and with the ad features unavailable. Rewarded buttons are explicit (`REVIVE · WATCH AD` and `WATCH AD · DOUBLE +N`); interstitials are limited to two consecutive same-outcome runs and only appear on end screens.

## GitHub Pages

The relative Vite base and `.github/workflows/deploy.yml` publish `dist/` from `main`:

`https://kingdannydushime1.github.io/forestbound-runner/`

## New selected sources

- **Mixel — Free Top-Down RPG 32×32 Tile Set** for primary art: commercial game use permitted; credit appreciated.
- **unTied Games — Super Pixel Effects Mini Pack 1** for collision/victory effects: commercial use permitted with attribution.
- **Abstraction / Tallbeard Studios — Music Loop Bundle** for the puzzle loop: CC-0.
- **JDWasabi — 8-bit / 16-bit Sound Effects x25** for interaction SFX: commercial use permitted; credit requested.

See `CREDITS.md` for source URLs and local license copies.
