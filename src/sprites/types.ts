// Shared sprite types. Each frame is a 2D array of hex colors (null = transparent).
// Sprites are defined at native pixel size, rendered to canvas, then scaled to CRITTER_SIZE.

export type SpriteFrame = (string | null)[][];

export interface SpriteSheet {
  walk1: SpriteFrame;
  walk2: SpriteFrame;
  idle: SpriteFrame;
}

// Shorthand for transparent pixels inside sprite grids.
export const _ = null;
