import { StatusBar } from 'expo-status-bar'
import { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  AppState,
  FlatList,
} from 'react-native'
import { NotificationListenerModule } from 'react-native-nitro-notification-listener'

interface Notification {
  id: string
  packageName: string
  title?: string
  text?: string
  timestamp: number
}

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const unsubscribeRef = useRef<(() => void) | null>(null)

  /* ───────────────── Permission only ───────────────── */

  const checkPermission = async () => {
    const permission = await NotificationListenerModule.hasPermission()
    setHasPermission(permission)
  }

  /* ───────────────── Start / Stop ───────────────── */

  const startListening = async () => {
    if (isListening) return

    await NotificationListenerModule.start()
    setIsListening(true)

    const unsub = NotificationListenerModule.addListener((event) => {
      setNotifications((prev) => [
        {
          id: `${event.timestamp}-${Math.random()}`,
          packageName: event.packageName,
          title: event.title,
          text: event.text,
          timestamp: event.timestamp,
        },
        ...prev.slice(0, 49),
      ])
    })

    unsubscribeRef.current = unsub
  }

  const stopListening = async () => {
    if (!isListening) return

    unsubscribeRef.current?.()
    unsubscribeRef.current = null

    await NotificationListenerModule.stop()

    setIsListening(false)
    setNotifications([])
  }

  /* ───────────────── Lifecycle ───────────────── */

  useEffect(() => {
    checkPermission()

    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        checkPermission()
      }
    })

    return () => {
      sub.remove()
      unsubscribeRef.current?.()
      NotificationListenerModule.stop()
    }
  }, [])

  /* ───────────────── Helpers ───────────────── */

  const formatTime = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000)
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    return `${Math.floor(diff / 3600)}h ago`
  }

  const shortPkg = (p: string) => p.split('.').pop()

  /* ───────────────── UI ───────────────── */

  return (
    <View style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>🔔 Notification Listener</Text>
          <Text style={styles.subtitle}>Real-time Notification Monitoring</Text>
        </View>

        {/* Permission */}
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <Text style={styles.label}>Permission</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: hasPermission ? '#22c55e' : '#ef4444' },
              ]}
            >
              <Text style={styles.statusText}>
                {hasPermission === null
                  ? 'Checking…'
                  : hasPermission
                    ? 'Granted'
                    : 'Denied'}
              </Text>
            </View>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.buttonContainer}>
          {hasPermission === false && (
            <Pressable
              style={styles.buttonPrimary}
              onPress={() => NotificationListenerModule.requestPermission()}
            >
              <Text style={styles.buttonText}>Enable Permission</Text>
            </Pressable>
          )}

          {hasPermission && (
            <>
              <Pressable
                style={[
                  styles.buttonSuccess,
                  isListening && styles.buttonDisabled,
                ]}
                onPress={startListening}
                disabled={isListening}
              >
                <Text style={styles.buttonText}>
                  {isListening ? 'Listening ✓' : 'Start Listening'}
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.buttonDanger,
                  !isListening && styles.buttonDisabled,
                ]}
                onPress={stopListening}
                disabled={!isListening}
              >
                <Text style={styles.buttonText}>Stop</Text>
              </Pressable>
            </>
          )}
        </View>

        {/* Notifications */}
        {hasPermission && (
          <View style={styles.notificationsSection}>
            {isListening ? (
              <>
                <Text style={styles.sectionTitle}>
                  📬 Notifications ({notifications.length})
                </Text>

                {notifications.length === 0 ? (
                  <Text style={styles.emptyText}>
                    Waiting for notifications…
                  </Text>
                ) : (
                  <FlatList
                    scrollEnabled={false}
                    data={notifications}
                    keyExtractor={(i) => i.id}
                    renderItem={({ item }) => (
                      <View style={styles.notificationItem}>
                        <View style={styles.notificationHeader}>
                          <Text style={styles.packageName}>
                            {shortPkg(item.packageName)}
                          </Text>
                          <Text style={styles.timestamp}>
                            {formatTime(item.timestamp)}
                          </Text>
                        </View>

                        {item.title && (
                          <Text style={styles.notificationTitle}>
                            {item.title}
                          </Text>
                        )}
                        {item.text && (
                          <Text style={styles.notificationText}>
                            {item.text}
                          </Text>
                        )}
                      </View>
                    )}
                  />
                )}
              </>
            ) : (
              <View style={styles.inactiveState}>
                <Text style={styles.inactiveTitle}>○ Listener Inactive</Text>
                <Text style={styles.inactiveText}>
                  Tap “Start Listening” to begin
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

/* ───────────────── Styles ───────────────── */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 80,
  },
  scrollContent: { padding: 16 },
  header: { alignItems: 'center', marginBottom: 20 },
  appTitle: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  subtitle: { color: '#94a3b8' },

  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: { color: '#cbd5e1', fontSize: 16 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: { color: '#fff', fontWeight: 'bold' },

  buttonContainer: { gap: 10, marginVertical: 16 },
  buttonPrimary: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 8,
  },
  buttonSuccess: {
    backgroundColor: '#10b981',
    padding: 14,
    borderRadius: 8,
  },
  buttonDanger: {
    backgroundColor: '#ef4444',
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonDisabled: { opacity: 0.5 },

  notificationsSection: { marginTop: 20 },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },

  notificationItem: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  packageName: { color: '#3b82f6', fontWeight: 'bold' },
  timestamp: { color: '#64748b', fontSize: 12 },
  notificationTitle: { color: '#e2e8f0', fontWeight: '600' },
  notificationText: { color: '#cbd5e1' },
  emptyText: { color: '#94a3b8', fontStyle: 'italic' },

  inactiveState: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  inactiveTitle: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inactiveText: {
    color: '#64748b',
    fontSize: 13,
    textAlign: 'center',
  },
})
