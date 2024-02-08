import { Text, TouchableOpacity, View } from "react-native"
import QRCode from 'react-native-qrcode-svg';
import { useBookingsScreen } from "./use-bookings-screen"

const BookingsScreen = () => {
    const { classes, qrCode, selectedParking, handleButtonPress, handleConfirmPress, handleCancelPress, isLinkOpened } = useBookingsScreen();

    const renderBooking = () => {
        if (selectedParking) {
            return (
                <>
                    <Text style={classes.Booking2}>Parking Name: {selectedParking.name}{selectedParking.title}</Text>

                    <Text style={classes.Booking2}>Price: {selectedParking.chargePerMinute}{selectedParking.parkingPrice}</Text>
                    {qrCode && (
                        <View style={classes.qrCodeContainer}>
                            <QRCode
                                value={qrCode}
                                size={370}
                                color="black"
                                backgroundColor="white"
                            />
                            <TouchableOpacity
                                style={classes.buttonUnderQR}
                                onPress={handleButtonPress}
                            >
                                <Text style={classes.buttonText}>Open Link</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={classes.buttonContainer}>
                        <TouchableOpacity
                            style={classes.buttonConfirm}
                            onPress={handleConfirmPress}
                        >
                            <Text style={classes.buttonTextConfirm}> Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={classes.buttonCancel}
                            onPress={handleCancelPress}
                        >
                            <Text style={classes.buttonTextCancel}> Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    {qrCode && !isLinkOpened && (
                        <View style={classes.qrCodeContainer}>
                            <QRCode
                                value={qrCode}
                                size={370}
                                color="black"
                                backgroundColor="white"
                            />
                            <TouchableOpacity
                                style={classes.buttonUnderQR}
                                onPress={handleButtonPress}
                            >
                                <Text style={classes.buttonText}>Open Link</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )
        }
        else {
            return <Text style={classes.Booking3}>No booking available.</Text>
        }
    }

    return (
        <View style={classes.Booking}>
            {renderBooking()}
        </View>
    )
}

export { BookingsScreen }