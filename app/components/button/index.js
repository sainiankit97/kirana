import React from 'react';
import {Pressable, Text} from 'react-native';
import styles from './styles';

const Button = ({text = '', onPress = () => {}}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default Button;
