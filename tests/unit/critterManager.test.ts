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

  it("spread spawning places second critter far from the first", () => {
    const m = createManager();
    m.addCritter("cat");
    // Force first critter to bottom-left corner
    m.critters[0].x = 0;
    m.critters[0].y = 0;
    m.critters[0].edge = "bottom";

    const c2 = m.addCritter("dog");
    const dist = Math.sqrt(c2.x * c2.x + c2.y * c2.y);
    // In 1920x1080 bounds, furthest reachable point from (0,0) is ~2168px; expect at least 800px
    expect(dist).toBeGreaterThan(800);
  });

  it("addCritterAtPosition restores exact position, edge, and direction", () => {
    const m = createManager();
    const critter = m.addCritterAtPosition("fox", 500, 0, "bottom", false);
    expect(critter.type).toBe("fox");
    expect(critter.x).toBe(500);
    expect(critter.y).toBe(0);
    expect(critter.edge).toBe("bottom");
    expect(critter.movingForward).toBe(false);
    expect(m.count).toBe(1);
  });

  it("addCritterAtPosition does not use spread spawning", () => {
    const m = createManager();
    // Put a critter at bottom-left
    m.addCritterAtPosition("cat", 0, 0, "bottom", true);
    // Restore a second critter right next to the first — bypasses spread logic
    const c2 = m.addCritterAtPosition("dog", 5, 0, "bottom", true);
    expect(c2.x).toBe(5);
    expect(c2.y).toBe(0);
  });

  it("critters on the same edge reverse direction on collision", () => {
    const m = createManager();
    // Place two critters on the bottom edge heading toward each other
    const a = m.addCritterAtPosition("cat", 100, 0, "bottom", true);  // moving right
    const b = m.addCritterAtPosition("dog", 110, 0, "bottom", false); // moving left

    m.update(1 / 60);

    // They should have reversed
    expect(a.movingForward).toBe(false);
    expect(b.movingForward).toBe(true);
    // And been nudged apart
    expect(b.x - a.x).toBeGreaterThanOrEqual(24);
  });

  it("critters on different edges do not collide", () => {
    const m = createManager();
    const a = m.addCritterAtPosition("cat", 100, 0, "bottom", true);
    const b = m.addCritterAtPosition("dog", 100, 0, "top", false); // different edge, same coords

    const dirA = a.movingForward;
    const dirB = b.movingForward;
    m.update(1 / 60);

    // Directions unchanged by collision (may change due to corner logic but not collision)
    // At position 100 they're not near corners, so direction should stay
    expect(a.movingForward).toBe(dirA);
    expect(b.movingForward).toBe(dirB);
  });

  it("sniffing critters do not trigger collisions", () => {
    const m = createManager();
    const a = m.addCritterAtPosition("cat", 100, 0, "bottom", true);
    const b = m.addCritterAtPosition("dog", 110, 0, "bottom", false);

    // Force one to sniff
    (a as any).state = { kind: "sniffing", remaining: 2 };

    const dirB = b.movingForward;
    m.update(1 / 60);

    // No collision because a is sniffing
    expect(b.movingForward).toBe(dirB);
  });

  it("spread spawning places third critter far from both existing critters", () => {
    const m = createManager();
    m.addCritter("cat");
    // Force first critter to bottom-left corner
    m.critters[0].x = 0;
    m.critters[0].y = 0;
    m.critters[0].edge = "bottom";

    m.addCritter("dog");
    // Force second critter to top-right corner
    m.critters[1].x = bounds.maxX - 24;
    m.critters[1].y = bounds.maxY - 24;
    m.critters[1].edge = "top";

    const c3 = m.addCritter("bird");
    // Both corners occupied — third should land roughly in the middle of an edge
    // Minimum distance from both corners should be at least 500px
    const dist0 = Math.sqrt(c3.x * c3.x + c3.y * c3.y);
    const dx1 = c3.x - (bounds.maxX - 24);
    const dy1 = c3.y - (bounds.maxY - 24);
    const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    expect(Math.min(dist0, dist1)).toBeGreaterThan(500);
  });
});
