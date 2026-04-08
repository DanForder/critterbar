import { Critter, CritterBounds, CritterTypeName, CRITTER_SIZE } from "./critter";

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
    const margin = 40;
    const x = margin + Math.random() * Math.max(bounds.maxX - bounds.minX - margin * 2, 1);
    const y = margin + Math.random() * Math.max(bounds.maxY - bounds.minY - margin * 2, 1);
    const critter = new Critter(type, x, y);
    critter.snapToEdge(bounds);
    this.critters.push(critter);
    return critter;
  }

  removeCritter(id: number): void {
    this.critters = this.critters.filter((c) => c.id !== id);
  }

  removeAll(): void {
    this.critters = [];
  }

  update(deltaTime: number): void {
    const bounds = this.boundsProvider();
    for (const critter of this.critters) {
      critter.update(deltaTime, bounds);
    }
  }

  get count(): number {
    return this.critters.length;
  }
}
