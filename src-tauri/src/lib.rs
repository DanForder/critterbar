use std::collections::HashMap;
use std::sync::Mutex;
use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    webview::WebviewWindowBuilder,
    Emitter, Manager, State, WebviewUrl,
};

struct MenuItems(Mutex<HashMap<String, MenuItem<tauri::Wry>>>);

#[derive(Clone, serde::Serialize)]
struct CritterStateChanged {
    critter_type: String,
    active: bool,
}

#[tauri::command]
fn set_critter_active(
    app: tauri::AppHandle,
    state: State<'_, MenuItems>,
    critter_type: String,
    active: bool,
) {
    if let Ok(items) = state.0.lock() {
        if let Some(item) = items.get(&format!("add-{}", critter_type)) {
            let _ = item.set_enabled(!active);
        }
        if let Some(item) = items.get(&format!("remove-{}", critter_type)) {
            let _ = item.set_enabled(active);
        }
    }
    // Notify panel of state change
    let _ = app.emit(
        "critter-state-changed",
        CritterStateChanged {
            critter_type,
            active,
        },
    );
}

#[tauri::command]
fn set_add_random_enabled(state: State<'_, MenuItems>, enabled: bool) {
    if let Ok(items) = state.0.lock() {
        if let Some(item) = items.get("add-random") {
            let _ = item.set_enabled(enabled);
        }
    }
}

#[tauri::command]
fn set_add_all_enabled(state: State<'_, MenuItems>, enabled: bool) {
    if let Ok(items) = state.0.lock() {
        if let Some(item) = items.get("add-all") {
            let _ = item.set_enabled(enabled);
        }
    }
}

#[tauri::command]
fn set_tray_title(app: tauri::AppHandle, title: String) {
    if let Some(tray) = app.tray_by_id("main") {
        let _ = tray.set_title(Some(title.as_str()));
    }
}

#[tauri::command]
fn get_active_critters(state: State<'_, MenuItems>) -> Vec<String> {
    let types = ["cat", "dog", "bird", "rabbit", "hamster", "fox", "frog", "turtle"];
    if let Ok(items) = state.0.lock() {
        types
            .iter()
            .filter(|t| {
                items
                    .get(&format!("remove-{}", t))
                    .and_then(|item| item.is_enabled().ok())
                    .unwrap_or(false)
            })
            .map(|t| t.to_string())
            .collect()
    } else {
        vec![]
    }
}

#[tauri::command]
fn panel_action(app: tauri::AppHandle, action: String, critter_type: Option<String>) {
    match action.as_str() {
        "add" => {
            if let Some(t) = critter_type {
                let _ = app.emit("add-critter", t);
            }
        }
        "remove" => {
            if let Some(t) = critter_type {
                let _ = app.emit("remove-critter", t);
            }
        }
        "add-random" => {
            let _ = app.emit("add-random", ());
        }
        "add-all" => {
            let _ = app.emit("add-all", ());
        }
        "remove-all" => {
            let _ = app.emit("remove-all", ());
        }
        "quit" => {
            app.exit(0);
        }
        _ => {}
    }
}

#[tauri::command]
fn set_update_menu_text(state: State<'_, MenuItems>, text: String) {
    if let Ok(items) = state.0.lock() {
        if let Some(item) = items.get("check-update") {
            let _ = item.set_text(&text);
            // Change the ID behavior: if text indicates restart, the menu event handler
            // checks the current text to decide whether to restart or check
        }
    }
}

