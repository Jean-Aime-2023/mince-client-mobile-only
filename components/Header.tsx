import { View, StyleSheet } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PoppinText } from './StyledText';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <View
      style={[
        styles.container,
        tw`w-full flex-row items-center p-4 pt-11 justify-between`,
      ]}
    >
      <PoppinText style={tw`text-[16px] text-[#0A1027]`}>{title}</PoppinText>
      <View style={tw`flex-row gap-5 items-center`}>
        <View style={tw`relative`}>
          <Entypo
            name="dot-single"
            size={33}
            color="red"
            style={tw`absolute right-0 -top-3 bottom-0 z-10`}
          />
          <FontAwesome
            name="bell"
            size={20}
            color="black"
            onPress={() => router.push('/(notify)')}
          />
        </View>
        <Feather
          name="log-out"
          size={20}
          color="red"
          onPress={() => router.push('/login')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
