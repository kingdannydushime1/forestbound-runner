# Forestbound Runner — Art Bible

## Direction

**Handcrafted 16-bit fantasy pixel art**, anchored by Anokolisa's Legacy Fantasy / High Forest pack from itch.io and supported by Brackeys' CC0 platformer pack. The visual promise is a premium adventure-game slice: rich parallax forest layers, warm gold highlights, expressive knight silhouette and readable threats.

## Palette

- Night ink: `#101827` — UI panels and deepest shadows.
- Forest teal: `#193b43` — distant foliage.
- Leaf green: `#4f8b58` — gameplay midground.
- Moss light: `#9bc268` — readable terrain accents.
- Relic gold: `#e1b85a` — objective, coins and reward feedback.
- Moon cream: `#fff6cf` — primary type and contrast.
- Danger coral: `#d8665d` — collision and defeat only.

## Composition

- Logical scene 1280×720 with nearest-neighbor filtering.
- Background is the actual 480×272 forest plate scaled to fill, with the actual tree background layer repeated behind the playfield.
- The runner stays near x=270; camera movement is communicated by layered motion and passing sprites, not by a disorienting camera.
- Gameplay assets use large nearest-neighbor pixels and 3 px minimum silhouette contrast.

## Silhouette rules

- Player: knight, warm light armor, occupies 44×64 px.
- Threats: green slime (soft, low), stump/root tile (wide, grounded), bee (high, airborne when added).
- Collectibles: gold coin sprite, always offset from obstacle silhouettes.
- UI: no gradients behind gameplay art; panels use a dark translucent tint and gold edge.

## Chapter treatments

| Chapter | Background treatment | Gameplay accent |
|---|---|---|
| Verdant Canopy | Green daytime forest | Moss green |
| Amber Ruins | Warm overlay on forest plate | Amber gold |
| Moonlit Hollow | Indigo tint and cool tree layer | Moon cream |
| Ember Grove | Red foliage layer | Coral |
| Crown of Leaves | Bright gold dawn | Gold |

## Forbidden

No procedural illustration, generated placeholder art, photo assets, mixed art styles, blurry upscaling or UI that replaces actual game art with emoji/shapes.
