package com.margelo.nitro.nitronotificationlistener

import android.content.Context
import android.content.Intent
import android.provider.Settings
import com.margelo.nitro.core.Promise
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class HybridNotificationListener :
  HybridNotificationListenerSpec() {

  companion object {
    private const val SETTING_ENABLED_LISTENERS = "enabled_notification_listeners"
  }

  private val context: Context
    get() = ContextHolder.getContext()
      ?: throw IllegalStateException("Context not initialized. This should not happen.")

  override fun start(): Promise<Unit> {
    return Promise.async {
      try {
        if (!NotificationListenerService.isServiceConnected()) {
          throw IllegalStateException("NotificationListenerService is not connected. Please grant notification access permission.")
        }
        Unit
      } catch (e: Exception) {
        throw Exception("Failed to start notification listener: ${e.message}", e)
      }
    }
  }

  override fun stop(): Promise<Unit> {
    return Promise.async {
      try {
        NotificationListenerService.clearAllListeners()
        Unit
      } catch (e: Exception) {
        throw Exception("Failed to stop notification listener: ${e.message}", e)
      }
    }
  }

  override fun hasPermission(): Promise<Boolean> {
    return Promise.async {
      try {
        val enabledListeners =
          Settings.Secure.getString(
            context.contentResolver,
            SETTING_ENABLED_LISTENERS
          ) ?: ""

        enabledListeners.contains(context.packageName)
      } catch (e: Exception) {
        throw Exception("Failed to check notification permission: ${e.message}", e)
      }
    }
  }

  override fun requestPermission(): Promise<Unit> {
    return Promise.async {
      try {
        val intent =
          Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS).apply {
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
          }

        context.startActivity(intent)
        Unit
      } catch (e: Exception) {
        throw Exception("Failed to open notification settings: ${e.message}", e)
      }
    }
  }

  override fun addListener(
    callback: (NotificationEvent) -> Unit
  ): () -> Unit {
    NotificationListenerService.addListener(callback)
    
    return {
      NotificationListenerService.removeListener(callback)
    }
  }

  override fun removeListener(
    callback: (NotificationEvent) -> Unit
  ) {
    NotificationListenerService.removeListener(callback)
  }
}
