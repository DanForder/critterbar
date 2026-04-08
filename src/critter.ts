export type CritterTypeName = "cat" | "dog" | "bird";

export const CRITTER_TYPES: Record<
  CritterTypeName,
  { emoji: string; speed: number }
> = {
  cat: { emoji: "🐱", speed: 25 },
  dog: { emoji: "🐶", speed: 35 },
  bird: { emoji: "🐦", speed: 45 },
};

export const CRITTER_SIZE = 48;

export interface CritterBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export type Edge = "bottom" | "right" | "top" | "left";

export type CritterState =
  | { kind: "walking" }
  | { kind: "sniffing"; remaining: number };

let nextId = 0;

export class Critter {
  readonly id: number;
  readonly type: CritterTypeName;
  readonly emoji: string;

  x: number;
  y: number;
  edge: Edge;
  movingForward: boolean;
  state: CritterState = { kind: "walking" };
  speed: number;

  private sniffTimer = 0;
  private nextSniffIn: number;

  constructor(type: CritterTypeName, x: number, y: number) {
    this.id = nextId++;
    this.type = type;
    this.emoji = CRITTER_TYPES[type].emoji;
    this.speed = CRITTER_TYPES[type].speed;
    this.x = x;
    this.y = y;

    const edges: Edge[] = ["bottom", "right", "top", "left"];
    this.edge = edges[Math.floor(Math.random() * edges.length)];
    this.movingForward = Math.random() < 0.5;
    this.nextSniffIn = 3 + Math.random() * 5;
  }

  snapToEdge(bounds: CritterBounds): void {
    switch (this.edge) {
      case "bottom":
        this.y = bounds.minY;
        this.x = clamp(this.x, bounds.minX, bounds.maxX);
        break;
      case "top":
        this.y = bounds.maxY - CRITTER_SIZE;
        this.x = clamp(this.x, bounds.minX, bounds.maxX);
        break;
      case "left":
        this.x = bounds.minX;
        this.y = clamp(this.y, bounds.minY, bounds.maxY);
        break;
      case "right":
        this.x = bounds.maxX - CRITTER_SIZE;
        this.y = clamp(this.y, bounds.minY, bounds.maxY);
        break;
    }
  }

  update(deltaTime: number, bounds: CritterBounds): void {
    if (this.state.kind === "sniffing") {
      const remaining = this.state.remaining - deltaTime;
      if (remaining <= 0) {
        this.state = { kind: "walking" };
        this.nextSniffIn = 3 + Math.random() * 5;
        this.sniffTimer = 0;
      } else {
        this.state = { kind: "sniffing", remaining };
      }
      return;
    }

    this.sniffTimer += deltaTime;
    if (this.sniffTimer >= this.nextSniffIn) {
      this.state = { kind: "sniffing", remaining: 1 + Math.random() * 2 };
      this.sniffTimer = 0;
      return;
    }

    const movement = this.speed * deltaTime;
    const dir = this.movingForward ? 1 : -1;

    // Corner transitions: the side you hit determines the next edge.
    // movingForward only affects travel direction, not which edge to go to.
    switch (this.edge) {
      case "bottom":
        this.x += movement * dir;
        this.y = bounds.minY;
        if (this.x >= bounds.maxX - CRITTER_SIZE) {
          this.x = bounds.maxX - CRITTER_SIZE;
          this.edge = "right";
        } else if (this.x <= bounds.minX) {
          this.x = bounds.minX;
          this.edge = "left";
        }
        break;

      case "right":
        this.y += movement * dir;
        this.x = bounds.maxX - CRITTER_SIZE;
        if (this.y >= bounds.maxY - CRITTER_SIZE) {
          this.y = bounds.maxY - CRITTER_SIZE;
          this.edge = "top";
        } else if (this.y <= bounds.minY) {
          this.y = bounds.minY;
          this.edge = "bottom";
        }
        break;

      case "top":
        this.x -= movement * dir;
        this.y = bounds.maxY - CRITTER_SIZE;
        if (this.x <= bounds.minX) {
          this.x = bounds.minX;
          this.edge = "left";
        } else if (this.x >= bounds.maxX - CRITTER_SIZE) {
          this.x = bounds.maxX - CRITTER_SIZE;
          this.edge = "right";
        }
        break;

      case "left":
        this.y -= movement * dir;
        this.x = bounds.minX;
        if (this.y <= bounds.minY) {
          this.y = bounds.minY;
          this.edge = "bottom";
        } else if (this.y >= bounds.maxY - CRITTER_SIZE) {
          this.y = bounds.maxY - CRITTER_SIZE;
          this.edge = "top";
        }
        break;
    }

    // Always clamp to bounds regardless of cooldown
    this.x = clamp(this.x, bounds.minX, bounds.maxX - CRITTER_SIZE);
    this.y = clamp(this.y, bounds.minY, bounds.maxY - CRITTER_SIZE);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
