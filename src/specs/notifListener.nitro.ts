import type { HybridObject } from 'react-native-nitro-modules'

/**
 * Event emitted when a system notification is detected
 */
export interface NotificationEvent {
  /**
   * Package name of the app that posted the notification
   */
  packageName: string
  /**
   * Notification title (optional)
   */
  title?: string
  /**
   * Notification text content (optional)
   */
  text?: string
  /**
   * Timestamp when the notification was posted (in milliseconds)
   */
  timestamp: number
}

/**
 * Type for the notification listener callback function
 */
export type NotificationCallback = (event: NotificationEvent) => void

/**
 * Type for the unsubscribe function returned by addListener
 */
export type UnsubscribeListener = () => void

export interface NotificationListener extends HybridObject<{
  android: 'kotlin'
}> {
  /**
   * Start listening to system notifications
   * @returns Promise that resolves when notification listener service is started
   */
  start(): Promise<void>

  /**
   * Stop listening to system notifications
   * @returns Promise that resolves when notification listener service is stopped
   */
  stop(): Promise<void>

  /**
   * Check if notification permission is granted
   * @returns Promise that resolves to true if notification permission is granted, false otherwise
   */
  hasPermission(): Promise<boolean>

  /**
   * Opens system settings to request notification access permission
   * Note: User action is required to grant permission
   * @returns Promise that resolves when settings are opened
   */
  requestPermission(): Promise<void>

  /**
   * Add a listener to receive notification events
   * @param callback Function to be called when a notification is detected
   * @returns Unsubscribe function to remove the listener
   */
  addListener(callback: NotificationCallback): UnsubscribeListener

  /**
   * Remove a specific notification listener callback
   * @param callback The callback function to remove
   */
  removeListener(callback: NotificationCallback): void
}
