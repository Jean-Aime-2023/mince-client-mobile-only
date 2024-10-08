import { ScrollView, StyleSheet, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PoppinText } from '@/components/StyledText';
import { Radio } from '@/components';
import CustomButton from '@/components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import Header from '@/components/Header';

export default function Report() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [body, setBody] = useState('');

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }
    checkAvailability();
  }, []);

  const sendMail = async () => {
    if (!body) {
      alert('No issue or subject added');
      return;
    }

    await MailComposer.composeAsync({
      subject: 'Reporting issue',
      body: body,
      recipients: ['mugabejeanaime96@gmail.com'],
    });
  };

  return (
    <>
      <Header title="Report" />
      <SafeAreaView style={[styles.container]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView style={tw`px-3`}>
            <View style={tw`bg-white rounded-xl p-6 px-4 text-sm text-black mb-4`}>
              <PoppinText style={tw`text-[#6B6B6B] text-[14px]`}>
                How would you describe the privacy issue you met or that occurred
              </PoppinText>
              <View style={tw`flex flex-col gap-6 bg-transparent py-4`}>
                <Radio
                  options={[
                    { label: 'Card Withdrawal', value: 'Card Withdrawal' },
                    { label: 'I don’t know what happened', value: 'I don’t know what happened' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  checkedValue={body}
                  onChange={setBody}
                  style={{ marginBottom: 15 }}
                />
              </View>
              <PoppinText style={tw`text-[#6B6B6B] text-[14px] pb-3`}>
                If your answer was Others. Please explain in details
              </PoppinText>
              <TextInput
                style={[
                  {
                    height: 100,
                    color: '#27272a',
                    borderRadius: 10,
                    textAlignVertical: 'top',
                  },
                  tw`p-4 text-[14px] border-2 border-gray-300`,
                ]}
                placeholder="Please explain in brief"
                placeholderTextColor="#d1d5db"
                multiline={true}
                numberOfLines={8}
                value={body}
                onChangeText={setBody}
              />
              <View style={[{ alignSelf: 'flex-end' }, tw`bg-transparent`]}>
                <CustomButton
                  title={'Submit'}
                  customStyles="bg-[#5547D7] my-6 w-[130px] text-[15px]"
                  customText="text-white"
                  handlePress={sendMail}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F7FA',
    flex: 1,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#374151',
    height: 100,
    color: '#fff',
    borderRadius: 10,
    textAlignVertical: 'top',
  },
});
