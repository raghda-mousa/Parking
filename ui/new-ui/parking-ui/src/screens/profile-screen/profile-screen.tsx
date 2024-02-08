import React from "react";
import { ImageBackground } from "../../components";
import { useProfileScreen } from "./use-profile-screen"
import { Text, View } from "react-native";

const ProfileScreen = () => {
    const { classes, userData, backgroundImage } = useProfileScreen();
    return (
        <ImageBackground source={backgroundImage} style={classes.backgroundImage}>
            <View style={classes.container}>
                <Text style={classes.Text}>Name: {userData?.name}</Text>
                <Text style={classes.Text}>Email: {userData?.email}</Text>
            </View>
        </ImageBackground>
    )
}

export { ProfileScreen }