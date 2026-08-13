# Forestbound Runner — UX Spec

## Global layout

All scene positions derive from the 1280×720 logical layout. Phaser scales with FIT and CENTER_BOTH. The safe area is 40 px on every side; the HUD uses a single top row and the objective card sits below it without collision with the playfield.

## Menu

- Hero title: FORESTBOUND RUNNER.
- One-line promise: “A new path. A new objective.”
- Primary action: START RUN.
- Secondary action: SOUND ON/OFF.
- Chapter badge: current unlocked chapter and best score.
- Background: actual forest plate and tree layer with slow parallax.

## Gameplay

- Top-left: chapter and distance.
- Top-center: objective label and progress bar.
- Top-right: coins and pause button.
- Center-left: player and upcoming route.
- Bottom center: faint “SPACE / TAP TO JUMP” hint during first run only.
- All buttons have visible pressed tint and a small tap SFX.

## Pause

- Darkened playfield remains visible.
- Center card: PAUSED, RESUME, RESTART RUN, FOREST MAP.
- Resume is the primary action and responds to P / Escape.

## End states

- Victory: gold card, completed objective, coins earned, RUN AGAIN primary.
- Game over: coral card, cause, distance, coins earned, RUN AGAIN primary, no blocking ad.
- Every end screen has a visible FOREST MAP action.

## Accessibility

Text is 18 px minimum for body copy and 28 px for primary buttons at logical resolution. Gold and cream text sits on dark panels. Objective progress is written numerically in addition to the bar. Keyboard focus is not trapped inside canvas; equivalent keyboard shortcuts are documented in the menu.
