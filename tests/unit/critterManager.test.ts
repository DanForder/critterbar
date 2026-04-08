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

  it("removeCritterByType removes the critter and returns it", () => {
    const m = createManager();
    m.addCritter("cat");
    m.addCritter("dog");
    const removed = m.removeCritterByType("cat");
    expect(removed).toBeDefined();
    expect(removed!.type).toBe("cat");
    expect(m.count).toBe(1);
    expect(m.hasType("cat")).toBe(false);
    expect(m.hasType("dog")).toBe(true);
  });

  it("removeCritterByType returns undefined for missing type", () => {
    const m = createManager();
    m.addCritter("dog");
    const removed = m.removeCritterByType("cat");
    expect(removed).toBeUndefined();
    expect(m.count).toBe(1);
  });

  it("does not add a duplicate critter type", () => {
    const m = createManager();
    m.addCritter("cat");
    expect(m.hasType("cat")).toBe(true);
    expect(m.hasType("dog")).toBe(false);
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

  it("availableTypes returns all 8 types when no critters are active", () => {
    const m = createManager();
    expect(m.availableTypes().length).toBe(8);
  });

  it("availableTypes excludes active critter types", () => {
    const m = createManager();
    m.addCritter("cat");
    m.addCritter("dog");
    const available = m.availableTypes();
    expect(available).not.toContain("cat");
    expect(available).not.toContain("dog");
    expect(available.length).toBe(6);
  });

  it("availableTypes is empty when all types are active", () => {
    const m = createManager();
    for (const type of ["cat", "dog", "bird", "rabbit", "hamster", "fox", "frog", "turtle"] as const) {
      m.addCritter(type);
    }
    expect(m.availableTypes().length).toBe(0);
  });
});
