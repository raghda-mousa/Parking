import React, { useState, useEffect, Component } from 'react';
import { Text, Platform, TextInput, Alert, Button, View, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import useAxios from './src/hooks/use-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import backgroundImage from './assets/myaccount.jpeg';
import MapViewDirections from 'react-native-maps-directions';
import Main from './MainScreen';
import { MyBooking } from './src/mybooking';

import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2D245C',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonUnderQR: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2D245C',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    borderWidth: 1,
    borderColor: 'gray'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchResultsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  searchResultContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchResultDetails: {
    fontSize: 14,
    color: '#666',
  },
  dropdownContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 50,
    borderColor: 'gray',
    borderWidth: 1,
  },
  searchbox: {
    marginTop: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fff',
    elevation: 2,
    // borderRadius: 50,
    // borderColor: 'gray',
    // borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 20,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  searchButton: {
    padding: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageContainer: {
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 200,
  },
  Text: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 30,
    marginLeft: 20,
    color: '#2D245F',
  },
  imageText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Booking: {
    // backgroundColor:'#adaa',
    alignItems: 'center',
    margin: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  Booking2: {
    alignItems: 'center',
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  Booking3: {

    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  home: {
    // flexDirection:'row',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.8,
    height: 45,
    margin: 20,
    backgroundColor: '#adaa'
  },
  tinyLogo: {
    width: 200,
    height: 300,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 443,
  },
  buttonConfirm: {
    backgroundColor: '#2D245C',
    padding: 11,
    borderRadius: 25,
    width: 380,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonCancel: {
    backgroundColor: 'white',
    padding: 11,
    borderRadius: 25,
    width: 380,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextConfirm: {
    color: 'white',
    fontSize: 20,
  },
  buttonTextCancel: {
    color: '#180E4B',
    fontSize: 20,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrCodeValue: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonConfirm: {
    backgroundColor: '#2D245C',
    padding: 11,
    borderRadius: 25,
    width: 380,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonConfirmed: {
    backgroundColor: '#4CAF50', // لون الخلفية عندما يكون الحجز مؤكد
  },
  buttonTextConfirm: {
    color: 'white',
    fontSize: 20,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
  }
});

function HomeScreen() {
  const [name, setName] = useState('');
  const [selectedParking, setSelectedParking] = useState(null);
  const [matchingParkings, setMatchingParkings] = useState([]);
  const navigation = useNavigation();
  const { patch, get } = useAxios();
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedParkingData, setSelectedParkingData] = useState(null);
  const [directions, setDirections] = useState(null);
  const [direction, getDirections] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [selectedParkingCoordinate, setSelectedParkingCoordinate] = useState(null); // 1. Add state to store selected parking coordinate
  const [activeBookingQR, setActiveBookingQR] = useState('');

  const searchForParking = async () => {
    const response = await patch('v1/parking/parkings/search', { name });
    const data = response?.data;
    setMatchingParkings(data);

    let anyParkingAvailable = false;

    if (data.length > 0) {
      for (matchingParkings of data) {
        // Check if the number of slots is greater than zero for each parking
        if (matchingParkings.numberOfSlots > 0) {
          anyParkingAvailable = true;
          setSelectedParking(matchingParkings); 
          setSelectedParkingCoordinate({
            latitude: matchingParkings.location.coordinates[0],
            longitude: matchingParkings.location.coordinates[1],
          });
          navigation.navigate('MyBooking', {
            selectedParking: matchingParkings,
            parkingName: matchingParkings.name,
            parkingPrice: matchingParkings.chargePerMinute,
          });
        }
      }

      // If no parking with available slots is found
      if (!anyParkingAvailable) {
        Alert.alert('Info', 'All matching parkings are full. Please choose another parking.');
      }
    } else {
      setMatchingParkings([]);
      Alert.alert('Info', 'No matching parkings found. Please try another search term.');
    }
  };

  const handleSearchResultPress = (item) => {
    if (item.numberOfSlots > 0) {
      setSelectedParkingCoordinate({
        latitude: item.location.coordinates[0],
        longitude: item.location.coordinates[1],
      });
      setSelectedParking(item);

      // رسم الطريق بين موقع المستخدم وموقف السيارة
      setDirections({
        origin: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        destination: {
          latitude: item.location.coordinates[0],
          longitude: item.location.coordinates[1],
        },
      });

      navigation.navigate('MyBooking', { selectedParking: item });
    } else {
      Alert.alert('Info', 'This parking is full. Please choose another parking.');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (name.trim() !== '') {
        searchForParking();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [name]);

  useEffect(() => {
    if (userLocation && selectedParkingCoordinate) {
      setRouteCoordinates([
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        selectedParkingCoordinate,
      ]);
    }
  }, [userLocation, selectedParkingCoordinate]);


  const getNearbyParkings = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const parkings = await patch('v1/nearestParkingService', {
        location: {
          lat: location.coords.latitude,
          long: location.coords.longitude,
        },
        distance: 3000
      });
      const temp = parkings?.data?.map(p => ({
        id: p._id,
        title: p.name,
        chargePerMinute: p.chargePerMinute,
        coordinate: {
          latitude: p.location.coordinates[0],
          longitude: p.location.coordinates[1],
        },
        color: p.color,
      }));

      setMarkers(temp);
      console.log({ parkings: temp });
    } catch (error) {
      console.error('Error during getNearbyParkings:', error);
    }
    
  };


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      getNearbyParkings();
    })();
  }, []);

  const handleMapPress = (e) => {
    if (userLocation) {
      setRouteCoordinates([
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        e.nativeEvent.coordinate,
      ]);
    }
  };

  const handleClearPress = () => {
    setMatchingParkings([]);
    setName('');
    setRouteCoordinates([]); // Clear route coordinates
    setSelectedParking(null); // Clear selected parking
    setSelectedParkingCoordinate(null); // Clear selected parking coordinate
  };

  const fetchParkingData = async (marker) => {
    try {
      const response = await get('v1/parking/${marker.id}');
      setSelectedParkingData(response?.data);
    } catch (error) {
      console.error('Error fetching parking data:', error);
    }
  };
  const handleMarkerPress = async (marker) => {
    if (marker.color === 'green') {
      setSelectedParking(marker);
      setSelectedParkingCoordinate(marker.coordinate);
      await fetchParkingData(marker);
      setSelectedMarker(marker);
      setRouteCoordinates([]);

      try {
        const response = getDirections({
          origin: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
          destination: {
            latitude: marker.coordinate.latitude,
            longitude: marker.coordinate.longitude,
          },
        });
        setRouteCoordinates(response?.routes[0]?.geometry?.coordinates);
        console.log({ response })
        setDirections(response?.routes[0]?.geometry?.coordinates);
      } catch (error) {
        console.error('Error fetching directions:', error);
      }

      navigation.navigate('MyBooking', {
        selectedParking: marker,
        parkingName: marker.title,
        parkingPrice: marker.chargePerMinute,
      });
    } else {
      console.log("Marker color is red. Do something else.");
    }
  };

  useEffect(() => {
    getNearbyParkings();
  }, []);

  return (
    <View>
      <View style={styles.box}>
        <View style={styles.searchbox}>
          <TextInput
            style={{ flex: 1, height: 40, fontSize: 20, marginRight: 8, paddingHorizontal: 8 }}
            placeholder='Search'
            autoCapitalize='none'
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TouchableOpacity style={{ padding: 10 }} onPress={searchForParking}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }} onPress={handleClearPress}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {matchingParkings.length > 0 && (
          <View >
            <FlatList
              data={matchingParkings}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchResultContainer}
                  onPress={() => handleSearchResultPress(item)}
                >
                  <Text style={styles.searchResultText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
        )}
      </View>
      <View style={styles.map}>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: userLocation ? userLocation.latitude : 0,
            longitude: userLocation ? userLocation.longitude : 0,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation
          followUserLocation
          showsMyLocationButton
          showsCompass
          zoomEnabled
          onPress={handleMapPress}
        >
          {markers.map(marker => (
            <Marker
              key={marker.id}
              title={marker.title}
              coordinate={marker.coordinate}
              pinColor={marker.color}
              onPress={() => handleMarkerPress(marker)}
            />
          ))}
          <MapViewDirections
            origin={userLocation}
            destination={selectedMarker ? selectedMarker.coordinate : null}
            apikey={'AIzaSyByabDfHg6gqiT16_DdkGB-BU_CItX-IRY'}
            strokeWidth={4}
            strokeColor="blue"
          />
          <MapViewDirections
            origin={userLocation}
            destination={directions ? directions.destination : null}
            apikey={'AIzaSyByabDfHg6gqiT16_DdkGB-BU_CItX-IRY'}
            strokeWidth={4}
            strokeColor="blue"
          />
        </MapView>
      </View>
    </View>
  );
}

