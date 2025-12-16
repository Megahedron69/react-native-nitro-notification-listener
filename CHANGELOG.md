# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Nothing yet

### Changed

- Nothing yet

### Fixed

- Nothing yet

## [0.1.0] - 2025-12-16

### Added

- ✅ **Core Functionality**
  - Real-time Android NotificationListenerService implementation
  - Built with Nitro Modules for optimal JSI performance
  - Start/Stop notification monitoring
  - Permission checking and requesting with `hasPermission()` and `requestPermission()`
  - Event-driven callback system with `addListener()` and `removeListener()`
- ✅ **Auto-Initialization**
  - ContentProvider-based auto-initialization (zero native configuration)
  - No manual setup required in MainApplication.kt
  - Context automatically injected via ContextHolder pattern

- ✅ **TypeScript Support**
  - Full type definitions for all APIs
  - `NotificationEvent` interface with packageName, title, text, timestamp
  - Promise-based async methods
  - Type-safe callback system

- ✅ **Robust Error Handling**
  - Try-catch blocks in all async methods
  - Graceful permission denial handling
  - Service lifecycle management
  - Thread-safe listener list (CopyOnWriteArrayList)

- ✅ **Production Features**
  - Supports all notification types (conversations, alerts, ongoing, silent)
  - Works with screen OFF
  - Background operation support
  - Handles burst notifications (tested with 100+ messages)
  - Emoji and special character support
  - AppState-based permission recheck (no restart needed)

- ✅ **Developer Experience**
  - Comprehensive README with examples
  - Beautiful example app with dark mode UI
  - Complete API documentation
  - Troubleshooting guide
  - Testing report with real device results
  - Future features roadmap

- ✅ **Platform Support**
  - Android 8.0+ (API 26+)
  - Tested on Pixel 9 (emulator) and Pixel 6a (real device)
  - Android 16+ confirmed working

### Testing

- ✅ 100% test coverage on core functionality
- ✅ Emulator testing: Pixel 9 Android 16
- ✅ Real device testing: Pixel 6a Android 16.2
- ✅ WhatsApp, Telegram, Gmail notifications tested
- ✅ Burst test: 100 messages from 8 apps - zero drops
- ✅ No crashes, no memory leaks
- ✅ Screen OFF functionality confirmed
- ✅ Kill/restart scenarios handled correctly

### Known Limitations

- Android only (iOS doesn't allow notification listening)
- Notification delays possible in extreme Doze mode (30+ min screen off)
- Battery optimization may affect delivery on some manufacturers
- Read-only (can't dismiss or interact with notifications yet)
- Notifications while app is killed won't be received (Android limitation)

### Documentation

- README.md with complete API reference
- CHANGELOG.md with version history
- CONTRIBUTING.md with contribution guidelines
- LICENSE (MIT)
- FUTURE_FEATURES.md with roadmap
- TESTING_REPORT.md with comprehensive test results

[Unreleased]: https://github.com/Megahedron69/react-native-nitro-notification-listener/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Megahedron69/react-native-nitro-notification-listener/releases/tag/v0.1.0
