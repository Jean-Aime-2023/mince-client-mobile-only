import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';

type FormInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={tw`border-2 h-[53px] text-[13px] text-[#6B6B6B] border-[#CECACE] w-full py-1 px-3 focus:border-[#CECACE] rounded-[10px]`}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6B6B6B"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    padding: 5,
    color: '#6B6B6B',
    fontFamily: 'PoppinsMain',
  },
});
