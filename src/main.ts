import "./style.css";
import { CritterTypeName } from "./critter";
import { CritterManager } from "./critterManager";
import {
  addCritterElement,
  updateCritterElements,
  removeCritterElement,
  removeAllCritterElements,
} from "./renderer";

const manager = new CritterManager();

manager.boundsProvider = () => ({
  minX: 0,
  minY: 0,
  maxX: window.innerWidth,
  maxY: window.innerHeight,
});

async function updateCritterMenu(type: CritterTypeName, active: boolean): Promise<void> {
  if (!(window as any).__TAURI_INTERNALS__) return;
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    await invoke("set_critter_active", { critterType: type, active });
  } catch {
    // Not in Tauri context
  }
}

async function updateAddRandomMenu(): Promise<void> {
  if (!(window as any).__TAURI_INTERNALS__) return;
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    await invoke("set_add_random_enabled", { enabled: manager.availableTypes().length > 0 });
  } catch {
    // Not in Tauri context
  }
}

async function updateTrayTitle(): Promise<void> {
  if (!(window as any).__TAURI_INTERNALS__) return;
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const count = manager.critters.length;
    const title = count > 0 ? `🐾 ${count}` : "🐾";
    await invoke("set_tray_title", { title });
  } catch {
    // Not in Tauri context
  }
}

function addCritter(type: CritterTypeName): void {
  if (manager.hasType(type)) return;
  const critter = manager.addCritter(type);
  addCritterElement(critter);
  updateCritterMenu(type, true);
  updateAddRandomMenu();
  updateTrayTitle();
}

function removeCritter(type: CritterTypeName): void {
  const critter = manager.removeCritterByType(type);
  if (!critter) return;
  removeCritterElement(critter.id);
  updateCritterMenu(type, false);
  updateAddRandomMenu();
  updateTrayTitle();
}

function removeAll(): void {
  const activeTypes = manager.critters.map((c) => c.type);
  removeAllCritterElements();
  manager.removeAll();
  for (const type of activeTypes) {
    updateCritterMenu(type, false);
  }
  updateAddRandomMenu();
  updateTrayTitle();
}

function addRandom(): void {
  const available = manager.availableTypes();
  if (available.length === 0) return;
  const type = available[Math.floor(Math.random() * available.length)];
  addCritter(type);
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
const critterbar = { addCritter, removeCritter, removeAll, getCritters, addRandom };
(window as any).critterbar = critterbar;

// Listen for Tauri tray events (only when running inside Tauri)
async function setupTauriEvents() {
  if (!(window as any).__TAURI_INTERNALS__) return;
  try {
    const { listen } = await import("@tauri-apps/api/event");
    listen<string>("add-critter", (event) => {
      addCritter(event.payload as CritterTypeName);
    });
    listen<string>("remove-critter", (event) => {
      removeCritter(event.payload as CritterTypeName);
    });
    listen("remove-all", () => {
      removeAll();
    });
    listen("add-random", () => {
      addRandom();
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
