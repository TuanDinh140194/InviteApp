import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import LoginPage from '~/components/LoginPage';
import SignUp from '~/components/SignUp';

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <View className="flex-1 items-center justify-center">
      <LinearGradient
        colors={['#1C2023', '#1F222B', '#322E2B', '#44382A']}
        style={StyleSheet.absoluteFill}
      />
      {mode === 'login' ? (
        <LoginPage switchMode={() => setMode('signup')} />
      ) : (
        <SignUp switchMode={() => setMode('login')} />
      )}
    </View>
  );
}
