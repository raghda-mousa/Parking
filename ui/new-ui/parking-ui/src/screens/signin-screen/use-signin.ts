import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useAxios, useUser } from '../../hooks'

import styles from "./style"
import { GET_USER_ENDPOINT, HOME_SCREEN, LOGIN_ENDPOINT, OWNER_SCREEN } from "../../core/constants";

const useSignin = () => {
    const classes = styles();
    const navigation = useNavigation();
    const { getUserId, setUserId, setUserToken } = useUser();
    const [email, setEmail] = useState('Rr1@gmail.com');
    // const [user, setUser] = useRecoilState(userState);
    const [password, setPassword] = useState('1234');
    const [userData, setUserData] = useState(null);
    const { getApiRequest, postApiRequest } = useAxios();
    const backgroundImage = require('../../assets/images/signin1.jpg')
    const handleForgotPassword = () => {
        // Your forgot password logic
    };
    const fetchUserData = async () => {
        try {
            const userId = await getUserId();
            const response = await getApiRequest(`${GET_USER_ENDPOINT}${userId}`);
            if (response) {
                setUserData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Please fill in all fields');
            return;
        }

        try {
            const response = await postApiRequest(LOGIN_ENDPOINT, {
                email,
                password,
            });
            if (response && response.data.success) {
                console.log('Response:', response.data);
                Alert.alert('Signin successful');
                await setUserId(response.data.data.id.toString());
                await setUserToken(response.data.data.token.toString());

                if (response.data.data.type == 'OWNER') {
                    // @ts-ignore
                    navigation.navigate(OWNER_SCREEN);
                } else {
                    // @ts-ignore
                    navigation.navigate(HOME_SCREEN);
                }
            } else {
                Alert.alert('Your email or password is incorrect');
            }
        } catch (error: any) {
            console.error('Axios Error:', error);

            if (error.response) {
                console.error('Server Response:', error.response.data);
            }

            Alert.alert('Error fetching data. Please try again.');
        }
    };

    return { classes, backgroundImage, email, setEmail, password, setPassword, handleSignIn, handleForgotPassword }
}

export { useSignin }