import { NotificationListenerModule } from '../index'

describe('NotificationListenerModule', () => {
  it('should export the module', () => {
    expect(NotificationListenerModule).toBeDefined()
  })

  it('should have all required methods', () => {
    expect(typeof NotificationListenerModule.start).toBe('function')
    expect(typeof NotificationListenerModule.stop).toBe('function')
    expect(typeof NotificationListenerModule.hasPermission).toBe('function')
    expect(typeof NotificationListenerModule.requestPermission).toBe('function')
    expect(typeof NotificationListenerModule.addListener).toBe('function')
    expect(typeof NotificationListenerModule.removeListener).toBe('function')
  })

  it('addListener should return unsubscribe function', () => {
    const mockCallback = jest.fn()
    const unsubscribe = NotificationListenerModule.addListener(mockCallback)
    expect(typeof unsubscribe).toBe('function')
  })
})
