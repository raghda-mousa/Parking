import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import ArrowBackIcon from 'react-native-vector-icons/MaterialIcons';
import useAxios from './src/hooks/use-axios';
import backgroundImage from './assets/parking.jpeg';
import { useNavigation } from '@react-navigation/native';


const OwnerScreen = ({ route }) => {
    const [parkingData, setParkingData] = useState(null);
    const { parkingId } = route.params; 
    const navigation = useNavigation();
    const { get } = useAxios();

    
    useEffect(() => {
        const fetchParkingData = async () => {
            try {
                const parkingResponse = await get(`v1/parking/${parkingId}`);
                if (parkingResponse.data.data) {
                    const parking = parkingResponse.data.data;
                    setParkingData(parking);
                } else {
                    console.error('Error fetching parking data:', parkingResponse.data);
                }
            } catch (error) {
                console.error('Error fetching parking data:', error);
            }
        };
        fetchParkingData();
    }, [parkingId]);

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate('ParkingDetailScreen')}
                    >
                        <ArrowBackIcon name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                    {parkingData && (
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Parking Name: {parkingData.name}</Text>
                            <Text style={styles.text}>City: {parkingData.city}</Text>
                            <Text style={styles.text}>number Of empty slot: {parkingData.numberOfSlots}</Text>

                        </View>
                    )}
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        marginBottom: 450,
        marginLeft: 230
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 50,
        marginBottom: 10,
        paddingTop: 0
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default OwnerScreen;
