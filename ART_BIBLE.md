# Path Drawer — Art Bible

## Hard provenance rule

This art bible starts a new visual identity. No image, sprite, audio file, font or archive from `studio/reference-games/`, the supplied reference demos, Forestbound Runner, or any other local game may be used. Those projects are technical references only.

## Named direction

**Enchanted Cartographer — top-down 32×32 pixel-art storybook.** The board should look like a hand-painted adventure map made from compact, readable pixel tiles: moss-green ground, blue-violet shadow, warm parchment markers and cyan magical beacons. The camera is top-down and stationary so the player can plan a route.

## Palette

- Map ink: `#17152b` — deepest shadow, route under-stroke and UI text shadow.
- Night violet: `#2b2752` — panels and ruins.
- Moss: `#54734b` — safe ground accents.
- Meadow: `#8ca65b` — readable grass/foliage.
- Parchment: `#f4e6b5` — labels and route core.
- Beacon cyan: `#75e5d2` — exit and success only.
- Relic amber: `#eab866` — shards and reward.
- Failure crimson: `#d85d72` — collision and defeat only.

## Scale and silhouettes

- Base grid target: 32×32 pixels for environment and props.
- Character target: 32–48 logical pixels tall, with a strong single-color silhouette and a readable facing direction.
- Obstacle target: 48–96 logical pixels wide, opaque center and a documented hitbox inset.
- Collectible target: 16–24 logical pixels, high contrast against ground.
- Beacon target: 48–72 logical pixels with a distinctive cyan silhouette.
- UI icons: 24–32 logical pixels, same pixel density as the chosen UI source.

These are acceptance targets, not guessed source dimensions. Every downloaded file is measured before integration.

## Composition

- Use a tiled top-down ground, not a stretched platformer background.
- Keep a calm empty route-reading margin around the board while filling the rest with coherent props.
- Static props frame the play area; gameplay blockers are visually distinct from decoration.
- The route under-stroke is always darker than the ground, and the route core is always lighter than the ground.

## Source mixing rule

A primary top-down environment/entity pack must define the pixel density, outline treatment and palette. A separate audio or VFX source is acceptable only when its license is clear and it is normalized to this direction. Assets with a different camera, perspective, pixel density or outline language are rejected; arbitrary tinting or scaling cannot hide a mismatch.

## Required states

- Character: idle, walking/following, success, collision.
- Beacon: idle glow and reached/success state.
- Obstacles: idle/static plus moving-sentinel state if the chosen pack supplies it.
- Shards: idle sparkle and collected burst.
- UI: start marker, exit label, draw/clear/pause controls, victory, failure and ad affordances.

## Forbidden

No reference-game assets, no Forestbound assets, no photos, no AI-generated art, no procedural illustration replacing an asset, no stretched sprite sheets, no unverified atlas crops, no mixed perspective and no assets marked `VISUAL_PENDING` in the production build.
