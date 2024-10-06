import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TabButtons, { TabButtonType } from './TabButtons';

export enum CustomTab {
  Tab1,
  Tab2,
}

const TabScreen = () => {
  const [selectedTab, setSelectedTab] = useState<CustomTab>(CustomTab.Tab1);
  const buttons: TabButtonType[] = [{ title: 'Tab1' }, { title: 'Tab2' }];
  return (
    <>
      <TabButtons
        buttons={buttons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <View style={{ flex: 1, marginTop: 20, alignItems: 'center' }}>
        {selectedTab === CustomTab.Tab1 ? (
          <Text style={styles.tabTxt}>Tab 1 Content</Text>
        ) : (
          <Text style={styles.tabTxt}>Tab 2 Content</Text>
        )}
      </View>
    </>
  );
};

export default TabScreen;

const styles = StyleSheet.create({
  tabTxt: {
    fontSize: 22,
  },
});
