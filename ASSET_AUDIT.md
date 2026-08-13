# Asset Integration Audit

Audit performed on 2026-08-13 against the local source files and Phaser 3.90.0 types.

## Complete images

| Phaser key | Source | Integration | Result |
|---|---|---|---|
| `forestBg` | `Background/Background.png` (480×272) | Complete image, displayed at 1280×720 | PASS |
| `treeBg` | `Trees/Background.png` (896×256) | Complete image, used as repeating parallax layer | PASS |
| `platforms` | `sprites/platforms.png` (64×64) | Complete 64×64 tile repeated by `TileSprite` | PASS |

The large `Green-Tree.png` and `Tiles.png` files are retained in the downloaded source pack for provenance, but are **not** loaded as complete images. They are packed atlases and would need an explicit crop map before being used as individual decor/terrain sprites.

## Spritesheets

| Phaser key | Source size | Phaser cell | Grid | Frames used | Result |
|---|---:|---:|---:|---|---|
| `knight` | 256×256 | 32×32 | 8×8 (64 cells) | 0–3 run, 16–17 jump | PASS; all used cells are non-empty |
| `slime` | 96×72 | 32×24 | 3×3 (9 cells) | 0–2 idle | PASS; all cells are non-empty |
| `coin` | 192×16 | 16×16 | 12×1 | 0–11 spin | PASS; all cells are non-empty |

The knight source contains empty padding cells 6–7 in the first row. The run animation was corrected to use cells 0–3 only, preventing blank-frame flicker.

## Automated checks

`npm test` now checks:

- PNG signature, RGBA format and non-interlaced encoding.
- Width/height divisibility by the Phaser frame size.
- Expected grid size.
- Non-empty alpha content for every frame actually used by the game.
- Existence and dimensions of the complete-image assets.

`npm run build` also confirms Vite copies every referenced asset into `dist/`.
