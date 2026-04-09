// Pixel art sprite definitions — each frame is a 2D array of hex colors (null = transparent)
// Sprites are defined at native pixel size, rendered to canvas, then scaled to CRITTER_SIZE

type SpriteFrame = (string | null)[][];

export interface SpriteSheet {
  walk1: SpriteFrame;
  walk2: SpriteFrame;
  idle: SpriteFrame;
}

// --- Bird sprite (12x12) ---
const _ = null;
const B = "#4a90d9"; // body blue
const D = "#3a70b0"; // dark blue (shadow/wing)
const W = "#ffffff"; // white (eye)
const P = "#111111"; // pupil
const K = "#f5a623"; // beak orange
const L = "#c47d1a"; // beak dark
const F = "#e8871e"; // feet orange

const BIRD_WALK1: SpriteFrame = [
  [_, _, _, _, B, B, B, _, _, _, _, _],
  [_, _, _, B, B, B, B, B, _, _, _, _],
  [_, _, B, B, B, B, B, B, B, _, _, _],
  [_, B, B, W, P, B, B, B, B, B, _, _],
  [_, B, B, B, B, B, B, B, B, B, _, _],
  [K, K, B, B, B, B, B, D, D, B, _, _],
  [_, K, B, B, B, B, D, D, B, _, _, _],
  [_, _, B, B, B, B, B, B, _, _, _, _],
  [_, _, _, B, B, B, B, _, _, _, _, _],
  [_, _, _, _, B, B, _, _, _, _, _, _],
  [_, _, _, F, F, _, F, F, _, _, _, _],
  [_, _, _, F, _, _, _, F, _, _, _, _],
];

const BIRD_WALK2: SpriteFrame = [
  [_, _, _, _, B, B, B, _, _, _, _, _],
  [_, _, _, B, B, B, B, B, _, _, _, _],
  [_, _, B, B, B, B, B, B, B, _, _, _],
  [_, B, B, W, P, B, B, B, B, B, _, _],
  [_, B, B, B, B, B, B, B, B, B, _, _],
  [K, K, B, B, B, B, B, D, D, B, _, _],
  [_, K, B, B, B, B, D, D, B, _, _, _],
  [_, _, B, B, B, B, B, B, _, _, _, _],
  [_, _, _, B, B, B, B, _, _, _, _, _],
  [_, _, _, _, B, B, _, _, _, _, _, _],
  [_, _, F, F, _, _, F, F, _, _, _, _],
  [_, _, _, F, _, _, F, _, _, _, _, _],
];

const BIRD_IDLE: SpriteFrame = [
  [_, _, _, _, B, B, B, _, _, _, _, _],
  [_, _, _, B, B, B, B, B, _, _, _, _],
  [_, _, B, B, B, B, B, B, B, _, _, _],
  [_, B, B, P, P, B, B, B, B, B, _, _],
  [_, B, B, B, B, B, B, B, B, B, _, _],
  [K, K, B, B, B, B, B, B, B, B, _, _],
  [_, K, B, B, B, B, B, B, B, _, _, _],
  [_, _, B, B, B, B, B, B, _, _, _, _],
  [_, _, _, B, B, B, B, _, _, _, _, _],
  [_, _, _, _, B, B, _, _, _, _, _, _],
  [_, _, _, F, F, _, F, F, _, _, _, _],
  [_, _, _, F, _, _, _, F, _, _, _, _],
];

// --- Cat sprite (12x12) — orange/ginger tabby ---
const cO = "#e8943a"; // orange body
const cD = "#c47020"; // dark orange (stripes/shadow)
const cL = "#f5b860"; // light orange (belly)
const cW = "#ffffff"; // white (eye)
const cP = "#111111"; // pupil
const cN = "#f5a0b0"; // nose pink
const cF = "#c47020"; // feet dark

const CAT_WALK1: SpriteFrame = [
  [_, _, _, _, cO, _, _, _, _, _, _, _],
  [_, _, _, cO, cO, _, _, _, _, _, _, _],
  [_, _, cO, cO, cO, cO, _, _, _, cO, _, _],
  [_, cO, cO, cW, cP, cO, cO, _, _, cO, _, _],
  [_, cO, cO, cO, cO, cO, cO, cO, cO, cO, _, _],
  [cN, cO, cO, cO, cO, cO, cO, cO, _, _, _, _],
  [_, _, cO, cD, cO, cL, cL, cO, _, _, _, _],
  [_, _, _, cO, cO, cL, cO, cO, _, _, _, _],
  [_, _, _, _, cO, cO, cO, _, _, _, _, _],
  [_, _, _, _, _, cO, _, _, _, _, _, _],
  [_, _, _, cF, cF, _, cF, cF, _, _, _, _],
  [_, _, _, cF, _, _, _, cF, _, _, _, _],
];

