# Path Drawer — Asset Intake (approved)

## Provenance gate

The previous Forestbound packs were removed and are forbidden. No file from `studio/reference-games/`, the supplied GitHub/demo projects, Forestbound Runner or another local game is used. The selected files below were downloaded after gameplay and art direction were locked.

## Sources and licenses

| Source | Roles | License | Local archive / SHA-256 |
|---|---|---|---|
| Mixel — https://mixelslime.itch.io/free-top-down-rpg-32x32-tile-set | primary 32×32 top-down art, character, UI, font | commercial game use allowed; original files used unchanged; credit appreciated | `archives/mixel-top-down-rpg-32x32.zip` / `4c98726e6243c11c315632189213be61ecf6c19c40ed694f5afb31b0fc65d99a` |
| unTied Games — https://untiedgames.itch.io/super-pixel-effects-mini-pack-1 | collision/victory VFX | commercial use allowed with attribution; no standalone redistribution | `archives/untied-mini-effects.zip` / `ca9eff1900339fe48c256cb7dc7e4f91d5202cb6c338f8d0d26ea89f6ef99828` |
| Abstraction/Tallbeard — https://tallbeard.itch.io/music-loop-bundle | puzzle music | CC-0 | `archives/tallbeard-music-chiptune.zip` / `0ca90f1b2dfa675731009baa02124655bb6f7eefc144e244e8643da5280f1d8e` |
| JDWasabi — https://jdwasabi.itch.io/8-bit-16-bit-sound-effects-pack | interaction SFX | commercial and non-commercial games allowed; credit requested | individual files, source terms in `licenses/jdwasabi-LICENSE.txt` |

Original license/readme files are retained under `public/assets/path-drawer/licenses/`.

## Exact files used by code

| Key / local file | Native size | Integration | SHA-256 |
|---|---:|---|---|
| `ground` / `selected/art/ground-tiles.png` | 384×384 RGBA | 32×32 grid, 144 frames; TileSprite frame 0/1 | `7a0521c3ea1ff95902a03931d3055feca777047180b5a60ae687a9be163d17f5` |
| `rocks` / `selected/art/rocks.png` | 384×96 RGBA | 32×32 grid, 36 frames; frames 0–7 used | `6979ecd4f63048defc1a97b3d5cefb2e26c6bc04d0504c82808efd3e1afd03` |
| `roots` / `selected/art/roots-logs.png` | 384×96 RGBA | 32×32 grid, 36 frames; frames 0–5 used | `f1b12698c519763167d371c5470224a6a1730bfd5f891b3a91c42c87b8180aa5` |
| `ruins` / `selected/art/ruins.png` | 384×512 RGBA | 32×32 grid, 192 frames; frames 0–5 used | `ab72fa69886e678468ec51aa06daf13df8445a4a0f106155f462d0d363a5bdda` |
| `bushes` / `selected/art/bushes.png` | 384×320 RGBA | 32×32 grid, 120 frames; frames 0–2 used | `f809180c29217e42c2960ee24970a8c7fd1103db18b334fdb5fd4504039e2383` |
| `trees` / `selected/art/trees.png` | 384×320 RGBA | 32×32 grid, 120 frames; frames 0–2 used | `b864f91b108b684de41ec25eca7b27a6a1eb406c39266eb13bc771a3cf120e2b` |
| `details` / `selected/art/nature-details.png` | 384×128 RGBA | 32×32 grid, 48 frames; frames 0–1 used | `4dcd1c9dd496fefdbc798e4fd4bb019346f387a35ca3a188ac8e967eb34d7ea8` |
| `items` / `selected/art/items.png` | 384×64 RGBA | 32×32 grid, 24 frames; frames 0–3 used | `ec9df507f884ce570f37f7606a9287cbe4b99a5448847c3c81fe33b84c7bfdbb` |
| `playerIdle` / `selected/art/player-idle-front.png` | 288×33 RGBA | 32×33 grid, 9 frames; all used | `95486b6e4feb48dab572cb50b61e3cea398b500311eaac5a9a9ef88862d6aa67` |
| `playerWalk` / `selected/art/player-walk-front.png` | 128×33 RGBA | 32×33 grid, 4 frames; all used | `7bc7e0fe5c1c7159ce719ab60b584f78dac7e628f14a8a781078c05a4f53cc1b` |
| `playerShadow` / `selected/art/player-shadow.png` | 32×32 RGBA | complete image, scale 1.8 | `d051d294dbf74cf84087c3e046a370d455650f1c59d09a80f4bce2610f8a2688` |
| `uiPanels` / `selected/art/ui-panels-buttons.png` | 384×512 RGBA | 32×32 grid, 192 frames; frame 0 used as a badge | `5254cd29981c7cba32ce0c7418fa05c9397a8f3f27566e402c8b4dd7c4163ce3` |
| `vfxExplosion` / `selected/vfx/explosion.png` | 352×32 RGBA | 32×32 grid, 11 frames | `2765a3a0b3b1a365f2975ca73c89f1f11d50c7b70b42648727705404cd9ae0bf` |
| `vfxImpact` / `selected/vfx/impact-shock.png` | 980×50 RGBA | 140×50 grid, 7 frames | `dbd5540e423e15a9dc62c36df14cac36cc36980205b8b945e530205bbf441ed3` |
| `font` / `selected/font/adventurer.ttf` | TrueType | CSS/Phaser font; CC BY 3.0 terms in Mixel license | `bb1e19f67f3d3ae766eb4a4f917eb8ec7669adbebf289978a7ca3a67af25efdf` |

## Audio files used by code

| Key / file | Container / measured format | SHA-256 |
|---|---|---|
| `music` / `audio/puzzle-pieces.ogg` | Ogg Vorbis, stereo, 44.1 kHz | `118f04c06a472e976fe133324e16f09d4cf060527cfe9fefa6ab187195b54adc` |
| `drawSfx` / `audio/sfx/draw-select.wav` | RIFF WAVE | `877d5f31a2ca366fbf44e13deae6c578713ec8c2aa2f11bb935d59ee31003e24` |
| `lockSfx` / `audio/sfx/route-confirm.wav` | RIFF WAVE | `fefaa39d59c631347e62672a84e20dedde6841138fa8854db75db6919f950337` |
| `shardSfx` / `audio/sfx/shard-collect.wav` | RIFF WAVE | `d60ac0f8c5d1cdea95105e02f35a623053f8e46f56f6acecc387c4e803392e2c` |
| `hitSfx` / `audio/sfx/collision.wav` | RIFF WAVE | `b8691ae64b8774389647fb8dc491844d6c26dea6a10d135fb48d34613c68dc96` |
| `successSfx` / `audio/sfx/beacon-success.wav` | RIFF WAVE | `d89a2f3b3b2d9749b20b9201170d0eef49f08eaa068a419fa951bb7725a0e5da` |

All selected PNGs passed the automated RGBA, non-interlaced, grid and non-empty-frame checks in `tests/assets.test.mjs`.
