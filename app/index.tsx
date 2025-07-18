
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Redirect } from 'expo-router';


export default function Home() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Redirect href="/welcome" />
      <Toast/>
    </GestureHandlerRootView>
  );
}
