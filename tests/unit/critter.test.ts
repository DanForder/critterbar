import { describe, it, expect } from "vitest";
import { Critter, CritterBounds, CRITTER_TYPES, CRITTER_SIZE, generateName } from "../../src/critter";

describe("Critter", () => {
  const bounds: CritterBounds = { minX: 0, minY: 0, maxX: 1000, maxY: 800 };

  it("initializes with correct type and position", () => {
    const c = new Critter("cat", 100, 200);
    expect(c.type).toBe("cat");
    expect(c.x).toBe(100);
    expect(c.y).toBe(200);
    expect(c.emoji).toBe("🐱");
  });

  it("has correct emoji for each type", () => {
    expect(CRITTER_TYPES.cat.emoji).toBe("🐱");
    expect(CRITTER_TYPES.dog.emoji).toBe("🐶");
    expect(CRITTER_TYPES.bird.emoji).toBe("🐦");
    expect(CRITTER_TYPES.rabbit.emoji).toBe("🐰");
    expect(CRITTER_TYPES.hamster.emoji).toBe("🐹");
    expect(CRITTER_TYPES.fox.emoji).toBe("🦊");
    expect(CRITTER_TYPES.frog.emoji).toBe("🐸");
    expect(CRITTER_TYPES.turtle.emoji).toBe("🐢");
  });

  it("has correct speed for each type", () => {
    expect(CRITTER_TYPES.cat.speed).toBe(12);
    expect(CRITTER_TYPES.dog.speed).toBe(17);
    expect(CRITTER_TYPES.bird.speed).toBe(22);
    expect(CRITTER_TYPES.turtle.speed).toBe(5);
    expect(CRITTER_TYPES.hamster.speed).toBe(9);
    expect(CRITTER_TYPES.frog.speed).toBe(14);
    expect(CRITTER_TYPES.rabbit.speed).toBe(20);
    expect(CRITTER_TYPES.fox.speed).toBe(30);
  });

  it("fox is fastest, turtle is slowest", () => {
    const speeds = Object.values(CRITTER_TYPES).map((t) => t.speed);
    expect(CRITTER_TYPES.fox.speed).toBe(Math.max(...speeds));
    expect(CRITTER_TYPES.turtle.speed).toBe(Math.min(...speeds));
  });

  it("assigns unique IDs", () => {
    const c1 = new Critter("cat", 0, 0);
    const c2 = new Critter("cat", 0, 0);
    expect(c1.id).not.toBe(c2.id);
  });

  it("snaps to edge", () => {
    const c = new Critter("dog", 500, 400);
    c.snapToEdge(bounds);
    const onEdge =
      c.y === bounds.minY ||
      c.y === bounds.maxY - CRITTER_SIZE ||
      c.x === bounds.minX ||
      c.x === bounds.maxX - CRITTER_SIZE;
    expect(onEdge).toBe(true);
  });

  it("walks along edge", () => {
    const c = new Critter("dog", 500, 0);
    c.snapToEdge(bounds);

    for (let i = 0; i < 100; i++) {
      c.update(1 / 30, bounds);
    }

    const onEdge =
      c.y === bounds.minY ||
      c.y === bounds.maxY - CRITTER_SIZE ||
      c.x === bounds.minX ||
      c.x === bounds.maxX - CRITTER_SIZE;
    expect(onEdge).toBe(true);
  });

  it("stays on edge after many updates", () => {
    const small: CritterBounds = { minX: 0, minY: 0, maxX: 500, maxY: 500 };
    const c = new Critter("bird", 100, 0);
    c.snapToEdge(small);

    for (let i = 0; i < 2000; i++) {
      c.update(1 / 30, small);
    }

    const onEdge =
      c.y === small.minY ||
      c.y === small.maxY - CRITTER_SIZE ||
      c.x === small.minX ||
      c.x === small.maxX - CRITTER_SIZE;
    expect(onEdge).toBe(true);
  });

  it("stays within bounds", () => {
    const small: CritterBounds = { minX: 0, minY: 0, maxX: 200, maxY: 200 };
    const c = new Critter("cat", 100, 0);
    c.snapToEdge(small);

    for (let i = 0; i < 2000; i++) {
      c.update(1 / 30, small);
    }

    expect(c.x).toBeGreaterThanOrEqual(small.minX);
    expect(c.x).toBeLessThanOrEqual(small.maxX);
    expect(c.y).toBeGreaterThanOrEqual(small.minY);
    expect(c.y).toBeLessThanOrEqual(small.maxY);
  });

  it("enters sniffing state eventually", () => {
    const c = new Critter("cat", 500, 0);
    c.snapToEdge(bounds);

    let didSniff = false;
    for (let i = 0; i < 450; i++) {
      c.update(1 / 30, bounds);
      if (c.state.kind === "sniffing") {
        didSniff = true;
        break;
      }
    }

    expect(didSniff).toBe(true);
  });

  it("never oscillates between edges at corners (all types, small bounds)", () => {
    // Run each critter type many times on a tiny viewport to force frequent corners
    const small: CritterBounds = { minX: 0, minY: 0, maxX: 150, maxY: 150 };
    const types: Array<"cat" | "dog" | "bird" | "rabbit" | "hamster" | "fox" | "frog" | "turtle"> = ["cat", "dog", "bird", "rabbit", "hamster", "fox", "frog", "turtle"];

    for (const type of types) {
      // Run 20 critters to cover different random edge/direction combos
      for (let trial = 0; trial < 20; trial++) {
        const c = new Critter(type, 75, 75);
        c.snapToEdge(small);

        const edges: string[] = [];
        // Simulate 5 minutes at 60fps = 18000 frames
        for (let i = 0; i < 18000; i++) {
          c.update(1 / 60, small);
          edges.push(c.edge);
        }

        // Check for A→B→A oscillation pattern (same edge two frames apart, different in between)
        let oscillations = 0;
        for (let i = 2; i < edges.length; i++) {
          if (edges[i] === edges[i - 2] && edges[i] !== edges[i - 1]) {
            oscillations++;
            if (oscillations > 3) {
              // Fail fast with useful info
              expect.fail(
                `${type} trial ${trial}: oscillation at frame ${i}: ` +
                `${edges[i-2]}→${edges[i-1]}→${edges[i]} (${oscillations} total)`
              );
            }
          }
        }
      }
    }
  });

  it("no oscillation with variable/spiking deltaTime", () => {
    const small: CritterBounds = { minX: 0, minY: 0, maxX: 150, maxY: 150 };
    const types: Array<"cat" | "dog" | "bird" | "rabbit" | "hamster" | "fox" | "frog" | "turtle"> = ["cat", "dog", "bird", "rabbit", "hamster", "fox", "frog", "turtle"];

    for (const type of types) {
      for (let trial = 0; trial < 10; trial++) {
        const c = new Critter(type, 75, 75);
        c.snapToEdge(small);

        const edges: string[] = [];
        for (let i = 0; i < 5000; i++) {
          // Random deltaTime: mostly normal, occasionally spiking
          const dt = Math.random() < 0.05
            ? 0.1 + Math.random() * 0.5  // spike: 100-600ms
            : 1 / 60 + (Math.random() - 0.5) * 0.01; // normal: ~16ms ± 5ms
          c.update(dt, small);
          edges.push(c.edge);
        }

        let oscillations = 0;
        for (let i = 2; i < edges.length; i++) {
          if (edges[i] === edges[i - 2] && edges[i] !== edges[i - 1]) {
            oscillations++;
            if (oscillations > 3) {
              expect.fail(
                `${type} trial ${trial}: oscillation at frame ${i}: ` +
                `${edges[i-2]}→${edges[i-1]}→${edges[i]} (${oscillations} total)`
              );
            }
          }
        }
      }
    }
  });

  it("speed varies over simulated time", () => {
    const c = new Critter("cat", 500, 0);
    c.snapToEdge(bounds);
    const initialSpeed = c.speed;

    // Simulate 60 seconds — speed changes happen every 5-15s, so we'll see at least one
    let speedChanged = false;
    for (let i = 0; i < 3600; i++) {
      c.update(1 / 60, bounds);
      if (c.speed !== initialSpeed) {
        speedChanged = true;
        break;
      }
    }

    expect(speedChanged).toBe(true);
  });

  it("speed stays within 0.5x–1.5x of base speed", () => {
    const c = new Critter("fox", 500, 0);
    c.snapToEdge(bounds);

    // Simulate 5 minutes
    for (let i = 0; i < 18000; i++) {
      c.update(1 / 60, bounds);
      expect(c.speed).toBeGreaterThanOrEqual(c.baseSpeed * 0.5 - 0.001);
      expect(c.speed).toBeLessThanOrEqual(c.baseSpeed * 1.5 + 0.001);
    }
  });

  it("display emoji stays consistent", () => {
    const c = new Critter("cat", 100, 0);
    expect(c.emoji).toBe("🐱");

    for (let i = 0; i < 1000; i++) {
      c.update(1 / 30, bounds);
      expect(c.emoji).toBe("🐱");
    }
  });

  it("critter gets a non-empty name on creation", () => {
    const types = ["cat", "dog", "bird", "rabbit", "hamster", "fox", "frog", "turtle"] as const;
    for (const type of types) {
      const c = new Critter(type, 100, 100);
      expect(typeof c.name).toBe("string");
      expect(c.name.length).toBeGreaterThan(0);
    }
  });

  it("name is preserved when provided explicitly", () => {
    const c = new Critter("cat", 100, 100, "Captain Whiskers");
    expect(c.name).toBe("Captain Whiskers");
  });

  it("generateName returns a non-empty string for each type", () => {
    const types = ["cat", "dog", "bird", "rabbit", "hamster", "fox", "frog", "turtle"] as const;
    for (const type of types) {
      const name = generateName(type);
      expect(typeof name).toBe("string");
      expect(name.length).toBeGreaterThan(0);
    }
  });
});
