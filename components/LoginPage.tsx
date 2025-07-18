import { View, Text, TextInput, Pressable, Image } from 'react-native';
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../config/auth/firebaseConfig';
import { showToast } from '~/config/toast/showToast';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getFriendlyError } from '~/config/utils/errorMessage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

type LoginPageProps = {
  switchMode: () => void;
};

export default function LoginPage({ switchMode }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Configure web browser for Google authentication
  WebBrowser.maybeCompleteAuthSession();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '654715324948-um7n4jd6neoum56cm6eh3fcrlu6dcilk.apps.googleusercontent.com',
    androidClientId: '654715324948-6r876rg2btichb58i261hekvq3au8fb8.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => showToast('success', 'Logged in with Google!'))
        .catch((err) => showToast('error', err.message));
    }
  }, [response]);

  // handle sign in
  const handleLogin = async () => {
    if (!email || !password) {
      showToast('error', 'Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast('success', 'Welcome back!');
      // Optionally: navigate to home or dashboard
      router.replace('/profile');
    } catch (error: any) {
      const errorMessage = getFriendlyError(error.code);
      console.log(error.code);
      showToast('error', errorMessage);
    }
  };

  return (
    <View className="h-2/3 w-4/5 items-center overflow-hidden rounded-3xl border border-white/10 bg-zinc-700/40 p-4">
      <Text className="text-3xl font-bold text-white">Sign In</Text>
      <Text className="text-white/50">Sign in to your account to continue</Text>
      <View className="mt-20 w-full gap-2">
        <Text className="text-lg text-white">Email Address</Text>
        <TextInput
          className="w-full rounded-md border border-white/10 bg-zinc-700/40 p-2 text-lg text-white"
          value={email}
          onChangeText={setEmail}
        />
        <Text className="text-lg text-white">Password</Text>
        <TextInput
          className="w-full rounded-md border border-white/10 bg-zinc-700/40 p-2 text-lg text-white"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable className=" w-full rounded-md">
          <Text className="cursor-pointer text-lg text-white underline">Forgot Password?</Text>
        </Pressable>
        <Pressable
          className="mt-10 w-full items-center justify-center rounded-3xl bg-white p-2"
          onPress={handleLogin}>
          <Text className="text-lg font-bold text-black">Log In</Text>
        </Pressable>

        {/* Login with Google button */}
        <Pressable
          className="flex w-full flex-row items-center gap-2 p-2"
          onPress={() => promptAsync()}>
          <Image source={require('../assets/google.png')} className="h-12 w-12" />
          <Text className="text-lg font-bold text-white">Log In with Google</Text>
        </Pressable>
      </View>
      <View className="mt-10 w-full gap-2">
        <Text className="text-white/50">Don&apos;t have an account?</Text>
        <Pressable
          className="text-underline w-1/4 items-center justify-center rounded-3xl bg-white p-2"
          onPress={switchMode}>
          <Text className="text-lg font-bold ">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
