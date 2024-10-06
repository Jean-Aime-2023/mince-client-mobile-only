import {
    Animated,
    LayoutChangeEvent,
    Pressable,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React, { useRef, useState } from 'react';
  
  export type TabButtonType = {
    title: string;
  };
  
  type TabButtonProps = {
    buttons: TabButtonType[];
    selectedTab: number;
    setSelectedTab: (index: number) => void;
  };
  
  const TabButtons = ({ buttons, selectedTab, setSelectedTab }: TabButtonProps) => {
    const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
    const buttonWidth = dimensions.width / buttons.length;
    const tabPositionX = useRef(new Animated.Value(0)).current;
  
    const onTabbarLayout = (e: LayoutChangeEvent) => {
      setDimensions({
        height: e.nativeEvent.layout.height,
        width: e.nativeEvent.layout.width,
      });
    };
  
    const handlePress = (index: number) => {
      setSelectedTab(index);
      Animated.timing(tabPositionX, {
        toValue: buttonWidth * index,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  
    const animatedStyle = {
      transform: [{ translateX: tabPositionX }],
    };
  
    return (
      <View
        accessibilityRole="tabbar"
        style={{
          backgroundColor: '#c33cc',
          borderRadius: 20,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={[
            animatedStyle,
            {
              position: 'absolute',
              backgroundColor: '#fff',
              borderRadius: 15,
              marginHorizontal: 5,
              height: dimensions.height - 10,
              width: buttonWidth - 10,
            },
          ]}
        />
        <View onLayout={onTabbarLayout} style={{ flexDirection: 'row' }}>
          {buttons.map((button, index) => {
            const color = selectedTab === index ? '#c33cc' : '#fff';
            return (
              <Pressable
                key={index}
                style={{ flex: 1, paddingVertical: 20 }}
                onPress={() => handlePress(index)}
              >
                <Text
                  style={{
                    color: color,
                    alignSelf: 'center',
                    fontWeight: '600',
                    fontSize: 14,
                  }}
                >
                  {button.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };
  
  export default TabButtons;
  