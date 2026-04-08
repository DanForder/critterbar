import AppKit
import CritterbarCore

class StatusBarController {
    private var statusItem: NSStatusItem?
    var onAddCritter: ((CritterType) -> Void)?
    var onRemoveAll: (() -> Void)?

    func setup() {
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        statusItem?.button?.title = "🐾"
        statusItem?.button?.setAccessibilityIdentifier("critterbar-menu")
        statusItem?.button?.setAccessibilityLabel("Critterbar")

        let menu = NSMenu()
        menu.setAccessibilityIdentifier("critterbar-dropdown")
        menu.addItem(NSMenuItem(title: "Add Cat 🐱", action: #selector(addCat), keyEquivalent: ""))
        menu.addItem(NSMenuItem(title: "Add Dog 🐶", action: #selector(addDog), keyEquivalent: ""))
        menu.addItem(NSMenuItem(title: "Add Bird 🐦", action: #selector(addBird), keyEquivalent: ""))
        menu.addItem(NSMenuItem.separator())
        menu.addItem(NSMenuItem(title: "Remove All", action: #selector(removeAll), keyEquivalent: ""))
        menu.addItem(NSMenuItem.separator())
        menu.addItem(NSMenuItem(title: "Quit", action: #selector(quit), keyEquivalent: "q"))

        for item in menu.items {
            item.target = self
        }

        statusItem?.menu = menu
    }

    @objc private func addCat() { onAddCritter?(.cat) }
    @objc private func addDog() { onAddCritter?(.dog) }
    @objc private func addBird() { onAddCritter?(.bird) }

    @objc private func removeAll() { onRemoveAll?() }

    @objc private func quit() {
        NSApplication.shared.terminate(nil)
    }
}
