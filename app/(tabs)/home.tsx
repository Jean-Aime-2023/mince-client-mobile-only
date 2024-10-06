import { View, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import img1 from '@/assets/images/Tecno pattern.png';
import tw from 'twrnc';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { PoppinsSemibold, PoppinText } from '@/components/StyledText';
import Linechart from '@/components/charts/Line';

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
];

export default function home() {
  return (
    <>
      <Header title="Overview" />
      <SafeAreaView style={[styles.container, tw`h-full`]}>
        <ScrollView>
          <View
            style={tw`w-full flex-col`}
          >
            <View>
              <PoppinsSemibold style={tw`text-[#002159] pt-4 px-4 text-lg`}>
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
                {transactions.map((transaction, index) => (
                  <View
                    key={index}
                    style={tw`flex-row items-center py-3 justify-between`}
                  >
                    <View style={tw`flex-row gap-3`}>
                      <View
                        style={tw`bg-[#E7EDFF] p-3 justify-center rounded-full`}
                      >
                        <FontAwesome5
                          name="money-bill-wave"
                          size={24}
                          color="#5547D7"
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
                ))}
              </View>
              <View style={tw`p-4`}>
                <PoppinsSemibold style={tw`text-[#002159] text-lg mb-2 py-3`}>
                  Expense chart
                </PoppinsSemibold>
                <Linechart />
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
