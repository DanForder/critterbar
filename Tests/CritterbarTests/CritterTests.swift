import XCTest
@testable import CritterbarCore

final class CritterTests: XCTestCase {

    func testCritterInitialization() {
        let critter = Critter(type: .cat, x: 100, y: 200)
        XCTAssertEqual(critter.type, .cat)
        XCTAssertEqual(critter.x, 100)
        XCTAssertEqual(critter.y, 200)
        XCTAssertEqual(critter.screenIndex, 0)
    }

    func testCritterTypeEmojis() {
        XCTAssertEqual(CritterType.cat.emoji, "🐱")
        XCTAssertEqual(CritterType.dog.emoji, "🐶")
        XCTAssertEqual(CritterType.bird.emoji, "🐦")
    }

    func testCritterSniffEmojis() {
        XCTAssertEqual(CritterType.cat.sniffEmoji, "😺")
        XCTAssertEqual(CritterType.dog.sniffEmoji, "🐕")
        XCTAssertEqual(CritterType.bird.sniffEmoji, "🐤")
    }

    func testCritterWalksAlongEdge() {
        let bounds = CritterBounds(minX: 0, minY: 0, maxX: 1000, maxY: 1000)
        let critter = Critter(type: .dog, x: 500, y: 0)

        // Force to bottom edge walking forward
        critter.snapToEdge(bounds: bounds)

        for _ in 0..<100 {
            critter.update(deltaTime: 1.0 / 30.0, bounds: bounds)
        }

        // Critter should be on an edge (one coordinate pinned to edge value)
        let onEdge = critter.y == bounds.minY ||
                     critter.y == bounds.maxY - 48 ||
                     critter.x == bounds.minX ||
                     critter.x == bounds.maxX - 48
        XCTAssertTrue(onEdge, "Critter should always be on a screen edge, position: (\(critter.x), \(critter.y))")
    }

    func testCritterStaysOnEdgeAfterManyUpdates() {
        let bounds = CritterBounds(minX: 0, minY: 0, maxX: 500, maxY: 500)
        let critter = Critter(type: .bird, x: 100, y: 0)
        critter.snapToEdge(bounds: bounds)

        for _ in 0..<2000 {
            critter.update(deltaTime: 1.0 / 30.0, bounds: bounds)
        }

        let onEdge = critter.y == bounds.minY ||
                     critter.y == bounds.maxY - 48 ||
                     critter.x == bounds.minX ||
                     critter.x == bounds.maxX - 48
        XCTAssertTrue(onEdge, "Critter should stay on edges after many updates, position: (\(critter.x), \(critter.y))")
    }

    func testCritterStaysInBounds() {
        let bounds = CritterBounds(minX: 0, minY: 0, maxX: 200, maxY: 200)
        let critter = Critter(type: .cat, x: 100, y: 0)
        critter.snapToEdge(bounds: bounds)

        for _ in 0..<2000 {
            critter.update(deltaTime: 1.0 / 30.0, bounds: bounds)
        }

        XCTAssertGreaterThanOrEqual(critter.x, bounds.minX)
        XCTAssertLessThanOrEqual(critter.x, bounds.maxX)
        XCTAssertGreaterThanOrEqual(critter.y, bounds.minY)
        XCTAssertLessThanOrEqual(critter.y, bounds.maxY)
    }

    func testCritterSniffsEventually() {
        let bounds = CritterBounds(minX: 0, minY: 0, maxX: 1000, maxY: 1000)
        let critter = Critter(type: .cat, x: 500, y: 0)
        critter.snapToEdge(bounds: bounds)

        var didSniff = false
        // Run for up to 15 simulated seconds — sniff should happen within 8s
        for _ in 0..<450 {
            critter.update(deltaTime: 1.0 / 30.0, bounds: bounds)
            if case .sniffing = critter.state {
                didSniff = true
                break
            }
        }

        XCTAssertTrue(didSniff, "Critter should enter sniffing state within ~15 seconds")
    }

    func testCritterDisplayEmojiStaysConsistent() {
        let critter = Critter(type: .cat, x: 100, y: 0)
        XCTAssertEqual(critter.displayEmoji, "🐱")

        // Emoji should stay the same even when sniffing
        let bounds = CritterBounds(minX: 0, minY: 0, maxX: 1000, maxY: 1000)
        for _ in 0..<1000 {
            critter.update(deltaTime: 1.0 / 30.0, bounds: bounds)
            XCTAssertEqual(critter.displayEmoji, "🐱", "Display emoji should always be the base emoji")
        }
    }

    func testCritterUniqueIds() {
        let c1 = Critter(type: .cat, x: 0, y: 0)
        let c2 = Critter(type: .cat, x: 0, y: 0)
        XCTAssertNotEqual(c1.id, c2.id)
    }

    func testCritterBoundsProperties() {
        let bounds = CritterBounds(minX: 10, minY: 20, maxX: 110, maxY: 220)
        XCTAssertEqual(bounds.width, 100)
        XCTAssertEqual(bounds.height, 200)
    }

    func testSnapToEdge() {
        let bounds = CritterBounds(minX: 0, minY: 0, maxX: 1000, maxY: 800)
        let critter = Critter(type: .dog, x: 500, y: 400)
        critter.snapToEdge(bounds: bounds)

        let onEdge = critter.y == bounds.minY ||
                     critter.y == bounds.maxY - 48 ||
                     critter.x == bounds.minX ||
                     critter.x == bounds.maxX - 48
        XCTAssertTrue(onEdge, "snapToEdge should place critter on an edge")
    }
}
