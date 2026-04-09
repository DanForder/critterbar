import { Critter, CRITTER_SIZE } from "./critter";

const critterElements = new Map<number, HTMLDivElement>();

export function addCritterElement(critter: Critter): void {
  const el = document.createElement("div");
  el.className = "critter";
  el.textContent = critter.emoji;
  el.dataset.critterId = String(critter.id);
  el.dataset.critterType = critter.type;
  el.dataset.critterName = critter.name;
  el.dataset.edge = critter.edge;

  const nameLabel = document.createElement("span");
  nameLabel.className = "critter-name";
  nameLabel.textContent = `💭 ${critter.name}`;
  el.appendChild(nameLabel);
  el.style.left = `${critter.x}px`;
  el.style.top = `${critter.y}px`;
  el.style.width = `${CRITTER_SIZE}px`;
  el.style.height = `${CRITTER_SIZE}px`;
  document.body.appendChild(el);
  critterElements.set(critter.id, el);
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
  }
}

export function removeCritterElement(id: number): void {
  const el = critterElements.get(id);
  if (el) {
    el.remove();
    critterElements.delete(id);
  }
}

export function removeAllCritterElements(): void {
  for (const [id, el] of critterElements) {
    el.remove();
  }
  critterElements.clear();
}
