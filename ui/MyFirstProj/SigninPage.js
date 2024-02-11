import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import backgroundImage from './assets/signin1.jpg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAxios from './src/hooks/use-axios';


// import { useRecoilState } from 'recoil';
// import { userState } from './src/store';

export default function SigninPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('Rr1@gmail.com');
  // const [user, setUser] = useRecoilState(userState);
  const [password, setPassword] = useState('1234');
  const [userData, setUserData] = useState(null);
  const { get } = useAxios();

  const handleForgotPassword = () => {
    // Your forgot password logic
  };
  const fetchUserData = async () => {
    try {

      const response = await axios.get(`v1/users/${userId}`);
      if (response !== null) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }

    try {
      const apiUrl = 'http://127.0.0.1:3000/v1/auth/login';
      const response = await axios.post(apiUrl, {
        email,
        password,
      });

      console.log('Response:', response.data);
      // useEffect(() => {
      //   fetchUserData();
      // }, [])
      if (response.data.success) {
        // Alert.alert('Signin successful');
        await AsyncStorage.setItem('id', response.data.data.id.toString());
        await AsyncStorage.setItem('token', response.data.data.token.toString())
        // setUser({ id: response.data.id, name: response.data.name, email: response.data.email, token: response.data.token, type: response.data.type })
        if (response.data.data.type == 'OWNER') {
          navigation.navigate('ParkingDetailScreen');
        } else {
          navigation.navigate('SecondScreen');
        }
      } else {
        Alert.alert('Your email or password is incorrect');
      }
    } catch (error) {
      console.error('Axios Error:', error);

      if (error.response) {
        console.error('Server Response:', error.response.data);
      }

      Alert.alert('Error fetching data. Please try again.');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" size={20} color="black" style={styles.icon} />
          <TextInput
            autoCapitalize='none'
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock-outline" size={20} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>
        <Button title="Sign In" onPress={handleSignIn} />
        <Button title="Forgot Password?" onPress={handleForgotPassword} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    marginTop: 55,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#2D245C',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: 380,
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  icon: {
    marginRight: 10,
  },
});






