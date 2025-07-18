import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#22c55e',
        backgroundColor: '#1e293b',
        borderRadius: 12,
        padding: 12,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
      }}
      text2Style={{
        fontSize: 14,
        color: '#cbd5e1',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#ef4444',
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 12,
      }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}
      text2Style={{ fontSize: 14, color: '#fca5a5' }}
    />
  ),
  customToast: ({ text1, props }: any) => (
    <View
      style={{
        backgroundColor: 'tomato',
        padding: 16,
        borderRadius: 12,
        marginHorizontal: 16,
      }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{text1}</Text>
      <Text style={{ color: 'white' }}>{props?.subtitle}</Text>
    </View>
  ),

  successB: ({ text1, text2 }: any) => (
    <BlurView
      intensity={70}
      style={{
        marginHorizontal: 16,
        marginTop: 50,
        borderRadius: 16,
        padding: 16,
        overflow: 'hidden',
        width: 300,
      }}
      experimentalBlurMethod="dimezisBlurView" // optional for Android
    >
      <View className="flex flex-row justify-center gap-2 text-center">
      <AntDesign name="checkcircle" color="lightblue" size={24} />
        <Text className="text-lg font-bold text-white">{text1}</Text>
        {text2 ? <Text style={{ fontSize: 14, color: 'white' }}>{text2}</Text> : null}
      </View>
    </BlurView>
  ),

  errorB: ({ text1, text2 }: any) => (
    <BlurView
      intensity={70}
      style={{
        marginHorizontal: 16,
        marginTop: 50,
        borderRadius: 16,
        padding: 22,
        overflow: 'hidden',
        width: 300,
      }}
      experimentalBlurMethod="dimezisBlurView" // optional for Android
    >
      <View className="flex flex-row justify-center gap-2 text-center">
        <MaterialIcons name="error" color="#f57d7f" size={24} />
        <Text className="text-lg font-bold text-white">{text1}</Text>
        {text2 ? <Text style={{ fontSize: 14, color: 'white' }}>{text2}</Text> : null}
      </View>
    </BlurView>
  ),
};
