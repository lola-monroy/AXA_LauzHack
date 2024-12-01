import React, { useEffect, useState } from 'react';
import { View, Text, useWindowDimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../assets/styles'; // Import the styles

const PressureGraph = () => {
  const { width, height } = useWindowDimensions();
  const chartHeight = height * 0.4; // 40% of the window height
  const navigation = useNavigation();

    const [data, setData] = useState<{ systolic: number[] }>({
        systolic: [],
    });

  const fetchData = () => {
    fetch('http://127.0.0.1:5000/smartwatch')
      .then((response) => response.json())
      .then((json) => {
        setData((prevData) => {
            const newSystolic = [...prevData.systolic];
            // Ensure the array has at least 5 elements
            while (newSystolic.length < 5) {
              newSystolic.push(0);
            }
            // Assign the blood_pressure value to the 5th position
            newSystolic.push(json.blood_pressure);
            if (newSystolic.length > 5) {
              // Remove the first element if the array has more than 5 elements
              newSystolic.shift();
            }
  
            return {
              systolic: newSystolic,
            };
          });
        console.log(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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
          labels: ['-25', '-20', '-15', '-10', '-5', '0', '+5', '+10', '+15', '+20', '+25'], // Months
          datasets: [
            {
              data: data.systolic.concat([64,64,64,64,64]),
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red color for systolic pressure
              strokeWidth: 4, // optional
            }
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
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16, // Replace with your custom font name
          },
          propsForDots: {
            r: '5',
            strokeWidth: '5',
          },
          propsForLabels: {
            fontSize: 14, // Adjust font size for x-axis labels
            fontWeight: 'bold', // Make x-axis labels bold
            fill: '#00008F', // Change color of x-axis labels
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