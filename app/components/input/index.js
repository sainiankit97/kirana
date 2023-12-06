import React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';

const Input = ({
  label = '',
  placeholder = 'Please enter',
  onChangeText = () => {},
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default Input;
