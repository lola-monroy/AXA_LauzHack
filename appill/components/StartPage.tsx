import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/Fontisto';
import * as Animatable from 'react-native-animatable';
import styles from '../assets/styles'; // Import the styles

const StartPage = () => {
  const [isPressed, setIsPressed] = useState({ pressure: false, pill: false });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to <Text style={styles.highlight}>appill</Text> 👋
      </Text>
      <Text style={styles.subtitle}>
        How can we help you?
      </Text>
      <View style={styles.buttonContainer}>
        <Animatable.View animation="fadeInUp" delay={500}>
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
        <Animatable.View animation="fadeInUp" delay={1000}>
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

export default StartPage;