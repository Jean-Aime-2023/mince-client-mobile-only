import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PoppinsSemibold, PoppinText } from '@/components/StyledText';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const boxData = [
  {
    icon: <MaterialIcons name="attach-money" size={24} color="#FFBB38" />,
    bgICon: '#FFF5D9',
    title: 'Balance',
    amount: '$12,750',
  },
  {
    icon: <FontAwesome6 name="money-bill-trend-up" size={24} color="#5547D7" />,
    bgICon: '#E7EDFF',
    title: 'Income',
    amount: '$5,600',
  },
  {
    icon: <MaterialIcons name="money-off" size={24} color="#FF82AC" />,
    bgICon: '#FFE0EB',
    title: 'Expense',
    amount: '$3,460',
  },
  {
    icon: <FontAwesome5 name="piggy-bank" size={24} color="#16DBCC" />,
    bgICon: '#DCFAF8',
    title: 'Saving',
    amount: '$7,920',
  },
];
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
const transactionStyles = [
  { iconColor: '#FFBB38', bgColor: '#FFF5D9' },
  { iconColor: '#396AFF', bgColor: '#E7EDFF' },
  { iconColor: '#16DBCC', bgColor: '#DCFAF8' },
];
export default function activities() {
  return (
    <>
      <Header title="My Transactions" />
      <SafeAreaView style={[styles.container, tw`h-full`]}>
        <ScrollView style={tw`px-4`}>
          <View style={tw`flex-row items-center flex-wrap gap-5`}>
            {boxData.map((data, index) => (
              <View
                key={index}
                style={tw`bg-white rounded-xl p-2 py-4 flex-row items-center gap-3 w-[150px] text-sm`}
              >
                <View
                  style={[
                    tw`p-2 bg-[#FFF5D9] rounded-full`,
                    { backgroundColor: data.bgICon },
                  ]}
                >
                  {data.icon}
                </View>
                <View style={tw`flex-col`}>
                  <PoppinText style={tw`text-[#5547D7]`}>
                    {data.title}
                  </PoppinText>
                  <PoppinsSemibold style={tw`text-[#6B6B6B]`}>
                    {data.amount}
                  </PoppinsSemibold>
                </View>
              </View>
            ))}
          </View>
          <View style={tw`flex-col gap-3 mt-8`}>
          <PoppinsSemibold style={tw`text-[#002159] text-lg`}>
                Recent Transactions
              </PoppinsSemibold>
            <View style={tw`bg-white mb-5 rounded-xl px-4`}>
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
