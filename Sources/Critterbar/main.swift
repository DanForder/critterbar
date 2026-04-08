import AppKit
import CritterbarCore

let isSmokeTest = CommandLine.arguments.contains("--smoke-test")
let isVisualTest = CommandLine.arguments.contains("--visual-test")

let app = NSApplication.shared
app.setActivationPolicy(.accessory)

let delegate = AppDelegate(smokeTest: isSmokeTest, visualTest: isVisualTest)
app.delegate = delegate

app.run()
