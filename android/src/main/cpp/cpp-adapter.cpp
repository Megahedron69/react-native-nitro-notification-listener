#include <jni.h>
#include "NitroNotificationListenerOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::nitronotificationlistener::initialize(vm);
}
