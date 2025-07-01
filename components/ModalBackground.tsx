import { View, Text, Modal, Pressable, ScrollView, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import { Entypo, Ionicons } from '@expo/vector-icons';

const BackgroundImage = [
  require('../assets/backgrounds/aniversary.jpg'),
  require('../assets/backgrounds/babyShower.jpg'),
  require('../assets/backgrounds/birthday.jpg'),
  require('../assets/backgrounds/beer.jpg'),
  require('../assets/backgrounds/concert.jpg'),
  require('../assets/backgrounds/drink.jpg'),
  require('../assets/backgrounds/music.jpg'),
  require('../assets/backgrounds/party.jpg'),
  require('../assets/backgrounds/pickleball.jpg'),
  require('../assets/backgrounds/stadium.jpg'),
];

// Group images into pairs (columns)
const columns: any = [];
for (let i = 0; i < BackgroundImage.length; i += 2) {
  columns.push(BackgroundImage.slice(i, i + 2));
}

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onSelectBackground: (uri: any) => void;
};
export default function ModalBackground({
  modalVisible,
  setModalVisible,
  onSelectBackground,
}: ModalProps) {

  // Pick image from camera or library
  const pickImage = async (fromCamera = false) => {
    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          mediaTypes: 'images',
          quality: 1,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'images',
          quality: 1,
        });
  
    if (!result.canceled && result.assets.length > 0) {
      onSelectBackground(result.assets[0].uri);
      setModalVisible(false);
    }
  };
  
  return (
    <Modal visible={modalVisible} transparent animationType="slide" className="mt-10 pt-10">
      <BlurView
        intensity={100}
        tint="dark"
        className="mt-10 flex-1"
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}>
        {/* Header */}
        <View className="flex-row items-center justify-between p-4">
          <Ionicons
            onPress={() => setModalVisible(false)}
            name="close"
            size={24}
            color="white"
            className="rounded-full bg-zinc-700/30 p-2"
          />
          <Text className="text-xl font-bold text-white">Add Background</Text>

          <Text></Text>
        </View>
        <ScrollView>
          {/* Pick Custom Photo */}
          <View className="flex-row gap-4 p-4">
            <View className="gap-2">
              <Pressable
                onPress={() => pickImage(false)}
                className="items-center self-center rounded-full bg-white p-4">
                <Ionicons name="images-sharp" color="#037bfc" size={30} />
              </Pressable>
              <Text className="text-center text-white">Photos</Text>
            </View>
            <View className="gap-2">
              <Pressable
                onPress={() => pickImage(true)}
                className="items-center self-center rounded-full bg-white p-4">
                <Entypo name="camera" color="lightseagreen" size={30} />
              </Pressable>
              <Text className="text-center text-white">Camera</Text>
            </View>
          </View>

          {/* Images Template */}
          <View className="mt-4 flex p-4">
            <Text className="my-4 text-2xl font-bold text-white">Emoji</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {columns.map((column: any, colIndex: number) => (
                <View key={colIndex} className="mr-4">
                  {column.map((uri: any, rowIndex: number) => (
                    <Pressable
                      key={rowIndex}
                      className="mb-4"
                      onPress={() => onSelectBackground(uri)}>
                      <Image source={uri} style={{ width: 120, height: 180, borderRadius: 16 }} />
                    </Pressable>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Images Template 2*/}
          <View className="mt-4 flex p-4">
            <Text className="my-4 text-2xl font-bold text-white">Photographic</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {columns.map((column: any, colIndex: number) => (
                <View key={colIndex} className="mr-4">
                  {column.map((uri: any, rowIndex: number) => (
                    <Pressable
                      key={rowIndex}
                      className="mb-4"
                      onPress={() => onSelectBackground(uri)}>
                      <Image source={uri} style={{ width: 120, height: 180, borderRadius: 16 }} />
                    </Pressable>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Images Template 3*/}
          <View className="mt-4 flex p-4">
            <Text className="my-4 text-2xl font-bold text-white">Colors</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {columns.map((column: any, colIndex: number) => (
                <View key={colIndex} className="mr-4">
                  {column.map((uri: any, rowIndex: number) => (
                    <Pressable
                      key={rowIndex}
                      className="mb-4"
                      onPress={() => onSelectBackground(uri)}>
                      <Image source={uri} style={{ width: 120, height: 180, borderRadius: 16 }} />
                    </Pressable>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </BlurView>
    </Modal>
  );
}
