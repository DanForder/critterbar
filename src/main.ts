import "./style.css";
import { CritterTypeName } from "./critter";
import { CritterManager } from "./critterManager";
import {
  addCritterElement,
  updateCritterElements,
  removeAllCritterElements,
} from "./renderer";

const manager = new CritterManager();

manager.boundsProvider = () => ({
  minX: 0,
  minY: 0,
  maxX: window.innerWidth,
  maxY: window.innerHeight,
});

function addCritter(type: CritterTypeName): void {
  const critter = manager.addCritter(type);
  addCritterElement(critter);
}

function removeAll(): void {
  removeAllCritterElements();
  manager.removeAll();
}

function getCritters() {
  return manager.critters.map((c) => ({
    id: c.id,
    type: c.type,
    x: c.x,
    y: c.y,
    edge: c.edge,
    state: c.state.kind,
  }));
}

// Expose API for Playwright and Tauri events
const critterbar = { addCritter, removeAll, getCritters };
(window as any).critterbar = critterbar;

// Listen for Tauri tray events (only when running inside Tauri)
async function setupTauriEvents() {
  if (!(window as any).__TAURI_INTERNALS__) return;
  try {
    const { listen } = await import("@tauri-apps/api/event");
    listen<string>("add-critter", (event) => {
      addCritter(event.payload as CritterTypeName);
    });
    listen("remove-all", () => {
      removeAll();
    });
  } catch {
    // Not running in Tauri — that's fine
  }
}

setupTauriEvents();

// Animation loop
let lastTime = performance.now();

function tick(now: number) {
  const deltaTime = (now - lastTime) / 1000;
  lastTime = now;
  manager.update(deltaTime);
  updateCritterElements(manager.critters);
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
