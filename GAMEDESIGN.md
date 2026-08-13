# Path Drawer — Game Design Lock

## Concept preserved

The player **draws a path for a character to reach the end of each level without touching obstacles**. Drawing and route planning are the core mechanic; they may not be replaced by a runner, tap-only movement or an automatic maze solver.

## Direction chosen for this game

**Top-down enchanted map puzzle.** Each level is a small forest-ruin clearing seen from above. A cartographer character starts at a camp rune; the player draws one continuous route to a glowing exit beacon. When released, the character follows the route in real time. The player wins by planning a safe, efficient line.

## Three-second understanding

The first screen shows:

- a clearly marked character at `START`;
- a clearly marked beacon at `EXIT`;
- visible obstacle silhouettes;
- one instruction: **DRAW FROM START TO EXIT**.

No tutorial screen is needed. The first level itself is the tutorial.

## Core loop

1. Inspect the obstacle layout and optional map-shard positions.
2. Press on or close to the character.
3. Drag one continuous route around the blockers toward the exit.
4. Release: the route locks and the character follows it.
5. The route is checked continuously against obstacle hit zones.
6. Collect map shards crossed by the character for score and relic currency.
7. Reach the exit for victory, or collide / end away from the exit for failure.
8. Earn a base reward, unlock the next level and immediately redraw for mastery.

## Rules that make it fun

- The line must begin within 80 logical pixels of the character and end within 96 pixels of the exit.
- A route shorter than 140 pixels is rejected as an accidental tap.
- The player can clear and redraw before release; after release, the route is committed.
- The character moves at a readable speed so the player can see exactly why a route succeeds or fails.
- The route has a dark under-stroke and bright core so it remains readable over every tile.
- A clean route with all shards is a **Perfect Map** and earns a visible bonus.

## Progression

Five hand-authored levels, each introducing one idea:

| Level | Name | New challenge | Target feeling |
|---:|---|---|---|
| 1 | Lantern Clearing | wide static stone blockers | immediate mastery |
| 2 | Rootbound Crossing | narrow S-shaped gaps | satisfying precision |
| 3 | Mirror Marsh | two safe corridors and decoy shard | meaningful choice |
| 4 | Clockwork Grove | moving sentinel hazard | timing and observation |
| 5 | Beacon Vault | mixed blockers, sentinel and full shard route | mastery test |

Each level must remain solvable by at least one route that is visible from the initial board. No random obstacle may create an impossible layout.

## Feedback / juice

- Drawing: route grows under the pointer with a soft marker sound.
- Valid release: route flashes once and the character starts moving.
- Shard: sound, small burst, floating `+SHARD` and counter update.
- Near obstacle: subtle amber pulse and `CLOSE` feedback, without changing the route.
- Collision: camera shake, red hit flash, character hit frame and animated failure card.
- Exit: beacon pulse, celebratory burst, success sound and animated victory card.
- Perfect Map: stronger burst, `PERFECT MAP` callout and bonus reward.

The drawn route is a gameplay visualization and may be rendered with Phaser line geometry. It is not a substitute for sourced final art.

## Economy and Playgama ads

- Victory base reward: 80 relics + 15 per collected shard + level bonus.
- Failure reward: 8 relics + 3 per collected shard.
- `REVIVE · WATCH AD` appears on game over only when rewarded ads are supported. A successful `rewarded` result returns the player to the last safe route point, once per attempt.
- `DOUBLE RELICS · WATCH AD` appears on victory only when supported. The bonus is granted only after `rewarded`; closing or failing keeps the base reward.
- Interstitials are shown only on an end screen after two consecutive victories or two consecutive failures.
- Ads never block drawing, retry or map navigation, and the game runs without Bridge.

## Responsive contract

- Logical world: 1280×720, landscape-first board with complete FIT scaling.
- Portrait shows the complete centered board without cropping; touch drawing remains available.
- No HUD, button, start marker or exit marker may overlap at 320×480, 375×667, 768×1024, 1366×768 and 2560×1440.
