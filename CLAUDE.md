# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dancstep Code is a watchOS application built with SwiftUI. The project uses the watch-only app architecture (no companion iOS app with UI).

## Build Commands

Build and run through Xcode:
```bash
# Open project in Xcode
open "Dancstep Code/Dancstep Code.xcodeproj"

# Build from command line
xcodebuild -project "Dancstep Code/Dancstep Code.xcodeproj" -scheme "Dancstep Code Watch App" -destination 'platform=watchOS Simulator,name=Apple Watch Series 10 (46mm)' build

# Build for release
xcodebuild -project "Dancstep Code/Dancstep Code.xcodeproj" -scheme "Dancstep Code Watch App" -configuration Release build
```

## Architecture

- **Target**: watchOS 26.2+
- **Swift Version**: 5.0
- **UI Framework**: SwiftUI
- **Concurrency**: Uses Swift's strict concurrency (`SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor`)

### Project Structure

```
Dancstep Code/
├── Dancstep Code.xcodeproj/     # Xcode project file
└── Dancstep Code Watch App/     # Watch app source code
    ├── Dancstep_CodeApp.swift   # App entry point (@main)
    ├── ContentView.swift        # Main UI view
    └── Assets.xcassets/         # App icons and colors
```

### Targets

1. **Dancstep Code** - iOS container app (minimal, just embeds watch app)
2. **Dancstep Code Watch App** - The actual watchOS application

## Bundle Identifiers

- Container: `com.dancstep.Dancstep-Code`
- Watch App: `com.dancstep.Dancstep-Code.watchkitapp`
