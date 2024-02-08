import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MAIN_SCREEN, SIGNIN_SCREEN, SIGNUP_SCREEN, HOME_SCREEN, BOOKINGS_SCREEN, PROFILE_SCREEN, OWNER_SCREEN } from '../constants'
import { MainScreen, HomeScreen, SigninScreen, SignupScreen, BookingsScreen, ProfileScreen, OwnerScreen } from '../../screens'
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={MAIN_SCREEN} component={MainScreen} />
                <Stack.Screen name={SIGNIN_SCREEN} component={SigninScreen} />
                <Stack.Screen name={SIGNUP_SCREEN} component={SignupScreen} />
                <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
                <Stack.Screen name={BOOKINGS_SCREEN} component={BookingsScreen} />
                <Stack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
                <Stack.Screen name={OWNER_SCREEN} component={OwnerScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export { AppNavigator };