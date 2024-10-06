import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import tw from 'twrnc';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const TabIconHome = ({ color, focused }: any) => {
  return (
    <View
      style={[
        tw`items-center justify-center gap-2 p-2 rounded-full ${
          focused ? 'bg-[#fff]' : 'bg-transparent'
        }`,
      ]}
    >
      <Entypo name="home" size={24} color={color} />
    </View>
  );
};
const TabIconWallet = ({ color, focused }: any) => {
  return (
    <View
      style={[
        tw`items-center justify-center gap-2 p-2 rounded-full ${
          focused ? 'text-[#5547D7]' : 'text-[#6B6B6B]'
        }`,
      ]}
    >
      <Entypo name="wallet" size={24} color={color} />
    </View>
  );
};
const TabIconReport = ({ color, focused }: any) => {
  return (
    <View
      style={[
        tw`items-center justify-center gap-2 p-2 rounded-full ${
          focused ? 'text-[#5547D7]' : 'text-[#6B6B6B]'
        }`,
      ]}
    >
      <MaterialIcons name="report" size={24} color={color} />
    </View>
  );
};
const TabIconActivities = ({ color, focused }: any) => {
  return (
    <View
      style={[
        tw`items-center justify-center gap-2 p-2 rounded-full ${
          focused ? 'text-[#5547D7]' : 'text-[#6B6B6B]'
        }`,
      ]}
    >
      <AntDesign name="bars" size={24} color={color} />
    </View>
  );
};
const TabIconProfile = ({ color, focused }: any) => {
  return (
    <View
      style={[
        tw`items-center justify-center gap-2 p-2 rounded-full ${
          focused ? 'text-[#5547D7]' : 'text-[#6B6B6B]'
        }`,
      ]}
    >
      <FontAwesome name="user" size={24} color={color} />
    </View>
  );
};

const _layout = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeAllListeners();
    };
  }, [darkMode]);
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#5547D7',
          tabBarInactiveTintColor: '#6B6B6B',
          tabBarStyle: {
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            textTransform: 'capitalize',
            elevation: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIconHome color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIconWallet color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIconReport color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="activities"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIconActivities color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIconProfile color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="transparent" style="dark" />
    </>
  );
};

export default _layout;
