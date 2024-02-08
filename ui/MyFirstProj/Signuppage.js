import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import backgroundImage from './assets/signin1.jpg';
import useAxios from './src/hooks/use-axios';

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

      if (response?.success) {
        const userId = response.data._id;
        Alert.alert('Registration successful! Hello ' + name);
        navigation.navigate('SecondScreen');
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
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <FontAwesomeIcon name="user" size={20} color="grey" style={styles.icon} />
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
          <FontAwesomeIcon name="envelope" size={20} color="grey" style={styles.icon} />
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
          <FontAwesomeIcon name="lock" size={20} color="grey" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
            placeholderTextColor="grey"
          />
        </View>

        <Button style={styles.signupContainer}  title="Sign Up" onPress={handleSubmit} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    marginTop:55,
    resizeMode: 'cover',
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
});

export default Signuppage;
