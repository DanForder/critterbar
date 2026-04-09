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

async function notifyCritterState(type: CritterTypeName, active: boolean): Promise<void> {
  if (!(window as any).__TAURI_INTERNALS__) return;
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    await invoke("set_critter_active", { critterType: type, active });
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

function saveActiveCritters(): void {
  const types = manager.critters.map((c) => c.type);
  localStorage.setItem("activeCritters", JSON.stringify(types));
}

function restoreActiveCritters(): void {
  try {
    const saved = localStorage.getItem("activeCritters");
    if (!saved) return;
    const types: CritterTypeName[] = JSON.parse(saved);
    for (const type of types) {
      addCritter(type);
    }
  } catch {
    // Ignore malformed data
  }
}

function addCritter(type: CritterTypeName): void {
  if (manager.hasType(type)) return;
  const critter = manager.addCritter(type);
  addCritterElement(critter);
  notifyCritterState(type, true);
  saveActiveCritters();
  updateTrayTitle();
}

function removeCritter(type: CritterTypeName): void {
  const critter = manager.removeCritterByType(type);
  if (!critter) return;
  removeCritterElement(critter.id);
  notifyCritterState(type, false);
  saveActiveCritters();
  updateTrayTitle();
}

function removeAll(): void {
  const activeTypes = manager.critters.map((c) => c.type);
  removeAllCritterElements();
  manager.removeAll();
  for (const type of activeTypes) {
    notifyCritterState(type, false);
  }
  saveActiveCritters();
  updateTrayTitle();
}

function addRandom(): void {
  const available = manager.availableTypes();
  if (available.length === 0) return;
  const type = available[Math.floor(Math.random() * available.length)];
  addCritter(type);
}

function addAllCritters(): void {
  for (const type of manager.availableTypes()) {
    addCritter(type);
  }
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
const critterbar = { addCritter, removeCritter, removeAll, getCritters, addRandom, addAllCritters };
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
    listen("add-all", () => {
      addAllCritters();
    });
    listen("check-update", () => {
      handleUpdateMenuClick();
    });
  } catch {
    // Not running in Tauri — that's fine
  }
}

setupTauriEvents();
restoreActiveCritters();

// Update management
let updateReady = false;

async function setUpdateMenuText(text: string) {
  const { invoke } = await import("@tauri-apps/api/core");
  await invoke("set_update_menu_text", { text });
}

async function checkForUpdates(silent = true) {
  if (!(window as any).__TAURI_INTERNALS__) return;
  try {
    const { check } = await import("@tauri-apps/plugin-updater");
    if (!silent) await setUpdateMenuText("Checking...");
    const update = await check();
    if (update) {
      await setUpdateMenuText(`Downloading v${update.version}...`);
      await update.downloadAndInstall();
      updateReady = true;
      await setUpdateMenuText(`✓ Restart to update (v${update.version})`);
    } else if (!silent) {
      await setUpdateMenuText("No updates available");
      setTimeout(() => setUpdateMenuText("Check for Updates"), 3000);
    }
  } catch {
    if (!silent) {
      await setUpdateMenuText("Update check failed");
      setTimeout(() => setUpdateMenuText("Check for Updates"), 3000);
    }
  }
}

async function handleUpdateMenuClick() {
  if (updateReady) {
    const { relaunch } = await import("@tauri-apps/plugin-process");
    await relaunch();
  } else {
    checkForUpdates(false);
  }
}

// Silent check on startup
checkForUpdates(true);

// Animation loop
let lastTime = performance.now();

function tick(now: number) {
  const deltaTime = (now - lastTime) / 1000;
  lastTime = now;
  if (manager.count > 0) {
    manager.update(deltaTime);
    updateCritterElements(manager.critters);
  }
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
