import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/auth/firebaseConfig';
import { showToast } from '~/config/toast/showToast';
import Toast from 'react-native-toast-message';

type SignUpProps = {
  switchMode: () => void;
};
export default function SignUp({ switchMode }: SignUpProps) {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // validate email
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // handle sign up
  const handleSignUp = async () => {
    if (!email || !password || !first || !last) {
      showToast('errorB', 'Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      showToast('errorB', 'Password must be at least 8 characters.');

      return;
    }

    if (!isValidEmail(email)) {
      showToast('errorB', 'Please enter a valid email address.');

      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${first} ${last}`,
      });
      showToast('successB', 'Account created successfully.');
      router.push('/profile');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      showToast('errorB', errorMessage);
    }
  };

  return (
    <View className="h-2/3 w-4/5 items-center overflow-hidden rounded-3xl border border-white/10 bg-zinc-700/40 p-4">
      <Text className="text-3xl font-bold text-white">Sign Up</Text>
      <Text className="text-white/50">Create an account to explore more</Text>
      <View className="mt-20 w-full gap-2">
        <Text className="text-lg text-white">First Name</Text>
        <TextInput
          className="w-full rounded-md border border-white/10 bg-zinc-700/40 p-2 text-lg text-white"
          value={first}
          onChangeText={setFirst}
        />
        <Text className="text-lg text-white">Last Name</Text>
        <TextInput
          className="w-full rounded-md border border-white/10 bg-zinc-700/40 p-2 text-lg text-white"
          value={last}
          onChangeText={setLast}
        />
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

        <Pressable
          className="mt-10 w-full items-center justify-center rounded-3xl bg-white p-2"
          onPress={handleSignUp}>
          <Text className="text-lg font-bold text-black">Create Account</Text>
        </Pressable>
      </View>
      <View className="mt-10 w-full gap-2">
        <Text className="text-white/50">Already have an account?</Text>
        <Pressable
          className="text-underline w-1/4 items-center justify-center rounded-3xl bg-white p-2"
          onPress={switchMode}>
          <Text className="text-lg font-bold ">Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}
