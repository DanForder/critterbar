import { _, type SpriteFrame, type SpriteSheet } from "./types";

// ============================================================
// FOX (24x24) — chibi orange fox, bushy tail with white tip,
// white chest V, dark ear tips, dark paws, big eyes, pink nose
// ============================================================
const fOL = "#4a1f10"; // outline (dark brown/black)
const fB  = "#ed7a28"; // body orange (base)
const fSh = "#c85818"; // body orange shadow
const fHi = "#ffa050"; // body orange highlight
const fWh = "#f4ece0"; // white (chest, muzzle, tail tip)
const fWs = "#c8c0b4"; // white shadow
const fEt = "#2a1008"; // ear tips / paws dark
const fNo = "#e87090"; // pink nose
const fEy = "#1a0a04"; // eye dark
const fEw = "#ffffff"; // eye highlight

const WALK1: SpriteFrame = [
  // row 0
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  // row 1 — ear tops
  [_, _, _, _, fOL, fOL, _, _, _, fOL, fOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  // row 2 — ear tips dark
  [_, _, _, fOL, fEt, fEt, fOL, _, fOL, fEt, fEt, fOL, _, _, _, _, _, _, _, _, _, _, _, _],
  // row 3 — ears
  [_, _, _, fOL, fEt, fB, fOL, fOL, fOL, fB, fEt, fOL, _, _, _, _, _, _, _, _, _, _, _, _],
  // row 4 — top of head
  [_, _, _, fOL, fB, fB, fB, fHi, fB, fB, fB, fOL, fOL, _, _, _, _, _, _, _, _, _, _, _],
  // row 5 — head wide
  [_, _, fOL, fB, fHi, fB, fB, fB, fB, fB, fB, fB, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  // row 6 — eyes row
  [_, _, fOL, fB, fB, fEw, fEy, fB, fB, fEy, fEw, fB, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  // row 7 — cheeks white, nose
  [_, _, fOL, fB, fWh, fEy, fEy, fWh, fWh, fEy, fEy, fWh, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  // row 8 — muzzle white + nose
  [_, _, fOL, fB, fWh, fWh, fWh, fNo, fNo, fWh, fWh, fWh, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  // row 9 — chin
  [_, _, _, fOL, fB, fWh, fWh, fWh, fWh, fWh, fWh, fB, fOL, _, _, _, _, _, _, _, _, _, _, _],
  // row 10 — neck
  [_, _, _, _, fOL, fB, fB, fB, fB, fB, fB, fOL, _, _, _, _, _, _, _, _, _, _, _, _],
  // row 11 — shoulders with tail starting
  [_, _, _, _, fOL, fB, fB, fHi, fB, fB, fOL, _, _, _, _, _, fOL, fOL, _, _, _, _, _, _],
  // row 12 — body + tail curve
  [_, _, _, fOL, fB, fWh, fWh, fB, fB, fB, fB, fOL, _, _, _, fOL, fB, fB, fOL, _, _, _, _, _],
  // row 13 — body + tail
  [_, _, fOL, fB, fWh, fWh, fWh, fWh, fB, fB, fB, fB, fOL, _, fOL, fB, fSh, fB, fOL, _, _, _, _, _],
  // row 14 — body + tail thicker
  [_, _, fOL, fB, fWh, fWh, fWh, fWh, fWh, fB, fB, fB, fOL, fOL, fB, fSh, fB, fB, fOL, _, _, _, _, _],
  // row 15 — body bottom + tail
  [_, _, fOL, fB, fB, fWh, fWh, fWh, fB, fB, fSh, fB, fB, fB, fB, fB, fHi, fB, fOL, _, _, _, _, _],
  // row 16 — legs start + tail tip white
  [_, _, fOL, fB, fSh, fB, fB, fB, fB, fSh, fSh, fB, fB, fB, fSh, fB, fB, fOL, _, _, _, _, _, _],
  // row 17 — front leg + back leg separation
  [_, _, _, fOL, fB, fB, fOL, fB, fB, fB, fOL, fOL, fB, fB, fB, fB, fOL, _, _, _, _, _, _, _],
  // row 18 — legs
  [_, _, _, fOL, fB, fB, fOL, fOL, fB, fB, fOL, _, fOL, fB, fB, fOL, _, _, _, _, _, _, _, _],
  // row 19 — feet
  [_, _, _, fOL, fEt, fEt, fOL, _, fOL, fEt, fOL, _, fOL, fEt, fEt, fOL, _, _, _, _, _, _, _, _],
  // row 20 — paw bottoms
  [_, _, _, fOL, fOL, fOL, _, _, _, fOL, _, _, _, fOL, fOL, _, _, _, _, _, _, _, _, _],
  // row 21
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  // row 22
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  // row 23
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, fOL, fOL, _, _, _, fOL, fOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fEt, fEt, fOL, _, fOL, fEt, fEt, fOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fEt, fB, fOL, fOL, fOL, fB, fEt, fOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fB, fB, fB, fHi, fB, fB, fB, fOL, fOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fHi, fB, fB, fB, fB, fB, fB, fB, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fB, fEw, fEy, fB, fB, fEy, fEw, fB, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fWh, fEy, fEy, fWh, fWh, fEy, fEy, fWh, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fWh, fWh, fWh, fNo, fNo, fWh, fWh, fWh, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fB, fWh, fWh, fWh, fWh, fWh, fWh, fB, fOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, fOL, fB, fB, fB, fB, fB, fB, fOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, fOL, fB, fB, fHi, fB, fB, fOL, _, _, _, _, _, fOL, fOL, _, _, _, _, _, _],
  [_, _, _, fOL, fB, fWh, fWh, fB, fB, fB, fB, fOL, _, _, fOL, fB, fB, fB, fOL, _, _, _, _, _],
  [_, _, fOL, fB, fWh, fWh, fWh, fWh, fB, fB, fB, fB, fOL, fOL, fB, fSh, fB, fOL, _, _, _, _, _, _],
  [_, _, fOL, fB, fWh, fWh, fWh, fWh, fWh, fB, fB, fB, fB, fB, fSh, fB, fB, fOL, _, _, _, _, _, _],
  [_, _, fOL, fB, fB, fWh, fWh, fWh, fB, fB, fSh, fB, fB, fB, fB, fHi, fB, fOL, _, _, _, _, _, _],
  [_, _, fOL, fB, fSh, fB, fB, fB, fB, fSh, fSh, fB, fB, fSh, fB, fB, fOL, _, _, _, _, _, _, _],
  [_, _, _, fOL, fOL, fB, fB, fOL, fB, fB, fOL, fOL, fB, fB, fB, fOL, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fB, fB, fB, fOL, fOL, fB, fB, fOL, fOL, fB, fB, fOL, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fB, fEt, fOL, _, _, fOL, fEt, fEt, fOL, fEt, fB, fOL, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fEt, fOL, _, _, _, _, fOL, fOL, _, fOL, fOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, fOL, fOL, _, _, _, fOL, fOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fEt, fEt, fOL, _, fOL, fEt, fEt, fOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fEt, fB, fOL, fOL, fOL, fB, fEt, fOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fB, fB, fB, fHi, fB, fB, fB, fOL, fOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fHi, fB, fB, fB, fB, fB, fB, fB, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fB, fEw, fEy, fB, fB, fEy, fEw, fB, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fWh, fEy, fEy, fWh, fWh, fEy, fEy, fWh, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fWh, fWh, fWh, fNo, fNo, fWh, fWh, fWh, fB, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fB, fWh, fWh, fWh, fWh, fWh, fWh, fB, fOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, fOL, fB, fB, fB, fB, fB, fB, fOL, _, _, _, _, fOL, fOL, _, _, _, _, _, _],
  [_, _, _, _, fOL, fB, fB, fHi, fB, fB, fOL, _, _, _, _, fOL, fB, fB, fOL, _, _, _, _, _],
  [_, _, _, fOL, fB, fWh, fWh, fB, fB, fB, fB, fOL, _, _, fOL, fB, fSh, fB, fOL, _, _, _, _, _],
  [_, _, fOL, fB, fWh, fWh, fWh, fWh, fB, fB, fB, fB, fOL, fOL, fB, fB, fB, fOL, _, _, _, _, _, _],
  [_, _, fOL, fB, fWh, fWh, fWh, fWh, fWh, fB, fB, fB, fB, fB, fSh, fB, fB, fOL, _, _, _, _, _, _],
  [_, _, fOL, fB, fB, fWh, fWh, fWh, fB, fB, fSh, fB, fB, fB, fB, fHi, fB, fOL, _, _, _, _, _, _],
  [_, _, fOL, fB, fSh, fB, fB, fB, fB, fSh, fSh, fB, fB, fB, fB, fB, fB, fOL, _, _, _, _, _, _],
  [_, _, fOL, fB, fB, fB, fB, fB, fB, fB, fB, fB, fB, fWh, fWh, fB, fOL, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fB, fB, fB, fB, fB, fB, fB, fB, fWh, fWh, fWh, fOL, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fB, fB, fB, fB, fB, fB, fB, fB, fWh, fWs, fOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fEt, fEt, fOL, fOL, fOL, fEt, fEt, fOL, fOL, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, fOL, fOL, _, _, _, fOL, fOL, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const FOX_SHEET: SpriteSheet = { walk1: WALK1, walk2: WALK2, idle: IDLE };
