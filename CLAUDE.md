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

- **Target**: watchOS 11.0+
- **Swift Version**: 5.0
- **UI Framework**: SwiftUI
- **Concurrency**: Uses Swift's strict concurrency (`SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor`)

## App Functionality

The app is a custom text input system using two buttons (dot/dash) with simultaneous press detection for a third symbol ("both"). Symbol sequences decode into letters.

### Key Timing Constants (in ContentView.swift)
- `simultaneousThreshold`: 0.12s (120ms) - window for detecting both-button taps. Tuned for physical watch; increase if "both" is hard to trigger.

### Input System
- Left button = dot (symbol 1)
- Right button = dash (symbol 2)
- Both buttons together = both (symbol 3)
- Symbols auto-decode when a valid sequence is completed

## Development Notes

- **Physical watch testing**: Debugger connection drops frequently - this is normal. App keeps running. Just rebuild (Cmd+R) to push changes.
- **Symbol copy**: First build to a watch may trigger "copying shared cache symbols" which can take 20-30 min. Can be cancelled; only affects debugging, not the app itself.

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
