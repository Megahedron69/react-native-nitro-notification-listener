package com.margelo.nitro.nitronotificationlistener

import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.util.Log
import java.util.concurrent.CopyOnWriteArrayList

class NotificationListenerService : NotificationListenerService() {

    companion object {
        private const val TAG = "NotificationListener"
        private const val EXTRA_TITLE = "android.title"
        private const val EXTRA_TEXT = "android.text"
        private var instance: NotificationListenerService? = null
        private val listeners = CopyOnWriteArrayList<(NotificationEvent) -> Unit>()

        fun addListener(callback: (NotificationEvent) -> Unit) {
            if (!listeners.contains(callback)) {
                listeners.add(callback)
                Log.d(TAG, "Listener added. Total listeners: ${listeners.size}")
            } else {
                Log.d(TAG, "Listener already exists. Total listeners: ${listeners.size}")
            }
        }

        fun removeListener(callback: (NotificationEvent) -> Unit) {
            listeners.remove(callback)
            Log.d(TAG, "Listener removed. Total listeners: ${listeners.size}")
        }

        fun clearAllListeners() {
            listeners.clear()
            Log.d(TAG, "All listeners cleared")
        }

        fun isServiceConnected(): Boolean = instance != null
    }

    override fun onListenerConnected() {
        super.onListenerConnected()
        instance = this
        Log.d(TAG, "NotificationListenerService connected")
    }

    override fun onListenerDisconnected() {
        super.onListenerDisconnected()
        instance = null
        clearAllListeners()
        Log.d(TAG, "NotificationListenerService disconnected and listeners cleared")
    }

    override fun onDestroy() {
        super.onDestroy()
        clearAllListeners()
        instance = null
        Log.d(TAG, "NotificationListenerService destroyed")
    }

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        super.onNotificationPosted(sbn)
        
        try {
            val notification = sbn.notification ?: return
            val extras = notification.extras ?: return

            val event = NotificationEvent(
                packageName = sbn.packageName,
                title = extras.getCharSequence(EXTRA_TITLE)?.toString(),
                text = extras.getCharSequence(EXTRA_TEXT)?.toString(),
                timestamp = sbn.postTime.toDouble()
            )

            Log.d(TAG, "Notification posted: ${event.packageName} - ${event.title}")

            // Notify all listeners (CopyOnWriteArrayList is thread-safe)
            listeners.forEach { listener ->
                try {
                    listener(event)
                } catch (e: Exception) {
                    Log.e(TAG, "Error calling listener: ${e.message}", e)
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error processing notification: ${e.message}", e)
        }
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification) {
        super.onNotificationRemoved(sbn)
        Log.d(TAG, "Notification removed: ${sbn.packageName}")
    }
}
