import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import FormInput from '@/components/Login/FormInput';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { PoppinsSemibold, PoppinText } from '@/components/StyledText';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Helper function to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    // Check if both fields are filled
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter your username/email and password.');
      return;
    }

    // Validate email if username is entered as an email
    if (username.includes('@') && !isValidEmail(username)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
      return;
    }

    // Log data to console (this can be used to send to backend)
    console.log({ username, password });

    // Redirect to home on successful login
    router.push('/home');
  };

  return (
    <SafeAreaView style={[styles.containerLogin, tw`h-full`]}>
      <ScrollView>
        <View style={[{ minHeight: Dimensions.get('window').height - 100 }, tw`w-full flex items-center my-16 gap-7`]}>
          <Image source={require('@/assets/images/mince1.png')} resizeMode="cover" style={tw`mb-6`} />
          <View style={[tw`w-full flex flex-col gap-8 px-6`]}>
            <PoppinsSemibold style={tw`text-[#0A1027]`}>Welcome Back</PoppinsSemibold>
            <FormInput placeholder="Phone number, email, or username" value={username} onChangeText={setUsername} />
            <FormInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <PoppinText style={[tw`text-[#6B6B6B] text-[13px] pr-2`, { textAlign: 'right' }]}>
              Forgot Password? <Text style={tw`text-[#5547D7]`}>Click Here</Text>
            </PoppinText>
            <CustomButton title="Login" customStyles="bg-[#5547D7] w-full" customText="text-[#fff]" handlePress={handleLogin} />
            <CustomButton title="Continue With Google" customStyles="bg-transparent border-2 border-[#CECACE] w-full" icon={require('@/assets/images/googleLogo.png')} customText="text-[#6B6B6B]" />
            <PoppinText style={[tw`text-[#6B6B6B] text-[13px]`, { textAlign: 'center' }]}>
              Don’t have an account? <Link href="/register" style={tw`text-[#5547D7]`}><Text>Register here</Text></Link>
            </PoppinText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  containerLogin: {
    width: '100%',
    backgroundColor: '#F5F7FA',
  },
});
