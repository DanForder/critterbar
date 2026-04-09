import { Critter, CritterBounds, CritterTypeName, CRITTER_TYPES, CRITTER_SIZE, Edge } from "./critter";

export class CritterManager {
  critters: Critter[] = [];
  boundsProvider: () => CritterBounds = () => ({
    minX: 0,
    minY: 0,
    maxX: typeof window !== "undefined" ? window.innerWidth : 1920,
    maxY: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

  addCritter(type: CritterTypeName): Critter {
    const bounds = this.boundsProvider();
    let critter: Critter;

    if (this.critters.length === 0) {
      const margin = 40;
      const x = margin + Math.random() * Math.max(bounds.maxX - bounds.minX - margin * 2, 1);
      const y = margin + Math.random() * Math.max(bounds.maxY - bounds.minY - margin * 2, 1);
      critter = new Critter(type, x, y);
      critter.snapToEdge(bounds);
    } else {
      const { x, y, edge } = this.bestSpawnPoint(bounds);
      critter = new Critter(type, x, y);
      critter.edge = edge;
    }

    this.critters.push(critter);
    return critter;
  }

  addCritterAtPosition(type: CritterTypeName, x: number, y: number, edge: Edge, movingForward: boolean, name?: string): Critter {
    const critter = new Critter(type, x, y, name);
    critter.edge = edge;
    critter.movingForward = movingForward;
    this.critters.push(critter);
    return critter;
  }

  private bestSpawnPoint(bounds: CritterBounds): { x: number; y: number; edge: Edge } {
    const { minX, minY, maxX, maxY } = bounds;
    const w = maxX - minX;
    const h = maxY - minY;
    const perimeter = 2 * (w + h);
    const steps = 100;

    let bestX = minX;
    let bestY = minY;
    let bestEdge: Edge = "bottom";
    let bestMinDist = -1;

    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * perimeter;
      let x: number, y: number;
      let edge: Edge;

      if (t < w) {
        x = minX + t;
        y = minY;
        edge = "bottom";
      } else if (t < w + h) {
        x = maxX - CRITTER_SIZE;
        y = minY + (t - w);
        edge = "right";
      } else if (t < 2 * w + h) {
        x = maxX - CRITTER_SIZE - (t - w - h);
        y = maxY - CRITTER_SIZE;
        edge = "top";
      } else {
        x = minX;
        y = maxY - CRITTER_SIZE - (t - 2 * w - h);
        edge = "left";
      }

      let minDist = Infinity;
      for (const critter of this.critters) {
        const dx = x - critter.x;
        const dy = y - critter.y;
        minDist = Math.min(minDist, Math.sqrt(dx * dx + dy * dy));
      }

      if (minDist > bestMinDist) {
        bestMinDist = minDist;
        bestX = x;
        bestY = y;
        bestEdge = edge;
      }
    }

    return { x: bestX, y: bestY, edge: bestEdge };
  }

  hasType(type: CritterTypeName): boolean {
    return this.critters.some((c) => c.type === type);
  }

  availableTypes(): CritterTypeName[] {
    const all = Object.keys(CRITTER_TYPES) as CritterTypeName[];
    return all.filter((t) => !this.hasType(t));
  }

  removeCritter(id: number): void {
    this.critters = this.critters.filter((c) => c.id !== id);
  }

  removeCritterByType(type: CritterTypeName): Critter | undefined {
    const idx = this.critters.findIndex((c) => c.type === type);
    if (idx === -1) return undefined;
    const [critter] = this.critters.splice(idx, 1);
    return critter;
  }

  removeAll(): void {
    this.critters = [];
  }

  update(deltaTime: number): void {
    const bounds = this.boundsProvider();
    for (const critter of this.critters) {
      critter.update(deltaTime, bounds);
    }
    this.resolveCollisions();
  }

  private resolveCollisions(): void {
    const collisionDist = CRITTER_SIZE;

    for (let i = 0; i < this.critters.length; i++) {
      for (let j = i + 1; j < this.critters.length; j++) {
        const a = this.critters[i];
        const b = this.critters[j];

        // Only collide on the same edge, and both must be walking
        if (a.edge !== b.edge) continue;
        if (a.state.kind !== "walking" || b.state.kind !== "walking") continue;

        // 1D distance along the edge
        const isHorizontal = a.edge === "bottom" || a.edge === "top";
        const posA = isHorizontal ? a.x : a.y;
        const posB = isHorizontal ? b.x : b.y;
        const dist = Math.abs(posA - posB);

        if (dist < collisionDist) {
          // Reverse both directions
          a.movingForward = !a.movingForward;
          b.movingForward = !b.movingForward;

          // Nudge apart so they don't re-collide next frame
          const nudge = (collisionDist - dist) / 2 + 1;
          if (posA < posB) {
            if (isHorizontal) { a.x -= nudge; b.x += nudge; }
            else              { a.y -= nudge; b.y += nudge; }
          } else {
            if (isHorizontal) { a.x += nudge; b.x -= nudge; }
            else              { a.y += nudge; b.y -= nudge; }
          }
        }
      }
    }
  }

  get count(): number {
    return this.critters.length;
  }
}
