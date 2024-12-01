import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PressureGraph from './PressureGraph'; // Import the PressureGraph component
import styles from '../assets/styles'; // Import the styles

const PressurePage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pressure Stats</Text>
      <Text style={styles.subtitle}>Track your pressure over time</Text>
      <PressureGraph />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          The graph above shows your pressure readings over the past hours. In red, the prediction for the next hours.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PressurePage;