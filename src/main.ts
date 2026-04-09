import "./style.css";
import { CritterTypeName, Edge } from "./critter";
import { CritterManager } from "./critterManager";
import {
  addCritterElement,
  updateCritterElements,
  removeCritterElement,
  removeAllCritterElements,
} from "./renderer";
import { SPRITE_SHEETS, getSpriteFrameURL } from "./sprites";

// Sprite sandbox mode — visit /?sandbox=sprites to preview sprites
if (new URLSearchParams(location.search).get("sandbox") === "sprites") {
  renderSpriteSandbox();
  throw new Error("sandbox mode — skipping normal startup");
}

function renderSpriteSandbox(): void {
  document.body.classList.remove("hide-names");
  document.body.style.background = "#1a1a1a";
  document.body.style.color = "#eee";
  document.body.style.fontFamily = "system-ui, sans-serif";
  document.body.style.padding = "12px";
  document.body.style.margin = "0";
  document.body.style.overflowY = "auto";

  const types = Object.keys(SPRITE_SHEETS);
  const frames: Array<"walk1" | "walk2" | "idle"> = ["walk1", "walk2", "idle"];

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(4, 1fr)";
  grid.style.gap = "8px";

  for (const type of types) {
    const tile = document.createElement("div");
    tile.style.display = "flex";
    tile.style.flexDirection = "column";
    tile.style.alignItems = "center";
    tile.style.gap = "4px";
    tile.style.padding = "8px";
    tile.style.background = "#222";
    tile.style.borderRadius = "6px";

    const label = document.createElement("div");
    label.textContent = type;
    label.style.fontWeight = "bold";
    label.style.textTransform = "uppercase";
    label.style.fontSize = "10px";
    label.style.letterSpacing = "1px";
    label.style.color = "#aaa";
    tile.appendChild(label);

    const framesRow = document.createElement("div");
    framesRow.style.display = "flex";
    framesRow.style.gap = "4px";
    framesRow.style.alignItems = "center";

    for (const frame of frames) {
      const img = document.createElement("img");
      const url = getSpriteFrameURL(type, frame, 96);
      if (url) img.src = url;
      img.style.width = "96px";
      img.style.height = "96px";
      img.style.imageRendering = "pixelated";
      img.style.background = "#111";
      framesRow.appendChild(img);
    }
    tile.appendChild(framesRow);

    const smallRow = document.createElement("div");
    smallRow.style.display = "flex";
    smallRow.style.gap = "4px";
    smallRow.style.alignItems = "center";
    for (const frame of frames) {
      const img = document.createElement("img");
      const url = getSpriteFrameURL(type, frame, 24);
      if (url) img.src = url;
      img.style.width = "24px";
      img.style.height = "24px";
      img.style.imageRendering = "pixelated";
      img.style.background = "#111";
      smallRow.appendChild(img);
    }
    tile.appendChild(smallRow);

    grid.appendChild(tile);
  }

  document.body.appendChild(grid);
}

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

interface SavedCritterState {
  type: CritterTypeName;
  x: number;
  y: number;
  edge: Edge;
  movingForward: boolean;
  name?: string;
}

function saveActiveCritters(): void {
  const states: SavedCritterState[] = manager.critters.map((c) => ({
    type: c.type,
    x: c.x,
    y: c.y,
    edge: c.edge,
    movingForward: c.movingForward,
    name: c.name,
  }));
  localStorage.setItem("activeCritters", JSON.stringify(states));
}

function restoreActiveCritters(): void {
  try {
    const saved = localStorage.getItem("activeCritters");
    if (!saved) return;
    const data: unknown[] = JSON.parse(saved);
    if (!Array.isArray(data)) return;
    for (const item of data) {
      if (typeof item === "string") {
        // Legacy format: type name only — use spread spawning
        addCritter(item as CritterTypeName);
      } else if (item && typeof (item as SavedCritterState).type === "string") {
        const s = item as SavedCritterState;
        if (manager.hasType(s.type)) continue;
        const critter = manager.addCritterAtPosition(s.type, s.x, s.y, s.edge, s.movingForward, s.name);
        addCritterElement(critter);
        notifyCritterState(s.type, true);
        updateTrayTitle();
      }
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

// Force-add a critter (bypasses duplicate check, for sandbox/dev use)
function forceAddCritter(type: CritterTypeName): void {
  const critter = manager.addCritter(type);
  addCritterElement(critter);
  updateTrayTitle();
}

// Expose API for Playwright and Tauri events
const critterbar = { addCritter, removeCritter, removeAll, getCritters, addRandom, addAllCritters, forceAddCritter };
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
      checkForUpdates(false);
    });
    listen<boolean>("show-names", (event) => {
      document.body.classList.toggle("hide-names", !event.payload);
      localStorage.setItem("showNames", String(event.payload));
    });
    listen<boolean>("beta-artwork", (event) => {
      document.body.classList.toggle("pixel-art", event.payload);
      localStorage.setItem("betaArtwork", String(event.payload));
    });
  } catch {
    // Not running in Tauri — that's fine
  }
}

// Apply saved settings on startup
if (localStorage.getItem("showNames") !== "true") {
  document.body.classList.add("hide-names");
}
if (localStorage.getItem("betaArtwork") === "true") {
  document.body.classList.add("pixel-art");
}

setupTauriEvents();
restoreActiveCritters();

// Update management

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
      // Auto-restart immediately — critters are persisted so restart is safe
      const { relaunch } = await import("@tauri-apps/plugin-process");
      await relaunch();
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
