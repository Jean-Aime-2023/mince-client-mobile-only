import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import img1 from '@/assets/images/Tecno pattern.png';
import tw from 'twrnc';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { PoppinsSemibold, PoppinText } from '@/components/StyledText';
import img2 from '@/assets/avatar/profile1.jpg';
import img3 from '@/assets/avatar/profile2.jpg';
import img4 from '@/assets/avatar/profile3.jpg';
import img5 from '@/assets/avatar/istockphoto-1146642361-612x612.jpg';
import Feather from '@expo/vector-icons/Feather';

const transactions = [
  {
    name: 'Jemi Wilson',
    date: '21 January 2021',
    amount: '-$50',
  },
  {
    name: 'John Doe',
    date: '22 January 2021',
    amount: '-$850',
  },
  {
    name: 'Jemi Aimr',
    date: '23 January 2021',
    amount: '-$150',
  },
  {
    name: 'John Doe',
    date: '22 January 2021',
    amount: '-$850',
  },
  {
    name: 'Jemi Aimr',
    date: '23 January 2021',
    amount: '-$150',
  },
];

const profiledata = [
  {
    img: img2,
    username: 'Livia',
    role: 'CEO',
  },
  {
    img: img3,
    username: 'Jack',
    role: 'Director',
  },
  {
    img: img4,
    username: 'John',
    role: 'CTO',
  },
  {
    img: img5,
    username: 'Ange',
    role: 'Friend',
  },
];

// Define styles for transaction items
const transactionStyles = [
  { iconColor: '#FFBB38', bgColor: '#FFF5D9' },
  { iconColor: '#396AFF', bgColor: '#E7EDFF' },
  { iconColor: '#16DBCC', bgColor: '#DCFAF8' },
];

export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (text: string) => {
    setInputValue(text);
  };

  return (
    <>
      <Header title="Overview" />
      <SafeAreaView style={[styles.container, tw`h-full`]}>
        <ScrollView>
          <View style={tw`w-full flex-col`}>
            <View>
              <PoppinsSemibold style={tw`text-[#002159] px-4 text-lg`}>
                My Cards
              </PoppinsSemibold>
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
                Recent Transactions
              </PoppinsSemibold>
              <View style={tw`bg-white rounded-xl px-4 mt-5`}>
                {transactions.map((transaction, index) => {
                  const { iconColor, bgColor } =
                    transactionStyles[index % transactionStyles.length]; // Cycle through styles
                  return (
                    <View
                      key={index}
                      style={[tw`flex-row items-center py-3 justify-between`]}
                    >
                      <View style={tw`flex-row gap-3`}>
                        <View
                          style={[
                            tw`p-3 justify-center rounded-full`,
                            { backgroundColor: bgColor },
                          ]}
                        >
                          <FontAwesome5
                            name="money-bill-wave"
                            size={24}
                            color={iconColor}
                          />
                        </View>
                        <View style={tw`flex-col`}>
                          <PoppinText style={tw`text-[#6B6B6B] text-[15px]`}>
                            {transaction.name}
                          </PoppinText>
                          <PoppinText style={tw`text-[#5547D7]`}>
                            {transaction.date}
                          </PoppinText>
                        </View>
                      </View>
                      <View>
                        <PoppinText style={tw`text-[#FF4B4A]`}>
                          {transaction.amount}
                        </PoppinText>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View>
                <PoppinsSemibold
                  style={tw`text-[#002159] text-lg mb-2 py-3 mt-6 pb-3`}
                >
                  Quick Transfer (with stripe 🤩)
                </PoppinsSemibold>
                <View style={tw`bg-white p-4 rounded-xl flex flex-col gap-5`}>
                  <View style={tw`flex-row gap-5 items-center justify-between py-2 px-3`}>
                    {profiledata.map((data, index) => (
                      <View key={index} style={tw`flex-col items-center`}>
                        <Image
                          source={data.img}
                          resizeMode="cover"
                          style={tw`rounded-full w-10 h-10`}
                        />
                        <PoppinText style={tw`text-xs`}>
                          {data.username}
                        </PoppinText>
                        <PoppinText style={tw`text-xs text-[#5547D7]`}>
                          {data.role}
                        </PoppinText>
                      </View>
                    ))}
                  </View>
                  <View style={tw`bg-gray-100 flex-row justify-between items-center rounded-full`}>
                    <TextInput
                      placeholder="Write the amount of money"
                      style={tw`px-3 py-2 rounded-full text-black`}
                      value={inputValue}
                      onChangeText={handleChange}
                    />
                    <TouchableOpacity
                      style={tw`rounded-full px-5 py-2 flex-row items-center gap-3 bg-[#5547D7]`}
                    >
                      <PoppinText style={tw`text-white`}>Send</PoppinText>
                      <Feather name="send" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
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
