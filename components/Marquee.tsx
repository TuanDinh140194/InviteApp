import { View, Text, Image, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import React, { Children, PropsWithChildren, useEffect, useState } from 'react';

type MarqueeItemProps = {
  event: any;
  index: number;
  scroll: SharedValue<number>;
  containerWidth: number;
  itemWidth: number;
  screenWidth: number;
};

type MarqueeProps = {
  events: any[];
  onIndexChange?: (index: number) => void;
  renderItem: ({ event, index }: { event: any; index: number }) => React.ReactNode;
};
function MarqueeItem({
  event,
  index,
  scroll,
  containerWidth,
  itemWidth,
  screenWidth,
  children
}: PropsWithChildren<MarqueeItemProps>) {
  //- The shift ensures equal padding on both sides when the items overflow beyond the screen width.
  const shift = (containerWidth - screenWidth) / 2;

  //Calculate initial position, -shift ensures equal padding on both sides
  const initialPosition = itemWidth * index - shift;

  //Animated style
  const animatedStyle = useAnimatedStyle(() => {
    //Calculate position of current item, modulus ensures it loops around the container width when it overflows, +shift ensures equal padding on both sides
    const position = ((initialPosition - scroll.value) % containerWidth) + shift;

    //Make the item rotate and move up and down in left to right direction
    const rotation = interpolate(position, [0, screenWidth - itemWidth], [-1, 1]);
    const translateY = interpolate(
      position,
      [0, (screenWidth - itemWidth) / 2, screenWidth - itemWidth],
      [3, 0, 3]
    );
    return {
      left: position,
      transform: [{ rotateZ: `${rotation}deg` }, { translateY }],
    };
  });
  return (
    <Animated.View
      key={event.id}
      className="absolute h-full p-2 shadow-2xl"
      style={[animatedStyle, { width: itemWidth, transformOrigin: 'bottom' }]}>
      {children}
    </Animated.View>
  );
}

export default function Marquee({ events, onIndexChange, renderItem }: MarqueeProps) {
  //Initialize scroll value
  const scroll = useSharedValue(0);
  const scrollSpeed = useSharedValue(50);

  //Calculate item width
  const { width: screenWidth } = useWindowDimensions();
  const itemWidth = screenWidth * 0.65;
  //Calculate container width
  const containerWidth = itemWidth * events.length;

  const [activeIndex, setActiveIndex] = useState(0);
  //Update active index
  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(activeIndex);
    }
  }, [activeIndex]);
  //Change background images when images frame change
  useAnimatedReaction(
    () => scroll.value, //Listen to scroll
    (value) => {
      //Calculate active index
      const normalisedScroll = (value + screenWidth / 2) % containerWidth;
      const activeIndex = Math.floor(normalisedScroll / itemWidth);

      runOnJS(setActiveIndex)(activeIndex);
    }
  );

  //Update scroll value every frame
  useFrameCallback((frameInfo) => {
    const deltaSeconds = (frameInfo.timeSincePreviousFrame ?? 0) / 1000;
    scroll.value = scroll.value + scrollSpeed.value * deltaSeconds;
  });

  //Gesture effect on pan
  const gesture = Gesture.Pan()
    .onBegin(() => {
      scrollSpeed.value = 0;
    })
    .onChange((event) => {
      scroll.value = scroll.value - event.changeX;
    })
    .onFinalize((event) => {
      scrollSpeed.value = -event.velocityX;
      scrollSpeed.value = withTiming(50, { duration: 1000, easing: Easing.out(Easing.quad) });
    });
  return (
    <GestureDetector gesture={gesture}>
      <View className="h-full flex-row">
        {events.map((event, index) => (
          <MarqueeItem
            key={event.id}
            event={event}
            index={index}
            scroll={scroll}
            containerWidth={containerWidth}
            itemWidth={itemWidth}
            screenWidth={screenWidth}>
            {renderItem({ event, index })}
          </MarqueeItem>
        ))}
      </View>
    </GestureDetector>
  );
}
