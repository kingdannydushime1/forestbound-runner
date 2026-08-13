# Assets — provenance and verification

All files below are stored locally under `public/assets/source/` and were downloaded from their itch.io source pages on 2026-08-13. The archive files are retained to preserve provenance.

| Local source | Source page | License / permission | Used by game |
|---|---|---|---|
| `forest/Legacy-Fantasy - High Forest 2.3/` | https://anokolisa.itch.io/sidescroller-pixelart-sprites-asset-pack-forest-16x16 | Page states free for commercial use and editions; credit included | Background, trees, tiles |
| `brackeys/brackeys_platformer_assets/` | https://brackeysgames.itch.io/brackeys-platformer-bundle | Creative Commons Zero (CC0); attribution not required | Knight, slimes, coins, audio, font |

Mechanical verification:

- PNG files are local, readable RGBA assets from the downloaded archives.
- `Background.png`, `Trees/Background.png` and `platforms.png` are used as complete images; `platforms.png` is a single 64×64 tile with transparent padding.
- `knight.png` is loaded as an 8×8 grid of 32×32 cells; the run animation uses only verified non-empty cells 0–3, and jump uses verified cells 16–17.
- `slime_green.png` is loaded as a 3×3 grid of 32×24 cells; animation cells 0–2 are all non-empty.
- `coin.png` is loaded as a 12×1 grid of 16×16 cells; every animation cell is non-empty.
- The large `Green-Tree.png` and `Tiles.png` atlases are retained for provenance but are not rendered as whole images, avoiding accidental atlas misplacement.
- The game only references files that exist under `public/assets/source/`.
- No procedural or AI-generated illustration is used.
- `public/assets/source/forest.zip` and `public/assets/source/brackeys.zip` are the original downloaded archives.
