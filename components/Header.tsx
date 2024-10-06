import { View, StyleSheet } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PoppinText } from './StyledText';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <View style={[styles.container, tw`w-full flex-row items-center p-4 py-5 pt-11 justify-between`]}>
      <PoppinText style={tw`text-[16px] text-[#0A1027]`}>{title}</PoppinText>
      <View style={tw`flex-row gap-5 items-center`}>
        <FontAwesome name="bell" size={20} color="black" onPress={() => router.push('/(notify)')}/>
        <Feather name="log-out" size={20} color="red" onPress={() => router.push('/login')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
