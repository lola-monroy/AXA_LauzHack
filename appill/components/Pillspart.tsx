import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import * as Animatable from 'react-native-animatable'; // Import Animatable
import * as ImagePicker from 'expo-image-picker';
import styles from '../assets/styles'; // Import the styles

const PillsPart = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigation = useNavigation();

  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Permissions are required to access the camera roll!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while picking the image. Please try again.');
    }
  };

  const handleGoBack = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#00008F" />
      </TouchableOpacity>
      <Text style={styles.title}>Pill controller</Text>
      <Text style={styles.subtitle}>Are you taking the right pills? Check it!</Text>
      <Animatable.View animation="fadeInUp" duration={1000} style={styles.backgroundSurface} />
      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleGoBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.buttonPrimary} onPress={handlePickImage}>
            <Icon name="cloud-upload-outline" size={24} color="#FFFFFF" style={styles.uploadIcon} />
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          <Animatable.View animation="fadeIn" delay={500}>
          <Image source={require('../assets/images/pillsvector.png') } style={styles.pillsVector} />
          </Animatable.View>
        </View>
      )}
    </View>
  );
};

export default PillsPart;