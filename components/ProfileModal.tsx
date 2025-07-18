import { View, Text, Pressable, Modal, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { auth } from '../config/auth/firebaseConfig';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';


type ProfileModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

export default function ProfileModal({ modalVisible, setModalVisible }: ProfileModalProps) {
const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const router = useRouter();

 // Function to handle avatar selection 
const handleChangeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 1,
    });
  
    if (!result.canceled && result.assets.length > 0) {
      setAvatarUri(result.assets[0].uri);
      console.log(result.assets[0].uri);
      // Optionally: Upload to Firebase Storage and update user profile
    }
  };
  
  return (
    // Modal Profile
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
        {/* Blur View Layer */}
      <BlurView
        intensity={50}
        style={{
          flex: 1,
          alignItems: 'center',
          padding: 40,
          marginTop: 60,
          overflow: 'hidden',
          borderRadius: 50,
        }}
        experimentalBlurMethod="dimezisBlurView" // optional for Android
      >
        <View className="w-4/5 items-center rounded-2xl">
          <Text className="mb-10 text-2xl font-bold text-white">Profile Info</Text>
          <View className="flex flex-row items-center justify-center gap-4 ">
            <View >
              <View className="relative">
                <Image
                  source={require('../assets/avatar.jpg')}
                  className="h-24 w-24 rounded-full"
                />
                <Pressable className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-white" onPress={handleChangeAvatar}>
                  <AntDesign name="edit" color="black" size={16} />
                </Pressable>
              </View>
            </View>
            <View>
              <Text className="text-xl text-white">{auth.currentUser?.displayName}</Text>
              <Text className="text-xl text-gray-300">{auth.currentUser?.email}</Text>
            </View>
          </View>

          <Pressable
            className="mt-10 items-center rounded-md bg-red-500 px-4 py-2"
            onPress={async () => {
              await auth.signOut();
              setModalVisible(false);
              router.replace('/'); // redirect to login screen
            }}>
            <Text className="text-xl font-bold text-white">Log Out</Text>
          </Pressable>

          <Pressable className="mt-4 items-center" onPress={() => setModalVisible(false)}>
            <Text className="text-xl text-white underline">Close</Text>
          </Pressable>
        </View>
      </BlurView>
    </Modal>
  );
}
