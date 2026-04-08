import Foundation

public class CritterManager {
    public private(set) var critters: [Critter] = []
    public var boundsProvider: (() -> [CritterBounds])?

    public var critterCount: Int { critters.count }

    public init() {}

    @discardableResult
    public func addCritter(type: CritterType, screenIndex: Int = 0) -> Critter {
        let bounds = boundsForScreen(screenIndex)
        let x = Double.random(in: bounds.minX + 40...max(bounds.maxX - 40, bounds.minX + 41))
        let y = Double.random(in: bounds.minY + 40...max(bounds.maxY - 40, bounds.minY + 41))
        let critter = Critter(type: type, x: x, y: y, screenIndex: screenIndex)
        critters.append(critter)
        return critter
    }

    public func removeCritter(id: UUID) {
        critters.removeAll { $0.id == id }
    }

    public func removeAll() {
        critters.removeAll()
    }

    public func update(deltaTime: Double) {
        for critter in critters {
            let bounds = boundsForScreen(critter.screenIndex)
            critter.update(deltaTime: deltaTime, bounds: bounds)
        }
    }

    private func boundsForScreen(_ index: Int) -> CritterBounds {
        if let provider = boundsProvider {
            let allBounds = provider()
            if index < allBounds.count {
                return allBounds[index]
            }
        }
        return CritterBounds(minX: 0, minY: 0, maxX: 1920, maxY: 1080)
    }
}
