import { _, type SpriteFrame, type SpriteSheet } from "./types";

// ============================================================
// TURTLE (24x24) — chibi side-profile, domed shell with hex scutes
// Facing LEFT. Shell confined to rows 5-14. Prominent head at left.
// ============================================================
const tOL = "#243318"; // outline (dark green-black)
const tSh = "#5a8a3a"; // shell base green
const tSH = "#82b04c"; // shell highlight
const tSD = "#3d6522"; // shell dark (scute pattern)
const tSM = "#47731f"; // shell mid shadow
const tBd = "#8cc460"; // body/head green (lighter)
const tBs = "#5c9a3c"; // body shadow
const tEy = "#1a1a1a"; // eye dark
const tEw = "#ffffff"; // eye highlight
const tSa = "#00000030"; // ground shadow

const WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, tOL, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, tOL, tSH, tSH, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, tOL, tSH, tSH, tSh, tSh, tSh, tSD, tSh, tSh, tSD, tSh, tSh, tOL, _, _, _, _, _],
  [_, _, _, _, _, tOL, tSH, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tOL, _, _, _, _],
  [_, _, _, _, tOL, tSH, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSh, tSM, tSM, tOL, _, _, _],
  [_, _, _, _, tOL, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSM, tSM, tOL, _, _, _],
  [_, _, _, _, tOL, tSh, tSD, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSM, tSM, tOL, _, _, _],
  [_, tOL, tOL, tOL, tOL, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSM, tSM, tOL, tOL, tOL, _],
  [tOL, tBd, tBd, tBd, tOL, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSM, tSM, tOL, _, _, _],
  [tOL, tBd, tBd, tBd, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _],
  [tOL, tEw, tEy, tBd, tOL, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, tOL, tOL, tOL, _, _, _, tBd, tBd, _, _, tOL, tOL, _, _, tBd, tBd, _, tOL, tOL, _, _, _, _],
  [_, _, _, _, _, _, _, tOL, tOL, _, _, _, _, _, _, tOL, tOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, tOL, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, tOL, tSH, tSH, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, tOL, tSH, tSH, tSh, tSh, tSh, tSD, tSh, tSh, tSD, tSh, tSh, tOL, _, _, _, _, _],
  [_, _, _, _, _, tOL, tSH, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tOL, _, _, _, _],
  [_, _, _, _, tOL, tSH, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSh, tSM, tSM, tOL, _, _, _],
  [_, _, _, _, tOL, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSM, tSM, tOL, _, _, _],
  [_, _, _, _, tOL, tSh, tSD, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSM, tSM, tOL, _, _, _],
  [_, tOL, tOL, tOL, tOL, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSM, tSM, tOL, tOL, tOL, _],
  [tOL, tBd, tBd, tBd, tOL, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSM, tSM, tOL, _, _, _],
  [tOL, tBd, tBd, tBd, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _],
  [tOL, tEw, tEy, tBd, tOL, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, tOL, tOL, tOL, _, _, _, tOL, tOL, _, _, tBd, tBd, _, _, tOL, tOL, _, tBd, tBd, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, tOL, tOL, _, _, _, _, _, tOL, tOL, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, tOL, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, tOL, tSH, tSH, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, tOL, tSH, tSH, tSh, tSh, tSh, tSD, tSh, tSh, tSD, tSh, tSh, tOL, _, _, _, _, _],
  [_, _, _, _, _, tOL, tSH, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tOL, _, _, _, _],
  [_, _, _, _, tOL, tSH, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSh, tSM, tSM, tOL, _, _, _],
  [_, _, _, _, tOL, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSM, tSM, tOL, _, _, _],
  [_, _, _, _, tOL, tSh, tSD, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSh, tSh, tSh, tSD, tSM, tSM, tOL, _, _, _],
  [_, tOL, tOL, tOL, tOL, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSM, tSM, tOL, tOL, tOL, _],
  [tOL, tBd, tBd, tBd, tOL, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSh, tSM, tSM, tOL, _, _, _],
  [tOL, tBd, tBd, tBd, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _],
  [tOL, tEy, tEy, tBd, tOL, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, tOL, tOL, tOL, _, _, _, tOL, tOL, _, _, tOL, tOL, _, _, tOL, tOL, _, tOL, tOL, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, tSa, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const TURTLE_SHEET: SpriteSheet = { walk1: WALK1, walk2: WALK2, idle: IDLE };
