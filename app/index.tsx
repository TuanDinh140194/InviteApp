import { Stack, Link, Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WelcomeScreen from './welcome';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <GestureHandlerRootView className="flex-1">
      <WelcomeScreen />
    </GestureHandlerRootView>
  );
}
