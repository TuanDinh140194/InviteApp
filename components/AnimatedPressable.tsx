import React, { memo } from 'react';
import { Text, Pressable } from 'react-native';
import Animated , { FadeInUp } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CreateEventButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <AnimatedPressable
      onPress={onPress}
      className="items-center self-center rounded-full bg-white px-10 py-4"
      entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
    >
      <Text className="text-lg">Create an Events</Text>
    </AnimatedPressable>
  );
};

export default memo(CreateEventButton);