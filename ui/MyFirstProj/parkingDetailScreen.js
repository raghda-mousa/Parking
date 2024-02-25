import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StyleSheet,TouchableOpacity } from 'react-native';
import useAxios from './src/hooks/use-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backgroundImage from './assets/Parking.gif';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    hedear: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#180E4B',
        backgroundColor: 'grey',
        marginTop: 0,
        borderRadius: 35,
        overflow: 'hidden',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#180E4B',
        marginBottom: 10,
    },
    buttonParking: {
        backgroundColor: 'grey',
        padding: 10,
        marginTop: 10,
        borderRadius: 25,
        width: 380,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextParking: {
        color: '#180E4B',
        fontSize: 30,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        padding: 10,
        zIndex: 1,
    },
});

const ParkingDetailScreen = () => {
    const [userData, setUserData] = useState(null);
    const [userParkings, setUserParkings] = useState([]);
    const { get } = useAxios();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem('id');
                console.log('User ID:', userId);


                const userResponse = await get(`v1/users/${userId}`);
                if (userResponse.data.data) {
                    const user = userResponse.data.data;
                    setUserData(user);
              
                    const parkingsResponse = await get(`v1/parking/list`);

                    const parkingsData = parkingsResponse.data.data;
                    if (parkingsData && Array.isArray(parkingsData.docs)) {
                        const parkings = parkingsData.docs;
                        const userParkings = parkings.filter(parking => parking.userId === userId);
                        setUserParkings(userParkings);
                    } else {
                        console.error('Parkings data is not in expected format:', parkingsData);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);
    const goToOwnerScreen = (parkingId) => {
        navigation.navigate('OwnerScreen', { parkingId });
    };


    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SigninPage')}>
                    <ArrowBackIcon name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.hedear}> Hi {userData?.name}!</Text>
                    {userParkings.length > 0 && (
                        <View>
                            <Text style={styles.text}>Your Parkings:</Text>
                            {userParkings.map(parking => (
                                <TouchableOpacity
                                    style={styles.buttonParking}
                                    key={parking.id}
                                    title={parking.name}
                                    onPress={() => goToOwnerScreen(parking.id)}>
                                    <View>
                                        <Text style={styles.buttonTextParking}>
                                            {parking.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                </View>
            </ImageBackground>
        </View>
    );
};


export default ParkingDetailScreen;