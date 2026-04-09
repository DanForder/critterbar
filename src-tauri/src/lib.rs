use std::collections::HashMap;
use std::sync::Mutex;
use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    webview::WebviewWindowBuilder,
    Emitter, Manager, State, WebviewUrl,
};
#[cfg(any(target_os = "macos", windows, target_os = "linux"))]
use tauri_plugin_autostart::ManagerExt;

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
fn get_launch_at_login(app: tauri::AppHandle) -> bool {
    #[cfg(any(target_os = "macos", windows, target_os = "linux"))]
    {
        app.autolaunch().is_enabled().unwrap_or(false)
    }
    #[cfg(not(any(target_os = "macos", windows, target_os = "linux")))]
    false
}

#[tauri::command]
fn set_launch_at_login(app: tauri::AppHandle, enabled: bool) {
    #[cfg(any(target_os = "macos", windows, target_os = "linux"))]
    {
        if enabled {
            let _ = app.autolaunch().enable();
        } else {
            let _ = app.autolaunch().disable();
        }
    }
    #[cfg(not(any(target_os = "macos", windows, target_os = "linux")))]
    let _ = (app, enabled);
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
        .plugin(tauri_plugin_autostart::init(tauri_plugin_autostart::MacosLauncher::LaunchAgent, None))
        .invoke_handler(tauri::generate_handler![
            set_critter_active,
            set_tray_title,
            get_active_critters,
            panel_action,
            resize_panel,
            set_update_menu_text,
            get_launch_at_login,
            set_launch_at_login,
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
            let panel = WebviewWindowBuilder::new(
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

            // Auto-hide panel when it loses focus (user clicked outside)
            let panel_for_blur = panel.clone();
            panel.on_window_event(move |event| {
                if let tauri::WindowEvent::Focused(false) = event {
                    let _ = panel_for_blur.hide();
                }
            });

            // Right-click menu: just utilities
            let check_update = MenuItem::with_id(app, "check-update", "Check for Updates", true, None::<&str>)?;
            let version     = MenuItem::with_id(app, "version", format!("v{}", app.config().version.as_deref().unwrap_or("?")), false, None::<&str>)?;
            let quit        = MenuItem::with_id(app, "quit",        "Quit",           true, None::<&str>)?;

            let mut item_map: HashMap<String, MenuItem<tauri::Wry>> = HashMap::new();
            item_map.insert("check-update".to_string(), check_update.clone());
            app.manage(MenuItems(Mutex::new(item_map)));

            let menu = Menu::with_items(
                app,
                &[
                    &check_update,
                    &version,
                    &PredefinedMenuItem::separator(app)?,
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
                        "check-update" => { let _ = app.emit("check-update", ()); }
                        "quit"         => { app.exit(0); }
                        _ => {}
                    }
                })
                .build(app)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Critterbar");
}
