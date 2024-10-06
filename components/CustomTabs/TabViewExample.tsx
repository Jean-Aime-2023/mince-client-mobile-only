import * as React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

// First tab content
const FirstRoute = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>This is the First Tab</Text>
  </View>
);

// Second tab content
const SecondRoute = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>This is the Second Tab</Text>
  </View>
);

// Mapping scenes to routes
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

// Styles for the scene and text
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Ensure a visible background
  },
  text: {
    fontSize: 24, // Increased font size for better visibility
    fontWeight: 'bold',
    color: '#000000', // Black text color for contrast
  },
});
