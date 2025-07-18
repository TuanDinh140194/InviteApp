import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';
import { toastConfig } from '../config/toast/toastConfig';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Layout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
      {/* ✅ Global Toast component */}
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
