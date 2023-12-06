import React from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';
import styles from './styles';

const Spinner = ({visible}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/spinner.gif')}
          style={styles.spinnerGif}
        />
      </View>
    </Modal>
  );
};

export default Spinner;
