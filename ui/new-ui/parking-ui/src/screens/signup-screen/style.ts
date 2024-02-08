import { StyleSheet } from "react-native";

const styles = () => {
    return StyleSheet.create({
        backgroundImage: {
            flex: 1,
            resizeMode: 'cover',
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            color: '#2D245C',
            fontSize: 40,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
        },
        input: {
            width: 380,
            height: 45,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 30,
            marginBottom: 10,
            paddingHorizontal: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
        icon: {
            marginRight: 10,
        },
    });
};

export default styles;