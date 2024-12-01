import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import PressureGraph from './PressureGraph'; // Import the PressureGraph component
import styles from '../assets/styles'; // Import the styles
import React from 'react';

const PressurePage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#00008F" />
      </TouchableOpacity>
      <Text style={styles.title}>Pressure Stats</Text>
      <Text style={styles.subtitle}>Track your pressure over time</Text>
      <PressureGraph />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Past seconds measure and prediction for the next hours.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PressurePage;