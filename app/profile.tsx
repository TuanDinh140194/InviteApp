import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import ProfileModal from '~/components/ProfileModal';
import DropdownMenu from '~/components/DropdownMenu';

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropDownName, setDropDownName] = useState('Upcoming');

  const router = useRouter();
  return (
    <View className="h-full flex-1 items-center">
      <LinearGradient
        colors={['#1C2023', '#1F222B', '#322E2B', '#44382A']}
        style={StyleSheet.absoluteFill}
      />
      {/* Header section */}
      <View className="my-20 w-full px-5">
        <View className="flex flex-row justify-between">
          <Pressable
            className="justify-bottom flex flex-row items-end gap-2"
            onPress={() => setShowDropdown(!showDropdown)}
            style={({ pressed }) => [
              {
                backgroundColor: '#1F222B',
                padding: 12,
                borderRadius: 12,
                opacity: pressed ? 0.6 : 1, // 👈 fades when tapped
              },
            ]}>
            <Text className="text-4xl font-bold text-white">{dropDownName}</Text>
            <AntDesign name="down" color="gray" size={24} />
          </Pressable>
          <View className="justify-bottom flex flex-row items-end gap-4">
            <Pressable onPress={() => router.push('/create')}>
              <AntDesign name="pluscircle" color="gray" size={38} />
            </Pressable>
            <Pressable onPress={() => setModalVisible(true)}>
              <Image source={require('../assets/avatar.jpg')} className="h-12 w-12 rounded-full" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* DropDown Menu */}
      {showDropdown && (
        <DropdownMenu setShowDropdown={setShowDropdown} setDropDownName={setDropDownName} dropDownName={dropDownName} />
      )}

      {/* Event card section */}
      <View className="h-full w-full items-center px-5">
        <View className="h-3/4 items-center overflow-hidden rounded-3xl border border-white/10 bg-zinc-700/40 p-5">
          <View className="mt-20 w-full items-center justify-center gap-2">
            <AntDesign name="calendar" color="gray" size={48} />
            <Text className="mt-5 text-2xl font-semibold text-white">No Upcoming Events</Text>
            <Text className="text-center text-xl text-white/50">
              Upcoming events, whether you&apos;re a host or a guest, will appear here.
            </Text>
            <Pressable
              className="mt-10 w-full items-center justify-center rounded-3xl bg-white px-10 py-2"
              onPress={() => router.push('/create')}>
              <Text className="text-lg font-bold text-black">Create Event</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Profile Modal */}
      <ProfileModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
}
