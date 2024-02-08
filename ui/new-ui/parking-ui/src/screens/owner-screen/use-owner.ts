import { useEffect, useState } from "react";
import styles from "./style";
import { useAxios, useUser } from "../../hooks";
import { GET_USER_ENDPOINT } from "../../core";

const useOwnerScreen = () => {
    const classes = styles();
    const [userData, setUserData] = useState<any>(null);
    const { getApiRequest } = useAxios();
    const { getUserId } = useUser()
    const backgroundImage = require('../../assets/images/Parking.gif');
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = getUserId();
                console.log('User ID:', userId);

                // Fetch user data from backend
                const userResponse = await getApiRequest(`${GET_USER_ENDPOINT}/${userId}`);
                if (userResponse && userResponse.data.data) {
                    const user = userResponse.data.data;

                    // Set user data to state
                    setUserData(user);

                    // Assuming the parking ID is stored in user's data
                    // const parkingId = user.parkingId;

                    // Fetch parking data from MongoDB
                    // const parkingResponse = await get(`v1/parking/${parkingId}`);
                    // if (parkingResponse?.data?.data) {
                    //     const parking = parkingResponse.data.data;

                    // Merge parking data into user data in state
                    // setUserData((prevUserData) => ({ ...prevUserData }));
                    // }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return { classes, backgroundImage, userData }
}

export { useOwnerScreen }