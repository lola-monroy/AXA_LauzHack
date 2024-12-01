import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../assets/styles'; // Import the styles

const PressureGraph = () => {
  const { width, height } = useWindowDimensions();
  const chartHeight = height * 0.4; // 40% of the window height

  return (
    <View style={styles.graphContainer}>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'red' }]} />
          <Text style={styles.legendText}>Systolic Pressure</Text>
        </View>
      </View>
      <LineChart
        data={{
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], // Months
          datasets: [
            {
              data: [
                Math.random() * 40 + 100, // Systolic pressure values
                Math.random() * 40 + 100,
                Math.random() * 40 + 100,
                Math.random() * 40 + 100,
                Math.random() * 40 + 100,
                Math.random() * 40 + 100,
                Math.random() * 40 + 100,
                Math.random() * 40 + 100,
                Math.random() * 40 + 100,
                Math.random() * 40 + 100,
                Math.random() * 40 + 100,
                Math.random() * 40 + 100,
              ],
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red color for systolic pressure
              strokeWidth: 2, // optional
            },
          ],
        }}
        width={width - 40} // Adjust width to be responsive
        height={chartHeight} // Set height as a percentage of window height
        yAxisLabel=""
        yAxisSuffix="psi"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
          propsForDots: {
            r: '2',
            strokeWidth: '2', // Add stroke color
          },
          propsForLabels: {
            fontSize: 12, // Adjust font size for x-axis labels
            fontWeight: 'bold', // Make x-axis labels bold
            fill: '#00008F', // Change color of x-axis labels
            fontFamily: 'Montserrat', // Change font family of x-axis labels
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginHorizontal: 20, // Add margin to the sides
        }}
      />
    </View>
  );
};

export default PressureGraph;