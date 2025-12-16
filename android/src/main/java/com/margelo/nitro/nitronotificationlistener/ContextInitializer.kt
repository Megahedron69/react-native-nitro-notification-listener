package com.margelo.nitro.nitronotificationlistener

import android.content.ContentProvider
import android.content.ContentValues
import android.database.Cursor
import android.net.Uri

/**
 * ContentProvider that initializes the context automatically.
 * This eliminates the need for users to manually initialize in their Application class.
 */
class ContextInitializer : ContentProvider() {
    override fun onCreate(): Boolean {
        context?.let {
            ContextHolder.setContext(it)
            android.util.Log.d("NitroNotification", "Context auto-initialized via ContentProvider")
        }
        return true
    }

    // Required overrides (not used)
    override fun query(uri: Uri, projection: Array<String>?, selection: String?, 
                      selectionArgs: Array<String>?, sortOrder: String?): Cursor? = null
    override fun getType(uri: Uri): String? = null
    override fun insert(uri: Uri, values: ContentValues?): Uri? = null
    override fun delete(uri: Uri, selection: String?, selectionArgs: Array<String>?): Int = 0
    override fun update(uri: Uri, values: ContentValues?, selection: String?, 
                       selectionArgs: Array<String>?): Int = 0
}
