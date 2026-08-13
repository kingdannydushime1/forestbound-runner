# Path Drawer — Asset Plan / Source of Truth

**Gameplay and art bible are locked. The former Forestbound asset plan is void.** No asset from a reference project or an older local game is eligible.

## Selected source policy

- Primary art: Mixel Free Top-Down RPG 32×32, commercial use allowed, no source-file modifications, credit Mixel.
- VFX: unTied Games Super Pixel Effects Mini Pack 1, attribution required, commercial use allowed.
- Music: Tallbeard Studios / Abstraction Music Loop Bundle, CC-0.
- All selected source files must be measured after extraction. Dimensions below are acceptance targets only, never guessed source facts.

## Art and UI manifest

| ID | Role | Selected source / required measured facts | Draw target / hitbox | Status |
|---|---|---|---|---|
| `ground_tiles` | top-down grass/soil base | Mixel; tile grid, atlas dimensions, alpha and crop map | 32 px grid; no hitbox | SELECTED / MEASURE |
| `stone_blockers` | static level blockers | Mixel rocks/ruins; variants and native bounds | 48–112 px; inset zone | SELECTED / MEASURE |
| `root_blockers` | organic blockers | Mixel roots/logs/bushes; exact crops | 48–128 px; explicit zone | SELECTED / MEASURE |
| `sentinel` | moving level hazard | Mixel compatible prop/character frame; motion is gameplay tween, not altered art | 32–64 px; inset zone | SELECTED / MEASURE |
| `player_sheet` | cartographer | Mixel 4-direction idle/walk sheet; frame grid measured | 32–48 px tall; body zone | SELECTED / MEASURE |
| `player_success` | success state | Mixel player frame or documented compatible state | player size | SELECTED / MEASURE |
| `player_hit` | collision state | Mixel player frame or documented compatible state | player size | SELECTED / MEASURE |
| `exit_beacon` | destination | Mixel compatible rune/item/portal crop; exact atlas coordinates | 48–72 px; arrival radius | SELECTED / MEASURE |
| `map_shards` | collectibles | Mixel compatible item/ore/crystal crop; exact atlas coordinates | 16–24 px; pickup radius | SELECTED / MEASURE |
| `world_props` | visual density | Mixel plants, trees, flowers, mushrooms and ruins | documented draw size | SELECTED / MEASURE |
| `route_marker` | START/EXIT markers | Mixel UI/icon crop if present; otherwise a text label plus route effect, not borrowed art | 24–40 px | SELECTED / MEASURE |
| `ui_buttons` | clear, pause, retry, map and ad buttons | Mixel UI elements if present; normal/pressed crop map | layout fit | SELECTED / MEASURE |
| `ui_icons` | shard, beacon, pause, ad icons | Mixel UI/item crops; exact coordinates | 20–32 px | SELECTED / MEASURE |
| `vfx_sheet` | hit/success burst | unTied Mini Pack; sheet dimensions, frame metadata and used frames measured | 8–32 px | SELECTED / MEASURE |
| `font` | game text | Mixel font only if license allows; otherwise separately researched web-safe licensed font | 14–28 px | RESEARCH_REQUIRED |
| `favicon` | browser/portal icon | composed only from approved beacon/route art, with source record | 64/128/512 output | RESEARCH_REQUIRED |

## Audio manifest

| ID | Role | Selected source / measured facts | Status |
|---|---|---|---|
| `music_loop` | calm magical map loop | Tallbeard bundle; choose one seamless track after duration/format inspection | SELECTED / MEASURE |
| `sfx_draw` | route start | JDWasabi `draw-select.wav`; RIFF WAVE | SELECTED / MEASURED |
| `sfx_lock` | route validation | JDWasabi `route-confirm.wav`; RIFF WAVE | SELECTED / MEASURED |
| `sfx_shard` | collectible | JDWasabi `shard-collect.wav`; RIFF WAVE | SELECTED / MEASURED |
| `sfx_near` | warning | optional, separately researched | RESEARCH_REQUIRED |
| `sfx_hit` | collision | JDWasabi `collision.wav`; RIFF WAVE | SELECTED / MEASURED |
| `sfx_success` | beacon arrival | JDWasabi `beacon-success.wav`; RIFF WAVE | SELECTED / MEASURED |
| `sfx_ui` | buttons/pause | separately researched; no old audio | RESEARCH_REQUIRED |

## Blocking rules

1. A source row is not a file approval.
2. No code path is updated until the archive is extracted and the exact file is measured.
3. `VISUAL_PENDING` files remain blocked from production.
4. Old `public/assets/source/forest` and `public/assets/source/brackeys` files are forbidden and will be removed before final build.
