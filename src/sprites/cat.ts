import { _, type SpriteFrame, type SpriteSheet } from "./types";

// ============================================================
// CAT (24x24) — chibi gray cat, 3/4 view sitting, white chest
// ============================================================
const cOL = "#2a2e38"; // dark outline
const cB  = "#9098a4"; // body base gray
const cSh = "#6a7280"; // body shadow
const cHi = "#b4bcc8"; // body highlight
const cWh = "#f6f2ea"; // white chest/muzzle
const cWs = "#d8d4cc"; // white shadow
const cEy = "#1a1d24"; // eye dark
const cEw = "#ffffff"; // eye white highlight
const cNo = "#e89aa8"; // nose pink
const cEi = "#e89aa8"; // ear inner pink
const cSd = "#1a1d24"; // ground shadow

// 3/4 view sitting cat facing slightly right.
// Big round head top, small body below, curled tail on right.
const WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, cOL, cOL, _, _, _, _, _, _, _, cOL, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, cOL, cB, cB, cOL, _, _, _, _, _, cOL, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cEi, cB, cB, cOL, _, _, _, cOL, cB, cEi, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cEi, cB, cB, cOL, cOL, cOL, cOL, cB, cB, cEi, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cB, cB, cHi, cB, cB, cB, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cEw, cEy, cB, cB, cB, cB, cEw, cEy, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cEy, cEy, cB, cB, cB, cB, cEy, cEy, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cB, cWh, cWh, cNo, cNo, cWh, cWh, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cOL, _, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cOL, _, _, _, cOL, cOL, _, _],
  [_, _, _, cOL, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cOL, _, _, cOL, cB, cB, cOL, _],
  [_, _, _, cOL, cB, cWh, cWh, cWh, cWh, cWs, cWs, cWh, cWh, cWh, cWh, cB, cOL, _, cOL, cB, cSh, cB, cOL, _],
  [_, _, _, cOL, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cOL, cB, cSh, cB, cOL, _, _],
  [_, _, _, cOL, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cB, cB, cOL, _, _, _],
  [_, _, _, _, cOL, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cSh, cB, cB, cB, cOL, _, _, _, _],
  [_, _, _, _, cOL, cB, cSh, cB, cWh, cWh, cWh, cWh, cB, cB, cSh, cB, cB, cB, cOL, _, _, _, _, _],
  [_, _, _, _, cOL, cB, cB, cB, cB, cWs, cWs, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cB, cOL, cOL, cB, cB, cB, cB, cOL, cOL, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, _, cOL, cOL, cOL, _, _, cOL, cOL, cOL, cOL, _, _, cOL, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, cSd, cSd, cSd, cSd, _, _, _, _, _, _, _, _, _, _, _, _],
];

const WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, cOL, cOL, _, _, _, _, _, _, _, cOL, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, cOL, cB, cB, cOL, _, _, _, _, _, cOL, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cEi, cB, cB, cOL, _, _, _, cOL, cB, cEi, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cEi, cB, cB, cOL, cOL, cOL, cOL, cB, cB, cEi, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cB, cB, cHi, cB, cB, cB, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cEw, cEy, cB, cB, cB, cB, cEw, cEy, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cEy, cEy, cB, cB, cB, cB, cEy, cEy, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cB, cWh, cWh, cNo, cNo, cWh, cWh, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cOL, _, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cOL, _, cOL, cOL, _, _, _, _],
  [_, _, _, cOL, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cOL, cOL, cB, cB, cOL, _, _, _],
  [_, _, _, cOL, cB, cWh, cWh, cWh, cWh, cWs, cWs, cWh, cWh, cWh, cWh, cB, cOL, cB, cSh, cB, cB, cOL, _, _],
  [_, _, _, cOL, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cSh, cB, cOL, _, _, _],
  [_, _, _, cOL, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, _, _, _, cOL, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cB, cOL, _, _, _, _, _],
  [_, _, _, _, cOL, cB, cB, cB, cWh, cWh, cWh, cWh, cB, cSh, cB, cB, cSh, cB, cOL, _, _, _, _, _],
  [_, _, _, _, cOL, cB, cSh, cB, cB, cWs, cWs, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cB, cB, cOL, cOL, cB, cB, cOL, cOL, cB, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, _, cOL, cOL, cOL, cOL, _, _, cOL, cOL, _, _, cOL, cOL, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, cSd, cSd, cSd, cSd, _, _, _, _, _, _, _, _, _, _, _, _],
];

const IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, cOL, cOL, _, _, _, _, _, _, _, cOL, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, cOL, cB, cB, cOL, _, _, _, _, _, cOL, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cEi, cB, cB, cOL, _, _, _, cOL, cB, cEi, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cEi, cB, cB, cOL, cOL, cOL, cOL, cB, cB, cEi, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cB, cB, cHi, cB, cB, cB, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cEw, cEy, cB, cB, cB, cB, cEw, cEy, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cEy, cEy, cB, cB, cB, cB, cEy, cEy, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cB, cWh, cWh, cNo, cNo, cWh, cWh, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, cOL, cB, cB, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cOL, _, _, _, _, _],
  [_, _, cOL, cB, cB, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cOL, _, _, cOL, cOL, cOL, _, _],
  [_, _, _, cOL, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cOL, _, cOL, cB, cB, cB, cOL, _],
  [_, _, _, cOL, cB, cWh, cWh, cWh, cWh, cWs, cWs, cWh, cWh, cWh, cWh, cB, cOL, _, cOL, cB, cSh, cB, cOL, _],
  [_, _, _, cOL, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cOL, cB, cSh, cB, cOL, _, _],
  [_, _, _, cOL, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cB, cB, cOL, _, _, _],
  [_, _, _, _, cOL, cB, cB, cWh, cWh, cWh, cWh, cWh, cWh, cB, cB, cSh, cB, cB, cB, cOL, _, _, _, _],
  [_, _, _, _, cOL, cB, cB, cB, cWh, cWh, cWh, cWh, cB, cB, cB, cB, cSh, cB, cOL, _, _, _, _, _],
  [_, _, _, _, cOL, cB, cB, cB, cB, cWs, cWs, cB, cB, cB, cB, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cB, cB, cOL, cOL, cB, cB, cOL, cOL, cB, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, _, cOL, cOL, cOL, _, _, _, cOL, cOL, _, _, _, cOL, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, cSd, cSd, cSd, cSd, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const CAT_SHEET: SpriteSheet = { walk1: WALK1, walk2: WALK2, idle: IDLE };
