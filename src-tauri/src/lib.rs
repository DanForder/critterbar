use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::TrayIconBuilder,
    webview::WebviewWindowBuilder,
    Emitter, Manager, WebviewUrl,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
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

            // Build tray menu
            let add_cat = MenuItem::with_id(app, "add-cat", "Add Cat 🐱", true, None::<&str>)?;
            let add_dog = MenuItem::with_id(app, "add-dog", "Add Dog 🐶", true, None::<&str>)?;
            let add_bird = MenuItem::with_id(app, "add-bird", "Add Bird 🐦", true, None::<&str>)?;
            let remove_all = MenuItem::with_id(app, "remove-all", "Remove All", true, None::<&str>)?;
            let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;

            let menu = Menu::with_items(
                app,
                &[
                    &add_cat,
                    &add_dog,
                    &add_bird,
                    &PredefinedMenuItem::separator(app)?,
                    &remove_all,
                    &PredefinedMenuItem::separator(app)?,
                    &quit,
                ],
            )?;

            let _tray = TrayIconBuilder::new()
                .menu(&menu)
                .show_menu_on_left_click(true)
                .icon(app.default_window_icon().unwrap().clone())
                .tooltip("Critterbar")
                .on_menu_event(move |app, event| {
                    match event.id.as_ref() {
                        "add-cat" => {
                            let _ = app.emit("add-critter", "cat");
                        }
                        "add-dog" => {
                            let _ = app.emit("add-critter", "dog");
                        }
                        "add-bird" => {
                            let _ = app.emit("add-critter", "bird");
                        }
                        "remove-all" => {
                            let _ = app.emit("remove-all", ());
                        }
                        "quit" => {
                            app.exit(0);
                        }
                        _ => {}
                    }
                })
                .build(app)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Critterbar");
}
