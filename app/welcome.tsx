import { View, Pressable, Platform, Image, Text } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeInUp, FadeOut, SlideInUp } from 'react-native-reanimated';
import Marquee from '~/components/Marquee';
import CreateEventButton from '~/components/AnimatedPressable';
import EventCard from '~/components/EventCard';
import { router } from 'expo-router';

const event_image = [
  {
    id: 1,
    url: require('../assets/images/1.png'),
  },
  {
    id: 2,
    url: require('../assets/images/2.png'),
  },
  {
    id: 3,
    url: require('../assets/images/3.png'),
  },
  {
    id: 4,
    url: require('../assets/images/4.png'),
  },
  {
    id: 5,
    url: require('../assets/images/5.jpg'),
  },
  {
    id: 6,
    url: require('../assets/images/6.jpg'),
  },
  {
    id: 7,
    url: require('../assets/images/7.jpg'),
  },
  {
    id: 8,
    url: require('../assets/images/8.jpg'),
  },
];

export default function WelcomeScreen() {
  const [background, setbackground] = useState(0);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const onPress = () => {
    router.push('/create');
  };

  return (
    <View className="flex-1 items-center justify-center bg-yellow-950">
      <Animated.Image
        key={event_image[background].url}
        source={event_image[background].url}
        className="absolute left-0 top-0 h-full w-full"
        resizeMode="cover"
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
      />

      <View className="absolute left-0 top-0 h-full w-full bg-black/60 " />

      {/* BlurView only over background */}
      <BlurView
        intensity={80}
        tint={Platform.OS === 'android' ? 'dark' : undefined}
        // experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}>
      >
        <SafeAreaView edges={['bottom']}>
          {/* Top part of screen (list horizontal images) */}
          <Animated.View
            className="mt-20 h-1/2 w-full"
            entering={SlideInUp.springify().mass(1).damping(30)}>
            <Marquee
              events={event_image}
              onIndexChange={setbackground}
              renderItem={({ event }) => (
                <EventCard key={event.id} event={event} />
              )}
            />
          </Animated.View>

          <View className="flex-1 justify-center gap-4 p-4">
            <Animated.Text
              className="text-center text-2xl font-bold text-white/60"
              entering={FadeInUp.springify().mass(1).damping(30).delay(500)}>
              Welcome to
            </Animated.Text>
            <Animated.Text
              className="text-center text-5xl font-bold text-white"
              entering={FadeIn.duration(500).delay(800)}>
              App Invites
            </Animated.Text>
            <Animated.Text
              className="mb-5 text-center text-lg text-white/60"
              entering={FadeInUp.springify().mass(1).damping(30).delay(500)}>
              Create beautiful invitations for your events. Anyone can receive invitations
            </Animated.Text>

            <CreateEventButton onPress={onPress} />
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
}
