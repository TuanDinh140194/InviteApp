import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import ModalBackground from '~/components/ModalBackground';
import { BlurView } from 'expo-blur';

export default function Create() {
  const [scrolled, setScrolled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<any | null>(null);
  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any } } }) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrolled(offsetY > 50); // You can adjust the threshold
  };

  const handleSelectBackground = (uri: any) => {
    setBackgroundImage(uri);
    setModalVisible(false);
  };

  return (
    <View className="flex-1">
      {/* Background Image */}
      {backgroundImage ? (
        <>
          {/* Full image (sharp) */}
          <Image
            source={
              typeof backgroundImage === 'string' ? { uri: backgroundImage } : backgroundImage
            }
            className="absolute left-0 top-0 h-3/4 w-full"
          />
          <Image
            source={
              typeof backgroundImage === 'string' ? { uri: backgroundImage } : backgroundImage
            }
            className="absolute bottom-0 left-0 h-1/3 w-full"
            blurRadius={50}
          />
        </>
      ) : (
        <LinearGradient
          colors={['#ff0000', '#800080', '#00008B']}
          style={StyleSheet.absoluteFill}
        />
      )}

      <SafeAreaView className="flex-1">
        {/* Close button and preview button */}
        <BlurView
          intensity={scrolled ? 100 : 0}
          tint={scrolled ? 'dark' : 'light'}
          experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
          className={`absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between px-4 pb-1 pt-20`}>
          <Ionicons
            onPress={() => router.back()}
            name="close"
            size={24}
            color="white"
            className="rounded-full bg-zinc-700/30 p-2"
          />

          <Pressable
            className="rounded-full border border-white bg-white/30 p-3 px-6"
            disabled={true}>
            <Text className="text-lg font-bold text-zinc-900">Preview</Text>
          </Pressable>
        </BlurView>
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: 50, paddingBottom: 80 }}>
          {/* Add background image */}
          <Pressable
            className="my-20 items-center justify-center gap-4"
            onPress={() => setModalVisible(true)}>
            <Ionicons
              name="image"
              size={36}
              color="white"
              className="rounded-full bg-zinc-700/30 p-4"
            />
            <Text className="rounded-3xl bg-zinc-700/30 p-2 px-6 text-xl text-white">
              Add background
            </Text>
          </Pressable>

          {/* Add title date and location */}
          <BlurView
            intensity={40}
            tint="dark"
            experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
            className="mt-20 p-2">
            <View className="rounder-2xl h-72 rounded-3xl border border-white/15 bg-zinc-700/40 p-4 ">
              <View className="border-b border-white/15 p-2">
                <TextInput
                  className="text-center text-4xl font-bold text-white "
                  placeholder="Event title"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                />
              </View>
              <View className="items-center justify-center gap-2 border-b border-white/15 py-4">
                <Ionicons name="calendar" size={24} color="#64B5F6" />
                <Text className="text-lg text-white">Date and time</Text>
              </View>
              <View className="items-center justify-center gap-2 border-b border-white/15 py-4">
                <Ionicons name="location" size={24} color="#64B5F6" />
                <Text className="text-lg text-white">Location</Text>
              </View>
            </View>

            {/* Add host and description */}
            <View className="mt-5 h-36 rounded-3xl border border-white/15 bg-zinc-700/40 p-4">
              <View className="items-center justify-center">
                <Ionicons
                  name="person"
                  size={24}
                  color="white"
                  className="rounded-full bg-blue-400 p-2"
                />
                <Text className="text-lg font-semibold text-white">Add a host</Text>
                <Text className="text-lg text-white">Add a description</Text>
              </View>
            </View>

            {/* Add album */}
            <View className="mt-5 h-96 rounded-3xl border border-white/15 bg-zinc-700/40 p-6">
              <View className="items-center justify-center">
                <Ionicons name="images-outline" size={24} color="#64B5F6" />
                <Text className="text-lg  font-semibold text-blue-300">Shared Album</Text>
                <Text className="text-center text-lg text-white">
                  With Shared Album, guests can view and add their photos to the event.
                </Text>
              </View>
              <View className="mt-5 flex-row items-center justify-center gap-2">
                <Ionicons
                  name="image"
                  size={40}
                  color="white"
                  className="rounded-xl bg-gray-700 px-8 py-14"
                />
                <Ionicons
                  name="image"
                  size={40}
                  color="white"
                  className="rounded-xl bg-gray-700 px-8 py-14"
                />
                <Ionicons
                  name="image"
                  size={40}
                  color="white"
                  className="rounded-xl bg-gray-700 px-8 py-14"
                />
              </View>
            </View>

            {/* Add playlist */}
            <View className="mt-5 h-72 rounded-3xl border border-white/15 bg-zinc-700/40 p-6">
              <View className="items-center justify-center">
                <Ionicons name="radio" size={24} color="#64B5F6" />
                <Text className="text-lg  font-semibold text-blue-300">Shared Playlist</Text>
                <Text className="text-center text-lg text-white">
                  Share a playlist with all your guests.
                </Text>
              </View>
              <View className="mt-5 items-center justify-center gap-2">
                <Ionicons
                  name="musical-note"
                  size={40}
                  color="white"
                  className="rounded-xl bg-gray-700 px-52 py-10"
                />
              </View>
            </View>
          </BlurView>
        </ScrollView>
      </SafeAreaView>

      {/* Modal for choosing image */}
      <ModalBackground
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSelectBackground={handleSelectBackground}
      />
    </View>
  );
}
