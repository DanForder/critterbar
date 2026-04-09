export type CritterTypeName = "cat" | "dog" | "bird" | "rabbit" | "hamster" | "fox" | "frog" | "turtle";

const NAME_POOLS: Record<CritterTypeName, string[]> = {
  cat:     ["Captain Whiskers", "Purrlock Holmes", "Whisker the Wizard", "Meowgician", "Sir Pounce-a-Lot", "Meowrio", "Clawdia", "Cat-a-pult"],
  dog:     ["Sir Barksalot", "Indiana Bones", "Chewbarka", "Pawadin", "Bark the Barbarian", "Dogmeat", "K-9", "Woofgang"],
  bird:    ["Chirpy McChirpface", "Hawkward the Ranger", "Talon Darkbeak", "Flappy Bird", "Kazooie", "Falco", "Nest.js", "Robin Hood"],
  rabbit:  ["Hop Solo", "Bunnomancer", "Hare of Holding", "Thumper the Rogue", "Critical Hop", "/bin/bunny", "Thumper McFluff", "Bunzilla"],
  hamster: ["Boo", "Hamster of Vecna", "Squeakthief", "Sir Squeaks", "Nibbles", "sudo squeak", "Hamtaro", "Wheel of Fortune"],
  fox:     ["Firefox", "Sly Cooper", "Reynard the Trickster", "Foxblade", "Star Fox", "Tails", "Fox Mulder", "Vulpix the Sorcerer"],
  frog:    ["Frogger", "Battletoads", "Frogmire the Warlock", "Grung Overlord", "Sir Hopsalot", "Toadally Awesome", "Kermit the Vibes", "Chrono Toad"],
  turtle:  ["Tortle Monk", "Shellazar the Wise", "Bowser", "Koopa Troopa", "Shelly McShellface", "Tortellini", "Turbo the Slow", "Shell Script"],
};

export function generateName(type: CritterTypeName): string {
  const pool = NAME_POOLS[type];
  return pool[Math.floor(Math.random() * pool.length)];
}

export const CRITTER_TYPES: Record<
  CritterTypeName,
  { emoji: string; speed: number }
> = {
  turtle:  { emoji: "🐢", speed: 5 },
  hamster: { emoji: "🐹", speed: 9 },
  cat:     { emoji: "🐱", speed: 12 },
  frog:    { emoji: "🐸", speed: 14 },
  dog:     { emoji: "🐶", speed: 17 },
  rabbit:  { emoji: "🐰", speed: 20 },
  bird:    { emoji: "🐦", speed: 22 },
  fox:     { emoji: "🦊", speed: 30 },
};

export const CRITTER_SIZE = 24;

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

// Speed multiplier options: weighted towards normal (1.0)
const SPEED_MULTIPLIERS = [0.5, 0.75, 1.0, 1.0, 1.0, 1.25, 1.5];

export class Critter {
  readonly id: number;
  readonly type: CritterTypeName;
  readonly emoji: string;
  readonly baseSpeed: number;
  readonly name: string;

  x: number;
  y: number;
  edge: Edge;
  movingForward: boolean;
  state: CritterState = { kind: "walking" };
  speed: number;

  private sniffTimer = 0;
  private nextSniffIn: number;
  private speedTimer = 0;
  private nextSpeedChangeIn: number;

  constructor(type: CritterTypeName, x: number, y: number, name?: string) {
    this.id = nextId++;
    this.type = type;
    this.emoji = CRITTER_TYPES[type].emoji;
    this.baseSpeed = CRITTER_TYPES[type].speed;
    this.speed = this.baseSpeed;
    this.name = name ?? generateName(type);
    this.x = x;
    this.y = y;

    const edges: Edge[] = ["bottom", "right", "top", "left"];
    this.edge = edges[Math.floor(Math.random() * edges.length)];
    this.movingForward = Math.random() < 0.5;
    this.nextSniffIn = 3 + Math.random() * 5;
    this.nextSpeedChangeIn = 5 + Math.random() * 10;
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
    // Speed variation runs regardless of sniff state
    this.speedTimer += deltaTime;
    if (this.speedTimer >= this.nextSpeedChangeIn) {
      this.speedTimer = 0;
      this.nextSpeedChangeIn = 5 + Math.random() * 10;
      const multiplier = SPEED_MULTIPLIERS[Math.floor(Math.random() * SPEED_MULTIPLIERS.length)];
      this.speed = this.baseSpeed * multiplier;
    }

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
      this.state = { kind: "sniffing", remaining: 2 + Math.random() * 3 };
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
