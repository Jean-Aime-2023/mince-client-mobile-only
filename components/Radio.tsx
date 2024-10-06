import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { PoppinText } from './StyledText'
import { MaterialIcons } from '@expo/vector-icons'
import tw from 'twrnc'

const Radio = ({options,checkedValue,onChange,style}:any) => {
  return (
    <View style={[styles.container,style]}>
      {options.map((option:any)=>{
        let active = checkedValue == option.value;
        return (
            <Pressable style={active ? [styles.radio,styles.activeRadio] : [styles.radio,tw`border-2 border-gray-300`]} onPress={()=>{
                onChange(option.value)
            }}
            key={option.value} 
            >
                <MaterialIcons
                 name={active ? "radio-button-checked" : "radio-button-unchecked"}
                 size={24}
                 color={active ? "#fff" : "#d1d5db"}
                />
                <PoppinText style={active ? [styles.text,styles.activeText] : styles.text}>{option.label}</PoppinText>
            </Pressable>
        )
      })}
    </View>
  )
}

export default Radio

const styles = StyleSheet.create({
    container:{
        width:"100%"
    },
    radio:{
        height:60,
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        marginBottom:10,
        backgroundColor:"transparent",
        paddingHorizontal:15,
        borderRadius:15,
    },
    activeRadio:{
        backgroundColor:"#5547D7",
    },
    text:{
        fontSize:14,
        marginLeft:15,
        color:"#6B6B6B"
    },
    activeText:{
        color:"#fff"
    }
})