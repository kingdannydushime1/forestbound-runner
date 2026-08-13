# Forestbound Runner — Game Design Document

## Hook

**Run the living forest. Master a different objective every time.** Forestbound Runner is a one-button fantasy runner where the player jumps over threats, collects relics and completes varied objectives before the route reaches its next shrine.

The core concept remains a runner with obstacles; objectives add meaningful variety without replacing the runner loop.

## Core loop

1. Choose the next forest chapter.
2. Auto-run to the right while the forest scrolls.
3. Jump over obstacles and collect gold relics.
4. Read the objective card and adapt the run: distance, relics, clean dodges or perfect jumps.
5. Reach the objective target, bank the reward and unlock the next chapter.
6. Retry immediately with a new objective if the run ends early.

## Controls

- **Space / Up arrow / W / click / tap:** jump.
- A second input while airborne performs a short air-hop once per jump.
- **P / Escape:** pause.
- Buttons are keyboard accessible through pointer and the keyboard equivalents.

## Run rules

- Logical viewport: 1280 × 720, Phaser FIT + CENTER_BOTH.
- Player anchor: x=270, ground baseline y=570.
- Run speed: 320 px/s at chapter 1, +28 px/s per chapter, capped at 516 px/s.
- Obstacle spacing: 480–720 ms, tightened by 20 ms per chapter.
- Jump velocity: -780 px/s; gravity: 2050 px/s².
- One run lasts until its objective is complete or the player collides with an obstacle.
- Victory target is intentionally short (850–1450 m) so a successful run takes 45–75 seconds.

## Objectives

Each run receives one objective from a weighted rotation:

| ID | Objective | Target | Progress |
|---|---|---:|---|
| trailblazer | Reach the shrine | 850 + chapter×120 m | Distance traveled |
| relic-run | Gather the relics | 12 + chapter×2 | Coins collected |
| clean-path | Keep the path clean | 9 + chapter×2 | Obstacles dodged |
| skybound | Chain perfect jumps | 6 + chapter | Perfect jumps (jump after landing in a 90 px timing window) |

No objective can require spending coins or watching an ad. Every objective is playable offline.

## Scoring and rewards

- Distance: 1 score per meter.
- Relic: +50 score and 1 coin.
- Perfect jump: +125 score, +1 combo level.
- Dodge: +25 score.
- Combo multiplier: 1.0× + 0.25× per consecutive perfect jump, capped at 3.0×; a collision resets it.
- Victory: 100 + chapter×40 coins, plus 50 bonus coins for completing the objective without a collision.
- Defeat: 10 + floor(distance/100) coins, so every run makes progress.
- High score and unlocked chapter persist locally.

## Chapters

1. **Verdant Canopy:** warm green forest, slimes and roots, speed 320.
2. **Amber Ruins:** gold/red foliage, faster slimes, speed 348.
3. **Moonlit Hollow:** deep blue night treatment, denser obstacles, speed 376.
4. **Ember Grove:** red foliage, mixed obstacle waves, speed 404.
5. **Crown of Leaves:** all patterns, speed 432.

The first release exposes five chapters; the data model supports additional chapters without scene changes.

## State machine

`Boot → Loading → Menu → Gameplay → Pause → Gameplay → Victory/GameOver → Menu or Gameplay`

- Menu → Gameplay: Start Run.
- Gameplay → Pause: pause button, P or Escape, platform pause.
- Pause → Gameplay: Resume.
- Gameplay → Victory: objective target reached.
- Gameplay → GameOver: obstacle collision.
- Victory/GameOver → Gameplay: Run Again.
- Victory/GameOver → Menu: Forest Map.

## Feedback goals

- Every jump: player squash/stretch tween + jump SFX.
- Every relic: burst particles, score popup, coin SFX.
- Every dodge: small combo pulse and progress tick.
- Near miss: amber flash and “CLOSE!” callout when the player passes within 28 px of an obstacle.
- Objective completion: shrine flash, confetti burst, victory music state and animated card.
- Defeat: camera shake, red vignette and animated retry card.

## Accessibility

- High-contrast objective card and progress bar.
- Color never carries objective meaning alone; every objective has a label and icon word.
- Reduced-motion setting is respected through `prefers-reduced-motion` for HTML shell transitions.
- Mute is persistent and always visible during a run.