const CAT_WALK2: SpriteFrame = [
  [_, _, _, _, cO, _, _, _, _, _, _, _],
  [_, _, _, cO, cO, _, _, _, _, _, _, _],
  [_, _, cO, cO, cO, cO, _, _, _, cO, _, _],
  [_, cO, cO, cW, cP, cO, cO, _, _, cO, _, _],
  [_, cO, cO, cO, cO, cO, cO, cO, cO, cO, _, _],
  [cN, cO, cO, cO, cO, cO, cO, cO, _, _, _, _],
  [_, _, cO, cD, cO, cL, cL, cO, _, _, _, _],
  [_, _, _, cO, cO, cL, cO, cO, _, _, _, _],
  [_, _, _, _, cO, cO, cO, _, _, _, _, _],
  [_, _, _, _, _, cO, _, _, _, _, _, _],
  [_, _, cF, cF, _, _, _, cF, cF, _, _, _],
  [_, _, _, cF, _, _, _, cF, _, _, _, _],
];

const CAT_IDLE: SpriteFrame = [
  [_, _, _, _, cO, _, _, _, _, _, _, _],
  [_, _, _, cO, cO, _, _, _, _, _, _, _],
  [_, _, cO, cO, cO, cO, _, _, _, cO, _, _],
  [_, cO, cO, cP, cP, cO, cO, _, _, cO, _, _],
  [_, cO, cO, cO, cO, cO, cO, cO, cO, cO, _, _],
  [cN, cO, cO, cO, cO, cO, cO, cO, _, _, _, _],
  [_, _, cO, cD, cO, cL, cL, cO, _, _, _, _],
  [_, _, _, cO, cO, cL, cO, cO, _, _, _, _],
  [_, _, _, _, cO, cO, cO, _, _, _, _, _],
  [_, _, _, _, _, cO, _, _, _, _, _, _],
  [_, _, _, cF, cF, _, cF, cF, _, _, _, _],
  [_, _, _, cF, _, _, _, cF, _, _, _, _],
];

// --- Dog sprite (12x12) — brown/tan ---
const dB = "#8b6b3d"; // brown body
const dD = "#6b4d2a"; // dark brown (ears/shadow)
const dT = "#c4a265"; // tan (belly/muzzle)
const dW = "#ffffff"; // white (eye)
const dP = "#111111"; // pupil/nose
const dN = "#222222"; // nose
const dF = "#6b4d2a"; // feet dark

const DOG_WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, dB, dB, dB, dB, _, _, _, _, _],
  [_, _, dB, dB, dB, dB, dB, dB, _, _, _, _],
  [_, dB, dB, dW, dP, dB, dB, dB, _, _, _, _],
  [_, dD, dD, dB, dB, dB, dB, dB, _, _, _, _],
  [dT, dT, dN, dB, dB, dB, dB, dB, dB, _, _, _],
  [_, _, dB, dB, dT, dT, dB, dB, dB, dB, _, _],
  [_, _, _, dB, dT, dT, dB, dB, dB, _, _, _],
  [_, _, _, _, dB, dB, dB, dB, _, _, _, _],
  [_, _, _, _, _, dB, dB, _, _, _, _, _],
  [_, _, _, dF, dF, _, _, dF, dF, _, _, _],
  [_, _, _, dF, _, _, _, _, dF, _, _, _],
];

const DOG_WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, dB, dB, dB, dB, _, _, _, _, _],
  [_, _, dB, dB, dB, dB, dB, dB, _, _, _, _],
  [_, dB, dB, dW, dP, dB, dB, dB, _, _, _, _],
  [_, dD, dD, dB, dB, dB, dB, dB, _, _, _, _],
  [dT, dT, dN, dB, dB, dB, dB, dB, dB, _, _, _],
  [_, _, dB, dB, dT, dT, dB, dB, dB, dB, _, _],
  [_, _, _, dB, dT, dT, dB, dB, dB, _, _, _],
  [_, _, _, _, dB, dB, dB, dB, _, _, _, _],
  [_, _, _, _, _, dB, dB, _, _, _, _, _],
  [_, _, dF, dF, _, _, _, _, _, dF, dF, _],
  [_, _, _, dF, _, _, _, _, _, dF, _, _],
];

