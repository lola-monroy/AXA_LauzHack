import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PillsPart() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permissions are required to access the camera roll!');
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
  };

  const handleGoBack = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {!selectedImage && (
        <>
          <TouchableOpacity style={styles.button} onPress={handlePickImage}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          <Image source={require('../assets/images/pillsvector.png')} style={[styles.pillsVector, { width: 350, height: 350 }]} />
        </>
      )}
      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00008f', 
    paddingVertical: 19, 
    paddingHorizontal: 35, 
    borderRadius: 10, 
    borderColor: '#ff1721',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, 
  },
  buttonText: {
    color: '#fff', 
    fontSize: 25, 
    fontWeight: 'medium',
    fontFamily: 'sans-serif', 
  },
  pillsVector: {
    marginTop: 0, 
    width: 100,
    height: 100,
  },
  imagePreview: {
    marginTop: 20,
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  goBackButton: {
    marginTop: 20,
    backgroundColor: '#ff1721',
    paddingVertical: 19, 
    paddingHorizontal: 35, 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 25, 
    fontWeight: 'medium',
    fontFamily: 'sans-serif',
  },
});