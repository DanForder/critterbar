import XCTest
@testable import CritterbarCore

final class CritterManagerTests: XCTestCase {

    func testAddCritter() {
        let manager = CritterManager()
        manager.boundsProvider = {
            [CritterBounds(minX: 0, minY: 0, maxX: 1920, maxY: 1080)]
        }

        let critter = manager.addCritter(type: .cat)
        XCTAssertEqual(manager.critterCount, 1)
        XCTAssertEqual(critter.displayEmoji, "🐱")
    }

    func testAddMultipleCritters() {
        let manager = CritterManager()
        manager.boundsProvider = {
            [CritterBounds(minX: 0, minY: 0, maxX: 1920, maxY: 1080)]
        }

        _ = manager.addCritter(type: .cat)
        _ = manager.addCritter(type: .dog)
        _ = manager.addCritter(type: .bird)
        XCTAssertEqual(manager.critterCount, 3)
    }

    func testRemoveCritter() {
        let manager = CritterManager()
        manager.boundsProvider = {
            [CritterBounds(minX: 0, minY: 0, maxX: 1920, maxY: 1080)]
        }

        let critter = manager.addCritter(type: .cat)
        XCTAssertEqual(manager.critterCount, 1)

        manager.removeCritter(id: critter.id)
        XCTAssertEqual(manager.critterCount, 0)
    }

    func testRemoveAll() {
        let manager = CritterManager()
        manager.boundsProvider = {
            [CritterBounds(minX: 0, minY: 0, maxX: 1920, maxY: 1080)]
        }

        _ = manager.addCritter(type: .cat)
        _ = manager.addCritter(type: .dog)
        manager.removeAll()
        XCTAssertEqual(manager.critterCount, 0)
    }

    func testUpdateMovesCritters() {
        let manager = CritterManager()
        manager.boundsProvider = {
            [CritterBounds(minX: 0, minY: 0, maxX: 1920, maxY: 1080)]
        }

        let critter = manager.addCritter(type: .dog)
        let initialX = critter.x
        let initialY = critter.y

        for _ in 0..<60 {
            manager.update(deltaTime: 1.0 / 30.0)
        }

        let moved = critter.x != initialX || critter.y != initialY
        XCTAssertTrue(moved, "Critter should move after manager updates")
    }

    func testCrittersStayInBoundsAfterManyUpdates() {
        let manager = CritterManager()
        let bounds = CritterBounds(minX: 0, minY: 0, maxX: 500, maxY: 500)
        manager.boundsProvider = { [bounds] }

        _ = manager.addCritter(type: .cat)
        _ = manager.addCritter(type: .dog)
        _ = manager.addCritter(type: .bird)

        for _ in 0..<1000 {
            manager.update(deltaTime: 1.0 / 30.0)
        }

        for critter in manager.critters {
            XCTAssertGreaterThanOrEqual(critter.x, bounds.minX)
            XCTAssertLessThanOrEqual(critter.x, bounds.maxX)
            XCTAssertGreaterThanOrEqual(critter.y, bounds.minY)
            XCTAssertLessThanOrEqual(critter.y, bounds.maxY)
        }
    }

    func testDefaultBoundsWhenNoProvider() {
        let manager = CritterManager()
        let critter = manager.addCritter(type: .cat)

        // Should not crash with no bounds provider
        for _ in 0..<10 {
            manager.update(deltaTime: 1.0 / 30.0)
        }

        XCTAssertNotNil(critter)
    }
}
