import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import SecondScreen from './SecondScreen';
import SecScreen from './secScreen';
import Signuppage from './Signuppage';
import SigninPage from './SigninPage';
import ParkingDetailScreen from './ParkingDetailScreen';
import OwnerScreen from './OwnerScreen';
import { AppRegistry } from 'react-native';

// AppRegistry.registerComponent('MyFirstProj', () => App);


const Stack = createStackNavigator();
const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="SecondScreen" component={SecondScreen} />
      <Stack.Screen name="SecScreen" component={SecScreen} />
      <Stack.Screen name="SigninPage" component={SigninPage} />
      <Stack.Screen name="Signuppage" component={Signuppage} />
      <Stack.Screen name="OwnerScreen" component={OwnerScreen} />
      <Stack.Screen name="ParkingDetailScreen" component={ParkingDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default App;