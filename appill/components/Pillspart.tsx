import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import * as ImagePicker from 'expo-image-picker';
import styles from '../assets/styles'; // Import the styles

const PillsPart = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pillCountLong, setPillCountLong] = useState<number | null>(null);
  const [pillCountLongTotal, setPillCountLongTotal] = useState<number | null>(null);
  const [pillCountRound, setPillCountRoud] = useState<number | null>(null);
  const [pillCountRoundTotal, setPillCountRoudTotal] = useState<number | null>(null);
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

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        console.log("Image url: " + imageUri);
        handleCountPills(imageUri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while picking the image. Please try again.');
    }
  };

  const handleCountPills = async (imageUri: string) => {
    try {
      const response = await fetch('http://127.0.0.1:3000/countpills',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageUri }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Pill count:', result.total_num_long);
        setPillCountLong(result.num_long);
        setPillCountLongTotal(result.total_num_long);
        setPillCountRoud(result.num_round);
        setPillCountRoudTotal(result.total_num_round);
        return result;
      } else {
        Alert.alert('Error', result.error || 'An error occurred while counting the pills.');
      }
    } catch (error) {
      console.error('Error counting pills:', error);
      Alert.alert('Error', 'An error occurred while counting the pills. Please try again.');
    }
  };

  const handleGoBack = () => {
    setSelectedImage(null);
    setPillCountLong(null);
    setPillCountLongTotal(null);
    setPillCountRoud(null);
    setPillCountRoudTotal(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#00008F" />
      </TouchableOpacity>
      <Text style={styles.title}>Pill controller</Text>
      <Text style={styles.subtitle}>Are you taking the right pills? Check it!</Text>
      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          {pillCountLong !== null && pillCountLongTotal !== null &&(
            <Text style={styles.pillCountText}> You have to take {pillCountLong} long pills, out of {pillCountLongTotal}.</Text>
          )}
          {pillCountRound !== null && pillCountRoundTotal !== null &&(
            <Text style={styles.pillCountText}> You have to take {pillCountRound} round pills, out of {pillCountRoundTotal}.</Text>
          )}
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
          <Image source={require('../assets/images/pillsvector.png')} style={styles.pillsVector} />
        </View>
      )}
    </View>
  );
};

export default PillsPart;