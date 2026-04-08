import AppKit
import CritterbarCore

class CritterView: NSTextField {
    let critterId: UUID

    init(critter: Critter) {
        self.critterId = critter.id
        super.init(frame: NSRect(x: critter.x, y: critter.y, width: 48, height: 48))
        self.stringValue = critter.displayEmoji
        self.isBezeled = false
        self.drawsBackground = false
        self.isEditable = false
        self.isSelectable = false
        self.font = NSFont.systemFont(ofSize: 40)
        self.alignment = .center
        self.setAccessibilityIdentifier("critter-\(critter.type.rawValue)-\(critter.id.uuidString.prefix(8))")
        self.setAccessibilityRole(.staticText)
        self.setAccessibilityLabel("Critter \(critter.type.rawValue)")
    }

    @available(*, unavailable)
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func updatePosition(x: Double, y: Double, emoji: String) {
        self.frame.origin = NSPoint(x: x, y: y)
        self.stringValue = emoji
    }
}
