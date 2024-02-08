import { useEffect, useState } from "react";
import styles from "./style"
import { useAxios, useUser } from "../../hooks";
import { GET_USER_ENDPOINT } from "../../core";

const useProfileScreen = () => {
    const classes = styles();
    const [userData, setUserData] = useState<any>(null);
    const backgroundImage = require('../../assets/images/myaccount.jpeg');
    const { getApiRequest } = useAxios();
    const { getUserId } = useUser();
    // state management Redux, recoil -- beta version 
    // console.log({ user })
    const fetchUserData = async () => {
        try {
            const userId = await getUserId();
            console.log({ userId })
            const response = await getApiRequest(`${GET_USER_ENDPOINT}/${userId}`);
            if (response) {
                setUserData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);
    return { classes, userData, backgroundImage }
}

export { useProfileScreen }