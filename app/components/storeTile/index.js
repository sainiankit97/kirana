import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from './styles';

const StoreTile = ({storeInfo, storeId, navigation}) => {
  const handleNavigation = () => {
    navigation.navigate('StoresImages', {storeId});
  };
  if (!storeInfo) {
    return null;
  }
  return (
    <Pressable style={styles.tileContainer} onPress={handleNavigation}>
      <View style={styles.nameContainer}>
        <Text style={styles.storeName}>{storeInfo?.name}</Text>
        <Text style={styles.storeType}>{storeInfo?.type}</Text>
      </View>
      <Text style={styles.storeAddress}>{storeInfo?.address}</Text>
    </Pressable>
  );
};

export default StoreTile;
