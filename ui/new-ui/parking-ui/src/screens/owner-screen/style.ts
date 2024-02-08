import { StyleSheet } from "react-native";

const styles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        backgroundImage: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
        },
        text: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 10,
        },
    });
};

export default styles;