#[tauri::command]
fn resize_panel(app: tauri::AppHandle, height: u32) {
    if let Some(panel) = app.get_webview_window("panel") {
        let _ = panel.set_size(tauri::Size::Logical(tauri::LogicalSize {
            width: 220.0,
            height: height as f64,
        }));
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .invoke_handler(tauri::generate_handler![
            set_critter_active,
            set_add_random_enabled,
            set_add_all_enabled,
            set_tray_title,
            get_active_critters,
            panel_action,
            resize_panel,
            set_update_menu_text,
        ])
        .setup(|app| {
            // Hide from dock (menu bar only)
            #[cfg(target_os = "macos")]
            {
                app.set_activation_policy(tauri::ActivationPolicy::Accessory);
            }

            // Create overlay window programmatically for full control
            let window = WebviewWindowBuilder::new(
                app,
                "overlay",
                WebviewUrl::App("index.html".into()),
            )
            .transparent(true)
            .decorations(false)
            .always_on_top(true)
            .resizable(false)
            .shadow(false)
            .skip_taskbar(true)
            .title("")
            .build()?;

            // Size to fill screen
            let _ = window.maximize();
            let _ = window.set_ignore_cursor_events(true);

            // Set native NSWindow level to floating (above all normal windows)
            #[cfg(target_os = "macos")]
            {
                use cocoa::appkit::NSWindow;
                use cocoa::base::id;

                if let Ok(ns_win) = window.ns_window() {
                    unsafe {
                        let ns_win = ns_win as id;
                        // 3 = NSFloatingWindowLevel (same as Swift's .floating)
                        ns_win.setLevel_(3);
                        // Also ensure it appears on all spaces/desktops
                        ns_win.setCollectionBehavior_(
                            cocoa::appkit::NSWindowCollectionBehavior::NSWindowCollectionBehaviorCanJoinAllSpaces
                            | cocoa::appkit::NSWindowCollectionBehavior::NSWindowCollectionBehaviorFullScreenAuxiliary
                        );
                    }
                }
            }

            // Create panel window (hidden initially — shown on tray left-click)
            let _panel = WebviewWindowBuilder::new(
                app,
                "panel",
                WebviewUrl::App("panel.html".into()),
            )
            .decorations(false)
            .always_on_top(true)
            .resizable(false)
            .shadow(true)
            .skip_taskbar(true)
            .visible(false)
            .inner_size(220.0, 150.0)
            .build()?;

            // Build tray menu — "Remove X" items are disabled until that critter is active
            let remove_cat     = MenuItem::with_id(app, "remove-cat",     "Remove Cat 🐱",     false, None::<&str>)?;
            let remove_dog     = MenuItem::with_id(app, "remove-dog",     "Remove Dog 🐶",     false, None::<&str>)?;
            let remove_bird    = MenuItem::with_id(app, "remove-bird",    "Remove Bird 🐦",    false, None::<&str>)?;
            let remove_rabbit  = MenuItem::with_id(app, "remove-rabbit",  "Remove Rabbit 🐰",  false, None::<&str>)?;
            let remove_hamster = MenuItem::with_id(app, "remove-hamster", "Remove Hamster 🐹", false, None::<&str>)?;
            let remove_fox     = MenuItem::with_id(app, "remove-fox",     "Remove Fox 🦊",     false, None::<&str>)?;
            let remove_frog    = MenuItem::with_id(app, "remove-frog",    "Remove Frog 🐸",    false, None::<&str>)?;
            let remove_turtle  = MenuItem::with_id(app, "remove-turtle",  "Remove Turtle 🐢",  false, None::<&str>)?;

            let add_cat     = MenuItem::with_id(app, "add-cat",     "Add Cat 🐱",     true, None::<&str>)?;
            let add_dog     = MenuItem::with_id(app, "add-dog",     "Add Dog 🐶",     true, None::<&str>)?;
            let add_bird    = MenuItem::with_id(app, "add-bird",    "Add Bird 🐦",    true, None::<&str>)?;
            let add_rabbit  = MenuItem::with_id(app, "add-rabbit",  "Add Rabbit 🐰",  true, None::<&str>)?;
            let add_hamster = MenuItem::with_id(app, "add-hamster", "Add Hamster 🐹", true, None::<&str>)?;
            let add_fox     = MenuItem::with_id(app, "add-fox",     "Add Fox 🦊",     true, None::<&str>)?;
            let add_frog    = MenuItem::with_id(app, "add-frog",    "Add Frog 🐸",    true, None::<&str>)?;
            let add_turtle  = MenuItem::with_id(app, "add-turtle",  "Add Turtle 🐢",  true, None::<&str>)?;
            let add_random  = MenuItem::with_id(app, "add-random",  "Add Random 🎲",  true, None::<&str>)?;
            let add_all     = MenuItem::with_id(app, "add-all",     "Add All 🌟",     true, None::<&str>)?;
            let remove_all  = MenuItem::with_id(app, "remove-all",  "Remove All",     true, None::<&str>)?;
            let check_update = MenuItem::with_id(app, "check-update", "Check for Updates", true, None::<&str>)?;
            let version     = MenuItem::with_id(app, "version", format!("v{}", app.config().version.as_deref().unwrap_or("?")), false, None::<&str>)?;
            let quit        = MenuItem::with_id(app, "quit",        "Quit",           true, None::<&str>)?;

            // Store all toggleable items for live enable/disable
            let mut item_map: HashMap<String, MenuItem<tauri::Wry>> = HashMap::new();
            item_map.insert("remove-cat".to_string(),     remove_cat.clone());
            item_map.insert("remove-dog".to_string(),     remove_dog.clone());
            item_map.insert("remove-bird".to_string(),    remove_bird.clone());
            item_map.insert("remove-rabbit".to_string(),  remove_rabbit.clone());
            item_map.insert("remove-hamster".to_string(), remove_hamster.clone());
            item_map.insert("remove-fox".to_string(),     remove_fox.clone());
            item_map.insert("remove-frog".to_string(),    remove_frog.clone());
            item_map.insert("remove-turtle".to_string(),  remove_turtle.clone());
            item_map.insert("add-cat".to_string(),        add_cat.clone());
            item_map.insert("add-dog".to_string(),        add_dog.clone());
            item_map.insert("add-bird".to_string(),       add_bird.clone());
            item_map.insert("add-rabbit".to_string(),     add_rabbit.clone());
            item_map.insert("add-hamster".to_string(),    add_hamster.clone());
            item_map.insert("add-fox".to_string(),        add_fox.clone());
            item_map.insert("add-frog".to_string(),       add_frog.clone());
            item_map.insert("add-turtle".to_string(),     add_turtle.clone());
            item_map.insert("add-random".to_string(),     add_random.clone());
            item_map.insert("add-all".to_string(),        add_all.clone());
            item_map.insert("check-update".to_string(),   check_update.clone());
            app.manage(MenuItems(Mutex::new(item_map)));

            let menu = Menu::with_items(
                app,
                &[
                    &remove_cat,
                    &remove_dog,
                    &remove_bird,
                    &remove_rabbit,
                    &remove_hamster,
                    &remove_fox,
                    &remove_frog,
                    &remove_turtle,
                    &PredefinedMenuItem::separator(app)?,
                    &add_cat,
                    &add_dog,
                    &add_bird,
                    &add_rabbit,
                    &add_hamster,
                    &add_fox,
                    &add_frog,
                    &add_turtle,
                    &add_random,
                    &add_all,
                    &PredefinedMenuItem::separator(app)?,
                    &remove_all,
                    &PredefinedMenuItem::separator(app)?,
                    &check_update,
                    &version,
                    &quit,
                ],
            )?;

            let _tray = TrayIconBuilder::with_id("main")
                .menu(&menu)
                .show_menu_on_left_click(false)
                .icon(app.default_window_icon().unwrap().clone())
                .title("🐾")
                .tooltip("Critterbar — click to open, right-click for menu")
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        position,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        if let Some(panel) = app.get_webview_window("panel") {
                            if panel.is_visible().unwrap_or(false) {
                                let _ = panel.hide();
                            } else {
                                // Position panel below tray icon, centered on click x
                                let scale = app
                                    .get_webview_window("overlay")
                                    .and_then(|w| w.scale_factor().ok())
                                    .unwrap_or(2.0);
                                let logical_x = (position.x / scale) - 110.0;
                                let logical_y = 24.0_f64;
                                let _ = panel.set_position(tauri::Position::Logical(
                                    tauri::LogicalPosition {
                                        x: logical_x.max(0.0),
                                        y: logical_y,
                                    },
                                ));
                                let _ = panel.show();
                                let _ = panel.set_focus();
                            }
                        }
                    }
                })
                .on_menu_event(move |app, event| {
                    match event.id.as_ref() {
                        "remove-cat"     => { let _ = app.emit("remove-critter", "cat"); }
                        "remove-dog"     => { let _ = app.emit("remove-critter", "dog"); }
                        "remove-bird"    => { let _ = app.emit("remove-critter", "bird"); }
                        "remove-rabbit"  => { let _ = app.emit("remove-critter", "rabbit"); }
                        "remove-hamster" => { let _ = app.emit("remove-critter", "hamster"); }
                        "remove-fox"     => { let _ = app.emit("remove-critter", "fox"); }
                        "remove-frog"    => { let _ = app.emit("remove-critter", "frog"); }
                        "remove-turtle"  => { let _ = app.emit("remove-critter", "turtle"); }
                        "add-cat"     => { let _ = app.emit("add-critter", "cat"); }
                        "add-dog"     => { let _ = app.emit("add-critter", "dog"); }
                        "add-bird"    => { let _ = app.emit("add-critter", "bird"); }
                        "add-rabbit"  => { let _ = app.emit("add-critter", "rabbit"); }
                        "add-hamster" => { let _ = app.emit("add-critter", "hamster"); }
                        "add-fox"     => { let _ = app.emit("add-critter", "fox"); }
                        "add-frog"    => { let _ = app.emit("add-critter", "frog"); }
                        "add-turtle"  => { let _ = app.emit("add-critter", "turtle"); }
                        "add-random"  => { let _ = app.emit("add-random", ()); }
                        "add-all"     => { let _ = app.emit("add-all", ()); }
                        "remove-all"  => { let _ = app.emit("remove-all", ()); }
                        "check-update" => { let _ = app.emit("check-update", ()); }
                        "quit"        => { app.exit(0); }
                        _ => {}
                    }
                })
                .build(app)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Critterbar");
}
