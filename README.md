# react-native-nitro-notification-listener

🔔 Real-time Android NotificationListenerService for React Native using Nitro Modules

[![npm version](https://img.shields.io/npm/v/react-native-nitro-notification-listener.svg?style=flat-square)](https://www.npmjs.com/package/react-native-nitro-notification-listener)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Platform: Android](https://img.shields.io/badge/Platform-Android-green.svg?style=flat-square)](https://www.android.com/)

Monitor and respond to system notifications in real-time on Android devices. Built with [Nitro Modules](https://github.com/mrousavy/nitro) for optimal performance and seamless integration.

## ✨ Features

- ✅ **Real-time notification monitoring** - Receive notifications as they arrive
- ✅ **Full TypeScript support** - Complete type definitions included
- ✅ **Zero native configuration** - Automatic initialization, no manual setup needed
- ✅ **High performance** - Built on Nitro Modules architecture
- ✅ **Easy permission handling** - Simple API for requesting notification access
- ✅ **Event-driven** - Clean callback-based API
- ✅ **Supports all notification types** - Conversations, alerts, ongoing, and silent

## 📱 Platform Support

| Platform | Supported | Version                         |
| -------- | --------- | ------------------------------- |
| Android  | ✅ Yes    | 8.0+ (API 26+)                  |
| iOS      | ❌ No     | Not possible (iOS restrictions) |

## 📦 Installation

```bash
npm install react-native-nitro-notification-listener
# or
yarn add react-native-nitro-notification-listener
```

### Peer Dependencies

This library requires:

- `react-native` >= 0.70
- `react-native-nitro-modules` >= 0.31

```bash
npm install react-native-nitro-modules
```

### For Expo

No additional configuration needed! The library auto-configures itself.

### For React Native CLI

Run pod install for iOS (even though iOS isn't supported, for project compatibility):

```bash
cd ios && pod install
```

## 🚀 Quick Start

```typescript
import { NotificationListenerModule } from 'react-native-nitro-notification-listener'

// 1. Check if permission is granted
const hasPermission = await NotificationListenerModule.hasPermission()

if (!hasPermission) {
  // 2. Request permission (opens system settings)
  await NotificationListenerModule.requestPermission()
}

// 3. Start listening for notifications
await NotificationListenerModule.start()

// 4. Add a listener
const unsubscribe = NotificationListenerModule.addListener((event) => {
  console.log('New notification:', {
    package: event.packageName,
    title: event.title,
    text: event.text,
    timestamp: event.timestamp,
  })
})

// 5. Stop listening when done
await NotificationListenerModule.stop()
unsubscribe()
```

## 📖 API Reference

### Methods

#### `hasPermission(): Promise<boolean>`

Checks if the app has notification listener permission.

```typescript
const hasPermission = await NotificationListenerModule.hasPermission()
```

**Returns:** `Promise<boolean>` - `true` if permission granted, `false` otherwise

---

#### `requestPermission(): Promise<void>`

Opens the system settings screen where users can grant notification listener permission.

```typescript
await NotificationListenerModule.requestPermission()
```

---

#### `start(): Promise<void>`

Starts the notification listener service.

```typescript
await NotificationListenerModule.start()
```

---

#### `stop(): Promise<void>`

Stops the notification listener service and clears all listeners.

```typescript
await NotificationListenerModule.stop()
```

---

#### `addListener(callback: (event: NotificationEvent) => void): () => void`

Registers a callback to be invoked when a notification is posted.

```typescript
const unsubscribe = NotificationListenerModule.addListener((event) => {
  console.log('Notification received:', event)
})

// Later, to stop listening:
unsubscribe()
```

**Returns:** `() => void` - Unsubscribe function

---

#### `removeListener(callback: (event: NotificationEvent) => void): void`

Manually removes a specific listener.

```typescript
const handler = (event) => console.log(event)
NotificationListenerModule.addListener(handler)
NotificationListenerModule.removeListener(handler)
```

### Types

#### `NotificationEvent`

```typescript
interface NotificationEvent {
  packageName: string // App that posted the notification
  title?: string // Notification title
  text?: string // Notification text content
  timestamp: number // When posted (ms since epoch)
}
```

## 💡 Usage Examples

### React Hook

```typescript
import { useEffect, useState } from 'react'
import { NotificationListenerModule } from 'react-native-nitro-notification-listener'

function useNotificationListener() {
  const [hasPermission, setHasPermission] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    NotificationListenerModule.hasPermission().then(setHasPermission)

    if (!hasPermission) return

    NotificationListenerModule.start()

    const unsubscribe = NotificationListenerModule.addListener((event) => {
      setNotifications((prev) => [event, ...prev])
    })

    return () => {
      unsubscribe()
      NotificationListenerModule.stop()
    }
  }, [hasPermission])

  return { hasPermission, notifications }
}
```

### Filtering Notifications

```typescript
NotificationListenerModule.addListener((event) => {
  if (event.packageName === 'com.whatsapp') {
    console.log('WhatsApp message:', event.title)
  }
})
```

## 🔋 Background & Screen-Off Behavior

### ✅ Works Automatically

The notification listener operates as a **system-bound service**, which means:

- ✅ **Screen OFF** - Notifications received even when screen is locked
- ✅ **Background** - Works when app is minimized or in background
- ✅ **App Closed** - Service persists until permission is revoked
- ✅ **Device Reboot** - Auto-restarts when permission is enabled

**No additional code required** - This is built into the NotificationListenerService architecture.

### ⚠️ Device-Specific Limitations

Some manufacturers have aggressive battery optimization:

**Android Doze Mode** (Android 6+):

- Notifications may be delayed during deep sleep (1+ hour screen off)
- Normal behavior resumes when device wakes up

**Manufacturer Restrictions**:

- **Xiaomi/MIUI**: May kill background services
- **Samsung**: Battery optimization may interfere
- **Huawei/EMUI**: App launch restrictions apply
- **OnePlus**: Battery optimization aggressive by default

### 💡 For Advanced Users

If you need **guaranteed delivery** in extreme battery-saving scenarios, users can implement in their app:

```typescript
// Optional: Request battery optimization exemption
import { NativeModules, Platform } from 'react-native'

if (Platform.OS === 'android') {
  // User should disable battery optimization for your app
  // Or implement a foreground service
}
```

**Note**: Battery optimization features will be added in future versions. See [FUTURE_FEATURES.md](FUTURE_FEATURES.md) for planned enhancements.

## 🤔 Troubleshooting

### ⚠️ Google Play Protect Warning

**Important**: When installing the example app or apps using this library on real devices, you may see a Google Play Protect warning. This is normal and happens because:

- The app is not from the Play Store
- The app requests notification access permission (security-sensitive)

**To install and test:**

1. Disable Play Protect temporarily in Settings > Security > Google Play Protect
2. Install and test your app
3. Re-enable Play Protect after testing

**For production apps**: This warning won't appear for apps published on Google Play Store with proper signing.

---

### Permission not working

- Toggle the switch in Settings > Notification Access
- Restart your app after granting permission
- Ensure Play Protect is disabled for testing

### Notifications not received

- Verify permission: `await NotificationListenerModule.hasPermission()`
- Check service started: `await NotificationListenerModule.start()`
- Check logs: `adb logcat | grep "NotificationListener"`
- Verify the notification is actually visible in notification shade

### Notifications delayed with screen off

- This is normal Android Doze behavior (1+ hour deep sleep)
- Check manufacturer battery settings (Xiaomi, Samsung, etc.)
- Notifications will arrive when device wakes up
- For guaranteed delivery, see "Background & Screen-Off Behavior" section

### App crashes

- Ensure `react-native-nitro-modules` is installed
- Clean build: `cd android && ./gradlew clean`

## 📚 Example App

See the [example app](./example) for a complete implementation:

```bash
cd example
npm install
npx expo run:android
```

## ⚠️ Known Limitations

- Android only (iOS doesn't allow notification listening)
- Requires Android 8.0+ (API 26+)
- Can't interact with notification actions yet
- Read-only (can't dismiss notifications)
- Notification delays possible in extreme Doze mode
- Battery optimization may affect delivery on some manufacturers

## 🔮 Future Features

See [FUTURE_FEATURES.md](FUTURE_FEATURES.md) for planned enhancements including:

- Battery optimization exemption API
- Notification action/button support
- Rich notification data extraction
- And more!

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT © [Megahedron69](https://github.com/Megahedron69)

## 🙏 Acknowledgments

Built with [Nitro Modules](https://github.com/mrousavy/nitro) by [Marc Rousavy](https://github.com/mrousavy)

---

Made with ❤️ by [Megahedron69](https://megacreate.netlify.app)
