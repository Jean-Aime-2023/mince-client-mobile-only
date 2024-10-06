import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PoppinText } from '@/components/StyledText';
import { Feather, Ionicons } from '@expo/vector-icons';
import Notification from '@/components/Notification';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const CustomHeader = () => {
  return (
    <View
      style={[
        styles.header,
        tw`w-full flex-row items-center p-4 py-5 pt-11 justify-between bg-white`,
      ]}
    >
      <View style={tw`flex-row gap-3`}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => router.back()}/>
        <PoppinText style={tw`text-[16px] text-[#0A1027]`}>
          Notifications
        </PoppinText>
      </View>
      <View style={tw`flex-row gap-5 items-center`}>
        <Feather
          name="log-out"
          size={20}
          color="red"
          onPress={() => router.push('/login')}
        />
      </View>
    </View>
  );
};

const Index = () => {
  return (
    <>
      {/* Header */}
      <CustomHeader />
      <SafeAreaView style={styles.container}>
        {/* Main Content */}
        <ScrollView contentContainerStyle={tw`p-4`}>
          <Notification
            title={'Ange you have successfully paid'}
            desc={'Paid $34 to rwandair was approved'}
            time={'12-march-2024'}
            dot={true}
            btn={false}
          />
          <Notification
            title="Ange you have successfully paid"
            desc="Paid $34 to rwandair was approved"
            time="Just now"
            dot={false}
            btn={true}
          />
        </ScrollView>
        <StatusBar backgroundColor="transparent" style="dark" />
      </SafeAreaView>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingTop: 0, // Remove extra top padding
    paddingBottom: 10, // Adjust as needed for desired space
    backgroundColor: '#F5F7FA',
  },
});
