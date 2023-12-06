import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import styles from './styles';
import Logo from '../../assets/logo.png';
import Input from '../../components/input';
import Button from '../../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const users = {
  user1: {
    password: 'retailpulse',
    userId: 'f9ceb8a8-8d11-4ac2-ba8c-8771613ab2a5',
  },
  user2: {
    password: 'retailpulse',
    userId: 'db4f73b6-5f22-4ca0-bcdb-0ad15749c46e',
  },
};

const Login = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const getUser = async () => {
    const loggedUser = await AsyncStorage.getItem('user');
    if (loggedUser) {
      const userDetails = JSON.parse(loggedUser);
      if (userDetails.userId) {
        navigation.navigate('Stores', {userId: userDetails.userId});
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const handleLogin = () => {
    if (!users[userName]) {
      setError('Invalid user name');
      return;
    }
    const user = users[userName];
    if (user.password !== password) {
      setError('Invalid password');
      return;
    }
    setError('');
    const userLoggedIn = {
      userName,
      userId: user.userId,
    };
    AsyncStorage.setItem('user', JSON.stringify(userLoggedIn));
    navigation.navigate('Stores', {userId: user.userId});
  };
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Login</Text>
        <Input label="User Name" onChangeText={setUserName} />
        <Input
          label="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <Button text="Login" onPress={handleLogin} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    </View>
  );
};

export default Login;
