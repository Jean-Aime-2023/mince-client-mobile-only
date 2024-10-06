import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { PoppinsSemibold, PoppinText } from '@/components/StyledText';
import FormInput from '@/components/Login/FormInput';
import CustomButton from '@/components/CustomButton';
import UploadModal from '@/components/UploadModal';
import * as ImagePicker from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';
import img from '@/assets/avatar/default-profile-picture-male-icon.png'

export default function Profile() {
  const [isEnabledSendReceive, setIsEnabledSendReceive] = useState(false);
  const [isEnabledMerchantOrder, setIsEnabledMerchantOrder] = useState(false);
  const [isEnabledRecommendations, setIsEnabledRecommendations] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);

  // State for form inputs and validation messages
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currency, setCurrency] = useState('');
  const [errors, setErrors] = useState<any>({});

  const onButtonPress = () => {
    setModalVisible(true); // Open modal
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close modal
  };

  const uploadImage = async (mode: string) => {
    try {
      let result: ImagePicker.ImagePickerResult;

      if (mode === 'gallery') {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error: any) {
      alert('Error uploading image ' + error.message);
      setModalVisible(false);
    }
  };

  const saveImage = async (imageUri: any) => {
    try {
      setImage(imageUri);
      setModalVisible(false);
    } catch (error) {
      throw error;
    }
  };

  const removeImage = async () => {
    try {
      saveImage(null);
    } catch ({ message }: any) {
      alert(message);
      setModalVisible(false);
    }
  };

  // Validation function
  const validate = () => {
    const newErrors: any = {};
    if (!userName) newErrors.userName = 'User name is required.';
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!password) newErrors.password = 'Password is required.';
    if (!currency) newErrors.currency = 'Currency is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleSubmit = () => {
    if (validate()) {
      // Proceed with form submission
      alert('Profile updated successfully!');
    }
  };

  return (
    <>
      <Header title="My Account" />
      <SafeAreaView style={[styles.container, tw`h-full text-[#000]`]}>
        <ScrollView style={tw`px-4`}>
          <UploadModal
            modalVisible={modalVisible}
            onBackPress={handleCloseModal}
            onCameraPress={() => uploadImage('camera')}
            onGalleryPress={() => uploadImage('gallery')}
            onRemovePress={removeImage}
          />
          <View style={tw`gap-5 mt-3 bg-white p-4 rounded-xl mb-5`}>
            <PoppinsSemibold style={tw`text-[#333B69] text-[17px]`}>Profile</PoppinsSemibold>
            <View style={tw`flex justify-center items-center`}>
              <View style={tw`relative`}>
                <Image
                  source={image ? { uri: image } : img}
                  resizeMode="cover"
                  style={[tw`rounded-full`, { width: 100, height: 100 }]}
                />
                <TouchableOpacity
                  onPress={onButtonPress}
                  style={tw`absolute bottom-0 right-0 p-2 rounded-full bg-[#1814F3]`}
                >
                  <Entypo name="camera" size={22} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`flex-col gap-2`}>
              <PoppinText>User Name</PoppinText>
              <FormInput
                placeholder="Classic"
                value={userName}
                onChangeText={setUserName}
              />
              {errors.userName && <Text style={tw`text-red-500`}>{errors.userName}</Text>}
            </View>

            <View style={tw`flex-col gap-2`}>
              <PoppinText>Email</PoppinText>
              <FormInput
                placeholder=""
                value={email}
                onChangeText={setEmail}
              />
              {errors.email && <Text style={tw`text-red-500`}>{errors.email}</Text>}
            </View>

            <View style={tw`flex-col gap-2`}>
              <PoppinText>Password</PoppinText>
              <FormInput
                placeholder="**** **** **** ****"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              {errors.password && <Text style={tw`text-red-500`}>{errors.password}</Text>}
            </View>

            <View style={tw`flex-col gap-2`}>
              <PoppinText>Currency</PoppinText>
              <FormInput
                placeholder="USD"
                value={currency}
                onChangeText={setCurrency}
              />
              {errors.currency && <Text style={tw`text-red-500`}>{errors.currency}</Text>}
            </View>

            <PoppinsSemibold style={tw`text-[#333B69] text-[17px]`}>Notification</PoppinsSemibold>

            <View style={tw`flex-row gap-1 items-center`}>
              <Switch
                trackColor={{ false: '#767577', true: '#16DBCC' }}
                thumbColor={isEnabledSendReceive ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsEnabledSendReceive}
                value={isEnabledSendReceive}
              />
              <PoppinText>I send or receive digital currency</PoppinText>
            </View>
            <View style={tw`flex-row gap-1 items-center`}>
              <Switch
                trackColor={{ false: '#767577', true: '#16DBCC' }}
                thumbColor={isEnabledMerchantOrder ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsEnabledMerchantOrder}
                value={isEnabledMerchantOrder}
              />
              <PoppinText>I receive merchant order</PoppinText>
            </View>
            <View style={tw`flex-row gap-1 items-center`}>
              <Switch
                trackColor={{ false: '#767577', true: '#16DBCC' }}
                thumbColor={isEnabledRecommendations ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsEnabledRecommendations}
                value={isEnabledRecommendations}
              />
              <PoppinText>There are recommendations for my account</PoppinText>
            </View>

            <CustomButton
              title="Save"
              customStyles="bg-[#5547D7] w-full"
              customText="text-[#fff]"
              onPress={handleSubmit} // Trigger validation on button press
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
});
