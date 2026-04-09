import { _, type SpriteFrame, type SpriteSheet } from "./types";

// ============================================================
// RABBIT (24x24) — chibi proportions, big round head, tall 3-wide
// pink-lined ears, small compact body, cottontail, front-facing
// ============================================================
const rOL = "#4a3838"; // outline (dark warm brown)
const rB  = "#ffffff"; // body white
const rSh = "#d8d8e0"; // shadow (cool light gray)
const rSd = "#b8b8c4"; // deeper shadow
const rEi = "#ffb8c8"; // ear inner pink
const rEd = "#e88aa0"; // ear inner pink darker
const rNo = "#e06a84"; // nose pink
const rEy = "#2a1a1a"; // eye dark
const rEw = "#ffffff"; // eye highlight

const WALK1: SpriteFrame = [
  // row 0 — ear tips
  [_, _, _, _, _, _, _, _, rOL, rOL, rOL, _, _, _, rOL, rOL, rOL, _, _, _, _, _, _, _],
  // row 1 — ears
  [_, _, _, _, _, _, _, _, rOL, rEi, rOL, _, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _],
  // row 2 — ears
  [_, _, _, _, _, _, _, _, rOL, rEi, rOL, _, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _],
  // row 3 — ears (pink deepens)
  [_, _, _, _, _, _, _, _, rOL, rEd, rOL, _, _, _, rOL, rEd, rOL, _, _, _, _, _, _, _],
  // row 4 — head top starts, ears merge
  [_, _, _, _, _, _, rOL, rOL, rOL, rEd, rOL, rOL, rOL, rOL, rOL, rEd, rOL, rOL, rOL, _, _, _, _, _],
  // row 5 — head curve
  [_, _, _, _, _, rOL, rB, rB, rB, rOL, rB, rB, rB, rB, rB, rOL, rB, rB, rB, rOL, _, _, _, _],
  // row 6 — head wide
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 7 — head
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 8 — eyes row (top)
  [_, _, _, _, rOL, rB, rB, rEy, rEy, rB, rB, rB, rB, rB, rEy, rEy, rB, rB, rB, rSh, rOL, _, _, _],
  // row 9 — eyes row (bottom with highlight)
  [_, _, _, _, rOL, rB, rB, rEy, rEw, rB, rB, rB, rB, rB, rEy, rEw, rB, rB, rB, rSh, rOL, _, _, _],
  // row 10 — cheeks / nose area
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rNo, rNo, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 11 — mouth
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 12 — head lower
  [_, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _, _],
  // row 13 — head bottom / neck
  [_, _, _, _, _, _, rOL, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rOL, rOL, _, _, _, _, _],
  // row 14 — body top (narrower than head)
  [_, _, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rOL, _, _, _, _, _, _, _],
  // row 15 — body
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _, _, _, _],
  // row 16 — body with cottontail bump on right
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rSh, rOL, rOL, rOL, _, _, _, _],
  // row 17 — body + cottontail
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, rB, rOL, _, _, _, _],
  // row 18 — body bottom
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, rOL, _, _, _, _, _],
  // row 19 — legs/feet outline top
  [_, _, _, _, _, _, rOL, rOL, rB, rB, rOL, rOL, rB, rB, rB, rB, rOL, _, _, _, _, _, _, _],
  // row 20 — feet (WALK1: left foot forward)
  [_, _, _, _, _, rOL, rB, rB, rB, rOL, _, _, rOL, rB, rB, rB, rOL, _, _, _, _, _, _, _],
  // row 21 — feet bottom
  [_, _, _, _, _, rOL, rOL, rOL, rOL, _, _, _, _, rOL, rOL, rOL, _, _, _, _, _, _, _, _],
  // row 22 — empty
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  // row 23 — empty
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const WALK2: SpriteFrame = [
  // row 0 — ear tips
  [_, _, _, _, _, _, _, _, rOL, rOL, rOL, _, _, _, rOL, rOL, rOL, _, _, _, _, _, _, _],
  // row 1 — ears
  [_, _, _, _, _, _, _, _, rOL, rEi, rOL, _, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _],
  // row 2 — ears
  [_, _, _, _, _, _, _, _, rOL, rEi, rOL, _, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _],
  // row 3 — ears (pink deepens)
  [_, _, _, _, _, _, _, _, rOL, rEd, rOL, _, _, _, rOL, rEd, rOL, _, _, _, _, _, _, _],
  // row 4 — head top starts, ears merge
  [_, _, _, _, _, _, rOL, rOL, rOL, rEd, rOL, rOL, rOL, rOL, rOL, rEd, rOL, rOL, rOL, _, _, _, _, _],
  // row 5 — head curve
  [_, _, _, _, _, rOL, rB, rB, rB, rOL, rB, rB, rB, rB, rB, rOL, rB, rB, rB, rOL, _, _, _, _],
  // row 6 — head wide
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 7 — head
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 8 — eyes row (top)
  [_, _, _, _, rOL, rB, rB, rEy, rEy, rB, rB, rB, rB, rB, rEy, rEy, rB, rB, rB, rSh, rOL, _, _, _],
  // row 9 — eyes row (bottom with highlight)
  [_, _, _, _, rOL, rB, rB, rEy, rEw, rB, rB, rB, rB, rB, rEy, rEw, rB, rB, rB, rSh, rOL, _, _, _],
  // row 10 — cheeks / nose area
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rNo, rNo, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 11 — mouth
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 12 — head lower
  [_, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _, _],
  // row 13 — head bottom / neck
  [_, _, _, _, _, _, rOL, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rOL, rOL, _, _, _, _, _],
  // row 14 — body top
  [_, _, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rOL, _, _, _, _, _, _, _],
  // row 15 — body
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _, _, _, _],
  // row 16 — body with cottontail bump on right
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rSh, rOL, rOL, rOL, _, _, _, _],
  // row 17 — body + cottontail
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, rB, rOL, _, _, _, _],
  // row 18 — body bottom
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, rOL, _, _, _, _, _],
  // row 19 — legs/feet outline top
  [_, _, _, _, _, _, rOL, rB, rB, rOL, rOL, rB, rB, rOL, rOL, rB, rB, rOL, _, _, _, _, _, _],
  // row 20 — feet (WALK2: right foot forward)
  [_, _, _, _, _, _, rOL, rB, rB, rB, rOL, _, _, rOL, rB, rB, rB, rOL, _, _, _, _, _, _],
  // row 21 — feet bottom
  [_, _, _, _, _, _, _, rOL, rOL, rOL, _, _, _, _, rOL, rOL, rOL, _, _, _, _, _, _, _],
  // row 22 — empty
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  // row 23 — empty
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const IDLE: SpriteFrame = [
  // row 0 — ear tips
  [_, _, _, _, _, _, _, _, rOL, rOL, rOL, _, _, _, rOL, rOL, rOL, _, _, _, _, _, _, _],
  // row 1 — ears
  [_, _, _, _, _, _, _, _, rOL, rEi, rOL, _, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _],
  // row 2 — ears
  [_, _, _, _, _, _, _, _, rOL, rEi, rOL, _, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _],
  // row 3 — ears (pink deepens)
  [_, _, _, _, _, _, _, _, rOL, rEd, rOL, _, _, _, rOL, rEd, rOL, _, _, _, _, _, _, _],
  // row 4 — head top starts, ears merge
  [_, _, _, _, _, _, rOL, rOL, rOL, rEd, rOL, rOL, rOL, rOL, rOL, rEd, rOL, rOL, rOL, _, _, _, _, _],
  // row 5 — head curve
  [_, _, _, _, _, rOL, rB, rB, rB, rOL, rB, rB, rB, rB, rB, rOL, rB, rB, rB, rOL, _, _, _, _],
  // row 6 — head wide
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 7 — head
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 8 — eyes row (top)
  [_, _, _, _, rOL, rB, rB, rEy, rEy, rB, rB, rB, rB, rB, rEy, rEy, rB, rB, rB, rSh, rOL, _, _, _],
  // row 9 — eyes row (bottom with highlight)
  [_, _, _, _, rOL, rB, rB, rEy, rEw, rB, rB, rB, rB, rB, rEy, rEw, rB, rB, rB, rSh, rOL, _, _, _],
  // row 10 — cheeks / nose area
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rNo, rNo, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 11 — mouth
  [_, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _],
  // row 12 — head lower
  [_, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _, _],
  // row 13 — head bottom / neck
  [_, _, _, _, _, _, rOL, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rOL, rOL, _, _, _, _, _],
  // row 14 — body top
  [_, _, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rOL, _, _, _, _, _, _, _],
  // row 15 — body
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, _, _, _, _, _, _],
  // row 16 — body with cottontail bump on right
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rSh, rOL, rOL, rOL, _, _, _, _],
  // row 17 — body + cottontail
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, rB, rOL, _, _, _, _],
  // row 18 — body bottom
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rSh, rOL, rOL, _, _, _, _, _],
  // row 19 — legs/feet tucked
  [_, _, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rOL, _, _, _, _, _, _],
  // row 20 — feet tucked under (IDLE: feet flat together)
  [_, _, _, _, _, rOL, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rB, rOL, _, _, _, _, _, _],
  // row 21 — feet bottom
  [_, _, _, _, _, rOL, rOL, rOL, rOL, rOL, rOL, rOL, rOL, rOL, rOL, rOL, rOL, rOL, _, _, _, _, _, _],
  // row 22 — empty
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  // row 23 — empty
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const RABBIT_SHEET: SpriteSheet = { walk1: WALK1, walk2: WALK2, idle: IDLE };