const DOG_IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, dB, dB, dB, dB, _, _, _, _, _],
  [_, _, dB, dB, dB, dB, dB, dB, _, _, _, _],
  [_, dB, dB, dP, dP, dB, dB, dB, _, _, _, _],
  [_, dD, dD, dB, dB, dB, dB, dB, _, _, _, _],
  [dT, dT, dN, dB, dB, dB, dB, dB, dB, _, _, _],
  [_, _, dB, dB, dT, dT, dB, dB, dB, dB, _, _],
  [_, _, _, dB, dT, dT, dB, dB, dB, _, _, _],
  [_, _, _, _, dB, dB, dB, dB, _, _, _, _],
  [_, _, _, _, _, dB, dB, _, _, _, _, _],
  [_, _, _, dF, dF, _, _, dF, dF, _, _, _],
  [_, _, _, dF, _, _, _, _, dF, _, _, _],
];

// --- Rabbit sprite (12x12) — light pink/white with long ears ---
const rW = "#f0e8e8"; // white body
const rP = "#f5c0c8"; // pink (ears inner/nose)
const rD = "#d8d0d0"; // shadow white
const rE = "#111111"; // pupil
const rN = "#e8707a"; // nose dark pink
const rF = "#d8d0d0"; // feet

const RABBIT_WALK1: SpriteFrame = [
  [_, _, _, _, rW, _, _, _, rW, _, _, _],
  [_, _, _, _, rW, _, _, _, rW, _, _, _],
  [_, _, _, rP, rW, _, _, rP, rW, _, _, _],
  [_, _, _, rP, rW, _, _, rP, rW, _, _, _],
  [_, _, _, _, rW, rW, rW, rW, _, _, _, _],
  [_, _, _, rW, rW, rW, rW, rW, rW, _, _, _],
  [_, _, _, rW, rW, rE, rW, rW, rE, _, _, _],
  [_, _, _, rW, rW, rN, rN, rW, rW, _, _, _],
  [_, _, _, _, rW, rW, rW, rW, _, _, _, _],
  [_, _, _, _, rD, rW, rW, rD, _, _, _, _],
  [_, _, _, rF, rF, _, _, rF, rF, _, _, _],
  [_, _, rF, rF, _, _, _, _, rF, rF, _, _],
];

const RABBIT_WALK2: SpriteFrame = [
  [_, _, _, _, rW, _, _, _, rW, _, _, _],
  [_, _, _, _, rW, _, _, _, rW, _, _, _],
  [_, _, _, rP, rW, _, _, rP, rW, _, _, _],
  [_, _, _, rP, rW, _, _, rP, rW, _, _, _],
  [_, _, _, _, rW, rW, rW, rW, _, _, _, _],
  [_, _, _, rW, rW, rW, rW, rW, rW, _, _, _],
  [_, _, _, rW, rW, rE, rW, rW, rE, _, _, _],
  [_, _, _, rW, rW, rN, rN, rW, rW, _, _, _],
  [_, _, _, _, rW, rW, rW, rW, _, _, _, _],
  [_, _, _, _, rD, rW, rW, rD, _, _, _, _],
  [_, _, rF, rF, _, _, _, _, rF, rF, _, _],
  [_, _, _, rF, _, _, _, _, rF, _, _, _],
];

const RABBIT_IDLE: SpriteFrame = [
  [_, _, _, _, rW, _, _, _, rW, _, _, _],
  [_, _, _, _, rW, _, _, _, rW, _, _, _],
  [_, _, _, rP, rW, _, _, rP, rW, _, _, _],
  [_, _, _, rP, rW, _, _, rP, rW, _, _, _],
  [_, _, _, _, rW, rW, rW, rW, _, _, _, _],
  [_, _, _, rW, rW, rW, rW, rW, rW, _, _, _],
  [_, _, _, rW, rW, rE, rW, rW, rE, _, _, _],
  [_, _, rN, rW, rN, rN, rN, rW, rW, _, _, _],
  [_, _, _, _, rW, rW, rW, rW, _, _, _, _],
  [_, _, _, _, rD, rW, rW, rD, _, _, _, _],
  [_, _, _, rF, rF, _, _, rF, rF, _, _, _],
  [_, _, rF, rF, _, _, _, _, rF, rF, _, _],
];

