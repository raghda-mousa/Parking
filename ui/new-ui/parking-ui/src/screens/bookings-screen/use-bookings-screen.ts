import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAxios, useUser } from '../../hooks'
import { GET_QR_CODE_ENDPOINT, PARKING_BASE_ENDPOINT } from "../../core";
import { Alert } from "react-native";
import styles from "./style";

const useBookingsScreen = () => {
    const classes = styles();
    const navigation = useNavigation();
    const route: any = useRoute();
    const selectedParking = route.params?.selectedParking;
    const { getApiRequest } = useAxios();
    const { getUserToken } = useUser();
    const [selectedParkings, setSelectedParking] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [isLinkOpened, setIsLinkOpened] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getApiRequest(`${PARKING_BASE_ENDPOINT}/${selectedParking.id}`);
                if (response)
                    setBookingData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedParking]);



    const handleCancelPress = () => {
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Home' }],
        // });
    };


    const handleButtonPress = async () => {
        if (qrCode && !isLinkOpened) {
            const reservationResponse = await getApiRequest(GET_QR_CODE_ENDPOINT);
            // const reservationResponse = await axios.get('http://127.0.0.1:3000/v1/qrCode/', {
            //     // parkingId: selectedParking.id,
            // }, {
            //     headers: {
            //         Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUnIiLCJlbWFpbCI6IlJyMUBnbWFpbC5jb20iLCJ0eXBlIjoiVVNFUiIsImlkIjoiNjVhYmI2Y2MxN2I4MmI3MmMwMWNlN2JkIiwiaWF0IjoxNzA2NDUzNzg4fQ.tpTzzv3EAsIcOIZvtFubNOUYKfW7DMrg49aFtO2vjAs',
            //     },
            // });

            if (reservationResponse && reservationResponse.data.success) {
                const newQrCodeValue = reservationResponse.data.data.qrcode;
                setQrCode(newQrCodeValue);
                setIsLinkOpened(true);
                console.log('New QR Code:', newQrCodeValue);
                // setTimeout(() => {
                //     navigation.reset({
                //         index: 0,
                //         routes: [{ name: 'Home' }],
                //     });
                // }, 60000);
            } else {
                Alert.alert('Error', 'Failed to update QR Code. Please try again.');
            }
        } else {
            // handleConfirmPress();
        }
    };

    const handleConfirmPress = async () => {

    }

    return { classes, qrCode, selectedParking, handleButtonPress, handleConfirmPress, handleCancelPress, isLinkOpened }
}

export { useBookingsScreen }