# Forestbound Runner

A polished objective-driven fantasy runner built with Phaser 3.

> **Run the living forest. Master a different objective every time.**

## Play

The game is designed for keyboard and touch:

- `Space`, `W`, `Up Arrow`, click or tap: jump
- A second input in the air: air-hop
- `P` or `Escape`: pause

Every run rotates one of four objectives: reach the shrine, gather relics, keep the path clean, or chain perfect jumps. The runner loop stays constant while the goal changes how you play.

## Development

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
npm run preview
```

## Art and audio

The game uses local, non-procedural assets downloaded from itch.io:

- Anokolisa — [Legacy Fantasy / High Forest](https://anokolisa.itch.io/sidescroller-pixelart-sprites-asset-pack-forest-16x16), free for commercial use according to the source page.
- Brackeys — [Brackeys' Platformer Bundle](https://brackeysgames.itch.io/brackeys-platformer-bundle), released under CC0.

See [`CREDITS.md`](./CREDITS.md), [`ASSETS.md`](./ASSETS.md) and [`ART_BIBLE.md`](./ART_BIBLE.md) for provenance and the visual rules. No procedural or AI-generated illustration is used.

## GitHub Pages

The Vite build uses relative paths and is published automatically from `main` through GitHub Actions. The expected URL is:

`https://<owner>.github.io/forestbound-runner/`
