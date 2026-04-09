import { Critter, CRITTER_SIZE } from "./critter";

const critterElements = new Map<number, HTMLDivElement>();
const nameElements = new Map<number, HTMLDivElement>();

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

  // Separate name label (outside critter div — no inherited rotation or wiggle)
  const nameEl = document.createElement("div");
  nameEl.className = "critter-name";
  nameEl.textContent = critter.name;
  nameEl.style.opacity = "0";
  document.body.appendChild(nameEl);
  nameElements.set(critter.id, nameEl);
}

export function updateCritterElements(critters: Critter[]): void {
  for (const critter of critters) {
    const el = critterElements.get(critter.id);
    if (el) {
      el.style.left = `${critter.x}px`;
      el.style.top = `${critter.y}px`;
      el.dataset.edge = critter.edge;
      el.dataset.state = critter.state.kind;
    }

    const nameEl = nameElements.get(critter.id);
    if (nameEl) {
      const isSniffing = critter.state.kind === "sniffing";
      nameEl.style.opacity = isSniffing ? "1" : "0";
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
}
