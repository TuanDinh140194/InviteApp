import { View, Text, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

type DropdownMenuProps = {
  setShowDropdown: (visible: boolean) => void;
  setDropDownName: (name: string) => void;
  dropDownName: string;
};

export default function DropdownMenu({
  setShowDropdown,
  setDropDownName,
  dropDownName,
}: DropdownMenuProps) {
  return (
    <View className="absolute left-5 top-36 z-50 w-1/2 rounded-xl bg-zinc-900 shadow-lg">
      <Pressable
        onPress={() => {
          setShowDropdown(false);
          setDropDownName('Upcoming');
          // add logic to filter events if needed
        }}
        className="border-b border-white/10 p-4">
        <View className="flex flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            {dropDownName === 'Upcoming' && <AntDesign name="check" color="white" size={18} />}
            <Text className="text-lg text-white">Upcoming</Text>
          </View>

          <AntDesign name="calendar" color="white" size={24} />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          setShowDropdown(false);
          setDropDownName('Past Events');
        }}
        className="border-b border-white/10 p-4">
        <View className="flex flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            {dropDownName === 'Past Events' && <AntDesign name="check" color="white" size={18} />}
            <Text className="text-lg text-white">Past Events</Text>
          </View>
          <MaterialIcons name="replay" color="white" size={24} />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          setShowDropdown(false);
          setDropDownName('Drafts');
        }}
        className="border-b border-white/10 p-4">
        <View className="flex flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            {dropDownName === 'Drafts' && <AntDesign name="check" color="white" size={18} />}
            <Text className="text-lg text-white">Drafts</Text>
          </View>
          <MaterialIcons name="edit" color="white" size={24} />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          setShowDropdown(false);
          setDropDownName('Hosting');
        }}
        className="border-b border-white/10 p-4">
        <View className="flex flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            {dropDownName === 'Hosting' && <AntDesign name="check" color="white" size={18} />}
            <Text className="text-lg text-white">Hosting</Text>
          </View>
          <Foundation name="crown" color="white" size={24} className="mr-2" />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          setShowDropdown(false);
          setDropDownName('Attending');
        }}
        className="border-b border-white/10 p-4">
        <View className="flex flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            {dropDownName === 'Attending' && <AntDesign name="check" color="white" size={18} />}
            <Text className="text-lg text-white">Attending</Text>
          </View>
          <AntDesign name="checkcircleo" color="white" size={24} />
        </View>
      </Pressable>
    </View>
  );
}
