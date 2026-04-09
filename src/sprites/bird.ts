import { _, type SpriteFrame, type SpriteSheet } from "./types";

// ============================================================
// BIRD (24x24) — chibi parrot, blue head/back, yellow belly,
// orange hooked beak, green-teal tail accents, orange feet
// ============================================================
const bOL = "#1a2a3a"; // dark outline
const bHd = "#4aa8d8"; // head/back blue (mid)
const bHl = "#72c8e8"; // head highlight (light blue)
const bHs = "#2c6d96"; // head/wing shadow (dark blue)
const bBe = "#f4d84a"; // belly yellow (mid)
const bBl = "#fff0a0"; // belly highlight
const bBs = "#c89820"; // belly shadow
const bBk = "#ff9820"; // beak orange (mid)
const bBd = "#c46810"; // beak shadow
const bFt = "#ff9820"; // feet orange
const bFs = "#c46810"; // feet shadow
const bTl = "#38b878"; // tail green/teal
const bTs = "#1f7048"; // tail shadow
const bEy = "#1a1a1a"; // eye dark
const bEw = "#ffffff"; // eye highlight
const bSh = "#00000030"; // ground shadow (unused as alpha, fallback)

const WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, bOL, bOL, bOL, bOL, bOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, bOL, bOL, bHl, bHd, bHd, bHd, bHd, bOL, bOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bHl, bHl, bHd, bHd, bHd, bHd, bHd, bHd, bHs, bOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, bHl, bHd, bHd, bHd, bEw, bEy, bHd, bHd, bHd, bHs, bHs, bOL, _, _, _, _, _, _, _],
  [_, _, _, bOL, bHl, bHd, bHd, bHd, bHd, bEy, bEy, bHd, bHd, bHd, bHd, bHs, bHs, bOL, _, _, _, _, _, _],
  [_, _, bOL, bBk, bBk, bOL, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHs, bOL, _, _, _, _, _, _],
  [_, bOL, bBk, bBd, bBk, bOL, bHd, bHd, bHd, bHd, bHd, bHd, bHs, bHs, bHd, bHd, bHs, bOL, _, _, _, _, _, _],
  [_, _, bOL, bBk, bOL, bHd, bHd, bHd, bBe, bBe, bHd, bHs, bHs, bHs, bHs, bHd, bHs, bOL, _, _, _, _, _, _],
  [_, _, _, bOL, bOL, bHd, bHd, bBl, bBe, bBe, bBe, bHs, bHs, bTl, bHs, bHs, bOL, bTl, bTs, bOL, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBl, bBe, bBe, bBe, bBe, bHs, bTl, bTl, bHs, bOL, bTl, bTl, bTs, bOL, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBe, bBe, bBe, bBs, bTl, bTl, bTs, bOL, bTs, bTl, bTs, bOL, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBe, bBe, bBs, bBs, bTs, bTs, bOL, bOL, bOL, bTs, bOL, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBe, bBs, bBs, bBs, bOL, bOL, _, _, _, bOL, _, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBs, bBs, bBs, bOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bBe, bBe, bBs, bBs, bBs, bOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bOL, bOL, bOL, bOL, bOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, _, _, _, bOL, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, bFt, bFt, _, bFt, bFt, bOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, bOL, bFt, bFs, bFs, bOL, bFs, bFt, bFs, bOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, bOL, _, _, _, bOL, bOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, bOL, bOL, bOL, bOL, bOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, bOL, bOL, bHl, bHd, bHd, bHd, bHd, bOL, bOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bHl, bHl, bHd, bHd, bHd, bHd, bHd, bHd, bHs, bOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, bHl, bHd, bHd, bHd, bEw, bEy, bHd, bHd, bHd, bHs, bHs, bOL, _, _, _, _, _, _, _],
  [_, _, _, bOL, bHl, bHd, bHd, bHd, bHd, bEy, bEy, bHd, bHd, bHd, bHd, bHs, bHs, bOL, _, _, _, _, _, _],
  [_, _, bOL, bBk, bBk, bOL, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHs, bOL, _, _, _, _, _, _],
  [_, bOL, bBk, bBd, bBk, bOL, bHd, bHd, bHd, bHd, bHd, bHs, bHs, bHd, bHd, bHd, bHs, bOL, _, _, _, _, _, _],
  [_, _, bOL, bBk, bOL, bHd, bHd, bHd, bBe, bBe, bHs, bHs, bHs, bHs, bHd, bHd, bHs, bOL, _, _, _, _, _, _],
  [_, _, _, bOL, bOL, bHd, bHd, bBl, bBe, bBe, bBe, bHs, bHs, bTl, bHs, bHs, bOL, bTl, bTs, bOL, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBl, bBe, bBe, bBe, bBe, bHs, bTl, bTl, bHs, bOL, bTl, bTl, bTs, bOL, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBe, bBe, bBe, bBs, bTl, bTl, bTs, bOL, bTs, bTl, bTs, bOL, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBe, bBe, bBs, bBs, bTs, bTs, bOL, bOL, bOL, bTs, bOL, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBe, bBs, bBs, bBs, bOL, bOL, _, _, _, bOL, _, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBs, bBs, bBs, bOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bBe, bBe, bBs, bBs, bBs, bOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bOL, bOL, bOL, bOL, bOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, _, _, _, _, _, _, bOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, bOL, bFt, bFt, _, _, _, bFt, bFt, bFs, bOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, bOL, bFs, bFs, bOL, _, bOL, bFs, bFs, bOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, bOL, _, _, _, bOL, bOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, bOL, bOL, bOL, bOL, bOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, bOL, bOL, bHl, bHd, bHd, bHd, bHd, bOL, bOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bHl, bHl, bHd, bHd, bHd, bHd, bHd, bHd, bHs, bOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, bHl, bHd, bHd, bHd, bEy, bEy, bHd, bHd, bHd, bHs, bHs, bOL, _, _, _, _, _, _, _],
  [_, _, _, bOL, bHl, bHd, bHd, bHd, bHd, bEy, bEy, bHd, bHd, bHd, bHd, bHs, bHs, bOL, _, _, _, _, _, _],
  [_, _, bOL, bBk, bBk, bOL, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHs, bOL, _, _, _, _, _, _],
  [_, bOL, bBk, bBd, bBk, bOL, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHd, bHs, bOL, _, _, _, _, _, _],
  [_, _, bOL, bBk, bOL, bHd, bHd, bHd, bBe, bBe, bHd, bHd, bHs, bHs, bHd, bHd, bHs, bOL, _, _, _, _, _, _],
  [_, _, _, bOL, bOL, bHd, bHd, bBl, bBe, bBe, bBe, bHd, bHs, bHs, bHs, bHs, bOL, bTl, bTs, bOL, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBl, bBe, bBe, bBe, bBe, bHs, bHs, bTl, bHs, bOL, bTl, bTl, bTs, bOL, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBe, bBe, bBe, bBs, bTl, bTl, bTs, bOL, bTs, bTl, bTs, bOL, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBe, bBe, bBs, bBs, bTs, bTs, bOL, bOL, bOL, bTs, bOL, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBe, bBs, bBs, bBs, bOL, bOL, _, _, _, bOL, _, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bBe, bBe, bBs, bBs, bBs, bOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bBe, bBe, bBs, bBs, bBs, bOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bOL, bOL, bOL, bOL, bOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, _, _, _, bOL, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, bFt, bFt, _, bFt, bFt, bOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, bOL, bFt, bFs, bFs, _, bFs, bFt, bFs, bOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, bOL, bOL, _, bOL, bOL, bOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const BIRD_SHEET: SpriteSheet = { walk1: WALK1, walk2: WALK2, idle: IDLE };
