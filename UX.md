# Path Drawer — UX Contract

## Menu

- Title: PATH DRAWER.
- Promise: “Draw the route. Dodge the dangers. Reach the beacon.”
- Primary action: DRAW A PATH.
- Secondary action: SOUND ON/OFF.
- Current level, best score and relic count are visible.
- Background uses only the new approved top-down art pack.

## Gameplay

- Top-left: level name and subtitle.
- Top-center: one-line instruction/status and route progress.
- Top-right: relic count, CLEAR and PAUSE.
- Board: START marker, player, visible obstacle silhouettes, exit beacon, shards.
- Pointer/touch begins only near the player; HUD controls never start a route.
- Before release: CLEAR redraws. After release: route is locked and controls are paused except PAUSE.

## Pause

- Dark overlay preserves the board context.
- RESUME is the primary action and responds to P/Escape.
- REDRAW restarts the current level; FOREST MAP returns to menu.
- Platform pause opens the same overlay and resumes only when the platform resumes.

## End states

- Victory: beacon reached, shard count, path length, reward, DRAW AGAIN, FOREST MAP, optional DOUBLE RELICS rewarded button.
- Failure: cause, shard count, reward, DRAW AGAIN, FOREST MAP, optional REVIVE rewarded button.
- Retry is always available without watching an ad.

## Responsive rules

All positions come from the logical 1280×720 layout and Phaser FIT/CENTER_BOTH. The full board and controls remain visible at phone portrait, tablet portrait, desktop landscape and ultrawide sizes. No text-only shop or ad surface is used; ad buttons state both the ad action and the reward.
