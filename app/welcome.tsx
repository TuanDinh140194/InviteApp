import { View, Text, Dimensions } from 'react-native';
import { useState } from 'react';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  runOnJS,
  Easing,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import CreateEventButton from '~/components/AnimatedPressable';
import EventCard from '~/components/EventCard';
import { router } from 'expo-router';
import { Marquee } from '@animatereactnative/marquee';
import { Stagger } from '@animatereactnative/stagger';


const event_images = [
  {
    id: 1,
    url: require('../assets/images/1.png'),
    title: "Birthday Scavenger Hunt",
    time: "Thu, February 13 at 2:00PM",
    location: "Pioneer Park, CA",
  },
  {
    id: 2,
    url: require('../assets/images/2.png'),
    title: "Beer Party",
    time: "Thu, February 13 at 2:00PM",
    location: "Portland, OR",
  },
  {
    id: 3,
    url: require('../assets/images/3.png'),
    title: "Pickleball Games",
    time: "Thu, February 13 at 2:00PM",
    location: "Gresham, OR",
  },
  {
    id: 4,
    url: require('../assets/images/4.png'),
    title: "Music Night",
    time: "Thu, February 13 at 2:00PM",
    location: "Salt Lake City, OR",
  },
  {
    id: 5,
    url: require('../assets/images/5.jpg'),
    title: "Tyler turn 3",
    time: "Thu, February 13 at 2:00PM",
    location: "Redmond, WA",
  },
  {
    id: 6,
    url: require('../assets/images/6.jpg'),
    title: "Housewarming Party",
    time: "Thu, February 13 at 2:00PM",
    location: "Seattle, WA",
  },
  {
    id: 7,
    url: require('../assets/images/7.jpg'),
    title: "Reunion Party",
    time: "Thu, July 15 at 2:00PM",
    location: "HoChiMinh City, Vietnam",
  },
  {
    id: 8,
    url: require('../assets/images/8.jpg'),
    title: "Tom and Megan's Wedding",
    time: "Thu, February 14 at 2:00PM",
    location: "Redmond, WA",
  },
];

const { width } = Dimensions.get('window');
const _item_width = width * 0.62;
const _item_height = _item_width * 1.67;
const _spacing = 16;
const _itemSize = _item_width + _spacing;


export default function WelcomeScreen() {
  const onPress = () => {
    router.push('/create');
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const offset = useSharedValue(0);

  //Calculate active index with offset value
  //useAnimatedReaction can be used to track offset useSharedValue changes and update state of activeIndex
  useAnimatedReaction(
    () => {
      const floatIndex = ((offset.value + width / 2) / _itemSize) % event_images.length;
      return Math.abs(Math.floor(floatIndex));
    },
    (value) => {
      //Set state of activeIndex
      runOnJS(setActiveIndex)(value);
    }
  );
  return (
    <View className="flex-1 items-center justify-center bg-[#000] ">
      {/* Background Images */}
      <View className="absolute left-0 top-0 h-full w-full opacity-50">
        <Animated.Image
          key={event_images[activeIndex].id}
          source={event_images[activeIndex].url}
          className="absolute left-0 top-0 h-full w-full"
          blurRadius={50}
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
        />
      </View>

      {/* Marquee components */}
      <Marquee spacing={_spacing} position={offset}>
        <Animated.View
          className="flex-row"
          style={{ gap: _spacing }}
          entering={FadeInUp.delay(500)
            .duration(1000)
            .easing(Easing.elastic(0.9))
            .withInitialValues({ transform: [{ translateY: -_item_height / 2 }] })}>
          {event_images.map((image, index) => (
            <EventCard key={image.id} image={image} index={index} offset={offset} event_images={event_images} _itemSize={_itemSize} width={width} _item_width={_item_width} _item_height={_item_height} />
          ))}
        </Animated.View>
      </Marquee>

      {/* Footer Text */}
      <Stagger
        initialEnteringDelay={1000}
        duration={500}
        stagger={100}
        style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
        <Text className="text-center text-2xl font-bold text-white/60">Welcome to</Text>
        <Text className="text-center text-5xl font-bold text-white">App Invites</Text>
        <Text className="my-10 text-center text-lg text-white/60">
          Create beautiful invitations for your events. Anyone can receive invitations
        </Text>
        <CreateEventButton onPress={onPress} />
      </Stagger>
    </View>
  );
}
