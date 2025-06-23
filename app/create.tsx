import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function Create() {
  return (
    <ScrollView className="flex-1">
      <LinearGradient colors={['#ff0000', '#800080', '#00008B']} style={StyleSheet.absoluteFill} />
      <SafeAreaView className="p-4">
        {/* Close button and preview button */}
        <View className="flex-row items-center justify-between">
          <Ionicons
            onPress={() => router.back()}
            name="close"
            size={24}
            color="white"
            className="rounded-full bg-zinc-700/30 p-2"
          />

          <Pressable className="rounded-full bg-white/30 p-3 px-6">
            <Text className="text-lg font-bold text-zinc-900">Preview</Text>
          </Pressable>
        </View>

        {/* Add background image */}
        <View className="mt-20 items-center justify-center gap-4">
          <Ionicons
            name="image"
            size={36}
            color="white"
            className="rounded-full bg-zinc-700/30 p-4"
          />
          <Text className="rounded-3xl bg-zinc-700/30 p-2 px-6 text-xl text-white">
            Add background
          </Text>
        </View>

        {/* Add title date and location */}
        <View className="rounder-2xl mt-20 h-72 rounded-3xl border border-white/15 bg-zinc-700/40 p-4 ">
          <View className="border-b border-white/15 p-2">
            <TextInput
              className="text-center text-4xl font-bold text-white "
              placeholder="Event title"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </View>
          <View className="items-center justify-center gap-2 border-b border-white/15 py-4">
            <Ionicons name="calendar" size={24} color="#800080" />
            <Text className="text-lg text-white">Date and time</Text>
          </View>
          <View className="items-center justify-center gap-2 border-b border-white/15 py-4">
            <Ionicons name="location" size={24} color="#800080" />
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
          <View className="flex-row items-center justify-center gap-2 mt-5">
            <Ionicons name="image" size={40} color="white" className='bg-gray-700 px-8 py-14 rounded-xl'/>
            <Ionicons name="image" size={40} color="white" className='bg-gray-700 px-8 py-14 rounded-xl'/>
            <Ionicons name="image" size={40} color="white" className='bg-gray-700 px-8 py-14 rounded-xl'/>
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
          <View className="items-center justify-center gap-2 mt-5">
            <Ionicons name="musical-note" size={40} color="white" className='bg-gray-700 px-52 py-10 rounded-xl'/>
            
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
