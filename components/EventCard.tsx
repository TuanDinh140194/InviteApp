import { BlurView } from 'expo-blur';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { SharedValue, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';

type EventCardProps = {
  image: any;
  index: number;
  offset: SharedValue<number>;
  event_images: any[];
  _itemSize: number;
  width: number;
  _item_width: number;
  _item_height: number;
};

export default function EventCard({
  image,
  index,
  offset,
  event_images,
  _itemSize,
  width,
  _item_width,
  _item_height,
}: EventCardProps) {
  //Calculate item position and range of items to create interpolation
  const stylez = useAnimatedStyle(() => {
    const itemPosition = index * _itemSize - width - _itemSize / 2;
    const totalSize = event_images.length * _itemSize;
    const range =
      ((itemPosition - (offset.value + totalSize * 1000)) % totalSize) + width + _itemSize / 2;
    return {
      transform: [
        {
          rotate: `${interpolate(range, [-_itemSize, (width - _itemSize) / 2, width], [-3, 0, 3])}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[{ width: _item_width, height: _item_height }, stylez]}
      className="overflow-hidden rounded-3xl">
      <Image source={image.url} className="h-full w-full flex-1" />
      <BlurView
        className="absolute left-2 top-2 overflow-hidden rounded-2xl px-4 py-1 flex-row items-center gap-2"
        tint="dark"
        intensity={50}
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}>
        {/* <Foundation name="crown" color="white" size={18} /> */}
        <AntDesign name="checkcircle" color="green" size={18} />
        <Text className="text-md text-white">Hosting</Text>
      </BlurView>

      <BlurView
        className="absolute bottom-0 h-36 w-full justify-center"
        intensity={20}
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
          style={StyleSheet.absoluteFill}
        />
        <Text className="justify-center px-4 text-center text-3xl font-semibold text-white">
          {image.title}
        </Text>
        <Text className="text-md  mt-2 text-center text-gray-300">{image.time}</Text>
        <Text className="text-md  text-center text-gray-300">{image.location}</Text>
      </BlurView>
    </Animated.View>
  );
}
