import { BlurView } from 'expo-blur';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function EventCard({ event }: { event: any }) {
  return (
    <View className="h-full w-full justify-end overflow-hidden rounded-3xl ">
      <Image source={event.url} className="absolute h-full w-full" />
      {/* <View className="flex-1 justify-end">
        <View className="h-24 w-full items-center justify-center border border-white/30 bg-white/20 backdrop-blur-lg">
          <Image
            source={event.url}
            blurRadius={20}
            style={{
              position: 'absolute',
              height: 100, // match your container
              width: '100%',
              top: 0,
              left: 0,
            }}
            resizeMode="cover"
          />
          <Text className="text-xl text-white">Birthday</Text>
        </View>
      </View> */}
      <BlurView
        className="h-24 w-full justify-center"
        intensity={20}
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
        <Text className="text-center text-2xl text-white">Birthday</Text>
      </BlurView>
    </View>
  );
}
