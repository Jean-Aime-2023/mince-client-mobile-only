import { Dimensions, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { LineChart } from 'react-native-chart-kit';
import { PoppinsSemibold } from '../StyledText';

export default function Line() {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={tw`items-center`}>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={screenWidth * 0.9}
        height={220}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: '#F5F7FA',
          backgroundGradientTo: '#F5F7FA',
          decimalPlaces: 2,
          color: (opacity = 1) => `#1814F3`,  // Line color for the graph
          labelColor: (opacity = 1) => `#000`,  // Label color for x and y axis
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            stroke: '#DFE5EE',  // Set the background grid lines color
            strokeDasharray: '',  // Makes the background grid solid
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#1814F3',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
