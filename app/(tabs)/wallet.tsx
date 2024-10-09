import {
  View,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PoppinsSemibold, PoppinText } from '@/components/StyledText';
import img1 from '@/assets/images/Tecno pattern.png';
import tw from 'twrnc';
import FormInput from '@/components/Login/FormInput';
import CustomButton from '@/components/CustomButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import cardImg from '@/assets/images/Mince Card.png';
import { router } from 'expo-router';

export default function Wallet() {
  // State for form inputs
  const [cardType, setCardType] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');

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
                {/* <View style={tw`p-4`}>
                  <Image
                    source={cardImg}
                    resizeMode="cover"
                    style={tw`rounded-xl`}
                  />
                </View>
                <View style={tw`p-4`}>
                  <Image
                    source={cardImg}
                    resizeMode="cover"
                    style={tw`rounded-xl`}
                  />
                </View> */}
              </ScrollView>
            </View>
            <View style={tw`p-4`}>
              <PoppinsSemibold style={tw`text-[#002159] text-base`}>
                Add New Card
              </PoppinsSemibold>
              <View style={tw`flex-col gap-5 mt-3 bg-white p-4 rounded-xl`}>
                <PoppinText style={tw`text-[#5547D7] text-[13px]`}>
                  Credit Card generally means a plastic card issued by Scheduled
                  Commercial Banks assigned to a Cardholder.
                </PoppinText>
                <View style={tw`flex-col gap-2`}>
                  <PoppinText style={tw`text-[#6B6B6B]`}>Card Type</PoppinText>
                  <FormInput
                    placeholder="Classic"
                    value={cardType}
                    onChangeText={setCardType}
                  />
                </View>
                <View style={tw`flex-col gap-2`}>
                  <PoppinText style={tw`text-[#6B6B6B]`}>
                    Name On Card
                  </PoppinText>
                  <FormInput
                    placeholder="My card"
                    value={nameOnCard}
                    onChangeText={setNameOnCard}
                  />
                </View>
                <View style={tw`flex-col gap-2`}>
                  <PoppinText style={tw`text-[#6B6B6B]`}>
                    Card Number
                  </PoppinText>
                  <FormInput
                    placeholder="**** **** **** ****"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                  />
                </View>
                <CustomButton
                  title="Add Card"
                  customStyles="bg-[#5547D7] w-full"
                  customText="text-[#fff]"
                />
              </View>
              <View>
                <PoppinsSemibold style={tw`text-[#002159] text-base py-7 pb-2`}>
                  Advances Card settings
                </PoppinsSemibold>
                <View style={tw`flex-col gap-5 mt-3 bg-white p-4 rounded-xl`}>
                  <TouchableOpacity
                    style={tw`flex-row items-center gap-4`}
                    onPressIn={() => router.push('/report')}
                  >
                    <View style={tw`bg-[#FFF5D9] p-3 rounded-xl`}>
                      <FontAwesome
                        name="credit-card-alt"
                        size={24}
                        color="#FFBB38"
                      />
                    </View>
                    <View>
                      <PoppinText style={tw`text-[#6B6B6B] text-[16px]`}>
                        Block Card
                      </PoppinText>
                      <PoppinText style={tw`text-[#5547D7]`}>
                        Instantly block your card
                      </PoppinText>
                    </View>
                  </TouchableOpacity>
                </View>
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
