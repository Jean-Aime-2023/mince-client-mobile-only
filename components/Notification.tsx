import { Image, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import React from 'react';
import { PoppinText } from './StyledText';
import tw from 'twrnc';
import { router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';

const Notification = ({ title, desc, time, dot, btn }: any) => {
  // Function to handle accepting the notification
  const handleAccept = async () => {
    // Check if the device supports biometric authentication
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometric Authentication Error', 'Please set up fingerprint authentication in your device settings.');
      return;
    }

    // Prompt for fingerprint authentication
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Scan your fingerprint to proceed',
      fallbackLabel: 'Use Passcode',
    });

    if (result.success) {
      Alert.alert('Success', 'Transaction successful! ✅');
      // Proceed with the transaction
      console.log('Transaction completed');
    } else {
      Alert.alert('Authentication Failed', 'Fingerprint scan failed. Please try again.');
    }
  };

  return (
    <View style={tw`border-2 border-[#718EBF] rounded-lg relative w-full mb-5`}>
      {dot === true ? (
        <Image
          source={require('@/assets/images/dot.png')}
          resizeMode="contain"
          style={tw`absolute top-0 right-0 m-2`}
        />
      ) : null}
      <View style={tw`flex flex-col gap-3 p-4`}>
        <View style={tw`flex flex-row items-center gap-3`}>
          <View style={tw`flex flex-col flex-wrap`}>
            <PoppinText
              style={tw`text-[#002159] text-[14px]`}
              numberOfLines={2}
              ellipsizeMode="head"
            >
              {title}
            </PoppinText>
            <PoppinText
              style={tw`text-[#6B6B6B] text-[12px]`}
              numberOfLines={2}
              ellipsizeMode="head"
            >
              {desc}
            </PoppinText>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'flex-end',
            gap: 5,
          }}
        >
          <PoppinText
            style={[tw`text-[#6B6B6B] text-[12px]`, { textAlign: 'right' }]}
          >
            {time}
          </PoppinText>
          {btn === true ? (
            <View style={tw`flex flex-row gap-3 w-full`}>
              <TouchableOpacity style={tw`bg-red-200 rounded-[10px]`} onPress={() => router.push('/report')}>
                <PoppinText
                  style={tw`text-[12px] text-[#D82E2B] w-[83px] h-[35px] px-4 py-2 text-center`}
                >
                  Decline
                </PoppinText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAccept} style={tw`bg-[#5547D7] text-white rounded-[10px]`}>
                <PoppinText
                  style={tw`text-[12px] text-[#fff] w-[83px] h-[35px] px-4 py-2 text-center`}
                >
                  Accept
                </PoppinText>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
