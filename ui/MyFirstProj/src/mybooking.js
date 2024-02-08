import React, { useState, useEffect, } from 'react';
import { Text, Alert, View, TouchableOpacity, StyleSheet, SafeAreaView, Pressable, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAxios, { get } from './hooks/use-axios'
import QRCode from 'react-native-qrcode-svg';
import { WebView } from 'react-native-webview';
import ArrowBackIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 
import backgroundImage from '../assets/booking.jpeg';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        marginTop: 55,
        resizeMode: 'cover',
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
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 1,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
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
        // marginTop: 10,
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
        margin: 45,
        fontSize: 20,
        fontWeight: 'bold',
    },
    name: {
        alignItems: 'center',
        margin: 45,
        fontSize: 25,
        fontWeight: 'bold',
    },
    price: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 50,
        fontSize: 25,
        fontWeight: 'bold',
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
        marginTop: '135%'
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
        borderWidth:1,
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
        backgroundColor: '#4CAF50',
    },
    buttonTextConfirm: {
        color: 'white',
        fontSize: 20,
    },
    qrCodeContainer: {
        alignItems: 'center',
    }
});

function MyBooking({ route }) {
    const navigation = useNavigation();
    const [showPaymentPage, setShowPaymentPage] = useState(false);
    const { selectedParking } = route.params || {};
    const { get } = useAxios()
    const [webViewVisible, setWebViewVisible] = useState(false);
    const [selectedParkings, setSelectedParking] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [hasBooking, setHasBooking] = useState(false); // Add state to track if there is a booking
    const [isLinkOpened, setIsLinkOpened] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log({ url: `v1/parking/${selectedParking.id}` })
                const response = await get(`v1/parking/${selectedParking.id}`);
                setHasBooking(true); // Set hasBooking to true when data is fetched
                setBookingData(response.data);
            } catch (error) {
                console.log({ error })
                console.error('Error fetching data:', error);
                setHasBooking(false); // Set hasBooking to false if there's an error fetching data
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
                    console.log('New QR Code:', newQrCodeValue);

                    const token = await AsyncStorage.getItem('token');
                    const updateParkingResponse = await axios.put(
                        `http://127.0.0.1:3000/v1/parking/slot/${selectedParking.id}`,
                        {
                            numberOfSlots: bookingData.data.numberOfSlots
                        },
                        {
                            headers: {
                                Authorization: token,
                            },
                        }
                    );

                    if (updateParkingResponse.data.success) {
                        console.log('Parking slots updated successfully.');
                    } else {
                        console.error('Failed to update parking slots.');
                    }

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

    const handleButtonPress = () => {
        setIsLinkOpened(true);
    };
    const onWebViewClose = () => {
        setIsLinkOpened(false);
    };
    console.log({ selectedParking })

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={[styles.Booking, { position: 'relative' }]}>
            {selectedParking ? (
                <>
                    <Text style={styles.name}>Parking Name: {selectedParking.name}{selectedParking.title}</Text>

                    <Text style={styles.price}>Price: {selectedParking.chargePerMinute}{selectedParking.parkingPrice}</Text>
                    {qrCode && (
                        <View style={styles.qrCodeContainer}>
                            <QRCode
                                value={qrCode}
                                size={370}
                                color="black"
                                backgroundColor="white"
                            />
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
                    {qrCode && !isLinkOpened && (
                        <View style={styles.qrCodeContainer}>
                            <QRCode
                                value={qrCode}
                                size={370}
                                color="black"
                                backgroundColor="white"
                            />
                        </View>
                    )}
                </>
            ) : (
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


