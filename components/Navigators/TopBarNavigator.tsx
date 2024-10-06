import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function TopBarNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tab1" component={Tab1Component} />
        <Tab.Screen name="Tab2" component={Tab2Component} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Tab1Component = () => (
  <View style={styles.scene}>
    <Text>Tab 1 Content</Text>
  </View>
);

const Tab2Component = () => (
  <View style={styles.scene}>
    <Text>Tab 2 Content</Text>
  </View>
);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
