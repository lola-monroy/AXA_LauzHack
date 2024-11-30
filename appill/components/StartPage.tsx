import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/Fontisto';
import * as Animatable from 'react-native-animatable';

const StartPage = () => {
  const [isPressed, setIsPressed] = useState({ pressure: false, pill: false });

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Welcome to <Text style={styles.highlight}>appill</Text> 👋
      </Animatable.Text>
      <Animatable.Text animation="fadeInDown" delay={500} style={styles.subtitle}>
        How can we help you?
      </Animatable.Text>
      <View style={styles.buttonContainer}>
        <Animatable.View animation="bounceIn" delay={1000}>
          <TouchableOpacity
            style={[
              styles.buttonPrimary,
              isPressed.pressure && styles.buttonPressed,
            ]}
            onPressIn={() => setIsPressed({ ...isPressed, pressure: true })}
            onPressOut={() => setIsPressed({ ...isPressed, pressure: false })}
          >
            <Icon
              name="graph"
              size={50}
              color={isPressed.pressure ? '#FFFFFF' : '#00008F'}
              style={styles.icon}
            />
            <Text
              style={[
                styles.buttonText,
                isPressed.pressure && styles.buttonTextPressed,
              ]}
            >
              Pressure stats
            </Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1500}>
          <TouchableOpacity
            style={[
              styles.buttonPrimary,
              isPressed.pill && styles.buttonPressed,
            ]}
            onPressIn={() => setIsPressed({ ...isPressed, pill: true })}
            onPressOut={() => setIsPressed({ ...isPressed, pill: false })}
          >
            <Icon1
              name="pills"
              size={50}
              color={isPressed.pill ? '#FFFFFF' : '#00008F'}
              style={styles.icon}
            />
            <Text
              style={[
                styles.buttonText,
                isPressed.pill && styles.buttonTextPressed,
              ]}
            >
              Pill controller
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  highlight: {
    color: '#d24723', // Highlight color
  },
  subtitle: {
    fontSize: 20,
    color: '#666666',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'column', // Display buttons vertically
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimary: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background color
    borderColor: '#00008F', // Blue border color
    borderWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginVertical: 15, // Add space between buttons
    width: 250, // Fixed width for buttons
    height: 150, // Fixed height for buttons
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 5 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow radius
    elevation: 5, // Elevation for Android
  },
  buttonPressed: {
    backgroundColor: '#00008F', // Blue background color when pressed
  },
  icon: {
    marginBottom: 10, // Add space between icon and text
  },
  buttonText: {
    fontSize: 18,
    color: '#00008F', // Blue text color
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
  },
  buttonTextPressed: {
    color: '#FFFFFF', // White text color when pressed
  },
});

export default StartPage;