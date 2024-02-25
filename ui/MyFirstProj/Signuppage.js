import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ImageBackground, TouchableOpacity } from 'react-native'; // استيراد Text
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import backgroundImage from './assets/signin1.jpg';
import useAxios from './src/hooks/use-axios';
import ArrowBackIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    marginTop: 55,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 30,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 25,
    height: 50,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
    zIndex: 1,
  },
});

const Signuppage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { post } = useAxios();

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }

    try {
      const response = await post('v1/users', {
        name,
        password,
        email,
      })
      console.log({ response })

      if (response?.success && response?.data) {
        Alert.alert('Registration successful! Hello ' + name); navigation.navigate('SecondScreen');
        await AsyncStorage.setItem('id', response.data.user.id.toString()); 
        await AsyncStorage.setItem('token', response.data.token.toString()); 
      } else {
        console.error('Unexpected response format:', response);
        Alert.alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Main')}>
        <ArrowBackIcon name="arrow-back" size={30} color='#2D245C' />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={20} color="grey" style={styles.icon} />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
            placeholderTextColor="grey"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={20} color="grey" style={styles.icon} />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor="grey"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={20} color="grey" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
            placeholderTextColor="grey"
          />
        </View>
        <Text>
          <Button title="Sign Up" onPress={handleSubmit} />
        </Text>
      </View>
    </ImageBackground>
  );
};


export default Signuppage;
