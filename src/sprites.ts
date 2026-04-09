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

export const SPRITE_SHEETS: Record<string, SpriteSheet> = {
  bird: { walk1: BIRD_WALK1, walk2: BIRD_WALK2, idle: BIRD_IDLE },
};

// Render a sprite frame to a data URL at a given scale
function renderFrame(frame: SpriteFrame, scale: number): string {
  const h = frame.length;
  const w = frame[0].length;
  const canvas = document.createElement("canvas");
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext("2d")!;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const color = frame[y][x];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }

  return canvas.toDataURL();
}

// Cache rendered frames
const frameCache = new Map<string, string>();

export function getSpriteFrameURL(type: string, frame: "walk1" | "walk2" | "idle", size: number): string | null {
  const sheet = SPRITE_SHEETS[type];
  if (!sheet) return null;

  const key = `${type}-${frame}-${size}`;
  if (frameCache.has(key)) return frameCache.get(key)!;

  const spriteFrame = sheet[frame];
  const nativeH = spriteFrame.length;
  const scale = Math.max(1, Math.round(size / nativeH));
  const url = renderFrame(spriteFrame, scale);
  frameCache.set(key, url);
  return url;
}

export function hasSprite(type: string): boolean {
  return type in SPRITE_SHEETS;
}
