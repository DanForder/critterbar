import { _, type SpriteFrame, type SpriteSheet } from "./types";

// ============================================================
// DOG (24x24) — chibi reddish-brown dog, floppy ears, collar
// ============================================================
const dOL = "#3a2218"; // dark outline
const dB  = "#b05a2c"; // body base (reddish brown)
const dSh = "#8a3e18"; // body shadow
const dHi = "#d88048"; // body highlight
const dDk = "#5a2810"; // dark ear brown
const dWh = "#f6ece0"; // white patches (muzzle, chest, ear)
const dWs = "#c8bea8"; // white shadow
const dNo = "#1a1008"; // nose
const dEy = "#1a1008"; // eye dark
const dEw = "#ffffff"; // eye highlight
const dCo = "#c02028"; // collar red
const dCs = "#801018"; // collar shadow
const dBk = "#f0c020"; // buckle gold
const dTo = "#ff6888"; // tongue pink
const dGs = "#00000033"; // ground shadow (not used in pixel, reserved)

const WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dOL, _, _, _, _, _, _, _, dOL, dOL, dOL, _, _, _, _, _, _],
  [_, _, _, _, dOL, dDk, dDk, dOL, dOL, _, _, _, _, _, dOL, dWh, dWh, dOL, _, _, _, _, _, _],
  [_, _, _, _, dOL, dDk, dDk, dDk, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dWh, dWh, dOL, _, _, _, _, _, _],
  [_, _, _, dOL, dOL, dDk, dDk, dOL, dB, dB, dB, dB, dB, dB, dOL, dWh, dWh, dWh, dOL, _, _, _, _, _],
  [_, _, _, dOL, dDk, dDk, dOL, dB, dB, dB, dHi, dB, dB, dB, dB, dOL, dWh, dWh, dOL, _, _, _, _, _],
  [_, _, _, dOL, dDk, dOL, dB, dB, dB, dB, dB, dB, dB, dB, dB, dB, dOL, dWh, dOL, _, _, _, _, _],
  [_, _, _, dOL, dOL, dB, dB, dEw, dEy, dB, dB, dB, dB, dEw, dEy, dB, dB, dOL, dOL, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dEy, dEy, dB, dB, dB, dB, dEy, dEy, dB, dB, dB, dOL, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dB, dB, dWh, dWh, dWh, dWh, dB, dB, dB, dB, dB, dOL, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dB, dWh, dWh, dNo, dNo, dWh, dWh, dB, dB, dB, dOL, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dB, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dB, dB, dWh, dWh, dTo, dTo, dWh, dB, dB, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dCo, dCo, dCo, dCo, dCo, dCo, dCo, dOL, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dCo, dCs, dCo, dBk, dBk, dCo, dCs, dCo, dCo, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dCo, dCo, dCo, dCo, dCo, dCo, dOL, dOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dB, dWh, dWh, dWh, dWh, dB, dB, dB, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dB, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dB, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dB, dSh, dOL, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dSh, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dSh, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, dOL, dOL, dOL, dB, dB, dWh, dWh, dWh, dWh, dB, dB, dOL, dOL, dOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dOL, _, _, _, _, _, _, _, dOL, dOL, dOL, _, _, _, _, _, _],
  [_, _, _, _, dOL, dDk, dDk, dOL, dOL, _, _, _, _, _, dOL, dWh, dWh, dOL, _, _, _, _, _, _],
  [_, _, _, _, dOL, dDk, dDk, dDk, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dWh, dWh, dOL, _, _, _, _, _, _],
  [_, _, _, dOL, dOL, dDk, dDk, dOL, dB, dB, dB, dB, dB, dB, dOL, dWh, dWh, dWh, dOL, _, _, _, _, _],
  [_, _, _, dOL, dDk, dDk, dOL, dB, dB, dB, dHi, dB, dB, dB, dB, dOL, dWh, dWh, dOL, _, _, _, _, _],
  [_, _, _, dOL, dDk, dOL, dB, dB, dB, dB, dB, dB, dB, dB, dB, dB, dOL, dWh, dOL, _, _, _, _, _],
  [_, _, _, dOL, dOL, dB, dB, dEw, dEy, dB, dB, dB, dB, dEw, dEy, dB, dB, dOL, dOL, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dEy, dEy, dB, dB, dB, dB, dEy, dEy, dB, dB, dB, dOL, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dB, dB, dWh, dWh, dWh, dWh, dB, dB, dB, dB, dB, dOL, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dB, dWh, dWh, dNo, dNo, dWh, dWh, dB, dB, dB, dOL, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dB, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dB, dB, dWh, dWh, dWh, dWh, dWh, dB, dB, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dCo, dCo, dCo, dCo, dCo, dCo, dCo, dOL, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dCo, dCs, dCo, dBk, dBk, dCo, dCs, dCo, dCo, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dCo, dCo, dCo, dCo, dCo, dCo, dOL, dOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dB, dWh, dWh, dWh, dWh, dB, dB, dB, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dB, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dSh, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dSh, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dB, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, dOL, dOL, dB, dB, dB, dWh, dWh, dWh, dWh, dB, dB, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, _, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dOL, _, _, _, _, _, _, _, dOL, dOL, dOL, _, _, _, _, _, _],
  [_, _, _, _, dOL, dDk, dDk, dOL, dOL, _, _, _, _, _, dOL, dWh, dWh, dOL, _, _, _, _, _, _],
  [_, _, _, _, dOL, dDk, dDk, dDk, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dWh, dWh, dOL, _, _, _, _, _, _],
  [_, _, _, dOL, dOL, dDk, dDk, dOL, dB, dB, dB, dB, dB, dB, dOL, dWh, dWh, dWh, dOL, _, _, _, _, _],
  [_, _, _, dOL, dDk, dDk, dOL, dB, dB, dB, dHi, dB, dB, dB, dB, dOL, dWh, dWh, dOL, _, _, _, _, _],
  [_, _, _, dOL, dDk, dOL, dB, dB, dB, dB, dB, dB, dB, dB, dB, dB, dOL, dWh, dOL, _, _, _, _, _],
  [_, _, _, dOL, dOL, dB, dB, dEw, dEy, dB, dB, dB, dB, dEw, dEy, dB, dB, dOL, dOL, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dEy, dEy, dB, dB, dB, dB, dEy, dEy, dB, dB, dB, dOL, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dB, dB, dWh, dWh, dWh, dWh, dB, dB, dB, dB, dB, dOL, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dB, dWh, dWh, dNo, dNo, dWh, dWh, dB, dB, dB, dOL, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dB, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dB, dB, dWh, dTo, dTo, dTo, dWh, dB, dB, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dCo, dCo, dCo, dCo, dCo, dCo, dCo, dOL, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dCo, dCs, dCo, dBk, dBk, dCo, dCs, dCo, dCo, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dCo, dCo, dCo, dCo, dCo, dCo, dOL, dOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, dOL, dB, dB, dB, dWh, dWh, dWh, dWh, dB, dB, dB, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dB, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dB, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dSh, dB, dWh, dWh, dWh, dWh, dWh, dWh, dB, dSh, dB, dOL, _, _, _, _, _, _, _],
  [_, _, _, dOL, dOL, dOL, dB, dB, dWh, dWh, dWh, dWh, dB, dB, dOL, dOL, dOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dOL, dOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const DOG_SHEET: SpriteSheet = { walk1: WALK1, walk2: WALK2, idle: IDLE };
