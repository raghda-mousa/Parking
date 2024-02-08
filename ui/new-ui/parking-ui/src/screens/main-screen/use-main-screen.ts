
import { useNavigation } from '@react-navigation/native'
import { SIGNIN_SCREEN, SIGNUP_SCREEN } from '../../core/constants';
// import signinImage from '../../assets/images/signin.jpeg'
import styles from './style';

const useMainScreen = () => {
    const classes = styles();
    const navigation = useNavigation();
    const signinImage = require('../../assets/images/signin.jpeg');
    const onSignin = () => {
        // @ts-ignore
        navigation.navigate(SIGNIN_SCREEN);
    };
    const onSignup = () => {
        // @ts-ignore
        navigation.navigate(SIGNUP_SCREEN);
    };

    return { onSignin, onSignup, classes, signinImage }

}
export { useMainScreen }