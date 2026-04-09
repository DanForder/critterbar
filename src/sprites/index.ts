import type { SpriteFrame, SpriteSheet } from "./types";
import { BIRD_SHEET } from "./bird";
import { CAT_SHEET } from "./cat";
import { DOG_SHEET } from "./dog";
import { FOX_SHEET } from "./fox";
import { FROG_SHEET } from "./frog";
import { HAMSTER_SHEET } from "./hamster";
import { RABBIT_SHEET } from "./rabbit";
import { TURTLE_SHEET } from "./turtle";

export type { SpriteFrame, SpriteSheet } from "./types";

export const SPRITE_SHEETS: Record<string, SpriteSheet> = {
  bird: BIRD_SHEET,
  cat: CAT_SHEET,
  dog: DOG_SHEET,
  rabbit: RABBIT_SHEET,
  hamster: HAMSTER_SHEET,
  fox: FOX_SHEET,
  frog: FROG_SHEET,
  turtle: TURTLE_SHEET,
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
