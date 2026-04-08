import AppKit
import CritterbarCore

class OverlayWindowController {
    private var windows: [NSWindow] = []
    private var critterViews: [UUID: CritterView] = [:]
    var critterViewCount: Int { critterViews.count }

    func setupWindows() {
        tearDownWindows()

        for screen in NSScreen.screens {
            let window = NSWindow(
                contentRect: screen.frame,
                styleMask: .borderless,
                backing: .buffered,
                defer: false,
                screen: screen
            )
            window.level = .floating
            window.isOpaque = false
            window.backgroundColor = .clear
            window.ignoresMouseEvents = true
            window.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
            window.hasShadow = false
            window.contentView = NSView(frame: screen.frame)
            window.orderFront(nil)
            windows.append(window)
        }
    }

    func tearDownWindows() {
        for (_, view) in critterViews {
            view.removeFromSuperview()
        }
        critterViews.removeAll()
        for window in windows {
            window.orderOut(nil)
        }
        windows.removeAll()
    }

    func screenBounds() -> [CritterBounds] {
        return NSScreen.screens.map { screen in
            let frame = screen.frame
            return CritterBounds(
                minX: frame.origin.x,
                minY: frame.origin.y,
                maxX: frame.origin.x + frame.size.width,
                maxY: frame.origin.y + frame.size.height
            )
        }
    }

    func addCritterView(for critter: Critter) {
        let view = CritterView(critter: critter)
        critterViews[critter.id] = view

        let screenIndex = min(critter.screenIndex, windows.count - 1)
        if screenIndex >= 0, screenIndex < windows.count {
            windows[screenIndex].contentView?.addSubview(view)
        }
    }

    func removeCritterView(id: UUID) {
        critterViews[id]?.removeFromSuperview()
        critterViews.removeValue(forKey: id)
    }

    func removeAllCritterViews() {
        for (_, view) in critterViews {
            view.removeFromSuperview()
        }
        critterViews.removeAll()
    }

    func updateCritterPositions(critters: [Critter]) {
        for critter in critters {
            let screenIndex = min(critter.screenIndex, windows.count - 1)
            guard screenIndex >= 0, screenIndex < windows.count else { continue }
            let windowOrigin = windows[screenIndex].frame.origin
            let localX = critter.x - windowOrigin.x
            let localY = critter.y - windowOrigin.y
            critterViews[critter.id]?.updatePosition(x: localX, y: localY, emoji: critter.displayEmoji)
        }
    }
}