// --- Hamster sprite (12x12) — golden/brown, round body ---
const hG = "#daa520"; // golden body
const hB = "#b8860b"; // brown (darker)
const hC = "#f5deb3"; // cream (cheeks/belly)
const hW = "#ffffff"; // white (eye)
const hP = "#111111"; // pupil
const hN = "#e8707a"; // nose pink
const hE = "#c49840"; // ear inner
const hF = "#b8860b"; // feet

const HAMSTER_WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, hB, hB, _, _, _, _, _, _],
  [_, _, _, hG, hG, hG, hG, _, _, _, _, _],
  [_, _, hG, hG, hG, hG, hG, hG, _, _, _, _],
  [_, hG, hG, hW, hP, hG, hG, hG, hG, _, _, _],
  [_, hG, hG, hG, hN, hC, hC, hG, hG, _, _, _],
  [_, hG, hG, hC, hC, hC, hC, hG, hG, _, _, _],
  [_, _, hG, hG, hC, hC, hG, hG, _, _, _, _],
  [_, _, _, hG, hG, hG, hG, hG, _, _, _, _],
  [_, _, _, _, hG, hG, hG, _, _, _, _, _],
  [_, _, _, _, hF, _, hF, _, _, _, _, _],
  [_, _, _, _, hF, _, hF, _, _, _, _, _],
];

const HAMSTER_WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, hB, hB, _, _, _, _, _, _],
  [_, _, _, hG, hG, hG, hG, _, _, _, _, _],
  [_, _, hG, hG, hG, hG, hG, hG, _, _, _, _],
  [_, hG, hG, hW, hP, hG, hG, hG, hG, _, _, _],
  [_, hG, hG, hG, hN, hC, hC, hG, hG, _, _, _],
  [_, hG, hG, hC, hC, hC, hC, hG, hG, _, _, _],
  [_, _, hG, hG, hC, hC, hG, hG, _, _, _, _],
  [_, _, _, hG, hG, hG, hG, hG, _, _, _, _],
  [_, _, _, _, hG, hG, hG, _, _, _, _, _],
  [_, _, _, hF, _, _, _, hF, _, _, _, _],
  [_, _, _, hF, _, _, _, hF, _, _, _, _],
];

const HAMSTER_IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, hB, hB, _, _, _, _, _, _],
  [_, _, _, hG, hG, hG, hG, _, _, _, _, _],
  [_, _, hG, hG, hG, hG, hG, hG, _, _, _, _],
  [_, hG, hG, hP, hP, hG, hG, hG, hG, _, _, _],
  [_, hG, hG, hG, hN, hC, hC, hG, hG, _, _, _],
  [_, hG, hG, hC, hC, hC, hC, hG, hG, _, _, _],
  [_, _, hG, hG, hC, hC, hG, hG, _, _, _, _],
  [_, _, _, hG, hG, hG, hG, hG, _, _, _, _],
  [_, _, _, _, hG, hG, hG, _, _, _, _, _],
  [_, _, _, _, hF, _, hF, _, _, _, _, _],
  [_, _, _, _, hF, _, hF, _, _, _, _, _],
];

// --- Fox sprite (12x12) — orange/red with white belly, pointy ears ---
const fO = "#e05820"; // orange body
const fR = "#c04018"; // red-orange (dark)
const fW = "#f0e8e0"; // white (belly/face)
const fE = "#ffffff"; // white (eye)
const fP = "#111111"; // pupil/nose
const fN = "#222222"; // nose
const fT = "#f0e8e0"; // tail tip white
const fF = "#333333"; // feet dark