const UserDataScreen = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  // const user = useRecoilValue(userState);
  // const { get } = useAxios();
  const { get } = useAxios();
  // state management Redux, recoil -- beta version 
  // console.log({ user })
  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      console.log({ userId })
      const response = await get(`v1/users/${userId}`);
      if (response !== null) {
        setUserData(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const handleLogout = async () => {
    //await AsyncStorage.removeItem('id');
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // <-- Indicates the position in the route stack
        routes: [{ name: 'Main' }], // <-- Main should be the name of your screen component as defined in your stack navigator
      })
    );
  };
  if (!userData) {
    return <View />;
  }

  console.log({ userData });

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={{ flex: 1, justifyContent: 'start', alignContent: 'center', marginTop: 65 }}>
        <Text style={styles.Text}>Name: {userData.name}</Text>
        <Text style={styles.Text}>Email: {userData.email}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  const Stack = createStackNavigator();
  const [userId, setUserId] = useState(null);
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      /> 
     
      <Tab.Screen name="MyBooking"
        component={MyBooking}
        options={{
          tabBarLabel: 'My Booking',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen name="My Account" component={UserDataScreen}
        
        
        options={{
          tabBarLabel: 'My Account',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-people-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="He">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="Home" component={UserDataScreen} />
           
            <Stack.Screen name="Details" component={Main} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App({ userId }) {
  return (
    <NavigationContainer independent={true}>
      <MyTabs />
    </NavigationContainer>
  );
}