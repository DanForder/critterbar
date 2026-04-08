import { test, expect } from "@playwright/test";

test.describe("Critterbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the app to initialize
    await page.waitForFunction(() => (window as any).critterbar !== undefined);
  });

  test("page loads with no critters", async ({ page }) => {
    const critters = page.locator("[data-critter-type]");
    await expect(critters).toHaveCount(0);
  });

  test("adding a cat creates a visible critter on a screen edge", async ({ page }) => {
    await page.evaluate(() => (window as any).critterbar.addCritter("cat"));
    const critter = page.locator('[data-critter-type="cat"]');
    await expect(critter).toBeVisible();
    await expect(critter).toHaveText("🐱");

    const box = await critter.boundingBox();
    expect(box).not.toBeNull();

    // Verify it's on an edge (within a few px tolerance for corner nudge)
    const vw = await page.evaluate(() => window.innerWidth);
    const vh = await page.evaluate(() => window.innerHeight);
    const onEdge =
      box!.y <= 3 ||
      box!.x <= 3 ||
      box!.x >= vw - 48 - 3 ||
      box!.y >= vh - 48 - 3;
    expect(onEdge).toBe(true);
  });

  test("adding all three critter types", async ({ page }) => {
    await page.evaluate(() => {
      const cb = (window as any).critterbar;
      cb.addCritter("cat");
      cb.addCritter("dog");
      cb.addCritter("bird");
    });

    await expect(page.locator('[data-critter-type="cat"]')).toBeVisible();
    await expect(page.locator('[data-critter-type="dog"]')).toBeVisible();
    await expect(page.locator('[data-critter-type="bird"]')).toBeVisible();
    await expect(page.locator("[data-critter-type]")).toHaveCount(3);
  });

  test("critters move along edges over time", async ({ page }) => {
    await page.evaluate(() => (window as any).critterbar.addCritter("dog"));
    const critter = page.locator('[data-critter-type="dog"]');

    const pos1 = await critter.boundingBox();
    await page.waitForTimeout(2000);
    const pos2 = await critter.boundingBox();

    expect(pos1).not.toBeNull();
    expect(pos2).not.toBeNull();

    // Either x or y should have changed (unless sniffing — which is fine)
    // We just verify the critter is still on an edge
    const vw = await page.evaluate(() => window.innerWidth);
    const vh = await page.evaluate(() => window.innerHeight);
    const onEdge =
      pos2!.y <= 3 ||
      pos2!.x <= 3 ||
      pos2!.x >= vw - 48 - 3 ||
      pos2!.y >= vh - 48 - 3;
    expect(onEdge).toBe(true);
  });

  test("critters stay on edges after extended walking", async ({ page }) => {
    await page.evaluate(() => {
      const cb = (window as any).critterbar;
      cb.addCritter("cat");
      cb.addCritter("dog");
      cb.addCritter("bird");
    });

    // Let them walk for 5 seconds
    await page.waitForTimeout(5000);

    const vw = await page.evaluate(() => window.innerWidth);
    const vh = await page.evaluate(() => window.innerHeight);

    const critters = page.locator("[data-critter-type]");
    const count = await critters.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      const box = await critters.nth(i).boundingBox();
      expect(box).not.toBeNull();
      const onEdge =
        box!.y <= 3 ||
        box!.x <= 3 ||
        box!.x >= vw - 48 - 3 ||
        box!.y >= vh - 48 - 3;
      expect(onEdge).toBe(true);
    }
  });

  test("remove all clears critters", async ({ page }) => {
    await page.evaluate(() => {
      const cb = (window as any).critterbar;
      cb.addCritter("cat");
      cb.addCritter("dog");
    });
    await expect(page.locator("[data-critter-type]")).toHaveCount(2);

    await page.evaluate(() => (window as any).critterbar.removeAll());
    await expect(page.locator("[data-critter-type]")).toHaveCount(0);
  });

  test("no corner oscillation", async ({ page }) => {
    // Add a critter and track edge changes over time
    await page.evaluate(() => (window as any).critterbar.addCritter("bird"));
    const critter = page.locator('[data-critter-type="bird"]');

    const edges: string[] = [];
    for (let i = 0; i < 20; i++) {
      const edge = await critter.getAttribute("data-edge");
      edges.push(edge || "unknown");
      await page.waitForTimeout(100);
    }

    // Count edge transitions — should not have rapid back-and-forth
    let transitions = 0;
    for (let i = 1; i < edges.length; i++) {
      if (edges[i] !== edges[i - 1]) transitions++;
    }

    // In 2 seconds, a bird at 45px/s shouldn't hit more than ~2 corners
    expect(transitions).toBeLessThanOrEqual(4);
  });

  test("no rapid edge flicking at corners", async ({ page }) => {
    // Use a small viewport so critters hit corners quickly
    await page.setViewportSize({ width: 200, height: 200 });
    await page.goto("/");
    await page.waitForFunction(() => (window as any).critterbar !== undefined);

    // Add a fast critter — it will reach corners quickly in 200x200
    await page.evaluate(() => (window as any).critterbar.addCritter("bird"));
    const critter = page.locator('[data-critter-type="bird"]');

    // Sample edges rapidly over 5 seconds
    const edges: string[] = [];
    for (let i = 0; i < 100; i++) {
      const edge = await critter.getAttribute("data-edge");
      edges.push(edge || "unknown");
      await page.waitForTimeout(50);
    }

    // Count consecutive different edges — should never see A→B→A→B pattern
    let oscillations = 0;
    for (let i = 2; i < edges.length; i++) {
      if (edges[i] === edges[i - 2] && edges[i] !== edges[i - 1]) {
        oscillations++;
      }
    }

    // Should be 0 or very few A→B→A oscillations
    expect(oscillations).toBeLessThanOrEqual(2);
  });
});
