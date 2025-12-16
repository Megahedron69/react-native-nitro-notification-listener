// TODO: Export all HybridObjects here for the user
import { NitroModules } from 'react-native-nitro-modules'
import type { NotificationListener } from './specs/notifListener.nitro'

// re-export public types
export type {
  NotificationEvent,
  UnsubscribeListener,
} from './specs/notifListener.nitro'

// public API
export const NotificationListenerModule =
  NitroModules.createHybridObject<NotificationListener>('NotificationListener')
