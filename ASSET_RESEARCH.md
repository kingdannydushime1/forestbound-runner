# Path Drawer — Asset Research Decision

Research completed after the gameplay and art bible were locked. The reference repositories were not used as asset sources.

## Candidate combinations compared

| Candidate | Strengths | Blockers / rejection |
|---|---|---|
| **Cainos Pixel Art Top Down - Basic** + separate audio | 32×32 top-down props, grass, trees, tiles; commercial use stated; coherent primary pack | Character/controller coverage and exact visual roles required further archive inspection; not selected for this pass |
| **Mixel Free Top-Down RPG 32×32** + CC0 music + small VFX pack | 32×32 top-down environment, ruins, rocks, plants, trees, 4-direction character idle/walk, UI elements; free commercial use stated; coherent coverage | License forbids modifying source files, so files are used unchanged and only placement/scale is controlled |
| **Kenmi Cute Fantasy RPG 16×16** + separate effects/audio | Free version includes terrain, character and animated enemies; strong coverage | Free version is non-commercial; commercial use requires the premium license, so it is rejected for this ad-supported release |
| **Cursed Land** + separate character/effects/audio | Strong dark-fantasy rocks, roots and 16×16 tiles | No clear commercial license statement on the source page; rejected until explicit license is available |
| **GandalfHardcore Wizard** + separate environment | Commercial/non-commercial use explicitly allowed; 48×48 four-direction character | Character density and style would require an additional environment pack; not selected because Mixel covers both roles |

## Selected sources

### Primary art: Mixel

- Page: https://mixelslime.itch.io/free-top-down-rpg-32x32-tile-set
- Archive: `Top-Down RPG 32x32 by Mixel v1.7.zip`
- Role: ground, ruins, rocks, roots/logs, plants, trees, character, UI and compatible items.
- Page states commercial use is allowed; modifications are not allowed. The production keeps selected PNGs unchanged and documents placement metadata separately.
- Required credit: Mixel, with source URL.

### VFX support: unTied Games

- Page: https://untiedgames.itch.io/super-pixel-effects-mini-pack-1
- Archive: `Super Pixel Effects Mini Pack 1.zip`
- Role: collision/success burst only.
- Page states attribution is required, reselling is forbidden, and commercial/non-commercial use is allowed.
- Required credit: unTied Games, with source URL.

### Music: Tallbeard Studios / Abstraction

- Page: https://tallbeard.itch.io/music-loop-bundle
- Archive: `music-loop-bundle-2026-q2.zip`
- Role: one calm loop selected by measured duration and mechanical loop suitability.
- License: CC-0; page allows commercial use and modification. Credit is appreciated and will be included.
- Required credit: Abstraction / Tallbeard Studios, with source URL.

## Exclusions

- Nothing from `studio/reference-games/`.
- Nothing from the supplied GitHub repositories or live demos.
- Nothing from the previous Forestbound Runner asset folders.
- No downloaded source is approved until its archive license file, native dimensions, alpha and frame layout are measured locally.

## Intake status

The selected archives are now the only candidates permitted for download. After extraction, every file used by code must receive `APPROVED` status in `ASSETS.md`; unused source files remain outside the production manifest or are removed before release.
