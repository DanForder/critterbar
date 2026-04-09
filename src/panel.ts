import "./panel.css";

type CritterType = "cat" | "dog" | "bird" | "rabbit" | "hamster" | "fox" | "frog" | "turtle";

const ALL_TYPES: CritterType[] = [
  "cat", "dog", "bird", "rabbit", "hamster", "fox", "frog", "turtle",
];

const LABELS: Record<CritterType, string> = {
  cat: "🐱 Cat",
  dog: "🐶 Dog",
  bird: "🐦 Bird",
  rabbit: "🐰 Rabbit",
  hamster: "🐹 Hamster",
  fox: "🦊 Fox",
  frog: "🐸 Frog",
  turtle: "🐢 Turtle",
};

let activeTypes = new Set<CritterType>();

async function panelInvoke(command: string, args?: Record<string, unknown>): Promise<void> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    await invoke(command, args);
  } catch {
    // Not in Tauri context
  }
}

function render(): void {
  const app = document.getElementById("app")!;
  app.innerHTML = "";

  // Add grid (2 columns, 4 rows)
  const addGrid = document.createElement("div");
  addGrid.className = "add-grid";
  for (const type of ALL_TYPES) {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = LABELS[type];
    btn.disabled = activeTypes.has(type);
    btn.onclick = () => panelInvoke("panel_action", { action: "add", critterType: type });
    addGrid.appendChild(btn);
  }
  app.appendChild(addGrid);

  // Random + Add All row
  const full = activeTypes.size === ALL_TYPES.length;
  const quickRow = document.createElement("div");
  quickRow.className = "row";

  const randomBtn = document.createElement("button");
  randomBtn.className = "btn";
  randomBtn.textContent = "Random 🎲";
  randomBtn.disabled = full;
  randomBtn.onclick = () => panelInvoke("panel_action", { action: "add-random" });

  const allBtn = document.createElement("button");
  allBtn.className = "btn";
  allBtn.textContent = "Add All 🌟";
  allBtn.disabled = full;
  allBtn.onclick = () => panelInvoke("panel_action", { action: "add-all" });

  quickRow.appendChild(randomBtn);
  quickRow.appendChild(allBtn);
  app.appendChild(quickRow);

  // Active critter remove buttons
  if (activeTypes.size > 0) {
    const sep = document.createElement("hr");
    app.appendChild(sep);
    for (const type of ALL_TYPES) {
      if (!activeTypes.has(type)) continue;
      const btn = document.createElement("button");
      btn.className = "btn remove-btn";
      btn.textContent = `Remove ${LABELS[type]}`;
      btn.onclick = () => panelInvoke("panel_action", { action: "remove", critterType: type });
      app.appendChild(btn);
    }
  }

  // Footer: Remove All + Quit
  const sep2 = document.createElement("hr");
  app.appendChild(sep2);

  const footRow = document.createElement("div");
  footRow.className = "row";

  const removeAllBtn = document.createElement("button");
  removeAllBtn.className = "btn danger-btn";
  removeAllBtn.textContent = "Remove All";
  removeAllBtn.disabled = activeTypes.size === 0;
  removeAllBtn.onclick = () => panelInvoke("panel_action", { action: "remove-all" });

  const quitBtn = document.createElement("button");
  quitBtn.className = "btn";
  quitBtn.textContent = "Quit";
  quitBtn.onclick = () => panelInvoke("panel_action", { action: "quit" });

  footRow.appendChild(removeAllBtn);
  footRow.appendChild(quitBtn);
  app.appendChild(footRow);

  // Resize window to fit content
  requestAnimationFrame(() => {
    const height = document.body.scrollHeight;
    panelInvoke("resize_panel", { height });
  });
}

async function init(): Promise<void> {
  // Load initial critter state
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const active = await invoke<string[]>("get_active_critters");
    activeTypes = new Set(active as CritterType[]);
  } catch {
    // Not in Tauri context — render with empty state
  }

  render();

  // Listen for state changes from the overlay
  try {
    const { listen } = await import("@tauri-apps/api/event");
    listen<{ critter_type: string; active: boolean }>("critter-state-changed", (event) => {
      const { critter_type, active } = event.payload;
      if (active) {
        activeTypes.add(critter_type as CritterType);
      } else {
        activeTypes.delete(critter_type as CritterType);
      }
      render();
    });
  } catch {
    // Not in Tauri context
  }
}

init();
