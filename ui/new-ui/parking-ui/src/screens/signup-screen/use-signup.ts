import { useState } from "react";
import styles from "./style"
import { useAxios } from "../../hooks";
import { Alert } from "react-native";
import { CREATE_USER_ENDPOINT } from "../../core/constants";
import { useNavigation } from "@react-navigation/native";

const useSignup = () => {
    const classes = styles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const backgroundImage = require('../../assets/images/signin1.jpg');
    const { postApiRequest } = useAxios();

    const handleSubmit = async () => {
        if (!name || !email || !password) {
            Alert.alert('Please fill in all fields');
            return;
        }

        try {
            const response = await postApiRequest(CREATE_USER_ENDPOINT, {
                name,
                password,
                email,
            })
            console.log({ response })

            if (response?.success) {
                const userId = response.data._id;
                Alert.alert('Registration successful! Hello ' + name);
                navigation.navigate('SecondScreen');
            } else {
                console.error('Unexpected response format:', response);
                Alert.alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            Alert.alert('An error occurred during registration. Please try again later.');
        }
    };

    return { classes, name, setName, email, setEmail, password, setPassword, handleSubmit, backgroundImage }
}

export { useSignup }