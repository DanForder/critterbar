// Pixel art sprite definitions — each frame is a 2D array of hex colors (null = transparent)
// Sprites are defined at native pixel size, rendered to canvas, then scaled to CRITTER_SIZE

type SpriteFrame = (string | null)[][];

export interface SpriteSheet {
  walk1: SpriteFrame;
  walk2: SpriteFrame;
  idle: SpriteFrame;
}

// --- Transparent shorthand ---
const _ = null;

// ============================================================
// CAT (16x16) — gray with white chest, green eyes, pink nose
// ============================================================
const cOL = "#505860"; // outline
const cB  = "#8890a0"; // body
const cSh = "#707880"; // shadow
const cHi = "#a8b0b8"; // highlight
const cBe = "#e8e0d8"; // belly/chest
const cEy = "#50b050"; // eye green
const cEw = "#fff";    // eye white highlight
const cNo = "#d88898"; // nose pink
const cEi = "#c89098"; // ear inner

const CAT_WALK1: SpriteFrame = [
  [_, _, _, _, cOL, _, _, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, cOL, cEi, cOL, cOL, cEi, cOL, _, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cB, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, cOL, cB, cB, cHi, cB, cB, cB, cOL, _, _, _, cOL, _, _],
  [_, cOL, cB, cEw, cEy, cB, cB, cB, cB, cOL, _, cOL, cB, cOL, _, _],
  [_, cOL, cB, cB, cNo, cB, cB, cB, cOL, cOL, cOL, cOL, cB, cOL, _, _],
  [_, cOL, cB, cB, cB, cB, cHi, cB, cB, cB, cB, cB, cOL, cOL, _, _],
  [_, _, cOL, cB, cSh, cBe, cBe, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, _, cOL, cB, cSh, cBe, cBe, cBe, cB, cB, cOL, _, _, _, _, _],
  [_, _, _, cOL, cB, cBe, cBe, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cSh, cB, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, _, _, cOL, cB, cB, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, cOL, cOL, _, _, cOL, cOL, _, _, _, _, _, _, _],
  [_, _, _, cOL, cSh, _, _, cSh, cOL, _, _, _, _, _, _, _],
  [_, _, cOL, cOL, _, _, _, _, cOL, cOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const CAT_WALK2: SpriteFrame = [
  [_, _, _, _, cOL, _, _, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, cOL, cEi, cOL, cOL, cEi, cOL, _, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cB, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, cOL, cB, cB, cHi, cB, cB, cB, cOL, _, _, _, cOL, _, _],
  [_, cOL, cB, cEw, cEy, cB, cB, cB, cB, cOL, _, cOL, cB, cOL, _, _],
  [_, cOL, cB, cB, cNo, cB, cB, cB, cOL, cOL, cOL, cOL, cB, cOL, _, _],
  [_, cOL, cB, cB, cB, cB, cHi, cB, cB, cB, cB, cB, cOL, cOL, _, _],
  [_, _, cOL, cB, cSh, cBe, cBe, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, _, cOL, cB, cSh, cBe, cBe, cBe, cB, cB, cOL, _, _, _, _, _],
  [_, _, _, cOL, cB, cBe, cBe, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cSh, cB, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, _, _, cOL, cB, cB, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, cOL, cOL, cOL, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, cOL, cSh, _, _, _, cSh, cOL, _, _, _, _, _, _],
  [_, _, _, _, cOL, _, _, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const CAT_IDLE: SpriteFrame = [
  [_, _, _, _, cOL, _, _, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, cOL, cEi, cOL, cOL, cEi, cOL, _, _, _, _, _, _, _],
  [_, _, _, cOL, cB, cB, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, cOL, cB, cB, cHi, cB, cB, cB, cOL, _, _, _, cOL, _, _],
  [_, cOL, cB, cEy, cEy, cB, cB, cB, cB, cOL, _, cOL, cB, cOL, _, _],
  [_, cOL, cB, cB, cNo, cB, cB, cB, cOL, cOL, cOL, cOL, cB, cOL, _, _],
  [_, cOL, cB, cB, cB, cB, cHi, cB, cB, cB, cB, cB, cOL, cOL, _, _],
  [_, _, cOL, cB, cSh, cBe, cBe, cB, cB, cB, cB, cOL, _, _, _, _],
  [_, _, cOL, cB, cSh, cBe, cBe, cBe, cB, cB, cOL, _, _, _, _, _],
  [_, _, _, cOL, cB, cBe, cBe, cB, cB, cOL, _, _, _, _, _, _],
  [_, _, _, cOL, cSh, cB, cB, cB, cOL, _, _, _, _, _, _, _],
  [_, _, _, _, cOL, cB, cB, cOL, _, _, _, _, _, _, _, _],
  [_, _, _, cOL, cOL, _, _, cOL, cOL, _, _, _, _, _, _, _],
  [_, _, _, cOL, cSh, _, _, cSh, cOL, _, _, _, _, _, _, _],
  [_, _, cOL, cOL, _, _, _, _, cOL, cOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// ============================================================
// DOG (16x16) — brown with white patches, collar, floppy ears
// ============================================================
const dOL = "#503828"; // outline
const dB  = "#a87040"; // body brown
const dSh = "#885830"; // shadow
const dHi = "#c89058"; // highlight
const dWh = "#f0e8e0"; // white patches
const dNo = "#222222"; // nose
const dCo = "#c03050"; // collar red
const dEy = "#402818"; // eye dark
const dEw = "#fff";    // eye highlight

const DOG_WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, dOL, dOL, dOL, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dB, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, dOL, dOL, dB, dB, dHi, dB, dB, dOL, _, _, _, _, _, _],
  [_, dOL, dSh, dOL, dEw, dEy, dB, dB, dB, dOL, _, _, _, _, _, _],
  [_, dOL, dSh, dOL, dB, dB, dWh, dWh, dB, dOL, _, _, _, _, _, _],
  [_, _, dOL, dOL, dWh, dNo, dWh, dB, dB, dB, dOL, _, _, _, _, _],
  [_, _, _, dOL, dWh, dWh, dB, dB, dB, dB, dB, dOL, _, _, _, _],
  [_, _, _, _, dOL, dCo, dCo, dCo, dB, dB, dB, dB, dOL, _, _, _],
  [_, _, _, _, dOL, dB, dSh, dWh, dWh, dB, dB, dOL, _, _, _, _],
  [_, _, _, _, dOL, dB, dSh, dWh, dWh, dB, dOL, _, _, _, _, _],
  [_, _, _, _, _, dOL, dB, dB, dB, dOL, _, _, _, _, _, _],
  [_, _, _, _, dOL, dOL, _, _, dOL, dOL, _, _, _, _, _, _],
  [_, _, _, _, dOL, dSh, _, _, dSh, dOL, _, _, _, _, _, _],
  [_, _, _, dOL, dOL, _, _, _, _, dOL, dOL, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const DOG_WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, dOL, dOL, dOL, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dB, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, dOL, dOL, dB, dB, dHi, dB, dB, dOL, _, _, _, _, _, _],
  [_, dOL, dSh, dOL, dEw, dEy, dB, dB, dB, dOL, _, _, _, _, _, _],
  [_, dOL, dSh, dOL, dB, dB, dWh, dWh, dB, dOL, _, _, _, _, _, _],
  [_, _, dOL, dOL, dWh, dNo, dWh, dB, dB, dB, dOL, _, _, _, _, _],
  [_, _, _, dOL, dWh, dWh, dB, dB, dB, dB, dB, dOL, _, _, _, _],
  [_, _, _, _, dOL, dCo, dCo, dCo, dB, dB, dB, dB, dOL, _, _, _],
  [_, _, _, _, dOL, dB, dSh, dWh, dWh, dB, dB, dOL, _, _, _, _],
  [_, _, _, _, dOL, dB, dSh, dWh, dWh, dB, dOL, _, _, _, _, _],
  [_, _, _, _, _, dOL, dB, dB, dB, dOL, _, _, _, _, _, _],
  [_, _, _, _, _, dOL, dOL, dOL, dOL, _, _, _, _, _, _, _],
  [_, _, _, _, dOL, dSh, _, _, _, dSh, dOL, _, _, _, _, _],
  [_, _, _, _, _, dOL, _, _, dOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const DOG_IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, dOL, dOL, dOL, dOL, _, _, _, _, _, _, _, _],
  [_, _, _, dOL, dB, dB, dB, dB, dOL, _, _, _, _, _, _, _],
  [_, _, dOL, dOL, dB, dB, dHi, dB, dB, dOL, _, _, _, _, _, _],
  [_, dOL, dSh, dOL, dEy, dEy, dB, dB, dB, dOL, _, _, _, _, _, _],
  [_, dOL, dSh, dOL, dB, dB, dWh, dWh, dB, dOL, _, _, _, _, _, _],
  [_, _, dOL, dOL, dWh, dNo, dWh, dB, dB, dB, dOL, _, _, _, _, _],
  [_, _, _, dOL, dWh, dWh, dB, dB, dB, dB, dB, dOL, _, _, _, _],
  [_, _, _, _, dOL, dCo, dCo, dCo, dB, dB, dB, dB, dOL, _, _, _],
  [_, _, _, _, dOL, dB, dSh, dWh, dWh, dB, dB, dOL, _, _, _, _],
  [_, _, _, _, dOL, dB, dSh, dWh, dWh, dB, dOL, _, _, _, _, _],
  [_, _, _, _, _, dOL, dB, dB, dB, dOL, _, _, _, _, _, _],
  [_, _, _, _, dOL, dOL, _, _, dOL, dOL, _, _, _, _, _, _],
  [_, _, _, _, dOL, dSh, _, _, dSh, dOL, _, _, _, _, _, _],
  [_, _, _, dOL, dOL, _, _, _, _, dOL, dOL, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// ============================================================
// HAMSTER (16x16) — golden, very round, white belly
// ============================================================
const hOL = "#806028"; // outline
const hB  = "#d89838"; // body golden
const hSh = "#b07828"; // shadow
const hHi = "#e8b850"; // highlight
const hBe = "#f0e0c8"; // belly/cheeks
const hNo = "#d07080"; // nose pink
const hEa = "#c08838"; // ears
const hEy = "#382818"; // eye dark
const hEw = "#fff";    // eye highlight

const HAMSTER_WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, hOL, hOL, hOL, hOL, hOL, _, _, _, _, _, _],
  [_, _, _, _, hOL, hEa, hOL, hOL, hOL, hEa, hOL, _, _, _, _, _],
  [_, _, _, hOL, hB, hB, hHi, hHi, hB, hB, hB, hOL, _, _, _, _],
  [_, _, hOL, hB, hB, hEw, hEy, hB, hB, hB, hB, hB, hOL, _, _, _],
  [_, _, hOL, hB, hB, hB, hNo, hBe, hBe, hB, hB, hB, hOL, _, _, _],
  [_, _, hOL, hB, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hOL, _, _, _],
  [_, hOL, hB, hSh, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hOL, _, _, _],
  [_, hOL, hB, hSh, hB, hBe, hBe, hBe, hBe, hB, hB, hB, hOL, _, _, _],
  [_, hOL, hB, hB, hSh, hB, hB, hB, hB, hB, hB, hOL, _, _, _, _],
  [_, _, hOL, hB, hB, hSh, hB, hB, hB, hB, hOL, _, _, _, _, _],
  [_, _, _, hOL, hOL, hB, hB, hB, hB, hOL, hOL, _, _, _, _, _],
  [_, _, _, _, hOL, hOL, _, _, hOL, hOL, _, _, _, _, _, _],
  [_, _, _, _, hOL, hSh, _, _, hSh, hOL, _, _, _, _, _, _],
  [_, _, _, _, hOL, hOL, _, _, hOL, hOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const HAMSTER_WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, hOL, hOL, hOL, hOL, hOL, _, _, _, _, _, _],
  [_, _, _, _, hOL, hEa, hOL, hOL, hOL, hEa, hOL, _, _, _, _, _],
  [_, _, _, hOL, hB, hB, hHi, hHi, hB, hB, hB, hOL, _, _, _, _],
  [_, _, hOL, hB, hB, hEw, hEy, hB, hB, hB, hB, hB, hOL, _, _, _],
  [_, _, hOL, hB, hB, hB, hNo, hBe, hBe, hB, hB, hB, hOL, _, _, _],
  [_, _, hOL, hB, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hOL, _, _, _],
  [_, hOL, hB, hSh, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hOL, _, _, _],
  [_, hOL, hB, hSh, hB, hBe, hBe, hBe, hBe, hB, hB, hB, hOL, _, _, _],
  [_, hOL, hB, hB, hSh, hB, hB, hB, hB, hB, hB, hOL, _, _, _, _],
  [_, _, hOL, hB, hB, hSh, hB, hB, hB, hB, hOL, _, _, _, _, _],
  [_, _, _, hOL, hOL, hB, hB, hB, hB, hOL, hOL, _, _, _, _, _],
  [_, _, _, _, _, hOL, hOL, hOL, hOL, _, _, _, _, _, _, _],
  [_, _, _, _, hOL, hSh, _, _, _, hSh, hOL, _, _, _, _, _],
  [_, _, _, _, _, hOL, _, _, hOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const HAMSTER_IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, hOL, hOL, hOL, hOL, hOL, _, _, _, _, _, _],
  [_, _, _, _, hOL, hEa, hOL, hOL, hOL, hEa, hOL, _, _, _, _, _],
  [_, _, _, hOL, hB, hB, hHi, hHi, hB, hB, hB, hOL, _, _, _, _],
  [_, _, hOL, hB, hB, hEy, hEy, hB, hB, hB, hB, hB, hOL, _, _, _],
  [_, _, hOL, hB, hB, hB, hNo, hBe, hBe, hB, hB, hB, hOL, _, _, _],
  [_, _, hOL, hB, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hOL, _, _, _],
  [_, hOL, hB, hSh, hBe, hBe, hBe, hBe, hBe, hBe, hB, hB, hOL, _, _, _],
  [_, hOL, hB, hSh, hB, hBe, hBe, hBe, hBe, hB, hB, hB, hOL, _, _, _],
  [_, hOL, hB, hB, hSh, hB, hB, hB, hB, hB, hB, hOL, _, _, _, _],
  [_, _, hOL, hB, hB, hSh, hB, hB, hB, hB, hOL, _, _, _, _, _],
  [_, _, _, hOL, hOL, hB, hB, hB, hB, hOL, hOL, _, _, _, _, _],
  [_, _, _, _, hOL, hOL, _, _, hOL, hOL, _, _, _, _, _, _],
  [_, _, _, _, hOL, hSh, _, _, hSh, hOL, _, _, _, _, _, _],
  [_, _, _, _, hOL, hOL, _, _, hOL, hOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// ============================================================
// BIRD (16x16) — blue/teal head, yellow belly, orange beak
// ============================================================
const bOL = "#285048"; // outline
const bHd = "#40a0c0"; // head/back blue
const bWs = "#308898"; // wing shadow
const bBe = "#d8c840"; // belly yellow
const bBk = "#e0a028"; // beak orange
const bFt = "#e08828"; // feet orange
const bEy = "#202020"; // eye dark
const bEw = "#fff";    // eye highlight

const BIRD_WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bOL, bOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, bHd, bHd, bHd, bOL, _, _, _, _, _, _, _],
  [_, _, _, bOL, bHd, bHd, bHd, bHd, bHd, bOL, _, _, _, _, _, _],
  [_, _, bOL, bHd, bEw, bEy, bHd, bHd, bHd, bHd, bOL, _, _, _, _, _],
  [_, bOL, bBk, bOL, bHd, bHd, bHd, bHd, bHd, bHd, bOL, _, _, _, _, _],
  [_, _, bOL, bOL, bHd, bHd, bHd, bWs, bWs, bHd, bOL, _, _, _, _, _],
  [_, _, _, bOL, bHd, bBe, bBe, bWs, bWs, bWs, bHd, bOL, _, _, _, _],
  [_, _, _, bOL, bBe, bBe, bBe, bHd, bWs, bHd, bHd, bOL, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bHd, bHd, bHd, bOL, _, _, _, _, _],
  [_, _, _, _, _, bOL, bHd, bHd, bHd, bOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, bOL, bOL, bOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, _, _, _, bOL, _, _, _, _, _, _],
  [_, _, _, _, _, bFt, bFt, _, bFt, bFt, _, _, _, _, _, _],
  [_, _, _, _, bFt, bFt, _, _, _, bFt, bFt, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const BIRD_WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bOL, bOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, bHd, bHd, bHd, bOL, _, _, _, _, _, _, _],
  [_, _, _, bOL, bHd, bHd, bHd, bHd, bHd, bOL, _, _, _, _, _, _],
  [_, _, bOL, bHd, bEw, bEy, bHd, bHd, bHd, bHd, bOL, _, _, _, _, _],
  [_, bOL, bBk, bOL, bHd, bHd, bHd, bHd, bHd, bHd, bOL, _, _, _, _, _],
  [_, _, bOL, bOL, bHd, bHd, bHd, bWs, bWs, bHd, bOL, _, _, _, _, _],
  [_, _, _, bOL, bHd, bBe, bBe, bWs, bWs, bWs, bHd, bOL, _, _, _, _],
  [_, _, _, bOL, bBe, bBe, bBe, bHd, bWs, bHd, bHd, bOL, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bHd, bHd, bHd, bOL, _, _, _, _, _],
  [_, _, _, _, _, bOL, bHd, bHd, bHd, bOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, bOL, bOL, bOL, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, _, _, _, _, _, bOL, _, _, _, _, _],
  [_, _, _, _, bFt, bFt, _, _, _, bFt, bFt, _, _, _, _, _],
  [_, _, _, bFt, bFt, _, _, _, _, _, bFt, bFt, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const BIRD_IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, bOL, bOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, bOL, bHd, bHd, bHd, bOL, _, _, _, _, _, _, _],
  [_, _, _, bOL, bHd, bHd, bHd, bHd, bHd, bOL, _, _, _, _, _, _],
  [_, _, bOL, bHd, bEy, bEy, bHd, bHd, bHd, bHd, bOL, _, _, _, _, _],
  [_, bOL, bBk, bOL, bHd, bHd, bHd, bHd, bHd, bHd, bOL, _, _, _, _, _],
  [_, _, bOL, bOL, bHd, bHd, bHd, bWs, bWs, bHd, bOL, _, _, _, _, _],
  [_, _, _, bOL, bHd, bBe, bBe, bWs, bWs, bWs, bHd, bOL, _, _, _, _],
  [_, _, _, bOL, bBe, bBe, bBe, bHd, bWs, bHd, bHd, bOL, _, _, _, _],
  [_, _, _, _, bOL, bBe, bBe, bHd, bHd, bHd, bOL, _, _, _, _, _],
  [_, _, _, _, _, bOL, bHd, bHd, bHd, bOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, bOL, bOL, bOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, bOL, _, _, _, bOL, _, _, _, _, _, _],
  [_, _, _, _, _, bFt, bFt, _, bFt, bFt, _, _, _, _, _, _],
  [_, _, _, _, bFt, bFt, _, _, _, bFt, bFt, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// ============================================================
// RABBIT (16x16) — white body, pink inner ears, big hind feet
// ============================================================
const rOL = "#a09898"; // outline
const rB  = "#f0e8e8"; // body white
const rSh = "#d8d0d0"; // shadow
const rHi = "#ffffff"; // highlight
const rEi = "#e8a0b0"; // ear inner pink
const rNo = "#d07080"; // nose pink
const rEy = "#382828"; // eye dark
const rEw = "#fff";    // eye highlight

const RABBIT_WALK1: SpriteFrame = [
  [_, _, _, _, rOL, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rB, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, rOL, rOL, rOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rB, rHi, rB, rOL, _, _, _, _, _, _, _, _],
  [_, _, rOL, rB, rEw, rEy, rB, rB, rOL, _, _, _, _, _, _, _],
  [_, _, rOL, rB, rB, rNo, rB, rB, rOL, _, _, _, _, _, _, _],
  [_, _, _, rOL, rB, rB, rHi, rB, rB, rOL, _, _, _, _, _, _],
  [_, _, _, rOL, rSh, rB, rB, rB, rB, rB, rOL, _, _, _, _, _],
  [_, _, _, rOL, rSh, rB, rB, rB, rB, rOL, _, _, _, _, _, _],
  [_, _, _, _, rOL, rSh, rB, rB, rOL, _, _, _, _, _, _, _],
  [_, _, _, rOL, rOL, _, _, rOL, rOL, _, _, _, _, _, _, _],
  [_, _, _, rOL, rSh, _, _, rSh, rOL, _, _, _, _, _, _, _],
  [_, _, rOL, rOL, rOL, _, _, rOL, rOL, rOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const RABBIT_WALK2: SpriteFrame = [
  [_, _, _, _, rOL, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rB, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, rOL, rOL, rOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rB, rHi, rB, rOL, _, _, _, _, _, _, _, _],
  [_, _, rOL, rB, rEw, rEy, rB, rB, rOL, _, _, _, _, _, _, _],
  [_, _, rOL, rB, rB, rNo, rB, rB, rOL, _, _, _, _, _, _, _],
  [_, _, _, rOL, rB, rB, rHi, rB, rB, rOL, _, _, _, _, _, _],
  [_, _, _, rOL, rSh, rB, rB, rB, rB, rB, rOL, _, _, _, _, _],
  [_, _, _, rOL, rSh, rB, rB, rB, rB, rOL, _, _, _, _, _, _],
  [_, _, _, _, rOL, rSh, rB, rB, rOL, _, _, _, _, _, _, _],
  [_, _, _, _, rOL, rOL, rOL, rOL, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rSh, _, _, _, rSh, rOL, _, _, _, _, _, _],
  [_, _, rOL, rOL, _, _, _, _, rOL, rOL, rOL, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const RABBIT_IDLE: SpriteFrame = [
  [_, _, _, _, rOL, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rEi, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rB, rOL, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, rOL, rOL, rOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, rOL, rB, rHi, rB, rOL, _, _, _, _, _, _, _, _],
  [_, _, rOL, rB, rEy, rEy, rB, rB, rOL, _, _, _, _, _, _, _],
  [_, _, rOL, rB, rB, rNo, rB, rB, rOL, _, _, _, _, _, _, _],
  [_, _, _, rOL, rB, rB, rHi, rB, rB, rOL, _, _, _, _, _, _],
  [_, _, _, rOL, rSh, rB, rB, rB, rB, rB, rOL, _, _, _, _, _],
  [_, _, _, rOL, rSh, rB, rB, rB, rB, rOL, _, _, _, _, _, _],
  [_, _, _, _, rOL, rSh, rB, rB, rOL, _, _, _, _, _, _, _],
  [_, _, _, rOL, rOL, _, _, rOL, rOL, _, _, _, _, _, _, _],
  [_, _, _, rOL, rSh, _, _, rSh, rOL, _, _, _, _, _, _, _],
  [_, _, rOL, rOL, rOL, _, _, rOL, rOL, rOL, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// ============================================================
// FOX (16x16) — orange body, white chest V-shape, dark ear tips, bushy tail
// ============================================================
const fOL = "#803828"; // outline
const fB  = "#d06828"; // body orange
const fSh = "#a85020"; // shadow
const fHi = "#e08838"; // highlight
const fWh = "#f0e8e0"; // white (chest, muzzle)
const fEt = "#602818"; // ear tips dark
const fNo = "#222222"; // nose
const fEy = "#382818"; // eye dark
const fEw = "#fff";    // eye highlight

const FOX_WALK1: SpriteFrame = [
  [_, _, _, fOL, fOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fEt, fOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fOL, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, fOL, fB, fB, fHi, fOL, _, _, _, _, _, _, fOL, _, _, _],
  [_, fOL, fEw, fEy, fB, fB, fOL, _, _, _, _, fOL, fB, fOL, _, _],
  [fOL, fWh, fWh, fNo, fWh, fB, fB, fOL, fOL, fOL, fOL, fB, fHi, fOL, _, _],
  [_, fOL, fWh, fB, fB, fB, fB, fB, fB, fB, fB, fOL, fWh, fOL, _, _],
  [_, _, fOL, fB, fSh, fWh, fWh, fB, fB, fB, fOL, _, fOL, _, _, _],
  [_, _, fOL, fB, fSh, fWh, fWh, fWh, fB, fOL, _, _, _, _, _, _],
  [_, _, _, fOL, fB, fWh, fWh, fB, fOL, _, _, _, _, _, _, _],
  [_, _, _, fOL, fSh, fB, fB, fOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, fOL, fB, fOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fOL, _, fOL, fOL, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fSh, _, fSh, fOL, _, _, _, _, _, _, _, _],
  [_, _, fOL, fOL, _, _, _, fOL, fOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const FOX_WALK2: SpriteFrame = [
  [_, _, _, fOL, fOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fEt, fOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fOL, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, fOL, fB, fB, fHi, fOL, _, _, _, _, _, _, fOL, _, _, _],
  [_, fOL, fEw, fEy, fB, fB, fOL, _, _, _, _, fOL, fB, fOL, _, _],
  [fOL, fWh, fWh, fNo, fWh, fB, fB, fOL, fOL, fOL, fOL, fB, fHi, fOL, _, _],
  [_, fOL, fWh, fB, fB, fB, fB, fB, fB, fB, fB, fOL, fWh, fOL, _, _],
  [_, _, fOL, fB, fSh, fWh, fWh, fB, fB, fB, fOL, _, fOL, _, _, _],
  [_, _, fOL, fB, fSh, fWh, fWh, fWh, fB, fOL, _, _, _, _, _, _],
  [_, _, _, fOL, fB, fWh, fWh, fB, fOL, _, _, _, _, _, _, _],
  [_, _, _, fOL, fSh, fB, fB, fOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, fOL, fB, fOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, fOL, fOL, fOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fSh, _, _, fSh, fOL, _, _, _, _, _, _, _],
  [_, _, _, _, fOL, _, fOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const FOX_IDLE: SpriteFrame = [
  [_, _, _, fOL, fOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fEt, fOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, fOL, fB, fOL, fOL, _, _, _, _, _, _, _, _, _, _],
  [_, fOL, fB, fB, fHi, fOL, _, _, _, _, _, _, fOL, _, _, _],
  [_, fOL, fEy, fEy, fB, fB, fOL, _, _, _, _, fOL, fB, fOL, _, _],
  [fOL, fWh, fWh, fNo, fWh, fB, fB, fOL, fOL, fOL, fOL, fB, fHi, fOL, _, _],
  [_, fOL, fWh, fB, fB, fB, fB, fB, fB, fB, fB, fOL, fWh, fOL, _, _],
  [_, _, fOL, fB, fSh, fWh, fWh, fB, fB, fB, fOL, _, fOL, _, _, _],
  [_, _, fOL, fB, fSh, fWh, fWh, fWh, fB, fOL, _, _, _, _, _, _],
  [_, _, _, fOL, fB, fWh, fWh, fB, fOL, _, _, _, _, _, _, _],
  [_, _, _, fOL, fSh, fB, fB, fOL, _, _, _, _, _, _, _, _],
  [_, _, _, _, fOL, fB, fOL, _, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fOL, _, fOL, fOL, _, _, _, _, _, _, _, _],
  [_, _, _, fOL, fSh, _, fSh, fOL, _, _, _, _, _, _, _, _],
  [_, _, fOL, fOL, _, _, _, fOL, fOL, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// ============================================================
// FROG (16x16) — bright green, wide flat body, big eye bumps
// ============================================================
const gOL = "#285828"; // outline
const gB  = "#60b848"; // body green
const gSh = "#489038"; // shadow
const gHi = "#80d060"; // highlight
const gBe = "#98d878"; // belly lighter green
const gEb = "#f0f0e0"; // eye white/background
const gEp = "#282828"; // eye pupil

const FROG_WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, gOL, gOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, gOL, gEb, gEp, gOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, gOL, gOL, gOL, gOL, gOL, _, _, _, _, _, _, _, _, _, _],
  [_, gOL, gB, gB, gHi, gB, gOL, gOL, _, _, _, _, _, _, _, _],
  [gOL, gB, gB, gB, gB, gB, gB, gB, gOL, gOL, _, _, _, _, _, _],
  [gOL, gB, gB, gB, gB, gB, gB, gB, gB, gB, gOL, gOL, _, _, _, _],
  [gOL, gB, gB, gBe, gBe, gBe, gBe, gB, gB, gB, gB, gOL, _, _, _, _],
  [gOL, gSh, gB, gBe, gBe, gBe, gBe, gBe, gB, gB, gB, gOL, _, _, _, _],
  [_, gOL, gSh, gB, gBe, gBe, gBe, gB, gB, gB, gOL, _, _, _, _, _],
  [_, _, gOL, gSh, gB, gB, gB, gB, gB, gOL, _, _, _, _, _, _],
  [_, _, _, gOL, gOL, gB, gB, gOL, gOL, _, _, _, _, _, _, _],
  [_, _, gOL, gOL, _, gOL, gOL, _, gOL, gOL, _, _, _, _, _, _],
  [_, gOL, gSh, gSh, gOL, _, _, gOL, gSh, gSh, gOL, _, _, _, _, _],
  [_, gOL, gOL, gOL, gOL, _, _, gOL, gOL, gOL, gOL, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const FROG_WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, gOL, gOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, gOL, gEb, gEp, gOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, gOL, gOL, gOL, gOL, gOL, _, _, _, _, _, _, _, _, _, _],
  [_, gOL, gB, gB, gHi, gB, gOL, gOL, _, _, _, _, _, _, _, _],
  [gOL, gB, gB, gB, gB, gB, gB, gB, gOL, gOL, _, _, _, _, _, _],
  [gOL, gB, gB, gB, gB, gB, gB, gB, gB, gB, gOL, gOL, _, _, _, _],
  [gOL, gB, gB, gBe, gBe, gBe, gBe, gB, gB, gB, gB, gOL, _, _, _, _],
  [gOL, gSh, gB, gBe, gBe, gBe, gBe, gBe, gB, gB, gB, gOL, _, _, _, _],
  [_, gOL, gSh, gB, gBe, gBe, gBe, gB, gB, gB, gOL, _, _, _, _, _],
  [_, _, gOL, gSh, gB, gB, gB, gB, gB, gOL, _, _, _, _, _, _],
  [_, _, _, gOL, gOL, gB, gB, gOL, gOL, _, _, _, _, _, _, _],
  [_, gOL, gOL, _, _, gOL, gOL, _, _, gOL, gOL, _, _, _, _, _],
  [gOL, gSh, gSh, gOL, _, _, _, _, gOL, gSh, gSh, gOL, _, _, _, _],
  [gOL, gOL, gOL, gOL, _, _, _, _, gOL, gOL, gOL, gOL, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const FROG_IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, gOL, gOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, gOL, gEp, gEp, gOL, _, _, _, _, _, _, _, _, _, _, _],
  [_, gOL, gOL, gOL, gOL, gOL, _, _, _, _, _, _, _, _, _, _],
  [_, gOL, gB, gB, gHi, gB, gOL, gOL, _, _, _, _, _, _, _, _],
  [gOL, gB, gB, gB, gB, gB, gB, gB, gOL, gOL, _, _, _, _, _, _],
  [gOL, gB, gB, gB, gB, gB, gB, gB, gB, gB, gOL, gOL, _, _, _, _],
  [gOL, gB, gB, gBe, gBe, gBe, gBe, gB, gB, gB, gB, gOL, _, _, _, _],
  [gOL, gSh, gB, gBe, gBe, gBe, gBe, gBe, gB, gB, gB, gOL, _, _, _, _],
  [_, gOL, gSh, gB, gBe, gBe, gBe, gB, gB, gB, gOL, _, _, _, _, _],
  [_, _, gOL, gSh, gB, gB, gB, gB, gB, gOL, _, _, _, _, _, _],
  [_, _, _, gOL, gOL, gB, gB, gOL, gOL, _, _, _, _, _, _, _],
  [_, _, gOL, gOL, _, gOL, gOL, _, gOL, gOL, _, _, _, _, _, _],
  [_, gOL, gSh, gSh, gOL, _, _, gOL, gSh, gSh, gOL, _, _, _, _, _],
  [_, gOL, gOL, gOL, gOL, _, _, gOL, gOL, gOL, gOL, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// ============================================================
// TURTLE (16x16) — dome shell with pattern, green head/limbs
// ============================================================
const tOL = "#384028"; // outline
const tSh = "#887848"; // shell brown
const tSH = "#a89858"; // shell highlight
const tSD = "#686038"; // shell dark
const tBd = "#58a048"; // body/head green
const tBs = "#408038"; // body shadow green
const tEy = "#202020"; // eye dark
const tEw = "#fff";    // eye highlight

const TURTLE_WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, tOL, tOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, tOL, tBd, tBd, tOL, _, _, _, _, _, _, _, _, _, _, _],
  [tOL, tBd, tEw, tEy, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _, _, _, _],
  [_, tOL, tBd, tBd, tOL, tSh, tSH, tSH, tSh, tSh, tOL, _, _, _, _, _],
  [_, _, tOL, tOL, tSh, tSD, tSh, tSH, tSh, tSD, tSh, tOL, _, _, _, _],
  [_, _, _, tOL, tSh, tSH, tSD, tSh, tSD, tSH, tSh, tOL, _, _, _, _],
  [_, _, _, tOL, tSh, tSD, tSH, tSH, tSH, tSD, tSh, tOL, _, _, _, _],
  [_, _, _, tOL, tOL, tSh, tSh, tSh, tSh, tSh, tOL, tOL, _, _, _, _],
  [_, _, _, _, tOL, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _, _, _],
  [_, _, _, tOL, tOL, _, _, _, _, _, tOL, tOL, _, _, _, _],
  [_, _, _, tOL, tBs, _, _, _, _, _, tBs, tOL, _, _, _, _],
  [_, _, tOL, tOL, _, _, _, _, _, _, _, tOL, tOL, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const TURTLE_WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, tOL, tOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, tOL, tBd, tBd, tOL, _, _, _, _, _, _, _, _, _, _, _],
  [tOL, tBd, tEw, tEy, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _, _, _, _],
  [_, tOL, tBd, tBd, tOL, tSh, tSH, tSH, tSh, tSh, tOL, _, _, _, _, _],
  [_, _, tOL, tOL, tSh, tSD, tSh, tSH, tSh, tSD, tSh, tOL, _, _, _, _],
  [_, _, _, tOL, tSh, tSH, tSD, tSh, tSD, tSH, tSh, tOL, _, _, _, _],
  [_, _, _, tOL, tSh, tSD, tSH, tSH, tSH, tSD, tSh, tOL, _, _, _, _],
  [_, _, _, tOL, tOL, tSh, tSh, tSh, tSh, tSh, tOL, tOL, _, _, _, _],
  [_, _, _, _, tOL, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _, _, _],
  [_, _, _, _, tOL, tOL, _, _, _, tOL, tOL, _, _, _, _, _],
  [_, _, _, tOL, tBs, _, _, _, _, _, _, tBs, tOL, _, _, _],
  [_, _, _, _, tOL, _, _, _, _, _, tOL, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

const TURTLE_IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, tOL, tOL, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, tOL, tBd, tBd, tOL, _, _, _, _, _, _, _, _, _, _, _],
  [tOL, tBd, tEy, tEy, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _, _, _, _],
  [_, tOL, tBd, tBd, tOL, tSh, tSH, tSH, tSh, tSh, tOL, _, _, _, _, _],
  [_, _, tOL, tOL, tSh, tSD, tSh, tSH, tSh, tSD, tSh, tOL, _, _, _, _],
  [_, _, _, tOL, tSh, tSH, tSD, tSh, tSD, tSH, tSh, tOL, _, _, _, _],
  [_, _, _, tOL, tSh, tSD, tSH, tSH, tSH, tSD, tSh, tOL, _, _, _, _],
  [_, _, _, tOL, tOL, tSh, tSh, tSh, tSh, tSh, tOL, tOL, _, _, _, _],
  [_, _, _, _, tOL, tOL, tOL, tOL, tOL, tOL, tOL, _, _, _, _, _],
  [_, _, _, tOL, tOL, _, _, _, _, _, tOL, tOL, _, _, _, _],
  [_, _, _, tOL, tBs, _, _, _, _, _, tBs, tOL, _, _, _, _],
  [_, _, tOL, tOL, _, _, _, _, _, _, _, tOL, tOL, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const SPRITE_SHEETS: Record<string, SpriteSheet> = {
  bird: { walk1: BIRD_WALK1, walk2: BIRD_WALK2, idle: BIRD_IDLE },
  cat: { walk1: CAT_WALK1, walk2: CAT_WALK2, idle: CAT_IDLE },
  dog: { walk1: DOG_WALK1, walk2: DOG_WALK2, idle: DOG_IDLE },
  rabbit: { walk1: RABBIT_WALK1, walk2: RABBIT_WALK2, idle: RABBIT_IDLE },
  hamster: { walk1: HAMSTER_WALK1, walk2: HAMSTER_WALK2, idle: HAMSTER_IDLE },
  fox: { walk1: FOX_WALK1, walk2: FOX_WALK2, idle: FOX_IDLE },
  frog: { walk1: FROG_WALK1, walk2: FROG_WALK2, idle: FROG_IDLE },
  turtle: { walk1: TURTLE_WALK1, walk2: TURTLE_WALK2, idle: TURTLE_IDLE },
};

// Render a sprite frame to a data URL at exact target size using nearest-neighbor scaling
function renderFrame(frame: SpriteFrame, targetSize: number): string {
  const h = frame.length;
  const w = frame[0].length;

  // Render at native resolution first
  const native = document.createElement("canvas");
  native.width = w;
  native.height = h;
  const nctx = native.getContext("2d")!;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const color = frame[y][x];
      if (color) {
        nctx.fillStyle = color;
        nctx.fillRect(x, y, 1, 1);
      }
    }
  }

  // Scale to exact target size with nearest-neighbor (pixelated)
  const scaled = document.createElement("canvas");
  scaled.width = targetSize;
  scaled.height = targetSize;
  const sctx = scaled.getContext("2d")!;
  sctx.imageSmoothingEnabled = false;
  sctx.drawImage(native, 0, 0, targetSize, targetSize);

  return scaled.toDataURL();
}

// Cache rendered frames
const frameCache = new Map<string, string>();

export function getSpriteFrameURL(type: string, frame: "walk1" | "walk2" | "idle", size: number): string | null {
  const sheet = SPRITE_SHEETS[type];
  if (!sheet) return null;

  const key = `${type}-${frame}-${size}`;
  if (frameCache.has(key)) return frameCache.get(key)!;

  const spriteFrame = sheet[frame];
  const url = renderFrame(spriteFrame, size);
  frameCache.set(key, url);
  return url;
}

export function hasSprite(type: string): boolean {
  return type in SPRITE_SHEETS;
}
