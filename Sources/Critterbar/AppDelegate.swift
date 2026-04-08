import AppKit
import CritterbarCore

class AppDelegate: NSObject, NSApplicationDelegate {
    private let statusBarController = StatusBarController()
    private let overlayController = OverlayWindowController()
    private let critterManager = CritterManager()
    private var updateTimer: Timer?
    private var lastUpdateTime: Date = Date()

    private let isSmokeTest: Bool
    private let isVisualTest: Bool

    init(smokeTest: Bool = false, visualTest: Bool = false) {
        self.isSmokeTest = smokeTest
        self.isVisualTest = visualTest
        super.init()
    }

    func applicationDidFinishLaunching(_ notification: Notification) {
        overlayController.setupWindows()

        critterManager.boundsProvider = { [weak self] in
            self?.overlayController.screenBounds() ?? []
        }

        statusBarController.onAddCritter = { [weak self] type in
            self?.addCritter(type: type)
        }
        statusBarController.onRemoveAll = { [weak self] in
            self?.removeAllCritters()
        }
        statusBarController.setup()

        lastUpdateTime = Date()
        updateTimer = Timer.scheduledTimer(
            timeInterval: 1.0 / 30.0,
            target: self,
            selector: #selector(tick),
            userInfo: nil,
            repeats: true
        )

        if isSmokeTest {
            runSmokeTest()
        } else if isVisualTest {
            runVisualTest()
        }
    }

    func applicationWillTerminate(_ notification: Notification) {
        updateTimer?.invalidate()
        overlayController.tearDownWindows()
    }

    @objc private func tick() {
        let now = Date()
        let deltaTime = now.timeIntervalSince(lastUpdateTime)
        lastUpdateTime = now
        critterManager.update(deltaTime: deltaTime)
        overlayController.updateCritterPositions(critters: critterManager.critters)
    }

    private func addCritter(type: CritterType) {
        let screenIndex = Int.random(in: 0..<max(NSScreen.screens.count, 1))
        let critter = critterManager.addCritter(type: type, screenIndex: screenIndex)
        overlayController.addCritterView(for: critter)
    }

    private func removeAllCritters() {
        overlayController.removeAllCritterViews()
        critterManager.removeAll()
    }

    // MARK: - Smoke Test (headless logic verification)

    private func runSmokeTest() {
        print("[smoke-test] Starting smoke test...")

        for type in CritterType.allCases {
            addCritter(type: type)
        }
        print("[smoke-test] Added \(critterManager.critterCount) critters")
        assert(critterManager.critterCount == CritterType.allCases.count)

        for _ in 0..<10 { tick() }
        print("[smoke-test] Ran 10 update ticks")

        // Verify all critters are on edges
        let bounds = overlayController.screenBounds()
        for critter in critterManager.critters {
            let b = critter.screenIndex < bounds.count ? bounds[critter.screenIndex] : bounds[0]
            let onEdge = critter.y == b.minY ||
                         critter.y == b.maxY - 48 ||
                         critter.x == b.minX ||
                         critter.x == b.maxX - 48
            print("[smoke-test] \(critter.displayEmoji) edge=\(critter.edge) pos=(\(critter.x), \(critter.y)) onEdge=\(onEdge)")
            assert(onEdge, "Critter must be on a screen edge")
        }

        // Verify views exist
        let viewCount = overlayController.critterViewCount
        assert(viewCount == CritterType.allCases.count, "Expected \(CritterType.allCases.count) views, got \(viewCount)")
        print("[smoke-test] View count verified: \(viewCount)")

        removeAllCritters()
        assert(critterManager.critterCount == 0)
        assert(overlayController.critterViewCount == 0)

        print("[smoke-test] All smoke tests passed!")
        exitTest(success: true)
    }

    // MARK: - Visual Test (screenshot-based verification)

    private func runVisualTest() {
        let outputDir = CommandLine.arguments.last(where: { $0.hasPrefix("--output-dir=") })
            .map { String($0.dropFirst("--output-dir=".count)) } ?? "/tmp/critterbar-visual-test"

        print("[visual-test] Output directory: \(outputDir)")

        // Create output directory
        try? FileManager.default.createDirectory(atPath: outputDir, withIntermediateDirectories: true)

        // Step 1: Screenshot with no critters (baseline)
        takeScreenshot(path: "\(outputDir)/01-empty.png")
        print("[visual-test] Captured baseline (no critters)")

        // Step 2: Add critters
        for type in CritterType.allCases {
            addCritter(type: type)
        }

        // Snap to edges and do initial render
        for critter in critterManager.critters {
            let bounds = overlayController.screenBounds()
            let b = critter.screenIndex < bounds.count ? bounds[critter.screenIndex] : bounds[0]
            critter.snapToEdge(bounds: b)
        }
        tick()

        print("[visual-test] Added \(critterManager.critterCount) critters")

        // Step 3: Screenshot immediately after adding
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [self] in
            takeScreenshot(path: "\(outputDir)/02-critters-added.png")
            print("[visual-test] Captured critters on edges")

            // Report positions
            for critter in critterManager.critters {
                print("[visual-test] \(critter.displayEmoji) edge=\(critter.edge) pos=(\(Int(critter.x)), \(Int(critter.y)))")
            }

            // Step 4: Let them walk for 3 seconds, then screenshot
            DispatchQueue.main.asyncAfter(deadline: .now() + 3.0) { [self] in
                takeScreenshot(path: "\(outputDir)/03-after-walking.png")
                print("[visual-test] Captured after 3s of walking")

                for critter in critterManager.critters {
                    print("[visual-test] \(critter.displayEmoji) edge=\(critter.edge) pos=(\(Int(critter.x)), \(Int(critter.y))) state=\(critter.state)")
                }

                // Verify all still on edges
                let bounds = overlayController.screenBounds()
                var allOnEdge = true
                for critter in critterManager.critters {
                    let b = critter.screenIndex < bounds.count ? bounds[critter.screenIndex] : bounds[0]
                    let onEdge = critter.y == b.minY ||
                                 critter.y == b.maxY - 48 ||
                                 critter.x == b.minX ||
                                 critter.x == b.maxX - 48
                    if !onEdge {
                        print("[visual-test] FAIL: \(critter.displayEmoji) not on edge at (\(critter.x), \(critter.y))")
                        allOnEdge = false
                    }
                }

                if allOnEdge {
                    print("[visual-test] PASS: All critters on screen edges")
                } else {
                    print("[visual-test] FAIL: Some critters not on edges")
                }

                print("[visual-test] Screenshots saved to \(outputDir)/")
                print("[visual-test] Done!")
                exitTest(success: allOnEdge)
            }
        }
    }

    private func takeScreenshot(path: String) {
        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/usr/sbin/screencapture")
        process.arguments = ["-x", path]
        try? process.run()
        process.waitUntilExit()
    }

    private func exitTest(success: Bool) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            NSApplication.shared.terminate(nil)
        }
    }
}
