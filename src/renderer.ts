import { Critter, CRITTER_SIZE } from "./critter";
import { getSpriteFrameURL, hasSprite } from "./sprites";

const critterElements = new Map<number, HTMLDivElement>();
const nameElements = new Map<number, HTMLDivElement>();

// Track walk animation frame per critter
const walkFrameTimers = new Map<number, number>();
const walkFrameState = new Map<number, boolean>(); // true = walk1, false = walk2

const WALK_FRAME_INTERVAL = 0.25; // seconds per frame

function isPixelArtEnabled(): boolean {
  return document.body.classList.contains("pixel-art");
}

function applyVisual(el: HTMLDivElement, critter: Critter, deltaTime?: number): void {
  if (isPixelArtEnabled() && hasSprite(critter.type)) {
    // Determine which frame to show
    let frame: "walk1" | "walk2" | "idle";
    if (critter.state.kind === "sniffing") {
      frame = "idle";
    } else {
      // Alternate walk frames
      const timer = (walkFrameTimers.get(critter.id) ?? 0) + (deltaTime ?? 0);
      walkFrameTimers.set(critter.id, timer);
      if (timer >= WALK_FRAME_INTERVAL) {
        walkFrameTimers.set(critter.id, 0);
        walkFrameState.set(critter.id, !walkFrameState.get(critter.id));
      }
      frame = walkFrameState.get(critter.id) ? "walk1" : "walk2";
    }

    const url = getSpriteFrameURL(critter.type, frame, CRITTER_SIZE);
    if (url) {
      el.textContent = "";
      el.style.backgroundImage = `url(${url})`;
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";
      el.style.imageRendering = "pixelated";
      el.classList.add("sprite");
    }
  } else {
    // Emoji mode
    if (el.classList.contains("sprite")) {
      el.style.backgroundImage = "";
      el.style.imageRendering = "";
      el.classList.remove("sprite");
    }
    if (el.textContent !== critter.emoji) {
      el.textContent = critter.emoji;
    }
  }
}

export function addCritterElement(critter: Critter): void {
  const el = document.createElement("div");
  el.className = "critter";
  el.textContent = critter.emoji;
  el.dataset.critterId = String(critter.id);
  el.dataset.critterType = critter.type;
  el.dataset.critterName = critter.name;
  el.dataset.edge = critter.edge;
  el.style.left = `${critter.x}px`;
  el.style.top = `${critter.y}px`;
  el.style.width = `${CRITTER_SIZE}px`;
  el.style.height = `${CRITTER_SIZE}px`;
  document.body.appendChild(el);
  critterElements.set(critter.id, el);

  applyVisual(el, critter);

  // Separate name label (outside critter div — no inherited rotation or wiggle)
  const nameEl = document.createElement("div");
  nameEl.className = "critter-name";
  nameEl.textContent = critter.name;
  nameEl.style.opacity = "0";
  document.body.appendChild(nameEl);
  nameElements.set(critter.id, nameEl);
}

let lastUpdateTime = 0;

export function updateCritterElements(critters: Critter[]): void {
  const now = performance.now() / 1000;
  const deltaTime = lastUpdateTime ? now - lastUpdateTime : 1 / 60;
  lastUpdateTime = now;

  for (const critter of critters) {
    const el = critterElements.get(critter.id);
    if (el) {
      el.style.left = `${critter.x}px`;
      el.style.top = `${critter.y}px`;
      el.dataset.edge = critter.edge;
      el.dataset.state = critter.state.kind;
      applyVisual(el, critter, deltaTime);
    }

    const nameEl = nameElements.get(critter.id);
    if (nameEl) {
      const showName = critter.state.kind !== "walking";
      nameEl.style.opacity = showName ? "1" : "0";
      nameEl.dataset.edge = critter.edge;

      // Position name inward from the screen edge, centered on the critter
      const half = CRITTER_SIZE / 2;
      switch (critter.edge) {
        case "bottom":
          nameEl.style.left = `${critter.x + half}px`;
          nameEl.style.top = `${critter.y - 14}px`;
          nameEl.style.transform = "translateX(-50%)";
          break;
        case "top":
          nameEl.style.left = `${critter.x + half}px`;
          nameEl.style.top = `${critter.y + CRITTER_SIZE + 2}px`;
          nameEl.style.transform = "translateX(-50%)";
          break;
        case "left":
          nameEl.style.left = `${critter.x + CRITTER_SIZE + 4}px`;
          nameEl.style.top = `${critter.y + half}px`;
          nameEl.style.transform = "translateY(-50%)";
          break;
        case "right":
          nameEl.style.left = `${critter.x - 4}px`;
          nameEl.style.top = `${critter.y + half}px`;
          nameEl.style.transform = "translateX(-100%) translateY(-50%)";
          break;
      }
    }
  }
}

export function removeCritterElement(id: number): void {
  const el = critterElements.get(id);
  if (el) {
    el.remove();
    critterElements.delete(id);
  }
  const nameEl = nameElements.get(id);
  if (nameEl) {
    nameEl.remove();
    nameElements.delete(id);
  }
  walkFrameTimers.delete(id);
  walkFrameState.delete(id);
}

export function removeAllCritterElements(): void {
  for (const [, el] of critterElements) {
    el.remove();
  }
  critterElements.clear();
  for (const [, el] of nameElements) {
    el.remove();
  }
  nameElements.clear();
  walkFrameTimers.clear();
  walkFrameState.clear();
}
