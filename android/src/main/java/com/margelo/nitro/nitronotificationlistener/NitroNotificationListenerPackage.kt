package com.margelo.nitro.nitronotificationlistener

import android.content.Context
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.BaseReactPackage

class NitroNotificationListenerPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        ContextHolder.setContext(reactContext)
        return null
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider { HashMap() }

    companion object {
        init {
            android.util.Log.d("NitroNotification", "🔥 initializeNative")
            NitroNotificationListenerOnLoad.initializeNative()
        }
    }
}

object ContextHolder {
    private var context: Context? = null

    fun setContext(ctx: Context) {
        context = ctx.applicationContext
    }

    fun getContext(): Context {
        return context ?: throw IllegalStateException("Context not initialized. Make sure React Native is properly set up.")
    }
}
