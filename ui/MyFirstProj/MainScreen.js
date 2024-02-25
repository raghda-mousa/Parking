import React from 'react'; 
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation();
  const Signin = () => {
    navigation.navigate('SigninPage');
  };
  const SignupPage = () => {
    navigation.navigate('Signuppage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello!</Text>
      </View>
      <Image style={styles.backgroundImage} source={require('./assets/signin.jpeg')} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonSignin} onPress={Signin}>
          <Text style={styles.buttonTextSignin}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSignup} onPress={SignupPage}>
          <Text style={styles.buttonTextSignup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:55,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 2, 
  },
  headerText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#2D245C',
    marginTop: 20,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 550,
  },
  buttonSignin: {
    backgroundColor: '#2D245C',
    padding: 11,
    borderRadius: 25,
    width: 380,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonSignup: {
    backgroundColor: 'white',
    padding: 11,
    borderRadius: 25,
    width: 380,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextSignin: {
    color: 'white',
    fontSize: 20,
  },
  buttonTextSignup: {
    color: '#180E4B',
    fontSize: 20,
  },
});

export default LoginPage;