const FOX_WALK1: SpriteFrame = [
  [_, _, _, fO, fO, _, _, _, fO, fO, _, _],
  [_, _, _, fR, fO, _, _, _, fO, fR, _, _],
  [_, _, _, _, fO, fO, fO, fO, fO, _, _, _],
  [_, _, _, fO, fO, fO, fO, fO, fO, _, _, _],
  [_, _, fO, fO, fE, fP, fO, fE, fP, fO, _, _],
  [_, _, fO, fO, fW, fN, fW, fO, fO, fO, _, _],
  [_, _, _, fO, fO, fW, fW, fO, fO, _, _, _],
  [_, _, fO, fO, fO, fW, fW, fO, fO, fO, _, _],
  [_, _, fO, fO, fO, fW, fW, fO, fO, fO, _, _],
  [_, _, _, fO, fO, fO, fO, fO, fO, _, _, _],
  [_, _, fF, fF, _, _, _, _, fF, fF, _, _],
  [_, _, fF, _, _, _, _, _, _, fF, _, _],
];

const FOX_WALK2: SpriteFrame = [
  [_, _, _, fO, fO, _, _, _, fO, fO, _, _],
  [_, _, _, fR, fO, _, _, _, fO, fR, _, _],
  [_, _, _, _, fO, fO, fO, fO, fO, _, _, _],
  [_, _, _, fO, fO, fO, fO, fO, fO, _, _, _],
  [_, _, fO, fO, fE, fP, fO, fE, fP, fO, _, _],
  [_, _, fO, fO, fW, fN, fW, fO, fO, fO, _, _],
  [_, _, _, fO, fO, fW, fW, fO, fO, _, _, _],
  [_, _, fO, fO, fO, fW, fW, fO, fO, fO, _, _],
  [_, _, fO, fO, fO, fW, fW, fO, fO, fO, _, _],
  [_, _, _, fO, fO, fO, fO, fO, fO, _, _, _],
  [_, _, _, fF, fF, _, _, fF, fF, _, _, _],
  [_, _, _, _, fF, _, _, fF, _, _, _, _],
];

const FOX_IDLE: SpriteFrame = [
  [_, _, _, fO, fO, _, _, _, fO, fO, _, _],
  [_, _, _, fR, fO, _, _, _, fO, fR, _, _],
  [_, _, _, _, fO, fO, fO, fO, fO, _, _, _],
  [_, _, _, fO, fO, fO, fO, fO, fO, _, _, _],
  [_, _, fO, fO, fP, fP, fO, fP, fP, fO, _, _],
  [_, _, fO, fO, fW, fN, fW, fO, fO, fO, _, _],
  [_, _, _, fO, fO, fW, fW, fO, fO, _, _, _],
  [_, _, fO, fO, fO, fW, fW, fO, fO, fO, _, _],
  [_, _, fO, fO, fO, fW, fW, fO, fO, fO, _, _],
  [_, _, _, fO, fO, fO, fO, fO, fO, _, _, _],
  [_, _, fF, fF, _, _, _, _, fF, fF, _, _],
  [_, _, fF, _, _, _, _, _, _, fF, _, _],
];

// --- Frog sprite (12x12) — bright green, wide body ---
const gG = "#3cb043"; // green body
const gD = "#2d8a35"; // dark green (shadow)
const gL = "#8fda6e"; // light green (belly)
const gW = "#ffffff"; // white (eye)
const gP = "#111111"; // pupil
const gF = "#2d8a35"; // feet dark green

const FROG_WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, gW, gP, _, _, _, _, _, _, _, _, _],
  [_, gG, gG, gG, _, _, _, _, _, _, _, _],
  [gG, gG, gG, gG, gG, gG, _, _, _, _, _, _],
  [gG, gG, gG, gG, gG, gG, gG, gG, _, _, _, _],
  [gG, gG, gG, gG, gG, gG, gG, gG, gG, _, _, _],
  [_, gG, gG, gL, gL, gL, gG, gG, gG, _, _, _],
  [_, _, gG, gG, gL, gL, gG, gG, _, _, _, _],
  [_, _, _, gG, gG, gG, gG, _, _, _, _, _],
  [_, _, _, _, gG, gG, _, _, _, _, _, _],
  [_, _, gF, gF, gF, _, gF, gF, _, _, _, _],
  [_, gF, gF, _, _, _, _, gF, gF, _, _, _],
];

