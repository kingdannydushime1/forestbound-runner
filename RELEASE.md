# Release

## Build

- [ ] `npm install`
- [ ] `npm test`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run preview` manually checked

## GitHub Pages

The Vite config uses relative asset paths (`base: "./"`) so the `dist/` output can be served from the project Pages subpath. GitHub Actions publishes `dist/` from the `main` branch build.

Expected URL: `https://<owner>.github.io/forestbound-runner/`

## Delivery contents

- Source game under `src/`
- Local licensed assets under `public/assets/source/`
- Production output generated into `dist/`
- Credits, asset provenance and design documents
