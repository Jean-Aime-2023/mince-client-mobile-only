import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import AuthSteppers from '@/components/AuthSteppers';

const Register = () => {

  return (
    <SafeAreaView style={[styles.containerRegister, tw`h-full`]}>
      <ScrollView>
        <View style={[{ minHeight: Dimensions.get('window').height - 100 }, tw`w-full flex items-center my-16 gap-7`]}>
          <AuthSteppers/>
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