const FROG_WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, gW, gP, _, _, _, _, _, _, _, _, _],
  [_, gG, gG, gG, _, _, _, _, _, _, _, _],
  [gG, gG, gG, gG, gG, gG, _, _, _, _, _, _],
  [gG, gG, gG, gG, gG, gG, gG, gG, _, _, _, _],
  [gG, gG, gG, gG, gG, gG, gG, gG, gG, _, _, _],
  [_, gG, gG, gL, gL, gL, gG, gG, gG, _, _, _],
  [_, _, gG, gG, gL, gL, gG, gG, _, _, _, _],
  [_, _, _, gG, gG, gG, gG, _, _, _, _, _],
  [_, _, _, _, gG, gG, _, _, _, _, _, _],
  [_, gF, gF, _, _, _, _, _, gF, gF, _, _],
  [_, _, gF, gF, _, _, _, gF, gF, _, _, _],
];

const FROG_IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, gP, gP, _, _, _, _, _, _, _, _, _],
  [_, gG, gG, gG, _, _, _, _, _, _, _, _],
  [gG, gG, gG, gG, gG, gG, _, _, _, _, _, _],
  [gG, gG, gG, gG, gG, gG, gG, gG, _, _, _, _],
  [gG, gG, gG, gG, gG, gG, gG, gG, gG, _, _, _],
  [_, gG, gG, gL, gL, gL, gG, gG, gG, _, _, _],
  [_, _, gG, gG, gL, gL, gG, gG, _, _, _, _],
  [_, _, _, gG, gG, gG, gG, _, _, _, _, _],
  [_, _, _, _, gG, gG, _, _, _, _, _, _],
  [_, _, gF, gF, gF, _, gF, gF, _, _, _, _],
  [_, gF, gF, _, _, _, _, gF, gF, _, _, _],
];

// --- Turtle sprite (12x12) — green body, brown shell ---
const tG = "#5a9a4a"; // green body/head
const tD = "#3d7a35"; // dark green (limbs)
const tS = "#8b6b3d"; // shell brown
const tH = "#a07840"; // shell highlight
const tL = "#6b9a50"; // light green
const tW = "#ffffff"; // white (eye)
const tP = "#111111"; // pupil
const tF = "#3d7a35"; // feet dark green

const TURTLE_WALK1: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, tG, tG, _, _, _, _, _, _, _, _],
  [_, tG, tG, tW, tP, _, _, _, _, _, _, _],
  [_, _, tG, tG, tG, tS, tS, tS, tS, _, _, _],
  [_, _, _, tG, tS, tS, tH, tH, tS, tS, _, _],
  [_, _, _, tG, tS, tH, tS, tS, tH, tS, _, _],
  [_, _, _, tG, tS, tS, tH, tH, tS, tS, _, _],
  [_, _, _, tG, tS, tS, tS, tS, tS, tS, _, _],
  [_, _, _, _, tG, tG, tG, tG, tG, _, _, _],
  [_, _, _, tF, tF, _, _, tF, tF, _, _, _],
  [_, _, _, tF, _, _, _, _, tF, _, _, _],
];

const TURTLE_WALK2: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, tG, tG, _, _, _, _, _, _, _, _],
  [_, tG, tG, tW, tP, _, _, _, _, _, _, _],
  [_, _, tG, tG, tG, tS, tS, tS, tS, _, _, _],
  [_, _, _, tG, tS, tS, tH, tH, tS, tS, _, _],
  [_, _, _, tG, tS, tH, tS, tS, tH, tS, _, _],
  [_, _, _, tG, tS, tS, tH, tH, tS, tS, _, _],
  [_, _, _, tG, tS, tS, tS, tS, tS, tS, _, _],
  [_, _, _, _, tG, tG, tG, tG, tG, _, _, _],
  [_, _, tF, tF, _, _, _, _, _, tF, tF, _],
  [_, _, _, tF, _, _, _, _, _, tF, _, _],
];

const TURTLE_IDLE: SpriteFrame = [
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, tG, tG, _, _, _, _, _, _, _, _],
  [_, tG, tG, tP, tP, _, _, _, _, _, _, _],
  [_, _, tG, tG, tG, tS, tS, tS, tS, _, _, _],
  [_, _, _, tG, tS, tS, tH, tH, tS, tS, _, _],
  [_, _, _, tG, tS, tH, tS, tS, tH, tS, _, _],
  [_, _, _, tG, tS, tS, tH, tH, tS, tS, _, _],
  [_, _, _, tG, tS, tS, tS, tS, tS, tS, _, _],
  [_, _, _, _, tG, tG, tG, tG, tG, _, _, _],
  [_, _, _, tF, tF, _, _, tF, tF, _, _, _],
  [_, _, _, tF, _, _, _, _, tF, _, _, _],
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
