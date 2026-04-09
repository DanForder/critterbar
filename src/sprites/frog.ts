import { _, type SpriteFrame, type SpriteSheet } from "./types";

// ============================================================
// FROG (24x24) — chibi, bright green, big eye bulges, on grass
// ============================================================
const gOL = "#1a3d1a"; // dark outline
const gB  = "#5cb84a"; // body green
const gSh = "#3d8a32"; // shadow green
const gHi = "#82d864"; // highlight green
const gBe = "#cce89a"; // belly pale green/cream
const gSp = "#2d5a22"; // dark spot green
const gEb = "#f4f4e6"; // eye white
const gEp = "#1a1a1a"; // pupil black
const gMo = "#2d1010"; // mouth line dark
const gGr = "#4a9e35"; // grass tuft green
const gGd = "#2d6a20"; // grass dark

// Frog layout (24x24):
// - Two BIG eye bulges rows 1-5 with white + pupils + highlight
// - Round squat body rows 5-14, paler belly, dark spots
// - Wide mouth curve row 9-10
// - Front legs tucked sides rows 13-16, back legs splayed rows 15-19
// - Grass tuft under feet rows 20-22
const WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, gOL, gOL, gOL, _, _, _, _, _, _, _, gOL, gOL, gOL, _, _, _, _, _, _, _],
  [_, _, _, gOL, gEb, gEb, gEp, gOL, _, _, _, _, gOL, gEb, gEb, gEp, gOL, _, _, _, _, _, _, _],
  [_, _, _, gOL, gEb, gEp, gEp, gOL, _, _, _, _, gOL, gEb, gEp, gEp, gOL, _, _, _, _, _, _, _],
  [_, _, _, gOL, gEp, gEp, gEp, gOL, _, _, _, _, gOL, gEp, gEp, gEp, gOL, _, _, _, _, _, _, _],
  [_, _, gOL, gOL, gOL, gB, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gB, gOL, gOL, gOL, _, _, _, _, _, _],
  [_, gOL, gB, gHi, gB, gB, gB, gHi, gB, gB, gB, gB, gB, gHi, gB, gB, gB, gHi, gOL, _, _, _, _, _],
  [_, gOL, gB, gB, gB, gSp, gSp, gB, gB, gB, gB, gB, gB, gB, gB, gSp, gSp, gB, gOL, _, _, _, _, _],
  [gOL, gB, gB, gSh, gB, gSp, gB, gB, gB, gB, gB, gB, gB, gB, gB, gSp, gB, gB, gB, gOL, _, _, _, _],
  [gOL, gB, gBe, gBe, gBe, gBe, gBe, gMo, gMo, gMo, gMo, gMo, gMo, gMo, gBe, gBe, gBe, gBe, gB, gOL, _, _, _, _],
  [gOL, gB, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gB, gOL, _, _, _, _],
  [gOL, gB, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gB, gOL, _, _, _, _],
  [gOL, gB, gSh, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gSh, gB, gOL, _, _, _, _],
  [_, gOL, gB, gSh, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gSh, gB, gOL, _, _, _, _, _],
  [_, gOL, gB, gB, gSh, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gSh, gB, gB, gOL, _, _, _, _, _],
  [_, _, gOL, gB, gB, gSh, gSh, gB, gB, gB, gB, gB, gB, gB, gSh, gSh, gB, gOL, _, _, _, _, _, _],
  [_, _, gOL, gOL, gB, gB, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gB, gB, gOL, gOL, _, _, _, _, _, _],
  [_, gOL, gB, gB, gOL, _, _, _, _, _, _, _, _, _, _, gOL, gB, gB, gOL, _, _, _, _, _],
  [gOL, gB, gB, gOL, _, _, _, _, _, _, _, _, _, _, _, _, gOL, gB, gB, gOL, _, _, _, _],
  [gOL, gB, gOL, _, _, _, _, _, _, _, _, _, _, _, _, _, _, gOL, gB, gOL, _, _, _, _],
  [gOL, gOL, _, _, gGr, _, gGd, _, gGr, gGd, _, gGr, _, gGd, gGr, _, _, _, gOL, gOL, _, _, _, _],
  [_, _, _, gGd, gGr, gGd, gGr, gGd, gGr, gGr, gGd, gGr, gGd, gGr, gGr, gGd, gGr, gGd, _, _, _, _, _, _],
  [_, _, gGd, gGr, gGr, gGr, gGd, gGr, gGr, gGd, gGr, gGr, gGr, gGd, gGr, gGr, gGr, gGd, gGr, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, gOL, gOL, gOL, _, _, _, _, _, _, _, gOL, gOL, gOL, _, _, _, _, _, _, _],
  [_, _, _, gOL, gEb, gEb, gEp, gOL, _, _, _, _, gOL, gEb, gEb, gEp, gOL, _, _, _, _, _, _, _],
  [_, _, _, gOL, gEb, gEp, gEp, gOL, _, _, _, _, gOL, gEb, gEp, gEp, gOL, _, _, _, _, _, _, _],
  [_, _, _, gOL, gEp, gEp, gEp, gOL, _, _, _, _, gOL, gEp, gEp, gEp, gOL, _, _, _, _, _, _, _],
  [_, _, gOL, gOL, gOL, gB, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gB, gOL, gOL, gOL, _, _, _, _, _, _],
  [_, gOL, gB, gHi, gB, gB, gB, gHi, gB, gB, gB, gB, gB, gHi, gB, gB, gB, gHi, gOL, _, _, _, _, _],
  [_, gOL, gB, gB, gB, gSp, gSp, gB, gB, gB, gB, gB, gB, gB, gB, gSp, gSp, gB, gOL, _, _, _, _, _],
  [gOL, gB, gB, gSh, gB, gSp, gB, gB, gB, gB, gB, gB, gB, gB, gB, gSp, gB, gB, gB, gOL, _, _, _, _],
  [gOL, gB, gBe, gBe, gBe, gBe, gMo, gMo, gMo, gMo, gMo, gMo, gMo, gMo, gMo, gBe, gBe, gBe, gB, gOL, _, _, _, _],
  [gOL, gB, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gB, gOL, _, _, _, _],
  [gOL, gB, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gB, gOL, _, _, _, _],
  [gOL, gB, gSh, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gSh, gB, gOL, _, _, _, _],
  [_, gOL, gB, gSh, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gSh, gB, gOL, _, _, _, _, _],
  [_, gOL, gB, gB, gSh, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gSh, gB, gB, gOL, _, _, _, _, _],
  [_, _, gOL, gB, gB, gSh, gSh, gB, gB, gB, gB, gB, gB, gB, gSh, gSh, gB, gOL, _, _, _, _, _, _],
  [_, _, gOL, gOL, gB, gB, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gB, gB, gOL, gOL, _, _, _, _, _, _],
  [_, gOL, gB, gB, gOL, _, _, _, _, _, _, _, _, _, _, gOL, gB, gB, gOL, _, _, _, _, _],
  [gOL, gB, gB, gOL, _, _, _, _, _, _, _, _, _, _, _, _, gOL, gB, gB, gOL, _, _, _, _],
  [gOL, gOL, gOL, _, _, _, _, _, _, _, _, _, _, _, _, _, _, gOL, gOL, gOL, _, _, _, _],
  [_, _, _, _, gGr, _, gGd, _, gGr, gGd, _, gGr, _, gGd, gGr, _, _, _, _, _, _, _, _, _],
  [_, _, _, gGd, gGr, gGd, gGr, gGd, gGr, gGr, gGd, gGr, gGd, gGr, gGr, gGd, gGr, gGd, _, _, _, _, _, _],
  [_, _, gGd, gGr, gGr, gGr, gGd, gGr, gGr, gGd, gGr, gGr, gGr, gGd, gGr, gGr, gGr, gGd, gGr, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, gOL, gOL, gOL, _, _, _, _, _, _, _, gOL, gOL, gOL, _, _, _, _, _, _, _],
  [_, _, _, gOL, gEb, gEb, gEp, gOL, _, _, _, _, gOL, gEb, gEb, gEp, gOL, _, _, _, _, _, _, _],
  [_, _, _, gOL, gEb, gEp, gEp, gOL, _, _, _, _, gOL, gEb, gEp, gEp, gOL, _, _, _, _, _, _, _],
  [_, _, _, gOL, gEp, gEp, gEp, gOL, _, _, _, _, gOL, gEp, gEp, gEp, gOL, _, _, _, _, _, _, _],
  [_, _, gOL, gOL, gOL, gB, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gB, gOL, gOL, gOL, _, _, _, _, _, _],
  [_, gOL, gB, gHi, gB, gB, gB, gHi, gB, gB, gB, gB, gB, gHi, gB, gB, gB, gHi, gOL, _, _, _, _, _],
  [_, gOL, gB, gB, gB, gSp, gSp, gB, gB, gB, gB, gB, gB, gB, gB, gSp, gSp, gB, gOL, _, _, _, _, _],
  [gOL, gB, gB, gSh, gB, gSp, gB, gB, gB, gB, gB, gB, gB, gB, gB, gSp, gB, gB, gB, gOL, _, _, _, _],
  [gOL, gB, gBe, gBe, gBe, gBe, gBe, gMo, gMo, gMo, gMo, gMo, gMo, gBe, gBe, gBe, gBe, gBe, gB, gOL, _, _, _, _],
  [gOL, gB, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gB, gOL, _, _, _, _],
  [gOL, gB, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gB, gOL, _, _, _, _],
  [gOL, gB, gSh, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gSh, gB, gOL, _, _, _, _],
  [_, gOL, gB, gSh, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gSh, gB, gOL, _, _, _, _, _],
  [_, gOL, gB, gB, gSh, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gBe, gSh, gB, gB, gOL, _, _, _, _, _],
  [_, _, gOL, gB, gB, gSh, gSh, gB, gB, gB, gB, gB, gB, gB, gSh, gSh, gB, gOL, _, _, _, _, _, _],
  [_, _, gOL, gOL, gB, gB, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gOL, gB, gB, gOL, gOL, _, _, _, _, _, _],
  [_, gOL, gB, gB, gOL, _, _, _, _, _, _, _, _, _, _, gOL, gB, gB, gOL, _, _, _, _, _],
  [gOL, gB, gB, gB, gOL, _, _, _, _, _, _, _, _, _, _, gOL, gB, gB, gB, gOL, _, _, _, _],
  [gOL, gB, gB, gOL, _, _, _, _, _, _, _, _, _, _, _, _, gOL, gB, gB, gOL, _, _, _, _],
  [gOL, gOL, gOL, _, gGr, _, gGd, _, gGr, gGd, _, gGr, _, gGd, gGr, _, _, gOL, gOL, gOL, _, _, _, _],
  [_, _, _, gGd, gGr, gGd, gGr, gGd, gGr, gGr, gGd, gGr, gGd, gGr, gGr, gGd, gGr, gGd, _, _, _, _, _, _],
  [_, _, gGd, gGr, gGr, gGr, gGd, gGr, gGr, gGd, gGr, gGr, gGr, gGd, gGr, gGr, gGr, gGd, gGr, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const FROG_SHEET: SpriteSheet = { walk1: WALK1, walk2: WALK2, idle: IDLE };
