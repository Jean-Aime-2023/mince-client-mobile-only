import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import FormInput from '@/components/Login/FormInput';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { PoppinsSemibold, PoppinText } from '@/components/StyledText';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing JWT

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Helper function to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Dismiss keyboard
    Keyboard.dismiss();

    // Check if both fields are filled
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter your email and password.');
      return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true); 

    console.log("hello")
    try {
      // Send POST request to backend login endpoint
      console.log("hello again")
      const response = await axios.post('http://mincetech-back.onrender.com/api/users/auth/login', {
        email: email, // Directly use email here
        password,
      });

      console.log("hello 2")

      if (response.status === 200) {
        const { token } = response.data;

        // Store the token securely
        await AsyncStorage.setItem('userToken', token);

        Alert.alert('Success', 'Login successful!');
        router.push('/home'); // Navigate to home screen
      } else {
        Alert.alert('Login Failed', 'Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
        Alert.alert('Login Failed', errorMessage);
      } else {
        Alert.alert('Login Failed', 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <SafeAreaView style={[styles.containerLogin, tw`h-full`]}>
      <ScrollView>
        <View style={[{ minHeight: Dimensions.get('window').height - 100 }, tw`w-full flex items-center my-16 gap-7`]}>
          <Image source={require('@/assets/images/mince1.png')} resizeMode="cover" style={tw`mb-6`} />
          <View style={[tw`w-full flex flex-col gap-8 px-6`]}>
            <PoppinsSemibold style={tw`text-[#0A1027]`}>Welcome Back</PoppinsSemibold>
            <FormInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <FormInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <CustomButton
              title={loading ? "Logging in..." : "Login"}
              customStyles="bg-[#5547D7] w-full"
              customText="text-[#fff]"
              handlePress={handleLogin}
              disabled={loading}
            />
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
