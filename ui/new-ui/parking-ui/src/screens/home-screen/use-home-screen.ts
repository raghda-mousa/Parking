import { useEffect, useState } from "react";
import styles from "./style"
import { useNavigation } from "@react-navigation/native";
import { useAxios } from "../../hooks";
import { BOOKINGS_SCREEN, SEARCH_PARKINGS_ENDPOINT } from "../../core/constants";
import { Alert } from "react-native";
import { EMARKER_COLOR } from "../../core";

const useHomeScreen = () => {
    const classes = styles();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedParking, setSelectedParking] = useState(null);
    const [matchedParkings, setMatchedParkings] = useState([]);
    // const [selectedParking, setSelectedParking] = useState(null);
    const navigation = useNavigation();
    const { patchApiRequest, getApiRequest } = useAxios();
    const [markers, setMarkers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedParkingData, setSelectedParkingData] = useState(null);
    const [directions, setDirections] = useState(null);
    const [direction, getDirections] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    const searchForParking = async () => {
        try {
            const response = await patchApiRequest(SEARCH_PARKINGS_ENDPOINT, { searchTerm });
            if (response) {
                const data = response.data;
                setMatchedParkings(data);

                let anyParkingAvailable = false;

                if (data.length > 0) {
                    // for (matchedParkings of data) {
                    //     // Check if the number of slots is greater than zero for each parking
                    //     if (matchedParkings.numberOfSlots > 0) {
                    //         anyParkingAvailable = true;
                    //         navigation.navigate('MyBooking', {
                    //             selectedParking: matchedParkings,
                    //             parkingName: matchedParkings.name,
                    //             parkingPrice: matchedParkings.chargePerMinute,
                    //         });
                    //     }
                    // }

                    // If no parking with available slots is found
                    if (!anyParkingAvailable) {
                        Alert.alert('Info', 'All matching parkings are full. Please choose another parking.');
                    }
                } else {
                    setMatchedParkings([]);
                    Alert.alert('Info', 'No matching parkings found. Please try another search term.');
                }
            }
            else {
                setMatchedParkings([]);
                Alert.alert('Info', 'No matching parkings found. Please try another search term.');
            }
        } catch (error: any) {
            console.log("Error occured wihile fetching parkings with search term ", searchTerm)
        }
    };




    const getNearbyParkings = async () => {
        try {
            // const { status } = await Location.requestForegroundPermissionsAsync();
            // if (status !== 'granted') {
            //     console.error('Permission to access location was denied');
            //     return;
            // }

            // const location = await Location.getCurrentPositionAsync({});

            // setUserLocation({
            //     latitude: location.coords.latitude,
            //     longitude: location.coords.longitude,
            // });

            // const parkings = await patch('v1/nearestParkingService', {
            //     location: {
            //         lat: location.coords.latitude,
            //         long: location.coords.longitude,
            //     },
            //     distance: 10000
            // });
            // const temp = parkings.data.map(p => ({
            //     id: p._id,
            //     title: p.name,
            //     chargePerMinute: p.chargePerMinute,
            //     coordinate: {
            //         latitude: p.location.coordinates[0],
            //         longitude: p.location.coordinates[1],
            //     },
            //     color: p.color,
            // }));

            // setMarkers(temp);
            // console.log({ parkings: temp });
        } catch (error) {
            console.error('Error during getNearbyParkings:', error);
        }
    };
    useEffect(() => {
        // (async () => {
        //     const { status } = await Location.requestForegroundPermissionsAsync();
        //     if (status !== 'granted') {
        //         console.error('Permission to access location was denied');
        //         return;
        //     }

        //     const location = await Location.getCurrentPositionAsync({});
        //     setUserLocation({
        //         latitude: location.coords.latitude,
        //         longitude: location.coords.longitude,
        //     });

        //     getNearbyParkings();
        // })();
    }, []);

    const handleMapPress = (e: any) => {
        // if (userLocation) {
        //     setRouteCoordinates([
        //         { latitude: userLocation.latitude, longitude: userLocation.longitude },
        //         e.nativeEvent.coordinate,
        //     ]);
        // }
    };

    const handleClearPress = () => {

        setMatchedParkings([]);
        setSearchTerm('');
    };

    const fetchParkingData = async (marker: any) => {
        try {
            const response = await getApiRequest('v1/parking/${marker.id}');
            if (response)
                setSelectedParkingData(response.data);
        } catch (error) {
            console.error('Error fetching parking data:', error);
        }
    };
    const handleMarkerPress = async (marker: any) => {
        if (marker.color === EMARKER_COLOR.GREEN) {
            setSelectedParking(marker);
            await fetchParkingData(marker);
            setSelectedMarker(marker);
            setRouteCoordinates([]);

            try {
                // const response = getDirections({
                //     origin: {
                //         latitude: userLocation.latitude,
                //         longitude: userLocation.longitude,
                //     },
                //     destination: {
                //         latitude: marker.coordinate.latitude,
                //         longitude: marker.coordinate.longitude,
                //     },
                // });

                // setDirections(response.routes[0].geometry.coordinates);
            } catch (error) {
                console.error('Error fetching directions:', error);
            }

            // navigation.navigate('MyBooking', {
            //     selectedParking: marker,
            //     parkingName: marker.title,
            //     parkingPrice: marker.chargePerMinute,
            // });
        } else {
            console.log("Marker color is red. Do something else.");
        }
    };



    const handleSearchResultPress = (item: any) => {

        if (item.numberOfSlots > 0) {
            setSelectedParking(item);
            // @ts-ignore
            navigation.navigate(BOOKINGS_SCREEN, { selectedParking: item });
        } else {
            Alert.alert('Info', 'This parking is full. Please choose another parking.');
        }
    };

    useEffect(() => {
        getNearbyParkings();
    }, []);

    return { classes, searchTerm, setSearchTerm, searchForParking, matchedParkings, handleClearPress, handleSearchResultPress }
}

export { useHomeScreen }