import "./panel.css";

type CritterType = "cat" | "dog" | "bird" | "rabbit" | "hamster" | "fox" | "frog" | "turtle";

const ALL_TYPES: CritterType[] = [
  "cat", "dog", "bird", "rabbit", "hamster", "fox", "frog", "turtle",
];

const EMOJIS: Record<CritterType, string> = {
  cat: "🐱", dog: "🐶", bird: "🐦", rabbit: "🐰",
  hamster: "🐹", fox: "🦊", frog: "🐸", turtle: "🐢",
};

const NAMES: Record<CritterType, string> = {
  cat: "Cat", dog: "Dog", bird: "Bird", rabbit: "Rabbit",
  hamster: "Hamster", fox: "Fox", frog: "Frog", turtle: "Turtle",
};

let activeTypes = new Set<CritterType>();
let launchAtLogin = false;
let showNames = localStorage.getItem("showNames") === "true"; // default false
let betaArtwork = localStorage.getItem("betaArtwork") === "true"; // default false

async function panelInvoke(command: string, args?: Record<string, unknown>): Promise<void> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    await invoke(command, args);
  } catch {
    // Not in Tauri context
  }
}

async function emitBetaArtwork(): Promise<void> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    await invoke("emit_beta_artwork", { enabled: betaArtwork });
  } catch {
    // Not in Tauri context
  }
}

async function emitShowNames(): Promise<void> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    await invoke("emit_show_names", { show: showNames });
  } catch {
    // Not in Tauri context
  }
}

async function toggleLaunchAtLogin(): Promise<void> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const next = !launchAtLogin;
    await invoke("set_launch_at_login", { enabled: next });
    launchAtLogin = next;
    render();
  } catch {
    // Not in Tauri context
  }
}

function render(): void {
  const app = document.getElementById("app")!;
  app.innerHTML = "";

  // Critter toggle grid (2 columns)
  const grid = document.createElement("div");
  grid.className = "add-grid";
  for (const type of ALL_TYPES) {
    const active = activeTypes.has(type);
    const btn = document.createElement("button");
    btn.className = active ? "btn active" : "btn";
    btn.innerHTML = `${active ? "✓ " : ""}${EMOJIS[type]} ${NAMES[type]}`;
    btn.onclick = () => {
      if (active) {
        panelInvoke("panel_action", { action: "remove", critterType: type });
      } else {
        panelInvoke("panel_action", { action: "add", critterType: type });
      }
    };
    grid.appendChild(btn);
  }
  app.appendChild(grid);

  // Quick actions row
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
  allBtn.textContent = full ? "✓ All" : "Add All 🌟";
  allBtn.disabled = full;
  allBtn.onclick = () => panelInvoke("panel_action", { action: "add-all" });

  quickRow.appendChild(randomBtn);
  quickRow.appendChild(allBtn);
  app.appendChild(quickRow);

  // Footer
  const sep = document.createElement("hr");
  app.appendChild(sep);

  const artBtn = document.createElement("button");
  artBtn.className = betaArtwork ? "btn active" : "btn";
  artBtn.textContent = betaArtwork ? "✓ Beta Artwork" : "Beta Artwork";
  artBtn.onclick = () => {
    betaArtwork = !betaArtwork;
    localStorage.setItem("betaArtwork", String(betaArtwork));
    emitBetaArtwork();
    render();
  };
  app.appendChild(artBtn);

  const namesBtn = document.createElement("button");
  namesBtn.className = showNames ? "btn active" : "btn";
  namesBtn.textContent = showNames ? "✓ Show Names" : "Show Names";
  namesBtn.onclick = () => {
    showNames = !showNames;
    localStorage.setItem("showNames", String(showNames));
    emitShowNames();
    render();
  };
  app.appendChild(namesBtn);

  const loginBtn = document.createElement("button");
  loginBtn.className = launchAtLogin ? "btn active" : "btn";
  loginBtn.textContent = launchAtLogin ? "✓ Launch at Login" : "Launch at Login";
  loginBtn.onclick = () => toggleLaunchAtLogin();
  app.appendChild(loginBtn);

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
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const [active, loginEnabled] = await Promise.all([
      invoke<string[]>("get_active_critters"),
      invoke<boolean>("get_launch_at_login"),
    ]);
    activeTypes = new Set(active as CritterType[]);
    launchAtLogin = loginEnabled;
  } catch {
    // Not in Tauri context
  }

  render();

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
    // Re-fetch full state when the panel is opened (ensures correct state after app restore)
    listen("panel-opened", async () => {
      const { invoke } = await import("@tauri-apps/api/core");
      const active = await invoke<string[]>("get_active_critters");
      activeTypes = new Set(active as CritterType[]);
      render();
    });
  } catch {
    // Not in Tauri context
  }
}

init();
