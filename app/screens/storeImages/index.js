import React, {useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import database from '@react-native-firebase/database';
import styles from './styles';
import ArrowLeft from '../../assets/arrowLeft.png';
import Button from '../../components/button';
import ImageCropPicker from 'react-native-image-crop-picker';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import Spinner from '../../components/spinner';

const StoreImages = ({route, navigation}) => {
  const [storeImages, setStoreImages] = useState([]);
  const [imagesToDisplay, setImagesToDisplay] = useState([]);
  const {storeId} = route.params;
  const [showSpinner, setShowSpinner] = useState(false);

  const getDownloadURLs = async files => {
    const storage = firebase.storage();
    try {
      const downloadURLs = await Promise.all(
        files.map(async filePath => {
          const ref = storage.ref(filePath);
          const url = await ref.getDownloadURL();
          return url;
        }),
      );
      return downloadURLs;
    } catch (error) {
      console.error('Error fetching download URLs:', error);
      throw error;
    }
  };

  useEffect(() => {
    setShowSpinner(true);
    const onValueChange = database()
      .ref(`/store_visits/${storeId}`)
      .on('value', snapshot => {
        const info = snapshot.val();
        if (info?.images) {
          getDownloadURLs(info?.images).then(urls => {
            setImagesToDisplay(urls);
          });
          setStoreImages(info?.images);
        }
      });
    setShowSpinner(false);
    return () =>
      database().ref(`/store_visits/${storeId}`).off('value', onValueChange);
  }, []);

  const updateToDB = path => {
    database()
      .ref(`/store_visits/${storeId}`)
      .update({
        visitTime: new Date().toISOString(),
        images: [...storeImages, path],
      })
      .then(() => {
        setShowSpinner(false);
      });
  };

  const uploadPhoto = async base64 => {
    setShowSpinner(true);
    const fileName = `${storeId}_${storeImages.length + 1}`;
    firebase
      .storage()
      .ref(`/store_photos/${fileName}.jpg`)
      .putString(base64, 'base64')
      .on('state_changed', snapshot => {
        if (snapshot.metadata.fullPath) {
          updateToDB(snapshot.metadata.fullPath);
        }
      });
  };

  const captureDocument = async () => {
    await ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.2,
    })
      .then(async image => {
        uploadPhoto(image.data);
      })
      .catch(err => {
        console.log('camera error', err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.leftContainer}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={ArrowLeft} style={styles.arrowLeft} />
          </Pressable>
          <Text style={styles.headingText}>Images</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Button text="Capture" onPress={captureDocument} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          numColumns={3}
          contentContainerStyle={styles.scrollContainerStyle}>
          {imagesToDisplay.map((image, index) => {
            return (
              <Image
                key={index}
                source={{uri: image}}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            );
          })}
        </ScrollView>
      </View>
      <Spinner visible={showSpinner} />
    </View>
  );
};

export default StoreImages;
