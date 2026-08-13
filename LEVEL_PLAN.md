# Path Drawer — Level Plan

Levels are fixed, hand-authored top-down boards. The board is designed first, then the asset plan supplies the correct visuals for each role.

| Level | Layout | Blockers | Extra rule | Shards |
|---:|---|---|---|---:|
| 1 — Lantern Clearing | wide three-gap board | stone blocks | learn start → exit | 3 |
| 2 — Rootbound Crossing | S-shaped corridor | roots + stones | line must make two deliberate turns | 4 |
| 3 — Mirror Marsh | split route | mirrored ruins | one safe route, one tempting dead end | 5 |
| 4 — Clockwork Grove | crossing lanes | blockers + moving sentinel | time the release around sentinel | 5 |
| 5 — Beacon Vault | compact mastery board | mixed blockers + sentinel | collect every shard for Perfect Map | 6 |

## Geometry contract

- Board: logical 1280×720.
- Start and exit are always at least 140 px apart.
- Every level has one verified safe polyline with a minimum 24 px clearance from blocker zones.
- Visual decoration never becomes collision unless it has an explicit zone in level data.
- Decorative props are placed after the gameplay route and never obscure the line of sight.

## Acceptance tests per level

- Valid direct route can be drawn from the start marker.
- At least one alternate valid route exists where the design promises choice.
- A route that intersects every blocker fails deterministically.
- Shard pickup positions never overlap blocker hitboxes.
- Exit radius is reachable and never hidden behind decoration.
