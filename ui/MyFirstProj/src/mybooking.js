import React, { useState, useEffect, } from 'react';
import { Text, Alert, View, TouchableOpacity, StyleSheet, Pressable, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAxios from './hooks/use-axios'
import { WebView } from 'react-native-webview';
import ArrowBackIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import backgroundImage from '../assets/booking.jpeg';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        marginTop: 55,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
        zIndex: 1,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
    },
    Booking: {
        alignItems: 'center',
        margin: 35,
        fontSize: 20,
        fontWeight: 'bold',
    },
    name: {
        alignItems: 'center',
        margin: 40,
        fontSize: 25,
        width:300,
        fontWeight: 'bold',
    },
    price: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
        fontSize: 25,
        fontWeight: 'bold',
    },
    text: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 1,
        width: 370,
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
    paybox: {
        alignItems: 'center',
        width: 350,
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: 'white',
    },
    pay: {
        color: 'blue',
        alignItems: 'center',
        width: 350,
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: 'white',
    },
    Booking3: {
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 40,
        paddingLeft: 0,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100%'
    },
    buttonConfirm: {
        backgroundColor: 'blue',
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
        borderColor: 'grey',
        borderWidth: 2,
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

    },
    cancelContainer: {
        margin: 30,
    }
});

function MyBooking({ route }) {
    const navigation = useNavigation();
    const [showPaymentPage, setShowPaymentPage] = useState(false);
    const { selectedParking } = route.params || {};
    const { get } = useAxios()
    const [bookingData, setBookingData] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [hasBooking, setHasBooking] = useState(false); 
    const [isLinkOpened, setIsLinkOpened] = useState(false);
    const [qrShown, setQrShown] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                console.log({ url: `v1/parking/${selectedParking.id}` })
                const response = await get(`v1/parking/${selectedParking.id}`);
                setHasBooking(true); 
                setBookingData(response.data);
            } catch (error) {
                console.log({ error })
                console.error('Error fetching data:', error);
                setHasBooking(false); 
            }
        };
        fetchData();
    }, [selectedParking]);
    const handleCancelPress = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    const renderBackButton = () => (
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
                setShowPaymentPage(false);
                Alert.alert('Payment Successful', 'The payment process has been completed successfully.');
            }}
        >
            <ArrowBackIcon name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
    );

    const handleConfirmPress = async () => {
        setShowPaymentPage(true);

        if (!isLinkOpened) {
            try {
                const token = await AsyncStorage.getItem('token');
                const reservationResponse = await axios.post(
                    `http://127.0.0.1:3000/v1/reservation`,
                    {
                        parkingId: selectedParking.id,
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                if (reservationResponse.data.success) {
                    const newQrCodeValue = reservationResponse.data.data.qrcode;
                    setQrCode(newQrCodeValue);
                    setQrShown(true);

                    setTimeout(() => {
                        setQrShown(false);
                    }, 24 * 60 * 60 * 1000);
                } else {
                    Alert.alert('Error', 'Reservation failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during reservation:', error);
                Alert.alert('Error', 'An error occurred during reservation. Please try again.');
            }
            setIsLinkOpened(true);
        }
    };

    const onWebViewClose = () => {
        setIsLinkOpened(false);
    };
    console.log({ selectedParking })

    const renderCancelButton = () => (
        <TouchableOpacity
            style={styles.buttonCancel}
            onPress={handleCancelPress}
        >
            <Text style={styles.buttonTextCancel}> Cancel</Text>
        </TouchableOpacity>
    );
    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={[styles.Booking, { position: 'relative' }]}>
                {selectedParking ? (
                    <>
                        <Text style={styles.name}>Parking Name: {selectedParking.name}{selectedParking.title}</Text>

                        <Text style={styles.price}>Price: {selectedParking.chargePerMinute}{selectedParking.parkingPrice}</Text>
                        <Text style={styles.paybox}>This is the account you will pay</Text>
                            <Text style={styles.pay}>'sb-zbksr29406709@ business.example.com'</Text>
                        {qrShown && qrCode && (
                            <View style={styles.qrCodeContainer}>
                                <Text style={styles.text}>Please use this code to enter and exit the parking</Text>
                                <Image style={{ width: 370, height: 370 }} source={{ uri: qrCode }} />
                                <View style={styles.cancelContainer}>
                                    {renderCancelButton()}
                                </View>
                            </View>
                        )}
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={styles.buttonConfirm}
                                onPress={handleConfirmPress}
                            >
                                <Text style={styles.buttonTextConfirm}> Confirm</Text>
                            </Pressable>

                            <TouchableOpacity
                                style={styles.buttonCancel}
                                onPress={handleCancelPress}
                            >
                                <Text style={styles.buttonTextCancel}> Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) :(
                    <Text style={styles.Booking3}>Embark on your journey to the homepage and reserving your parking!</Text>
                )}
                {showPaymentPage &&
                    <View style={{ position: 'absolute', top: 20, left: -46, right: 10, zIndex: 99999, flex: 1, backgroundColor: 'red', borderWidth: 1, borderColor: 'Green', width: 450, height: 900 }}>
                        {renderBackButton()}
                        <WebView
                            style={{ flex: 1 }}
                            source={{ uri: 'https://www.sandbox.paypal.com/signin' }}
                            onClose={onWebViewClose}
                        />
                    </View>
                }
            </View>
        </ImageBackground>
    );
}


export { MyBooking }


