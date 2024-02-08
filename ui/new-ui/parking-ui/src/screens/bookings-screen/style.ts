import { StyleSheet } from "react-native";

const styles = () => {
    return StyleSheet.create({
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
            margin: 30,
            fontSize: 20,
            fontWeight: 'bold',
        },
        Booking2: {
            alignItems: 'center',
            margin: 15,
            fontSize: 20,
            fontWeight: 'bold',
        },
        Booking3: {

            alignItems: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center'
        },
        home: {
            // flexDirection:'row',
            shadowColor: '#000',
            shadowOffset: { width: 3, height: 2 },
            shadowOpacity: 0.8,
            height: 45,
            margin: 20,
            backgroundColor: '#adaa'
        },
        tinyLogo: {
            width: 200,
            height: 300,
        },
        buttonContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 443,
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
        buttonCancel: {
            backgroundColor: 'white',
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
        qrCodeContainer: {
            alignItems: 'center',
            marginTop: 20,
        },
        qrCodeValue: {
            fontSize: 18,
            marginBottom: 10,
        },
        buttonConfirmed: {
            backgroundColor: '#4CAF50', // لون الخلفية عندما يكون الحجز مؤكد
        }
    });
};

export default styles;