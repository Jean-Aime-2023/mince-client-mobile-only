import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import FormInput from '@/components/Login/FormInput';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCreateAccount = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill out all fields.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    // Log form data to console (replace with sending to backend)
    console.log({ username, email, password, confirmPassword });

    router.push('/login');
  };

  return (
    <SafeAreaView style={[styles.containerRegister, tw`h-full`]}>
      <ScrollView>
        <View style={[{ minHeight: Dimensions.get('window').height - 100 }, tw`w-full flex items-center my-16 gap-7`]}>
          <Image source={require('@/assets/images/mince1.png')} resizeMode="cover" style={tw`mb-6`} />
          <View style={[tw`w-full flex flex-col gap-10 px-6`]}>
            <View style={[tw`w-full flex flex-col gap-4`]}>
              <FormInput placeholder="Username" value={username} onChangeText={setUsername} />
              <FormInput placeholder="Email" value={email} onChangeText={setEmail} />
              <FormInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
              <FormInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
            </View>
            <CustomButton title="Create account" customStyles="bg-[#5547D7] w-full" customText="text-[#fff]" handlePress={handleCreateAccount} />
            <CustomButton title="Continue With Google" customStyles="bg-transparent border-2 border-[#CECACE] w-full" icon={require('@/assets/images/googleLogo.png')} customText="text-[#6B6B6B]" />
            <Text style={[tw`text-[#6B6B6B] text-[13px]`, { textAlign: 'center' }]}>
              Already have an account? <Link href="/login" style={tw`text-[#5547D7]`}>Login here</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  containerRegister: {
    width: '100%',
    backgroundColor: '#F5F7FA',
  },
});
