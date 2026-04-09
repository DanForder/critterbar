import { _, type SpriteFrame, type SpriteSheet } from "./types";

// ============================================================
// HAMSTER (24x24) — chibi golden, front view, very round
// ============================================================
const hOL = "#6b4a1c"; // outline (dark brown)
const hB  = "#e0a040"; // body golden
const hSh = "#b87820"; // body shadow
const hHi = "#f0c060"; // body highlight
const hBe = "#fff8e8"; // belly white
const hBs = "#e8d8b8"; // belly shadow
const hNo = "#e06878"; // nose pink
const hEa = "#b86820"; // ear inner dark
const hEy = "#201008"; // eye dark
const hEw = "#ffffff"; // eye highlight
const hSd = "#00000030"; // ground shadow (semi)

// Layout:
//  rows  0- 1 : padding
//  rows  2- 4 : ears + top of head
//  rows  5- 9 : face (eyes at 7-8, nose at 9)
//  rows 10-17 : round body with white belly
//  rows 18-20 : feet
//  rows 21-23 : ground shadow / padding
const WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, hOL, hOL, _, _, _, _, _, _, _, _, hOL, hOL, _, _, _, _, _, _, _],
  [_, _, _, _, hOL, hEa, hEa, hOL, _, _, _, _, _, hOL, hEa, hEa, hOL, _, _, _, _, _, _, _],
  [_, _, _, hOL, hB, hB, hB, hOL, hOL, hOL, hOL, hOL, hOL, hOL, hB, hB, hB, hOL, _, _, _, _, _, _],
  [_, _, hOL, hB, hHi, hHi, hB, hB, hB, hB, hB, hB, hB, hB, hB, hHi, hB, hB, hOL, _, _, _, _, _],
  [_, hOL, hB, hHi, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hOL, _, _, _, _],
  [_, hOL, hB, hB, hB, hEw, hEy, hEy, hB, hB, hB, hB, hB, hB, hEy, hEy, hEw, hB, hB, hOL, _, _, _, _],
  [hOL, hB, hB, hB, hB, hEy, hEy, hEy, hB, hB, hB, hB, hB, hB, hEy, hEy, hEy, hB, hB, hB, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hB, hB, hB, hNo, hNo, hB, hB, hB, hB, hB, hB, hB, hB, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hB, hB, hB, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hSh, hOL, _, _, _],
  [_, hOL, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBs, hB, hB, hSh, hOL, _, _, _, _],
  [_, hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBs, hBs, hB, hB, hSh, hOL, _, _, _, _],
  [_, _, hOL, hB, hB, hB, hB, hB, hBs, hBs, hBs, hBs, hBs, hBs, hB, hB, hB, hSh, hOL, _, _, _, _, _],
  [_, _, _, hOL, hOL, hOL, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hOL, hOL, hOL, _, _, _, _, _],
  [_, _, _, hOL, hSh, hOL, hOL, hOL, hOL, hOL, _, _, hOL, hOL, hOL, hOL, hOL, hSh, hOL, _, _, _, _, _],
  [_, _, _, hOL, hOL, _, _, _, _, _, _, _, _, _, _, _, _, hOL, hOL, _, _, _, _, _],
  [_, _, _, _, _, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, hOL, hOL, _, _, _, _, _, _, _, _, hOL, hOL, _, _, _, _, _, _, _],
  [_, _, _, _, hOL, hEa, hEa, hOL, _, _, _, _, _, hOL, hEa, hEa, hOL, _, _, _, _, _, _, _],
  [_, _, _, hOL, hB, hB, hB, hOL, hOL, hOL, hOL, hOL, hOL, hOL, hB, hB, hB, hOL, _, _, _, _, _, _],
  [_, _, hOL, hB, hHi, hHi, hB, hB, hB, hB, hB, hB, hB, hB, hB, hHi, hB, hB, hOL, _, _, _, _, _],
  [_, hOL, hB, hHi, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hOL, _, _, _, _],
  [_, hOL, hB, hB, hB, hEw, hEy, hEy, hB, hB, hB, hB, hB, hB, hEy, hEy, hEw, hB, hB, hOL, _, _, _, _],
  [hOL, hB, hB, hB, hB, hEy, hEy, hEy, hB, hB, hB, hB, hB, hB, hEy, hEy, hEy, hB, hB, hB, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hB, hB, hB, hNo, hNo, hB, hB, hB, hB, hB, hB, hB, hB, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hB, hB, hB, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hSh, hOL, _, _, _],
  [_, hOL, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBs, hB, hB, hSh, hOL, _, _, _, _],
  [_, hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBs, hBs, hB, hB, hSh, hOL, _, _, _, _],
  [_, _, hOL, hB, hB, hB, hB, hB, hBs, hBs, hBs, hBs, hBs, hBs, hB, hB, hB, hSh, hOL, _, _, _, _, _],
  [_, _, _, hOL, hOL, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hOL, hOL, _, _, _, _, _],
  [_, _, _, hOL, hSh, hOL, hOL, hOL, _, _, hOL, hOL, _, _, hOL, hOL, hOL, hOL, hSh, hOL, _, _, _, _],
  [_, _, _, hOL, hOL, _, _, _, _, _, _, _, _, _, _, _, _, hOL, hOL, _, _, _, _, _],
  [_, _, _, _, _, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, hOL, hOL, _, _, _, _, _, _, _, _, hOL, hOL, _, _, _, _, _, _, _],
  [_, _, _, _, hOL, hEa, hEa, hOL, _, _, _, _, _, hOL, hEa, hEa, hOL, _, _, _, _, _, _, _],
  [_, _, _, hOL, hB, hB, hB, hOL, hOL, hOL, hOL, hOL, hOL, hOL, hB, hB, hB, hOL, _, _, _, _, _, _],
  [_, _, hOL, hB, hHi, hHi, hB, hB, hB, hB, hB, hB, hB, hB, hB, hHi, hB, hB, hOL, _, _, _, _, _],
  [_, hOL, hB, hHi, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hOL, _, _, _, _],
  [_, hOL, hB, hB, hB, hEw, hEy, hEy, hB, hB, hB, hB, hB, hB, hEy, hEy, hEw, hB, hB, hOL, _, _, _, _],
  [hOL, hB, hB, hB, hB, hEy, hEy, hEy, hB, hB, hB, hB, hB, hB, hEy, hEy, hEy, hB, hB, hB, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hB, hB, hB, hNo, hNo, hB, hB, hB, hB, hB, hB, hB, hB, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hB, hB, hB, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hSh, hOL, _, _, _],
  [hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hB, hSh, hOL, _, _, _],
  [_, hOL, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBs, hB, hB, hSh, hOL, _, _, _, _],
  [_, hOL, hB, hB, hB, hB, hB, hBe, hBe, hBe, hBe, hBe, hBe, hBe, hBs, hBs, hB, hB, hSh, hOL, _, _, _, _],
  [_, _, hOL, hB, hB, hB, hB, hB, hBs, hBs, hBs, hBs, hBs, hBs, hB, hB, hB, hSh, hOL, _, _, _, _, _],
  [_, _, _, hOL, hOL, hOL, hB, hB, hB, hB, hB, hB, hB, hB, hB, hB, hOL, hOL, hOL, _, _, _, _, _],
  [_, _, _, hOL, hSh, hOL, hOL, hOL, hOL, hOL, _, _, hOL, hOL, hOL, hOL, hOL, hSh, hOL, _, _, _, _, _],
  [_, _, _, hOL, hOL, _, _, _, _, _, _, _, _, _, _, _, _, hOL, hOL, _, _, _, _, _],
  [_, _, _, _, _, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, hSd, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const HAMSTER_SHEET: SpriteSheet = { walk1: WALK1, walk2: WALK2, idle: IDLE };
