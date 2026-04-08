// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Critterbar",
    platforms: [.macOS(.v13)],
    products: [
        .executable(name: "Critterbar", targets: ["Critterbar"]),
    ],
    targets: [
        .target(
            name: "CritterbarCore",
            path: "Sources/CritterbarCore"
        ),
        .executableTarget(
            name: "Critterbar",
            dependencies: ["CritterbarCore"],
            path: "Sources/Critterbar"
        ),
        .testTarget(
            name: "CritterbarTests",
            dependencies: ["CritterbarCore"],
            path: "Tests/CritterbarTests"
        ),
    ]
)
