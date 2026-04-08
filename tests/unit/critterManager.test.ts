import { describe, it, expect } from "vitest";
import { CritterManager } from "../../src/critterManager";
import { CritterBounds } from "../../src/critter";

describe("CritterManager", () => {
  const bounds: CritterBounds = { minX: 0, minY: 0, maxX: 1920, maxY: 1080 };

  function createManager(): CritterManager {
    const m = new CritterManager();
    m.boundsProvider = () => bounds;
    return m;
  }

  it("adds a critter", () => {
    const m = createManager();
    const c = m.addCritter("cat");
    expect(m.count).toBe(1);
    expect(c.emoji).toBe("🐱");
  });

  it("adds multiple critters", () => {
    const m = createManager();
    m.addCritter("cat");
    m.addCritter("dog");
    m.addCritter("bird");
    expect(m.count).toBe(3);
  });

  it("removes a critter by id", () => {
    const m = createManager();
    const c = m.addCritter("cat");
    expect(m.count).toBe(1);
    m.removeCritter(c.id);
    expect(m.count).toBe(0);
  });

  it("removes all critters", () => {
    const m = createManager();
    m.addCritter("cat");
    m.addCritter("dog");
    m.removeAll();
    expect(m.count).toBe(0);
  });

  it("updates move critters", () => {
    const m = createManager();
    const c = m.addCritter("dog");
    const initialX = c.x;
    const initialY = c.y;

    for (let i = 0; i < 60; i++) {
      m.update(1 / 30);
    }

    const moved = c.x !== initialX || c.y !== initialY;
    expect(moved).toBe(true);
  });

  it("critters stay in bounds after many updates", () => {
    const small: CritterBounds = { minX: 0, minY: 0, maxX: 500, maxY: 500 };
    const m = new CritterManager();
    m.boundsProvider = () => small;

    m.addCritter("cat");
    m.addCritter("dog");
    m.addCritter("bird");

    for (let i = 0; i < 1000; i++) {
      m.update(1 / 30);
    }

    for (const c of m.critters) {
      expect(c.x).toBeGreaterThanOrEqual(small.minX);
      expect(c.x).toBeLessThanOrEqual(small.maxX);
      expect(c.y).toBeGreaterThanOrEqual(small.minY);
      expect(c.y).toBeLessThanOrEqual(small.maxY);
    }
  });

  it("works without explicit bounds provider", () => {
    const m = new CritterManager();
    const c = m.addCritter("cat");
    // Should not throw
    for (let i = 0; i < 10; i++) {
      m.update(1 / 30);
    }
    expect(c).toBeDefined();
  });
});
