import React from "react"
import { Text, View } from "react-native"
import { ImageBackground } from '../../components'
import { useOwnerScreen } from "./use-owner"

const OwnerScreen = () => {
    const { classes, backgroundImage, userData } = useOwnerScreen();
    return (
        <View style={classes.container}>
            <ImageBackground source={backgroundImage} style={classes.backgroundImage}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={classes.text}>Name: {userData.name}</Text>
                    {/* <Text style={classes.text}>Email: {userData.email}</Text> */}
                    <Text style={classes.text}>Parking Name: {userData.parking?.name}</Text>
                    {/* Add more details as needed */}
                </View>
            </ImageBackground>
        </View>
    )
}

export { OwnerScreen }