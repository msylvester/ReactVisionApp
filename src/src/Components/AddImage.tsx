import React, { useState } from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { setUser } from '../store';
import { useDispatch, useSelector } from 'react-redux';
// Initialize Firebase (Make sure you have already done this)
// firebase.initializeApp(firebaseConfig);
//need a reference to the project as well as reference to the user


const AddImage = () => {

  //make an api call 
  //on update we want to populate 
  const reference = storage().ref();
  // Function to handle image upload
  // add on firebase 
  const uploadImage = async () => {
    try {
      const options = {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true
      };
      const permissionResult = await launchImageLibrary();
      const { assets } = permissionResult;

      console.log(`permission result: ${JSON.stringify(assets[0].type)}`)
      if (assets[0]?.type !== 'image/jpg') {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }
      try {
        // Upload image to Firebase Storage
        const response = await fetch(assets[0].uri);
        const blob = await response.blob();;
        await reference.put(blob);
      } catch (e) {
        console.log(`here is the error ${e}`)
      }
      // Get the download URL of the uploaded image
      const downloadURL = await reference.getDownloadURL();

      // Set the image URL
      setImage(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {image ? (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text>No image selected</Text>
      )}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
};

export default AddImage;

