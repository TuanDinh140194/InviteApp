// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';



const firebaseConfig = {
  apiKey: 'AIzaSyCvVkiAGW1NFIox5b2_FM6PW6KHAWjmYlA',
  authDomain: 'inviteapp-5d97c.firebaseapp.com',
  projectId: 'inviteapp-5d97c',
  storageBucket: 'inviteapp-5d97c.firebasestorage.app',
  messagingSenderId: '712103744519',
  appId: '1:712103744519:web:2e363795e671cb739e46a2',
  measurementId: 'G-6RZ2QMZG8E',
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

