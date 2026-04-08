import Foundation

public enum CritterType: String, CaseIterable {
    case cat
    case dog
    case bird

    public var emoji: String {
        switch self {
        case .cat: return "🐱"
        case .dog: return "🐶"
        case .bird: return "🐦"
        }
    }

    public var baseSpeed: Double {
        switch self {
        case .cat: return 25.0
        case .dog: return 35.0
        case .bird: return 45.0
        }
    }

    public var sniffEmoji: String {
        switch self {
        case .cat: return "😺"
        case .dog: return "🐕"
        case .bird: return "🐤"
        }
    }
}

public struct CritterBounds {
    public let minX: Double
    public let minY: Double
    public let maxX: Double
    public let maxY: Double

    public var width: Double { maxX - minX }
    public var height: Double { maxY - minY }

    public init(minX: Double, minY: Double, maxX: Double, maxY: Double) {
        self.minX = minX
        self.minY = minY
        self.maxX = maxX
        self.maxY = maxY
    }
}

public enum Edge: Int, CaseIterable {
    case bottom = 0
    case right = 1
    case top = 2
    case left = 3
}

public enum CritterState {
    case walking
    case sniffing(remaining: Double)
}

public class Critter: Identifiable {
    public let id = UUID()
    public let type: CritterType

    public var x: Double
    public var y: Double
    public var screenIndex: Int

    public private(set) var edge: Edge
    public private(set) var movingForward: Bool // true = clockwise along edges
    public private(set) var state: CritterState = .walking
    public var speed: Double

    private var sniffTimer: Double = 0
    private var nextSniffIn: Double

    public init(type: CritterType, x: Double, y: Double, screenIndex: Int = 0) {
        self.type = type
        self.x = x
        self.y = y
        self.screenIndex = screenIndex
        self.speed = type.baseSpeed
        self.edge = Edge.allCases.randomElement()!
        self.movingForward = Bool.random()
        self.nextSniffIn = Double.random(in: 3.0...8.0)
    }

    public var displayEmoji: String {
        return type.emoji
    }

    public func snapToEdge(bounds: CritterBounds) {
        let margin: Double = 0
        switch edge {
        case .bottom:
            y = bounds.minY + margin
            x = x.clamped(to: bounds.minX...bounds.maxX)
        case .top:
            y = bounds.maxY - margin - 48
            x = x.clamped(to: bounds.minX...bounds.maxX)
        case .left:
            x = bounds.minX + margin
            y = y.clamped(to: bounds.minY...bounds.maxY)
        case .right:
            x = bounds.maxX - margin - 48
            y = y.clamped(to: bounds.minY...bounds.maxY)
        }
    }

    public func update(deltaTime: Double, bounds: CritterBounds) {
        switch state {
        case .sniffing(let remaining):
            let newRemaining = remaining - deltaTime
            if newRemaining <= 0 {
                state = .walking
                nextSniffIn = Double.random(in: 3.0...8.0)
                sniffTimer = 0
            } else {
                state = .sniffing(remaining: newRemaining)
            }
            return

        case .walking:
            sniffTimer += deltaTime
            if sniffTimer >= nextSniffIn {
                state = .sniffing(remaining: Double.random(in: 1.0...3.0))
                sniffTimer = 0
                return
            }
        }

        let movement = speed * deltaTime
        let direction: Double = movingForward ? 1.0 : -1.0

        // Nudge inward after corner transitions to prevent oscillation
        let cornerNudge: Double = 2.0

        switch edge {
        case .bottom:
            x += movement * direction
            y = bounds.minY
            if x >= bounds.maxX - 48 {
                x = bounds.maxX - 48
                y = bounds.minY + cornerNudge
                edge = movingForward ? .right : .left
            } else if x <= bounds.minX {
                x = bounds.minX
                y = bounds.minY + cornerNudge
                edge = movingForward ? .left : .right
            }

        case .right:
            y += movement * direction
            x = bounds.maxX - 48
            if y >= bounds.maxY - 48 {
                y = bounds.maxY - 48
                x = bounds.maxX - 48 - cornerNudge
                edge = movingForward ? .top : .bottom
            } else if y <= bounds.minY {
                y = bounds.minY
                x = bounds.maxX - 48 - cornerNudge
                edge = movingForward ? .bottom : .top
            }

        case .top:
            x -= movement * direction
            y = bounds.maxY - 48
            if x <= bounds.minX {
                x = bounds.minX
                y = bounds.maxY - 48 - cornerNudge
                edge = movingForward ? .left : .right
            } else if x >= bounds.maxX - 48 {
                x = bounds.maxX - 48
                y = bounds.maxY - 48 - cornerNudge
                edge = movingForward ? .right : .left
            }

        case .left:
            y -= movement * direction
            x = bounds.minX
            if y <= bounds.minY {
                y = bounds.minY
                x = bounds.minX + cornerNudge
                edge = movingForward ? .bottom : .top
            } else if y >= bounds.maxY - 48 {
                y = bounds.maxY - 48
                x = bounds.minX + cornerNudge
                edge = movingForward ? .top : .bottom
            }
        }
    }
}

extension Double {
    func clamped(to range: ClosedRange<Double>) -> Double {
        return Swift.min(Swift.max(self, range.lowerBound), range.upperBound)
    }
}
