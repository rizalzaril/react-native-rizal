import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import ImageEditor from '@react-native-community/image-editor';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from '../../css/style'; // Make sure this path is correct
import ContentImage from '../content';
import ActionButton from '../actionButton';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import ImageCropPicker from 'react-native-image-crop-picker';
import AddProducts from './addProducts';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faStar} from '@fortawesome/free-regular-svg-icons';
import {faOldRepublic} from '@fortawesome/free-brands-svg-icons';
import BiometricPopup from './biometric';

const Account = ({navigation, rating}) => {
  const [imageUri, setImageUri] = useState(null);
  const [editedImageUri, setEditedImageUri] = useState(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      cropping: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('User cancelled image selection');
      } else if (response.errorCode) {
        Alert.alert(
          'Image Picker Error',
          response.errorMessage || 'Unknown error',
        );
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        console.log('Selected Image URI: ', uri); // Debugging
        setImageUri(uri);
        setEditedImageUri(null); // Reset edited image
      }
    });
  };

  // const openCamera = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     includeBase64: true,
  //     maxHeight: 200,
  //     maxWidth: 200,
  //     cropping: true,
  //   };

  //   launchCamera(options, response => {
  //     if (response.didCancel) {
  //       Alert.alert('User cancelled camera');
  //     } else if (response.errorCode) {
  //       Alert.alert('Camera Error', response.errorMessage || 'Unknown error');
  //     } else if (response.assets && response.assets.length > 0) {
  //       const uri = response.assets[0].uri;
  //       console.log('Captured Image URI: ', uri); // Debugging
  //       setImageUri(uri);
  //       setEditedImageUri(null); // Reset edited image
  //     }
  //   });
  // };

  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(image => {
        console.log('Captured Image URI: ', image.path); // Debugging
        setImageUri(image.path);
        setEditedImageUri(null); // Reset edited image
      })
      .catch(error => {
        console.log('Camera Error:', error);
        // Handle error, if any
      });
  };

  const editImage = async () => {
    if (imageUri) {
      try {
        // Get the dimensions of the original image
        const imageSize = await new Promise((resolve, reject) => {
          RNFS.readFile(imageUri, 'base64').then(data => {
            const image = new Image();
            image.onload = () => {
              resolve({width: image.width, height: image.height});
            };
            image.onerror = reject;
            image.src = `data:image/jpeg;base64,${data}`;
          });
        });

        // Calculate crop dimensions based on the original image size
        const cropWidth = Math.min(imageSize.width, 200);
        const cropHeight = Math.min(imageSize.height, 200);
        const cropData = {
          offset: {x: 0, y: 0},
          size: {width: cropWidth, height: cropHeight},
          displaySize: {width: cropWidth, height: cropHeight},
          resizeMode: 'contain',
        };

        const editedImage = await ImageEditor.cropImage(imageUri, cropData);
        setEditedImageUri(editedImage);
        Alert.alert('Image edited successfully');
      } catch (error) {
        Alert.alert('Error editing image', error.message);
        console.error('Error editing image: ', error); // Debugging
      }
    } else {
      Alert.alert('No image selected');
    }
  };

  const handleButton = screen => {
    navigation.navigate(screen);
  };

  // UI CONTENT
  const text = 'Profile';
  const textLength = text.length;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginHorizontal: 34, marginTop: 12}}>
          <Text
            style={{
              fontSize: 30,
              color: 'black',
              borderColor: 'black',
              paddingBottom: 5,
            }}>
            {text}
          </Text>
          <View
            style={{height: 1.5, width: 100, backgroundColor: 'black'}}></View>
        </View>

        <View style={{flexDirection: 'row', padding: 34, gap: 12}}>
          <Image
            source={{uri: 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg'}}
            style={{width: 100, height: 100, borderRadius: 100 / 2}}
          />

          <View>
            <Text
              style={{
                marginTop: 8,
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
              }}>
              Jonathan Patterson
            </Text>
            <View style={{flexDirection: 'row', marginTop: 2, gap: 0}}>
              <Text style={{color: 'orange', marginRight: 4}}>5.0</Text>
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  style={{color: 'orange'}}
                  icon={faStar}
                />
              ))}
            </View>
            <Text style={{color: 'black', fontWeight: 300}}>Refferal Code</Text>
          </View>
        </View>

        {/* <Button title="Select Image from Gallery" onPress={selectImage} />
        <Button title="Take Photo with Camera" onPress={openCamera} />
        {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
        {imageUri && <Button title="Edit Image" onPress={editImage} />}
        {editedImageUri && (
          <Image source={{uri: editedImageUri}} style={styles.image} />
        )} */}

        <AddProducts />
      </ScrollView>
    </View>
  );
};

export default Account;
