use std::collections::HashMap;
use std::sync::Mutex;
use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::TrayIconBuilder,
    webview::WebviewWindowBuilder,
    Emitter, Manager, State, WebviewUrl,
};

struct MenuItems(Mutex<HashMap<String, MenuItem<tauri::Wry>>>);

#[tauri::command]
fn set_critter_active(state: State<'_, MenuItems>, critter_type: String, active: bool) {
    if let Ok(items) = state.0.lock() {
        // Disable "add" item when critter is active
        if let Some(item) = items.get(&format!("add-{}", critter_type)) {
            let _ = item.set_enabled(!active);
        }
        // Enable "remove" item when critter is active
        if let Some(item) = items.get(&format!("remove-{}", critter_type)) {
            let _ = item.set_enabled(active);
        }
    }
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
fn set_tray_title(app: tauri::AppHandle, title: String) {
    if let Some(tray) = app.tray_by_id("main") {
        let _ = tray.set_title(Some(title.as_str()));
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![set_critter_active, set_add_random_enabled, set_tray_title])
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
            let remove_all  = MenuItem::with_id(app, "remove-all",  "Remove All",     true, None::<&str>)?;
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
                    &PredefinedMenuItem::separator(app)?,
                    &remove_all,
                    &PredefinedMenuItem::separator(app)?,
                    &quit,
                ],
            )?;

            let _tray = TrayIconBuilder::with_id("main")
                .menu(&menu)
                .show_menu_on_left_click(true)
                .icon(app.default_window_icon().unwrap().clone())
                .title("🐾")
                .tooltip("Critterbar")
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
                        "remove-all"  => { let _ = app.emit("remove-all", ()); }
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
