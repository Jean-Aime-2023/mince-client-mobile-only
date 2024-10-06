import { View, Dimensions, ScrollView, Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PoppinsSemibold, PoppinText } from '@/components/StyledText';
import img1 from '@/assets/images/Tecno pattern.png';
import tw from 'twrnc';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FormInput from '@/components/Login/FormInput';
import CustomButton from '@/components/CustomButton';

export default function wallet() {
  return (
    <>
      <Header title="My Cards" />
      <SafeAreaView style={[styles.container, tw`h-full`]}>
        <ScrollView>
          <View
            style={[
              {
                minHeight: Dimensions.get('window').height - 100,
              },
              tw`w-full flex-col`,
            ]}
          >
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={tw`p-4`}>
                  <Image source={img1} resizeMode="cover" />
                </View>
                <View style={tw`p-4`}>
                  <Image source={img1} resizeMode="cover" />
                </View>
              </ScrollView>
            </View>
            <View style={tw`p-4`}>
              <PoppinsSemibold style={tw`text-[#002159] text-lg`}>
                Add New Card
              </PoppinsSemibold>
              <View style={tw`flex-col gap-5 mt-3 bg-white p-4 rounded-xl`}>
                <PoppinText style={tw`text-[#5547D7] text-[13px]`}>
                  Credit Card generally means a plastic card issued by Scheduled
                  Commercial Banks assigned to a Cardholder.
                </PoppinText>
                <View style={tw`flex-col gap-2`}>
                  <PoppinText style={tw`text-[#6B6B6B]`}>Card Type</PoppinText>
                  <FormInput placeholder="Classic" />
                </View>
                <View style={tw`flex-col gap-2`}>
                  <PoppinText style={tw`text-[#6B6B6B]`}>
                    Name On Card
                  </PoppinText>
                  <FormInput placeholder="My card" />
                </View>
                <View style={tw`flex-col gap-2`}>
                  <PoppinText style={tw`text-[#6B6B6B]`}>
                    Card Number
                  </PoppinText>
                  <FormInput placeholder="**** **** **** ****" />
                </View>
                <CustomButton
                  title="Add Card"
                  customStyles="bg-[#5547D7] w-full"
                  customText="text-[#fff]"
                />
              </View>
            </View>
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
